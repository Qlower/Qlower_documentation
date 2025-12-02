---
sidebar_position: 1
---

# Démarrage

Bienvenue sur la **documentation des Loaders Qlower**. Cette documentation vous accompagne dans l'intégration de vos données avec la plateforme Qlower.

## À propos des Loaders

Les **Loaders 2.0** sont des outils d'intégration qui permettent aux partenaires B2B d'alimenter la plateforme Qlower avec leurs données immobilières, fiscales et comptables de manière automatisée et sécurisée.

## Vue d'ensemble

Les loaders Qlower permettent d'intégrer vos données dans la plateforme via deux méthodes :

1. **[API REST](./integration/api-rest)** : Envoi direct via HTTP (recommandé pour la plupart des cas)
2. **[Upload S3](./integration/api-s3)** : Upload de données JSON vers un bucket AWS S3 (idéal pour les batch)

## Étapes pour commencer

### 1. Obtenir vos identifiants

Lors de la mise en place de votre partenariat, l'équipe Qlower vous fournit :

- **`inigPtynm`** : Identifiant de votre partenaire
- **`apiKey`** : Clé d'API pour authentifier vos requêtes
- **Credentials AWS** (si vous utilisez l'upload S3) :
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

### 2. Choisir votre méthode d'intégration

**Utilisez l'API REST si** :
- Vous avez besoin d'une réponse immédiate
- Vous envoyez des volumes modérés de données
- Vous préférez une intégration simple

**Utilisez l'upload S3 si** :
- Vous traitez de très gros volumes de données
- Vous faites des traitements batch quotidiens/hebdomadaires
- Vous avez déjà une infrastructure AWS

### 3. Comprendre la structure JSON

Avant d'envoyer vos données, familiarisez-vous avec :

- **[Structure des données JSON](./loader)** : Comment organiser vos données JSON et les champs de l'en-tête
- **[Modèles de données](./models/declarants)** : Documentation détaillée pour chaque type de données

## Prochaines étapes

- 🔧 Consulter le guide [Intégration](./integration/api) pour implémenter l'envoi de données
- 📋 Explorer les [Modèles de données](./models/declarants) pour structurer vos données
- 🏗️ Comprendre l'[Architecture](./presentation) si vous souhaitez en savoir plus sur le fonctionnement technique

## Besoin d'aide ?

N'hésitez pas à nous contacter si vous avez des questions ou des suggestions.

