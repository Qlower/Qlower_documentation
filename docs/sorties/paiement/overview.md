---
sidebar_position: 1
sidebar_label: Vue d'ensemble
---

# Paiement effectué

Cette sortie concerne les partenaires qui nous délèguent l'encaissement de leurs clients. Nous encaissons les paiements de vos clients et vous notifions chaque commande. Vous n'avez ni
paiement, ni facturation, ni relance à gérer : vous recevez la commande une fois réglée, et vous
l'exploitez dans votre système.

## Ce que nous prenons en charge

- **Paiement** : checkout et abonnements Stripe
- **Facturation** : facture PDF conforme, générée et envoyée au client
- **Notification** : un webhook vers votre endpoint à chaque règlement
- **Consultation** : une route de lecture pour relire vos paiements à tout moment

## Ce qui vous revient

1. Nous communiquer vos URLs d'endpoint, staging et production
2. Implémenter cet endpoint
3. Traiter la commande reçue

## Le flux

```
   Client                Qlower                        Vous
     │                     │                            │
     │  1. paie ──────────▶│                            │
     │                     │  2. génère la facture      │
     │                     │     enregistre la commande │
     │  3. reçoit ◀────────│                            │
     │     la facture      │                            │
     │                     │  4. POST webhook ─────────▶│
     │                     │                            │  5. active
     │                     │◀───────── 2xx ─────────────│     le service
```

L'étape 4 vous transmet le client, le montant, les produits, la facture, et surtout les **biens et
exercices fiscaux** que le règlement couvre — c'est ce qui vous permet de savoir quoi activer, et pour
quelle année.

## Pour commencer

1. [Configuration](./configuration.md) : ce qu'on échange avant de démarrer
2. [Webhook](./webhook.md) : le contrat et l'implémentation de votre endpoint
3. [Lire les paiements](./route.md) : la route de lecture, pour vous resynchroniser
4. [Échecs et reprises](./errors.md) : ce qui se passe quand ça ne passe pas
