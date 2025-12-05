# Guide d'Intégration Partenaire - Stripe

---

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Flux de paiement](#flux-de-paiement)
3. [Configuration requise](#configuration-requise)
4. [Webhook : Notification de commande](#webhook-notification-de-commande)
5. [Email client : Facture PDF](#email-client-facture-pdf)
6. [Environnements](#environnements)
7. [Sécurité](#sécurité)
8. [Gestion des erreurs](#gestion-des-erreurs)
9. [Support](#support)

---

## Vue d'ensemble

Le système de paiement ComptAppart permet à vos clients d'acheter des produits/services via **Stripe**. Lorsqu'un paiement est effectué, notre système :

1. ✅ **Envoie automatiquement une facture PDF au client par email**
2. ✅ **Notifie votre système via webhook** avec les détails de la commande
3. ✅ **Gère les paiements one-time et les abonnements**

Vous n'avez **rien à développer côté paiement**, juste à :
- Configurer votre endpoint webhook
- Traiter les notifications de commande

---

## Flux de paiement

```
┌─────────────┐
│   Client    │
│  (acheteur) │
└──────┬──────┘
       │
       │ 1. Achète un produit
       ▼
┌─────────────────┐
│  Stripe Payment │
│   (checkout)    │
└──────┬──────────┘
       │
       │ 2. Webhook Stripe → ComptAppart
       ▼
┌──────────────────────────┐
│  ComptAppart Backend     │
│                          │
│  • Génère facture PDF    │
│  • Enregistre commande   │
└────┬─────────────────┬───┘
     │                 │
     │ 3a. Email       │ 3b. Webhook
     │                 │
     ▼                 ▼
┌─────────────┐   ┌──────────────┐
│   Client    │   │  Partenaire  │
│             │   │   (vous)     │
│ Reçoit PDF  │   │ Reçoit data  │
└─────────────┘   └──────────────┘
```

### Étapes détaillées

1. **Client effectue un paiement** sur Stripe (checkout ou abonnement)
2. **Stripe envoie un webhook** à ComptAppart (`checkout.session.completed` ou `invoice.payment_succeeded`)
3. **ComptAppart traite le paiement** :
   - Identifie le(s) partenaire(s) via la metadata du produit
   - Génère une **facture PDF personnalisée** avec votre branding
   - Crée une notification de commande
4. **Email automatique au client** :
   - Email avec facture PDF en pièce jointe
   - Template personnalisé avec votre logo et informations
5. **Webhook vers votre système** :
   - POST JSON avec tous les détails de la commande
   - Vous permet de déclencher vos process internes

---

## Configuration requise

### Informations à fournir

Pour activer l'intégration, vous devez nous communiquer :

| Information | Description | Exemple                                              |
|-------------|-------------|------------------------------------------------------|
| **Webhook URL (Staging)** | URL pour tests | `https://staging.partner.com/api/comptappart/orders` |
| **Webhook URL (Production)** | URL pour production | `https://api.partner.com/api/comptappart/orders`     |

## Webhook : Notification de commande

### Endpoint à implémenter

Vous devez créer un endpoint HTTP qui accepte des **POST requests** en JSON.

**Requis :**
- ✅ Accepte `Content-Type: application/json`
- ✅ Retourne un code **2xx** (200, 201, 204) en cas de succès
- ✅ Retourne un code **4xx ou 5xx** en cas d'erreur

### Format de la requête

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
    ]
  },

  "invoice": {
    "pdf_url": "https://s3.amazonaws.com/.../invoice_42.pdf",
    "number": "INV-2025-001234"
  }
}
```

### Champs détaillés

#### Champ `event_type`
Type d'événement. **Pour l'instant uniquement :**
- `"order.created"` : Nouvelle commande créée

#### Champ `event_id`
ID unique de l'événement Stripe (pour traçabilité).

#### Champ `order_id`
ID unique de la commande dans notre système ComptAppart.

#### Champ `timestamp`
Date/heure de l'événement au format **ISO 8601 avec timezone UTC**.

#### Objet `customer`
Informations du client ayant effectué le paiement.

| Champ | Type | Description | Nullable |
|-------|------|-------------|----------|
| `first_name` | string | Prénom du client | Oui |
| `last_name` | string | Nom du client | Oui |
| `email` | string | Email du client | Non |
| `phone` | string | Téléphone au format international | Oui |

**⚠️ Note :** `first_name` et `last_name` peuvent être vides si le client n'a pas fourni ces informations lors du paiement.

#### Objet `order`
Détails de la commande.

| Champ | Type | Description |
|-------|------|-------------|
| `total_amount` | float | Montant total payé (incluant TVA) |
| `currency` | string | Code devise ISO 4217 (ex: `"EUR"`) |
| `payment_date` | string | Date du paiement (ISO 8601) |
| `products` | array | Liste des produits achetés |

#### Array `products[]`
Liste des produits de la commande.

| Champ | Type | Description |
|-------|------|-------------|
| `product_id` | string | ID du produit Stripe |
| `product_name` | string | Nom du produit |
| `quantity` | integer | Quantité achetée |
| `unit_price` | float | Prix unitaire HT |

#### Objet `invoice`
Informations sur la facture générée.

| Champ | Type | Description |
|-------|------|-------------|
| `pdf_url` | string | URL publique de la facture PDF (valide 24h) |
| `number` | string | Numéro de facture unique |

### Exemple de payload complet

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
    ]
  },

  "invoice": {
    "pdf_url": "https://qlower-documents.s3.eu-west-3.amazonaws.com/partner_invoices/invoice_156_20251205_143218.pdf",
    "number": "FQCA-2025-000156"
  }
}
```

### Exemple d'implémentation (Node.js/Express)

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/comptappart/orders', async (req, res) => {
  try {
    const { event_type, order_id, customer, order, invoice } = req.body;

    // Vérifier l'API key (optionnel)
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.COMPTAPPART_API_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Vérifier le type d'événement
    if (event_type !== 'order.created') {
      return res.status(400).json({ error: 'Unknown event type' });
    }

    // Traiter la commande dans votre système
    console.log(`📦 Nouvelle commande #${order_id}`);
    console.log(`👤 Client: ${customer.email}`);
    console.log(`💰 Montant: ${order.total_amount} ${order.currency}`);
    console.log(`📄 Facture: ${invoice.pdf_url}`);

    // Sauvegarder dans votre base de données
    await saveOrderToDatabase({
      comptappart_order_id: order_id,
      customer_email: customer.email,
      customer_name: `${customer.first_name} ${customer.last_name}`.trim(),
      amount: order.total_amount,
      currency: order.currency,
      products: order.products,
      invoice_url: invoice.pdf_url,
      status: 'completed'
    });

    // Déclencher vos process métier
    await triggerYourBusinessLogic(order);

    // Répondre avec succès
    res.status(200).json({
      success: true,
      message: 'Order received'
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => console.log('Webhook endpoint ready'));
```

### Exemple d'implémentation (Python/Flask)

```python
from flask import Flask, request, jsonify
import os
import logging

app = Flask(__name__)
logger = logging.getLogger(__name__)

@app.route('/api/comptappart/orders', methods=['POST'])
def handle_comptappart_order():
    try:
        # Vérifier l'API key (optionnel)
        api_key = request.headers.get('X-API-KEY')
        if api_key != os.environ.get('COMPTAPPART_API_KEY'):
            return jsonify({'error': 'Unauthorized'}), 401

        # Parser le payload
        data = request.get_json()
        event_type = data.get('event_type')
        order_id = data.get('order_id')
        customer = data.get('customer', {})
        order = data.get('order', {})
        invoice = data.get('invoice', {})

        # Vérifier le type d'événement
        if event_type != 'order.created':
            return jsonify({'error': 'Unknown event type'}), 400

        # Logger l'événement
        logger.info(f"📦 Nouvelle commande #{order_id}")
        logger.info(f"👤 Client: {customer.get('email')}")
        logger.info(f"💰 Montant: {order.get('total_amount')} {order.get('currency')}")
        logger.info(f"📄 Facture: {invoice.get('pdf_url')}")

        # Sauvegarder dans votre base de données
        save_order_to_database(
            comptappart_order_id=order_id,
            customer_email=customer.get('email'),
            customer_name=f"{customer.get('first_name', '')} {customer.get('last_name', '')}".strip(),
            amount=order.get('total_amount'),
            currency=order.get('currency'),
            products=order.get('products', []),
            invoice_url=invoice.get('pdf_url'),
            status='completed'
        )

        # Déclencher vos process métier
        trigger_your_business_logic(order)

        # Répondre avec succès
        return jsonify({
            'success': True,
            'message': 'Order received'
        }), 200

    except Exception as e:
        logger.error(f"❌ Webhook error: {e}", exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(port=3000)
```

### Codes de réponse attendus

| Code | Description | Comportement ComptAppart |
|------|-------------|--------------------------|
| **200-299** | Succès | Marque la notification comme complétée |
| **400-499** | Erreur client (ex: format invalide) | Pas de retry, marque comme échouée |
| **500-599** | Erreur serveur | **Retry automatique** (3 tentatives max) |
| **Timeout** | Pas de réponse en 10s | Retry automatique |

### Retry policy

En cas d'échec (5xx ou timeout), ComptAppart **retentera automatiquement** :
- 🔄 **Tentative 1** : Immédiate
- 🔄 **Tentative 2** : Après 5 minutes
- 🔄 **Tentative 3** : Après 30 minutes

Après 3 échecs, la notification est marquée comme **définitivement échouée** et vous devrez nous contacter pour investigation.

---

## Email client : Facture PDF

### Envoi automatique

**Quand un paiement est effectué**, le client reçoit **automatiquement** un email contenant :

- ✅ **Facture PDF en pièce jointe** (générée par ComptAppart)
- ✅ Détails de la commande
- ✅ Vos informations de contact

### Contenu de la facture PDF

La facture générée contient :

**Header :**
- Service Fiscalité - ComptAppart
- Notre addresse

**Informations client :**
- Nom et prénom
- Email
- Adresse (si fournie)

**Détails de la commande :**
- Liste des produits avec quantité et prix unitaire
- Sous-total HT
- TVA (20%)
- Total TTC

**Footer :**
- Nos informations légales (SIREN, RCS, etc.)
- Email de contact
- Lien vers nos CGV

### Délai d'envoi

L'email est envoyé **immédiatement après confirmation du paiement** par Stripe (délai < 1 minute en général).

---

## Environnements

### Staging (Tests)

**URL webhook staging :** À configurer lors de l'intégration

**Caractéristiques :**
- ✅ Utilise Stripe Test Mode
- ✅ Aucun vrai paiement
- ✅ Webhook envoyé vers votre endpoint de staging
- ✅ Factures PDF générées mais marquées "TEST"

**Test avec Stripe :**
Utilisez une carte de test Stripe :
- Numéro : `4242 4242 4242 4242`
- Date : N'importe quelle date future
- CVC : N'importe quel code à 3 chiffres

### Production

**URL webhook production :** À configurer lors de l'intégration

**Caractéristiques :**
- ✅ Vrais paiements Stripe
- ✅ Webhook envoyé vers votre endpoint de production
- ✅ Factures PDF officielles

---

## Sécurité

### API Key (Optionnel)

Nous pouvons inclure une **API key** dans le header `X-API-KEY` pour sécuriser les webhooks.

**Pour activer :**
1. Générez une clé secrète forte (minimum 32 caractères)
2. Communiquez-la nous de manière sécurisée
3. Nous la configurerons dans notre système
4. Vérifiez-la dans votre endpoint

### HTTPS requis

⚠️ **Votre endpoint webhook DOIT utiliser HTTPS** (pas HTTP).

### Validation du payload

Nous recommandons de valider :
- ✅ Le header `Content-Type: application/json`
- ✅ L'API key si configurée
- ✅ La structure du JSON (présence des champs requis)
- ✅ Le type d'événement (`event_type`)

### Idempotence

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

---

## Gestion des erreurs

### Erreurs côté ComptAppart

Si notre système rencontre une erreur lors du traitement du paiement :
- ❌ Le webhook ne sera **pas envoyé**
- ❌ Le client ne recevra **pas d'email**
- 🔔 Nous serons **alertés automatiquement** (Sentry)

### Erreurs côté partenaire

Si votre webhook échoue (code 5xx ou timeout) :
- 🔄 **Retry automatique** (3 tentatives)
- 📊 Visible dans notre dashboard interne

### Logs et monitoring

Nous loggons tous les événements :
- ✅ Webhooks envoyés avec succès
- ❌ Webhooks échoués avec raison
- 🔄 Tentatives de retry

Vous pouvez demander l'accès aux logs de vos webhooks à tout moment.
