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
User-Agent: ComptAppart-Webhook/1.0
X-API-KEY: <notre_clé_api>
```

**Body (JSON) :**

```json
{
  "event_type": "order.created",
  "event_id": "evt_1234567890",
  "order_id": 42,
  "timestamp": "2025-12-05T14:30:00Z",

  "customer": {
    "first_name": "Jean",
    "last_name": "Dupont",
    "email": "jean.dupont@example.com",
    "phone": "+33612345678"
  },

  "order": {
    "total_amount": 49.99,
    "currency": "EUR",
    "payment_date": "2025-12-05T14:30:00Z",
    "products": [
      {
        "product_id": "prod_QLower123",
        "product_name": "Service Fiscalité Premium",
        "quantity": 1,
        "unit_price": 49.99
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
    "pdf_url": "https://s3.amazonaws.com/.../invoice_42.pdf",
    "number": "INV-2025-001234"
  }
}
```

---

## Champs détaillés

### Champ `event_type`
Type d'événement. **Pour l'instant uniquement :**
- `"order.created"` : Nouvelle commande créée

### Champ `event_id`
ID unique de l'événement Stripe (pour traçabilité).

### Champ `order_id`
ID unique de la commande dans notre système ComptAppart.

### Champ `timestamp`
Date/heure de l'événement au format **ISO 8601 avec timezone UTC**.

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
| `products` | array | Liste des produits achetés |
| `custom_fields` | array | Champs personnalisés saisis lors du checkout (ex : année de la déclaration) |

### Array `products[]`
Liste des produits de la commande.

| Champ | Type | Description |
|-------|------|-------------|
| `product_id` | string | ID du produit Stripe |
| `product_name` | string | Nom du produit |
| `quantity` | integer | Quantité achetée |
| `unit_price` | float | Prix unitaire HT |

### Array `custom_fields[]`
Liste des champs personnalisés que le client a remplis sur la page de paiement Stripe (ex : `Année de la déclaration`). Vide si aucun champ personnalisé n'est configuré sur le checkout.

| Champ | Type | Description |
|-------|------|-------------|
| `key` | string | Identifiant technique du champ (ex: `anneedeladeclaration`) |
| `label` | string | Libellé affiché au client (ex: `Année de la déclaration`) |
| `value` | string | Valeur saisie ou sélectionnée par le client (toujours sérialisée en string) |

### Objet `invoice`
Informations sur la facture générée.

| Champ | Type | Description |
|-------|------|-------------|
| `pdf_url` | string | URL publique de la facture PDF (valide 24h) |
| `number` | string | Numéro de facture unique |

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
    if (event_type !== 'order.created') {
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
        if event_type != 'order.created':
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
| **200-299** | Succès | Marque la notification comme complétée |
| **400-499** | Erreur client (ex: format invalide) | Pas de retry, marque comme échouée |
| **500-599** | Erreur serveur | **Retry automatique** (3 tentatives max) |
| **Timeout** | Pas de réponse en 10s | Retry automatique |

---

## Retry policy

En cas d'échec (5xx ou timeout), ComptAppart **retentera automatiquement** :
- 🔄 **Tentative 1** : Immédiate
- 🔄 **Tentative 2** : Après 5 minutes
- 🔄 **Tentative 3** : Après 30 minutes

Après 3 échecs, la notification est marquée comme **définitivement échouée** et vous devrez nous contacter pour investigation.

---

## Idempotence

Le même webhook peut être envoyé **plusieurs fois** en cas de retry. Vous devez gérer l'idempotence côté serveur :

```python
# Exemple : vérifier si la commande existe déjà
existing_order = Order.objects.filter(
    comptappart_order_id=order_id
).first()

if existing_order:
    # Commande déjà traitée, retourner succès sans rien faire
    return jsonify({'success': True, 'message': 'Already processed'}), 200
```
