---
sidebar_position: 4
sidebar_label: Lire les paiements
---

# Lire les paiements

En complément du webhook, la route Paiements vous permet de relire vos paiements à tout moment : pour vous resynchroniser après une indisponibilité de votre endpoint, ou pour rapprocher vos encaissements.

## Requête

```
GET /api/third_party/payments
```

Les en-têtes, l'enveloppe de réponse, la pagination et les erreurs communes sont décrits dans la [vue d'ensemble](../presentation.md#appeler-une-route-de-lecture).

### Paramètres

Tous les paramètres sont facultatifs.

| Paramètre    | Type    | Description                                                                  |
| ------------ | ------- | ---------------------------------------------------------------------------- |
| `email`      | string  | Ne renvoie que les paiements du client portant cet email, sans tenir compte de la casse |
| `paid_since` | string  | Ne renvoie que les paiements effectués depuis cette date                     |
| `page`       | integer | Numéro de page, à partir de 1                                                |
| `page_size`  | integer | Nombre de paiements par page : 100 par défaut et au maximum                  |

Les paiements sont renvoyés du plus récent au plus ancien.

```
GET /api/third_party/payments?email=marie.martin@example.com
GET /api/third_party/payments?paid_since=2026-08-01&page=2
```

## Réponse (200 OK)

Chaque paiement a exactement le format du [webhook de commande](./webhook.md), à une différence près : l'URL `invoice.pdf_url` est signée à chaque appel, valide 7 jours à partir de celui-ci.

```json
{
  "status": 1,
  "errors": "",
  "results": {
    "count": 1,
    "page": 1,
    "results": [
      {
        "event_type": "order.created",
        "event_id": "evt_1U10P7BRvWe0K5pq93AePnrD",
        "order_id": 3051,
        "timestamp": "2026-08-05T08:42:18+00:00",

        "customer": {
          "id": "qlw_3b7e91d0-5c2a-4f8e-b1d6-0a9c4e27f513",
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
                "name": "Appartement Bordeaux"
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
    ]
  }
}
```

Le détail de chaque bloc est décrit avec le [webhook de commande](./webhook.md).

## Erreurs

| Code  | Cas                                             |
| ----- | ----------------------------------------------- |
| `400` | `paid_since` n'est pas une date ISO 8601 valide |

:::info[Seulement les paiements que nous encaissons]
Cette route ne concerne que les partenaires qui nous délèguent l'encaissement de leurs clients. Si vous encaissez vous-même vos clients, elle renvoie une liste vide.
:::
