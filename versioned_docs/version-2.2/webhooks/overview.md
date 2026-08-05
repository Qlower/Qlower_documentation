---
sidebar_position: 1
---

# Webhooks - Vue d'ensemble

Cette documentation vous guide dans l'intégration de notre système de paiement Stripe. L'intégration vous permet de recevoir automatiquement les notifications de commandes effectuées par vos clients.

## Ce que nous gérons pour vous

✅ **Paiement Stripe** - Infrastructure complète de paiement (checkout, abonnements)
✅ **Facturation automatique** - Génération et envoi de factures PDF aux clients
✅ **Webhooks** - Notifications de commandes vers votre système

## Ce que vous devez faire

1. Fournir vos URLs webhook (staging et production)
2. Implémenter un endpoint pour recevoir les notifications
3. Traiter les commandes dans votre système

---

## Comment ça fonctionne

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

### Étapes du processus

1. **Paiement client** → Le client effectue un achat via Stripe
2. **Traitement ComptAppart** → Nous recevons la notification de Stripe, générons la facture PDF et l'envoyons au client
3. **Notification partenaire** → Votre système reçoit un webhook avec les détails de la commande (order_id, customer, montant, etc.)
4. **Traitement métier** → Vous activez le service/produit acheté dans votre système

---

## Prochaines étapes

1. 📋 [Configuration](./configuration.md) - Fournissez vos URLs webhook
2. 🔗 [Webhook](./webhook.md) - Implémentez votre endpoint
3. 🧪 [Test en staging](./configuration.md#staging-tests) - Testez avec une carte Stripe test
4. 🚀 Mise en production
