---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

## Ce que vous nous transmettez

| Information | Description |
|-------------|-------------|
| **URL staging** | Votre endpoint de test, ex. `https://staging.partenaire.com/api/qlower/orders` |
| **URL production** | Votre endpoint de production |
| **API key** *(optionnel)* | Une chaîne secrète de 32 caractères minimum, que nous enverrons en `X-API-KEY` |

## Ce que nous vous transmettons

| Information | Description |
|-------------|-------------|
| **Secret de signature** *(recommandé)* | Notre clé HMAC, avec laquelle vous vérifiez chaque appel |

Cette dissymétrie est volontaire : l'API key est **votre** clé, vous la choisissez et vous validez nos
appels avec. Le secret de signature est **notre** clé, nous signons et vous vérifiez. Nous vous le
transmettons par lien à usage unique, jamais par email.

## Exigences de l'endpoint

- **HTTPS** obligatoire
- Accepte `Content-Type: application/json`
- Répond **2xx** en cas de succès
- Répond **5xx** en cas de problème de votre côté — un 4xx ne sera pas retenté
- Répond en moins de **30 secondes**
- Déduplique sur `event_id` — une même commande peut vous parvenir plusieurs fois

## Sécuriser l'endpoint

L'API key, transmise en clair, prouve seulement que l'appelant la connaît. La signature prouve en plus
que le corps n'a pas été altéré et n'est pas un rejeu. Quand un secret a été convenu, nous ajoutons :

```
X-Qlower-Signature: t=1767612138,v1=8d3f1c9a4b...
```

- `t` — horodatage Unix (secondes) de l'envoi
- `v1` — `HMAC-SHA256(secret, "<t>.<corps brut>")`, en hexadécimal

<Tabs groupId="langage">
<TabItem value="js" label="Node.js / Express">

```javascript
const crypto = require('crypto');

app.post('/api/qlower/orders', express.raw({ type: 'application/json' }), (req, res) => {
  if (req.headers['x-api-key'] !== process.env.QLOWER_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [t, v1] = req.headers['x-qlower-signature'].split(',').map(p => p.split('=')[1]);
  const expected = crypto
    .createHmac('sha256', process.env.QLOWER_WEBHOOK_SECRET)
    .update(`${t}.`)
    .update(req.body)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(v1), Buffer.from(expected))) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) {
    return res.status(401).json({ error: 'Timestamp too old' });
  }

  const payload = JSON.parse(req.body);
  // …
});
```

</TabItem>
<TabItem value="python" label="Python / Flask">

```python
import hashlib
import hmac
import os
import time

@app.route('/api/qlower/orders', methods=['POST'])
def handle_qlower_order():
    if request.headers.get('X-API-KEY') != os.environ['QLOWER_API_KEY']:
        return jsonify({'error': 'Unauthorized'}), 401

    parts = dict(p.split('=', 1) for p in request.headers['X-Qlower-Signature'].split(','))
    raw_body = request.get_data()

    expected = hmac.new(
        os.environ['QLOWER_WEBHOOK_SECRET'].encode(),
        f"{parts['t']}.".encode() + raw_body,
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(parts['v1'], expected):
        return jsonify({'error': 'Invalid signature'}), 401
    if abs(time.time() - int(parts['t'])) > 300:
        return jsonify({'error': 'Timestamp too old'}), 401

    payload = request.get_json()
    # …
```

</TabItem>
</Tabs>

:::caution[Signez le corps brut, pas le JSON reparsé]
La signature porte sur les octets exacts que nous avons postés. Un framework qui parse puis
re-sérialise le JSON (ordre des clés, espaces, encodage des accents) produira un condensé différent.
Récupérez le corps brut **avant** tout middleware de parsing.
:::

Le rejet au-delà de 5 minutes protège du rejeu. Nos nouvelles tentatives re-signent avec un
horodatage frais, elles ne sont donc jamais rejetées par ce contrôle. Si nous régénérons le secret,
acceptez l'ancien et le nouveau le temps de la bascule.

## Environnements

|  | Staging | Production |
|--|---------|------------|
| Paiements | Stripe en mode test, aucun débit | Paiements réels |
| Factures | générées, marquées « TEST » | officielles |
| Emails | pas d'envoi aux clients réels | envoyés aux clients |

Carte de test Stripe : `4242 4242 4242 4242`, n'importe quelle date future, n'importe quel CVC.

## Mise en service

1. Nous configurons votre endpoint de staging
2. Nous vous envoyons un événement de test (`event_type: "ping"`)
3. Vous validez la réception, nous passons une commande de test
4. Validation conjointe, puis bascule en production
