---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Le webhook de commande

Votre endpoint reçoit un `POST` en JSON à chaque règlement. Répondez **2xx** dès que vous avez pris la
commande en charge.

## En-têtes

```
Content-Type: application/json
User-Agent: Qlower-Partner-Notifier/1.0
X-API-KEY: <votre clé api>
X-Qlower-Signature: t=1767612138,v1=8d3f1c9a...
```

Les deux derniers ne sont présents que si une clé, respectivement un secret, ont été convenus — voir
[Configuration](./configuration.md).

## Payload

```json
{
  "event_type": "order.created",
  "event_id": "evt_1U10P7BRvWe0K5pq93AePnrD",
  "order_id": 3051,
  "timestamp": "2026-08-05T08:42:18+00:00",

  "customer": {
    "first_name": "Marie",
    "last_name": "Martin",
    "email": "marie.martin@example.com",
    "phone": "+33687654321"
  },

  "order": {
    "total_amount": 315.0,
    "currency": "EUR",
    "payment_date": "2026-08-05T08:42:18+00:00",
    "is_subscription": true,
    "products": [
      {
        "product_id": "prod_UysoTyUjG5IsMB",
        "product_name": "BIC réel (LMNP ou LMP), SCI (IR ou IS)",
        "quantity": 1,
        "unit_price": 315.0,
        "amount": 315.0
      }
    ],
    "coverage": [
      {
        "year": 2026,
        "property": {
          "external_id": "00322f69-c2a2-41d3-9848-0d74c838a6c4",
          "external_id_origin": "partner",
          "qlower_property_id": 48213,
          "name": "Appartement Bordeaux",
          "address_line1": "12 rue des Remparts",
          "postal_code": "33000",
          "city": "Bordeaux"
        }
      }
    ]
  },

  "invoice": {
    "pdf_url": "https://qlower-documents.s3.eu-west-3.amazonaws.com/...",
    "pdf_filename": "facture_20260805.pdf",
    "number": "082A05A2-0530"
  }
}
```

## Racine

| Champ | Type | Description |
|-------|------|-------------|
| `event_type` | string | Voir ci-dessous |
| `event_id` | string | Identifiant de l'événement Stripe. **Clé de déduplication** : identique d'une tentative à l'autre |
| `order_id` | integer | Notre identifiant de commande |
| `timestamp` | string | ISO 8601 avec offset UTC explicite (`+00:00`, jamais le suffixe `Z`) |

### `event_type`

| Valeur | Signification |
|--------|---------------|
| `order.created` | Premier règlement : achat unique, ou première échéance d'un abonnement |
| `order.renewed` | Échéance de renouvellement d'un abonnement existant |
| `ping` | Test manuel pendant l'intégration. Ne contient que `event_type` et `timestamp` — répondez 2xx sans rien traiter |

Un `order.renewed` porte le même abonnement qu'un `order.created` antérieur, mais un nouvel exercice
dans `coverage` : il prolonge un dossier, il n'en ouvre pas un nouveau.

### Modifications d'un abonnement

| Ce qui se passe | Ce que vous recevez |
|-----------------|---------------------|
| Le client ajoute un bien à son abonnement | `order.created` dont `coverage` ne contient **que les biens ajoutés** |
| Échéance annuelle | `order.renewed` avec le nouvel exercice |
| Changement de quantité refacturé par Stripe | rien — l'ajustement est déjà couvert par l'événement d'ajout |
| Résiliation, remboursement, changement de formule | rien, à ce jour |

