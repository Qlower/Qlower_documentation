---
sidebar_position: 3
---

# Webhook - Notification de commande

## Endpoint à implémenter

Vous devez créer un endpoint HTTP qui accepte des **POST requests** en JSON.

---

## Format de la requête

**Méthode :** `POST`

**Headers :**
```
Content-Type: application/json
User-Agent: Qlower-Partner-Notifier/1.0
X-API-KEY: <notre_clé_api>
X-Qlower-Signature: t=1767612138,v1=8d3f1c9a...
```

`X-API-KEY` n'est présent que si une clé a été convenue, `X-Qlower-Signature` que si un secret de
signature a été convenu (voir [Configuration](./configuration.md)).

**Body (JSON) :**

```json
{
  "event_type": "order.created",
  "event_id": "evt_1234567890",
  "order_id": 42,
  "timestamp": "2025-12-05T14:30:00+00:00",

  "customer": {
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+33612345678"
  },

  "order": {
    "total_amount": 49.99,
    "currency": "EUR",
    "payment_date": "2025-12-05T14:30:00+00:00",
    "is_subscription": false,
    "products": [
      {
        "product_id": "prod_QLower123",
        "product_name": "Service Fiscalité Premium",
        "quantity": 1,
        "unit_price": 49.99,
        "amount": 49.99
      }
    ],
    "custom_fields": [
      {
        "key": "anneedeladeclaration",
        "label": "Année de la déclaration",
        "value": "2024"
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
    "pdf_url": "https://s3.amazonaws.com/.../invoice_42.pdf",
    "pdf_filename": "facture_20251205.pdf",
    "number": "INV-2025-001234"
  }
}
```

---

## Champs détaillés

### Champ `event_type`
Type d'événement :

| Valeur | Signification |
|--------|---------------|
| `order.created` | Premier règlement : achat unique, ou première échéance d'un abonnement |
| `order.renewed` | Échéance de renouvellement d'un abonnement existant |
| `ping` | Événement de test, émis manuellement pendant l'intégration. Ne contient que `event_type` et `timestamp` — répondez `2xx` sans rien traiter. |

Un `order.renewed` porte le même abonnement qu'un `order.created` antérieur mais un nouvel exercice
dans `coverage` : il prolonge un dossier existant, il n'en ouvre pas un nouveau.

### Champ `event_id`
ID unique de l'événement Stripe (pour traçabilité).

### Champ `order_id`
ID unique de la commande dans notre système ComptAppart.

### Champ `timestamp`
Date/heure de l'événement au format **ISO 8601 avec offset UTC explicite** (`+00:00`, et non le
suffixe `Z`).

### Objet `customer`
Informations du client ayant effectué le paiement.

| Champ | Type | Description | Nullable |
|-------|------|-------------|----------|
| `first_name` | string | Prénom du client | Oui |
| `last_name` | string | Nom du client | Oui |
| `email` | string | Email du client | Non |
| `phone` | string | Téléphone au format international | Oui |

**⚠️ Note :** `first_name` et `last_name` peuvent être vides si le client n'a pas fourni ces informations lors du paiement.

### Objet `order`
Détails de la commande.

| Champ | Type | Description |
|-------|------|-------------|
| `total_amount` | float | Montant total payé (incluant TVA) |
| `currency` | string | Code devise ISO 4217 (ex: `"EUR"`) |
| `payment_date` | string | Date du paiement (ISO 8601) |
| `is_subscription` | boolean | `true` si le règlement provient d'un abonnement |
| `products` | array | Liste des produits achetés |
| `custom_fields` | array | Champs personnalisés saisis lors du checkout (ex : année de la déclaration) |
| `coverage` | array | Biens et exercices fiscaux couverts par ce règlement |

### Array `products[]`
Liste des produits de la commande.

| Champ | Type | Description | Toujours présent |
|-------|------|-------------|------------------|
| `product_id` | string | ID du produit Stripe | Oui |
| `product_name` | string | Nom du produit | Oui |
| `quantity` | integer | Quantité achetée | Oui |
| `unit_price` | float | Prix unitaire HT | Oui |
| `amount` | float | Montant total de la ligne | Non |
| `sub_items` | array | Sous-lignes d'un prix par tranches | Non |

Quand un produit est facturé par tranches, la ligne parente porte le total et `sub_items[]` détaille
chaque tranche (`description`, `quantity`, `unit_price`, `amount`) :

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

### Array `custom_fields[]`
Liste des champs personnalisés que le client a remplis sur la page de paiement Stripe (ex : `Année de la déclaration`). Vide si aucun champ personnalisé n'est configuré sur le checkout.

| Champ | Type | Description |
|-------|------|-------------|
| `key` | string | Identifiant technique du champ (ex: `anneedeladeclaration`) |
| `label` | string | Libellé affiché au client (ex: `Année de la déclaration`) |
| `value` | string | Valeur saisie ou sélectionnée par le client (toujours sérialisée en string) |

