---
sidebar_position: 2
---

# Configuration

## Informations à fournir

Pour activer l'intégration Stripe, vous devez nous communiquer les informations suivantes :

| Information | Description | Exemple                                              |
|-------------|-------------|------------------------------------------------------|
| **Webhook URL (Staging)** | URL pour les tests | `https://staging.partner.com/api/comptappart/orders` |
| **Webhook URL (Production)** | URL pour la production | `https://api.partner.com/api/comptappart/orders`     |
| **API key** *(optionnel)* | Envoyée en `X-API-KEY` | une chaîne secrète de 32 caractères minimum |
| **Secret de signature** *(recommandé)* | Signe le corps en `X-Qlower-Signature` | convenu ensemble, voir plus bas |

---

## Prérequis techniques

Votre endpoint webhook doit respecter les exigences suivantes :

- ✅ Accepte `Content-Type: application/json`
- ✅ Retourne un code **2xx** (200, 201, 204) en cas de succès
- ✅ Retourne un code **5xx** en cas d'erreur de votre côté (un 4xx ne sera pas retenté)
- ✅ Utilise **HTTPS** (requis pour la sécurité)
- ✅ Temps de réponse inférieur à **30 secondes**
- ✅ Déduplique sur `event_id` — une même notification peut arriver plusieurs fois

---

## API Key (Optionnel)

Pour sécuriser davantage les webhooks, nous pouvons inclure une **API key** dans le header `X-API-KEY`.

### Pour activer :

1. Générez une clé secrète forte (minimum 32 caractères)
2. Communiquez-la nous de manière sécurisée
3. Nous la configurerons dans notre système
4. Vérifiez-la dans votre endpoint

### Exemple de vérification :

```javascript
const apiKey = req.headers['x-api-key'];
if (apiKey !== process.env.COMPTAPPART_API_KEY) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## Signature du corps (Recommandé)

Une API key transmise en clair prouve seulement que l'appelant la connaît. La **signature** prouve en
plus que le corps n'a pas été modifié et n'est pas un rejeu. Sur demande, nous convenons d'un secret
de signature et ajoutons l'en-tête :

```
X-Qlower-Signature: t=1767612138,v1=8d3f1c9a4b...
```

- `t` : horodatage Unix (secondes) de l'envoi
- `v1` : `HMAC-SHA256(secret, "<t>.<corps brut>")` en hexadécimal

### Exemple de vérification

```javascript
const crypto = require('crypto');

// Le corps BRUT est indispensable : re-sérialiser le JSON invalide la signature.
app.post('/api/comptappart/orders', express.raw({ type: 'application/json' }), (req, res) => {
  const [tPart, v1Part] = req.headers['x-qlower-signature'].split(',');
  const timestamp = tPart.split('=')[1];
  const received = v1Part.split('=')[1];

  const expected = crypto
    .createHmac('sha256', process.env.QLOWER_WEBHOOK_SECRET)
    .update(`${timestamp}.`)
    .update(req.body)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(received), Buffer.from(expected))) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    return res.status(401).json({ error: 'Timestamp too old' });
  }

  const payload = JSON.parse(req.body);
  // ...
});
```

:::caution[Signer le corps brut, pas le JSON reparsé]
La signature porte sur les octets exacts que nous avons postés. Un framework qui parse puis
re-sérialise le JSON (ordre des clés, espaces, encodage des accents) produira un condensé différent.
Récupérez le corps brut **avant** tout middleware de parsing.
:::

Le rejet sur horodatage trop ancien (ici 5 minutes) protège du rejeu. Nos nouvelles tentatives
re-signent avec un horodatage frais, elles ne sont donc jamais rejetées par ce contrôle.

---

## Environnements

### Staging (Tests)

- Utilise Stripe Test Mode
- Aucun vrai paiement
- Webhook envoyé vers votre endpoint de staging
- Factures PDF générées mais marquées "TEST"

**Carte de test Stripe :**
- Numéro : `4242 4242 4242 4242`
- Date : N'importe quelle date future
- CVC : N'importe quel code à 3 chiffres

### Production

- Vrais paiements Stripe
- Webhook envoyé vers votre endpoint de production
- Factures PDF officielles
- Emails envoyés aux vrais clients

---

## Processus d'intégration

1. Nous configurons votre endpoint dans notre système
2. Nous effectuons des tests en environnement staging
3. Validation conjointe des tests
4. Mise en production