:::info[Les fins d'abonnement ne sont pas notifiées]
Nous n'émettons aujourd'hui que des événements de commande. Une résiliation ou un remboursement ne
produit aucun webhook : ne vous appuyez pas sur ce canal pour détecter la fin d'un engagement.
:::

## `customer`

| Champ | Type | Nullable |
|-------|------|----------|
| `first_name` | string | Oui — vide si le client ne l'a pas renseigné au paiement |
| `last_name` | string | Oui |
| `email` | string | Non |
| `phone` | string | Oui |

## `order`

| Champ | Type | Description |
|-------|------|-------------|
| `total_amount` | float | Montant total payé, TVA incluse |
| `currency` | string | Code ISO 4217, ex. `"EUR"` |
| `payment_date` | string | Date du paiement (ISO 8601) |
| `is_subscription` | boolean | `true` si le règlement provient d'un abonnement |
| `products` | array | Produits achetés |
| `coverage` | array | Biens et exercices couverts |

### `products[]`

| Champ | Type | Toujours présent |
|-------|------|------------------|
| `product_id` | string | Oui |
| `product_name` | string | Oui |
| `quantity` | integer | Oui |
| `unit_price` | float | Oui |
| `amount` | float | Non |
| `sub_items` | array | Non |

Sur un prix par tranches, la ligne parente porte le total et `sub_items[]` détaille chaque tranche
(`description`, `quantity`, `unit_price`, `amount`) :

```json
{
  "product_id": "prod_P6P4ct2l0xBRSB",
  "product_name": "Abonnement fiscal autonome",
  "quantity": 2,
  "unit_price": 199.5,
  "amount": 399.0,
  "sub_items": [
    { "description": "Abonnement fiscal autonome 2026 pour 1 propriété", "quantity": 1, "unit_price": 269.0, "amount": 269.0 },
    { "description": "1 propriété additionnelle", "quantity": 1, "unit_price": 130.0, "amount": 130.0 }
  ]
}
```

### `coverage[]`

Ce que le règlement couvre concrètement : une entrée par couple **(bien, exercice fiscal)**. C'est
cette section qui vous dit pour quel bien et pour quelle année le client a payé.

| Champ | Type | Description |
|-------|------|-------------|
| `year` | integer | Exercice fiscal couvert |
| `property.external_id` | string | Identifiant du bien, votre clé de rapprochement |
| `property.external_id_origin` | string | `partner` ou `qlower`, voir ci-dessous |
| `property.qlower_property_id` | integer | Notre identifiant interne, utile au support |
| `property.name` | string | Libellé du bien |
| `property.address_line1` | string | Adresse |
| `property.postal_code` | string | Code postal |
| `property.city` | string | Ville |

**L'origine de l'identifiant** détermine ce que vous avez à faire :

| `external_id_origin` | Situation | Forme |
|----------------------|-----------|-------|
| `partner` | Le bien vient de vous, transmis via les [Loaders](/docs/loaders/presentation) : nous vous rendons **votre** identifiant tel quel | celle que vous nous avez donnée |
| `qlower` | Le client a créé le bien depuis la page de paiement : il n'existait pas chez vous, nous lui en frappons un | préfixé `qlw_`, ex. `qlw_9f2c1b84-…` |

Un `qlower` signale donc un bien **nouveau pour vous**. L'identifiant est stable et persisté chez
nous : si vous nous rechargez ce bien plus tard via les Loaders avec ce même `external_id`, nous le
rapprocherons du bien existant au lieu de créer un doublon. Lisez `external_id_origin`, ne testez pas
le préfixe.

:::info[`coverage` peut être vide]
La section vaut `[]` quand le règlement ne provisionne aucun bien chez nous : achat de service sans
exercice rattaché, ou acheteur sans compte sur notre plateforme. C'est un cas normal, pas une erreur.
:::

## `invoice`

| Champ | Type | Description |
|-------|------|-------------|
| `pdf_url` | string | URL signée de notre facture PDF, **valide 7 jours** |
| `pdf_filename` | string | Nom de fichier suggéré |
| `number` | string | Numéro de facture unique |

Le bloc est toujours renseigné et pointe toujours sur notre facture : nous ne vous envoyons la
notification qu'une fois celle-ci produite.

## Implémentation

Deux points portent la fiabilité de cet endpoint :

- **Le corps brut** est nécessaire à la vérification de signature — récupérez-le avant tout parsing.
- **L'enregistrement de l'`event_id` et les effets métier sont dans une seule transaction.** Poser le
  marqueur de déduplication avant d'avoir terminé le travail vous exposerait au pire cas : notre
  nouvelle tentative répondrait « déjà traité » alors que la moitié des biens n'a pas été activée.
  La contrainte unique sur `event_id` porte la déduplication, sans lecture préalable, donc deux
  tentatives simultanées ne peuvent pas aboutir toutes les deux.

<Tabs groupId="langage">
<TabItem value="js" label="Node.js / Express">

```javascript
const HANDLED_EVENTS = new Set(['order.created', 'order.renewed']);
const UNIQUE_VIOLATION = '23505';

app.post('/api/qlower/orders', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!isRequestAuthentic(req.headers, req.body)) return res.sendStatus(401);

  const event = JSON.parse(req.body);
  if (event.event_type === 'ping') return res.sendStatus(200);
  if (!HANDLED_EVENTS.has(event.event_type)) return res.sendStatus(400);

  try {
    await db.transaction(async tx => {
      await tx.orders.insert({
        qlower_event_id: event.event_id,
        qlower_order_id: event.order_id,
        customer_email: event.customer.email,
        amount: event.order.total_amount,
        invoice_url: event.invoice.pdf_url,
      });

      for (const { year, property } of event.order.coverage) {
        if (property.external_id_origin === 'qlower') await tx.properties.create(property);
        await tx.declarations.activate(property.external_id, year);
      }
    });
    res.sendStatus(200);
  } catch (error) {
    if (error.code === UNIQUE_VIOLATION) return res.sendStatus(200);
    logger.error('Webhook Qlower en échec', { event_id: event.event_id, error });
    res.sendStatus(500);
  }
});
```

</TabItem>
<TabItem value="python" label="Python / Flask">

```python
HANDLED_EVENTS = {'order.created', 'order.renewed'}


@app.route('/api/qlower/orders', methods=['POST'])
def handle_qlower_order():
    if not is_request_authentic(request.headers, request.get_data()):
        return '', 401

    event = request.get_json()
    if event['event_type'] == 'ping':
        return '', 200
    if event['event_type'] not in HANDLED_EVENTS:
        return '', 400

    try:
        with db.session.begin():
            db.session.add(Order(
                qlower_event_id=event['event_id'],
                qlower_order_id=event['order_id'],
                customer_email=event['customer']['email'],
                amount=event['order']['total_amount'],
                invoice_url=event['invoice']['pdf_url'],
            ))

            for line in event['order']['coverage']:
                property_data = line['property']
                if property_data['external_id_origin'] == 'qlower':
                    create_property(property_data)
                activate_declaration(property_data['external_id'], line['year'])
    except IntegrityError:
        return '', 200
    except Exception:
        logger.exception('Webhook Qlower en échec', extra={'event_id': event['event_id']})
        return '', 500

    return '', 200
```

</TabItem>
</Tabs>

Codes de réponse attendus et politique de reprise : voir [Échecs et reprises](./errors.md).