### Array `coverage[]`
Ce que ce règlement couvre concrètement : une entrée par couple **(bien, exercice fiscal)**. C'est
cette section qui vous dit *pour quel bien* et *pour quelle année* le client a payé.

| Champ | Type | Description |
|-------|------|-------------|
| `year` | integer | Exercice fiscal couvert |
| `property` | object | Bien concerné |

Objet `property` :

| Champ | Type | Description |
|-------|------|-------------|
| `external_id` | string | Identifiant du bien, à utiliser comme clé de rapprochement |
| `external_id_origin` | string | `partner` ou `qlower` — voir ci-dessous |
| `qlower_property_id` | integer | Notre identifiant interne, utile pour le support |
| `name` | string | Libellé du bien |
| `address_line1` | string | Adresse |
| `postal_code` | string | Code postal |
| `city` | string | Ville |

#### Origine de l'`external_id`

| `external_id_origin` | Cas | Forme |
|----------------------|-----|-------|
| `partner` | Le bien vous appartient : vous nous l'avez transmis via les [Loaders](/docs/loaders/presentation), nous vous rendons **votre** identifiant tel quel | celle que vous nous avez donnée |
| `qlower` | Le client a créé le bien lui-même depuis la page de paiement : il n'existait pas chez vous, nous lui frappons un identifiant | préfixé `qlw_`, ex. `qlw_9f2c1b84-...` |

Un `external_id_origin: "qlower"` signale donc un bien **nouveau pour vous**. L'identifiant que nous
vous transmettons est stable et persisté chez nous : si vous nous rechargez ce bien plus tard via les
Loaders en réutilisant ce même `external_id`, nous le rapprocherons du bien existant au lieu d'en
créer un doublon. Ne testez pas le préfixe pour décider — lisez `external_id_origin`.

:::info[`coverage` peut être vide]
La section est vide (`[]`) quand le règlement ne provisionne aucun bien chez nous : achat de service
sans exercice rattaché, ou acheteur qui n'a pas de compte sur notre plateforme. Traitez ce cas comme
normal, pas comme une erreur.
:::

---

### Objet `invoice`
Informations sur la facture générée.

| Champ | Type | Description |
|-------|------|-------------|
| `pdf_url` | string | URL signée de la facture, **valide 7 jours** |
| `pdf_filename` | string | Nom de fichier suggéré pour la facture |
| `number` | string | Numéro de facture unique |

