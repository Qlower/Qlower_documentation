---
sidebar_position: 1
---

# Démarrage

Bienvenue sur la **documentation du connecteur Qlower**. Elle vous accompagne dans l'échange de données entre votre système et la plateforme Qlower.

## Le connecteur

Le **connecteur 3.0** est le contrat d'échange entre Qlower et ses partenaires, qu'ils encaissent eux-mêmes leurs clients ou qu'ils nous en délèguent le paiement. Il fonctionne dans deux sens :

- **L'[entrée](./entree/structure.md)** : ce que vous nous envoyez. Vos clients, leurs déclarants, leurs biens, puis leurs transactions. Un envoi s'appelle un _load_.
- **Les [sorties](./sorties/presentation.md)** : ce que vous récupérez chez nous. Le lien de l'espace de chaque client, les paiements effectués, l'état à jour de vos clients.

## Entrée : deux méthodes d'envoi

1. **[API REST](./entree/integration/api-rest.md)** : envoi direct via HTTP (recommandé pour la plupart des cas)
2. **[Upload S3](./entree/integration/api-s3.md)** : dépôt de fichiers JSON sur un bucket AWS S3 (idéal pour les traitements par lots)

## Étapes pour commencer

### 1. Obtenir vos identifiants

Lors de la mise en place de votre partenariat, l'équipe Qlower vous fournit :

- **`inigPtynm`** : identifiant de votre partenaire
- **`apiKey`** : clé d'API. Elle authentifie vos loads, et vos appels aux sorties sous la forme `Authorization: Bearer <apiKey>`
- **Credentials AWS** (si vous utilisez l'upload S3) :
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

Pour être notifié des paiements effectués, vous nous transmettez en retour l'URL de votre endpoint : voir [Paiement effectué](./sorties/paiement/configuration.md).

### 2. Choisir votre méthode d'envoi

**Utilisez l'API REST si** :

- Vous avez besoin d'une réponse immédiate
- Vous envoyez des volumes modérés de données
- Vous préférez une intégration simple

**Utilisez l'upload S3 si** :

- Vous traitez de très gros volumes de données
- Vous faites des traitements batch quotidiens ou hebdomadaires
- Vous avez déjà une infrastructure AWS

### 3. Comprendre la structure d'un load

Avant d'envoyer vos données, familiarisez-vous avec :

- **[Structure des données JSON](./entree/structure.md)** : organisation d'un load et champs de l'en-tête
- **[Messages](./entree/models/client.md)** : le détail de chaque message, du client à la transaction

## Prochaines étapes

- 🔧 Consulter le guide [Intégration](./entree/integration/api.md) pour implémenter l'envoi de vos loads
- 📤 Parcourir les [sorties](./sorties/presentation.md) pour récupérer ce que nous vous restituons
- 🏗️ Comprendre l'[Architecture](./presentation.md) du connecteur

## Besoin d'aide ?

N'hésitez pas à nous contacter si vous avez des questions ou des suggestions.
