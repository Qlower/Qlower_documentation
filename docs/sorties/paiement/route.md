---
sidebar_position: 4
sidebar_label: Lire les paiements
---

# Lire les paiements

En complément du webhook, la route Paiements vous permet de relire vos paiements à tout moment : pour vous resynchroniser après une indisponibilité de votre endpoint, ou pour rapprocher vos encaissements.

## Endpoints

```
GET /api/third_party/payments
GET /api/third_party/payments/{order_id}
```

La première renvoie la liste paginée de vos paiements, du plus récent au plus ancien. La seconde renvoie un paiement, par notre identifiant de commande. L'authentification est décrite dans la [vue d'ensemble des sorties](../presentation.md#appeler-une-route-de-lecture).

## Paramètres de la liste

| Paramètre    | Type    | Description                                                                 |
| ------------ | ------- | --------------------------------------------------------------------------- |
| `paid_since` | string  | ISO 8601. Ne renvoie que les paiements effectués depuis cette date          |
| `client_id`  | string  | Votre identifiant du client. Ne renvoie que les paiements de ce client      |
| `page`       | integer | Numéro de page, à partir de 1                                               |
| `page_size`  | integer | Nombre de paiements par page : 100 par défaut, 500 au maximum               |

## Format

Chaque paiement reprend les blocs du [webhook de commande](./webhook.md) : `customer`, `order` et `invoice`, avec les champs `event_type`, `event_id` et `order_id`. Trois différences :

- le bloc `customer` porte en plus votre identifiant du client, `id` ;
- le champ `timestamp`, propre à l'envoi d'un webhook, est absent : la date qui compte est `order.payment_date` ;
- l'URL `invoice.pdf_url` est signée à chaque appel, et valide 7 jours à partir de celui-ci.

## Réponse (200 OK)

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "event_type": "order.created",
      "event_id": "evt_1U10P7BRvWe0K5pq93AePnrD",
      "order_id": 3051,

      "customer": {
        "id": "CLT-00042",
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
```

| Champ      | Type           | Description                                             |
| ---------- | -------------- | ------------------------------------------------------- |
| `count`    | integer        | Nombre total de paiements correspondant à la requête    |
| `next`     | string ou null | URL de la page suivante, `null` sur la dernière page    |
| `previous` | string ou null | URL de la page précédente, `null` sur la première page  |
| `results`  | array          | Les paiements de la page                                |

La route `GET /api/third_party/payments/{order_id}` renvoie directement un élément de `results`.

## Erreurs

| Code  | Cas                                                 |
| ----- | --------------------------------------------------- |
| `400` | `paid_since` n'est pas une date ISO 8601 valide     |
| `401` | Clé d'API absente ou invalide                       |
| `404` | Aucun de vos paiements ne porte cet identifiant     |

:::info[Seulement les paiements que nous encaissons]
Cette route ne concerne que les partenaires qui nous délèguent l'encaissement de leurs clients. Si vous encaissez vous-même vos clients, elle renvoie une liste vide.
:::