:::caution[`pdf_url` n'est pas toujours un PDF]
Si la génération de notre facture échoue, nous basculons sur le reçu Stripe du paiement, qui est une
**page HTML** et non un PDF — alors que `pdf_filename` annonce toujours une extension `.pdf`. Si vous
archivez le fichier, fiez-vous au `Content-Type` de la réponse plutôt qu'au nom de fichier.
:::

---

## Exemple de payload complet

```json
{
  "event_type": "order.created",
  "event_id": "evt_3QMqH82eZvKYlo2C0xzQjKVp",
  "order_id": 156,
  "timestamp": "2025-12-05T14:32:18.000Z",

  "customer": {
    "first_name": "Marie",
    "last_name": "Martin",
    "email": "marie.martin@gmail.com",
    "phone": "+33687654321"
  },

  "order": {
    "total_amount": 99.99,
    "currency": "EUR",
    "payment_date": "2025-12-05T14:32:18.000Z",
    "products": [
      {
        "product_id": "prod_RFvQB6zA3Tn8yZ",
        "product_name": "Déclaration d'impôts - Formule Complète",
        "quantity": 1,
        "unit_price": 83.32
      }
    ],
    "custom_fields": [
      {
        "key": "anneedeladeclaration",
        "label": "Année de la déclaration",
        "value": "2024"
      }
    ]
  },

  "invoice": {
    "pdf_url": "https://qlower-documents.s3.eu-west-3.amazonaws.com/partner_invoices/invoice_156_20251205_143218.pdf",
    "pdf_filename": "facture_20251205.pdf",
    "number": "FQCA-2025-000156"
  }
}
```

---

## Exemples d'implémentation

### Node.js / Express

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/comptappart/orders', async (req, res) => {
  try {
    const { event_type, order_id, customer, order, invoice } = req.body;

    // 1. Vérifier l'API key
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.COMPTAPPART_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 2. Vérifier le type d'événement
    if (event_type === 'ping') {
      return res.status(200).json({ success: true });
    }
    if (!['order.created', 'order.renewed'].includes(event_type)) {
      return res.status(400).json({ error: 'Unknown event type' });
    }

    // 3. Gérer l'idempotence (important pour les retries)
    const existingOrder = await Order.findOne({ comptappart_order_id: order_id });
    if (existingOrder) {
      return res.status(200).json({ success: true, message: 'Already processed' });
    }

    // 4. Sauvegarder dans votre base de données
    await Order.create({
      comptappart_order_id: order_id,
      customer_email: customer.email,
      customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
      amount: order.total_amount,
      currency: order.currency,
      products: order.products,
      invoice_url: invoice.pdf_url,
      status: 'completed'
    });

    // 5. Déclencher vos process métier
    await activateService(customer.email, order.products);

    // 6. Répondre avec succès
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Webhook endpoint ready'));
```

### Python / Flask

```python
from flask import Flask, request, jsonify
import os
import logging

app = Flask(__name__)
logger = logging.getLogger(__name__)

@app.route('/api/comptappart/orders', methods=['POST'])
def handle_comptappart_order():
    try:
        # 1. Vérifier l'API key
        api_key = request.headers.get('X-API-KEY')
        if api_key != os.environ.get('COMPTAPPART_API_KEY'):
            return jsonify({'error': 'Unauthorized'}), 401

        # 2. Parser le payload
        data = request.get_json()
        event_type = data.get('event_type')
        order_id = data.get('order_id')
        customer = data.get('customer', {})
        order = data.get('order', {})
        invoice = data.get('invoice', {})

        # 3. Vérifier le type d'événement
        if event_type == 'ping':
            return jsonify({'success': True}), 200
        if event_type not in ('order.created', 'order.renewed'):
            return jsonify({'error': 'Unknown event type'}), 400

        # 4. Gérer l'idempotence (important pour les retries)
        existing_order = Order.query.filter_by(comptappart_order_id=order_id).first()
        if existing_order:
            return jsonify({'success': True, 'message': 'Already processed'}), 200

        # 5. Sauvegarder dans votre base de données
        new_order = Order(
            comptappart_order_id=order_id,
            customer_email=customer.get('email'),
            customer_name=f"{customer.get('first_name', '')} {customer.get('last_name', '')}".strip(),
            amount=order.get('total_amount'),
            currency=order.get('currency'),
            products=order.get('products', []),
            invoice_url=invoice.get('pdf_url'),
            status='completed'
        )
        db.session.add(new_order)
        db.session.commit()

        # 6. Déclencher vos process métier
        activate_service(customer.get('email'), order.get('products'))

        # 7. Répondre avec succès
        return jsonify({'success': True}), 200

    except Exception as e:
        logger.error(f"Webhook error: {e}", exc_info=True)
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(port=3000)
```

---

## Codes de réponse

| Code | Description | Comportement ComptAppart |
|------|-------------|--------------------------|
| **200-299** | Succès | Notification marquée complétée |
| **408, 409, 425, 429** | Surcharge ou conflit temporaire | **Nouvelle tentative** |
| **400-499** (autres) | Erreur client (ex: format invalide) | Échec définitif, aucune nouvelle tentative |
| **500-599** | Erreur serveur | **Nouvelle tentative** |
| **Timeout** | Pas de réponse en 30s | **Nouvelle tentative** |

---

## En cas d'échec

Une notification dont l'envoi échoue de façon transitoire est **automatiquement renvoyée**, jusqu'à
5 fois, avec un délai croissant :

| Tentative | Délai après la précédente |
|-----------|---------------------------|
| 2 | 30 secondes |
| 3 | 2 minutes |
| 4 | 10 minutes |
| 5 | 30 minutes |
| 6 | 1 heure |

Soit une fenêtre de rattrapage d'environ **2 h 45** : une indisponibilité de votre endpoint plus
courte que cela se résorbe sans intervention.

:::warning[Une erreur 4xx n'est jamais retentée]
Un code 4xx (hors 408/409/425/429) est interprété comme un refus définitif du payload : nous
n'insistons pas. Ne répondez donc **jamais** 4xx pour un problème de votre côté — utilisez 5xx, qui
déclenche une nouvelle tentative.
:::

Passé la dernière tentative, la notification est marquée en échec et n'est plus renvoyée
automatiquement. Contactez-nous (voir [Support](./errors#support)) avec l'`event_id` ou l'`order_id` :
nous conservons le journal de chaque tentative (horodatage, code HTTP, votre réponse) et pouvons
rejouer la livraison.

---

## Idempotence

Les nouvelles tentatives impliquent que **vous pouvez recevoir plusieurs fois la même notification** —
par exemple si votre endpoint a traité la commande puis expiré avant de répondre. Dédupliquez sur
`event_id` (ou `order_id`), qui restent identiques d'une tentative à l'autre :

```python
# Exemple : vérifier si la commande existe déjà
existing_order = Order.objects.filter(
    comptappart_order_id=order_id
).first()

if existing_order:
    # Commande déjà traitée, retourner succès sans rien faire
    return jsonify({'success': True, 'message': 'Already processed'}), 200
```
