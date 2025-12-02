---
sidebar_position: 1
---

# Intégration

Cette section décrit comment intégrer les loaders Qlower dans votre système. Il existe deux méthodes pour charger vos données :

1. **[API REST](./api-rest)** : Envoi direct des données JSON via une requête HTTP POST (recommandé)
2. **[Upload S3](./api-s3)** : Transfert des données JSON vers un bucket AWS S3 (pour les batch)

## Vue d'ensemble

### Méthode 1 : API REST (Recommandée)

L'API REST permet d'envoyer directement vos données JSON via une requête HTTP POST. Cette méthode est idéale pour les intégrations en temps réel et offre une réponse immédiate sur le statut du traitement.

**Endpoints** :
- **Production** : `https://prod.api.qlower.com/api/third_party/loader`
- **Staging** : `https://stg.api.qlower.com/api/third_party/loader`

**Avantages** :
- Réponse immédiate avec détails sur le traitement
- Pas besoin de credentials AWS
- Intégration simple via HTTP
- Gestion d'erreurs en temps réel

### Méthode 2 : Upload S3

L'upload vers S3 est adapté pour les traitements par lots (batch) ou lorsque vous préférez déposer des volumes importants de données. Le système Qlower détecte automatiquement les nouveaux fichiers JSON uploadés et lance le traitement de manière asynchrone.

**Avantages** :
- Idéal pour les volumes importants de données
- Traitement asynchrone adapté aux batch
- Notifications par email automatiques

## Architecture de l'intégration

### Via API REST

```
Votre Système → Génération JSON → POST /loader → Traitement Qlower → Réponse immédiate
```

### Via Upload S3

```
Votre Système → Génération JSON → Upload S3 → Traitement Qlower → Notification email
```

## Comparaison des méthodes

| Critère | API REST | Upload S3 |
|---------|----------|-----------|
| **Temps réel** | ✅ Réponse immédiate | ❌ Traitement asynchrone |
| **Volume de données** | Limité par la taille de la requête HTTP | ✅ Volumes importants |
| **Traitement par lots** | Possible mais moins adapté | ✅ Idéal pour les batch |
| **Simplicité** | ✅ Plus simple (pas de config AWS) | Nécessite credentials AWS |
| **Rétroaction** | ✅ Détails immédiats sur succès/erreurs | Via email de notification |
| **Intégration** | ✅ Directe via HTTP | Nécessite SDK AWS |

### Quand utiliser chaque méthode ?

**Utilisez l'API REST si** :
- Vous avez besoin d'une réponse immédiate
- Vous envoyez des volumes modérés de données
- Vous préférez une intégration simple sans gestion AWS
- Vous voulez gérer les erreurs en temps réel

**Utilisez l'upload S3 si** :
- Vous traitez de très gros volumes de données
- Vous faites des traitements batch quotidiens/hebdomadaires
- Vous avez déjà une infrastructure AWS en place
- Vous préférez un traitement asynchrone avec notifications par email

## Préparation des données JSON

Quelle que soit la méthode choisie, vous devez préparer vos données au format JSON conforme aux loaders Qlower.

### Structure de base

Les données JSON doivent respecter la structure définie dans la section [Structure des données JSON](../loader). Elles doivent contenir au minimum :

- **En-tête** : Informations d'identification (voir [Structure des données JSON](../loader#2-en-tête))
- **Sections de données** : Déclarants, Propriétés, Transactions, Documents, Associés

### Exemple de structure minimale

```json
{
  "inigPtynm": "votre-partenaire-id",
  "apiKey": "votre-cle-api",
  "creDtTm": "2024-01-15T10:30:00+01:00",
  "versionId": "2.0",
  "declarants": [],
  "transactions": [],
  "properties": [],
  "documents": []
}
```

### Points importants

- Le champ `creDtTm` doit être au format ISO 8601 avec le fuseau horaire
- Le `versionId` doit être `"2.0"` pour les loaders 2.0
- Tous les champs obligatoires de l'en-tête doivent être présents
- Les tableaux peuvent être vides si aucune donnée n'est à transmettre

