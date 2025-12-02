---
sidebar_position: 2
---

# API REST

L'API REST permet d'envoyer directement vos données JSON via une requête HTTP POST. Cette méthode offre une réponse immédiate sur le statut du traitement.

## Endpoints

Les endpoints varient selon l'environnement :

- **Production** : `https://prod.api.qlower.com/api/third_party/loader`
- **Staging** : `https://stg.api.qlower.com/api/third_party/loader`

## Description

L'endpoint `/api/third_party/loader` accepte des données JSON conformes au format des loaders Qlower et lance immédiatement le traitement. La réponse indique le statut du traitement et, pour la version 2.0, fournit des détails sur les succès et erreurs.

## Headers

```
Content-Type: application/json
```

## Corps de la requête

Le corps de la requête doit contenir un objet JSON conforme au format des loaders (voir [Structure des données JSON](../loader)).

## Réponses

### Succès (200 OK)

**Version 2.0** - Format de réponse standard :

#### Statut SUCCESS

Toutes les données ont été traitées avec succès :

```json
{
  "status": "SUCCESS",
  "total_count": 2,
  "success_count": 2,
  "failed_count": 0,
  "end_date": "2025-12-02T09:45:10.630061",
  "errors": [],
  "combined_result": [
    {
      "model": "properties",
      "item": {
        "success": 1,
        "error": 0
      }
    },
    {
      "model": "transactions",
      "item": {
        "success": 1,
        "error": 0
      }
    }
  ]
}
```

#### Statut PARTIAL_SUCCESS

Certaines données ont été traitées avec succès, d'autres ont échoué :

```json
{
  "status": "PARTIAL_SUCCESS",
  "total_count": 2,
  "success_count": 1,
  "failed_count": 1,
  "end_date": "2025-12-02T09:46:28.526977",
  "errors": [
    {
      "model": "transactions",
      "type": "ValidationError",
      "error": "Champ 'amt' dans transactions 'qlower-loader-transaction-544' invalide : Field required",
      "created_at": "2025-12-02T10:46:28.480939Z",
      "id": "qlower-loader-transaction-544"
    }
  ],
  "combined_result": [
    {
      "model": "properties",
      "item": {
        "success": 1,
        "error": 0
      }
    },
    {
      "model": "transactions",
      "item": {
        "success": 0,
        "error": 1
      }
    }
  ]
}
```

**Statuts possibles** :
- `SUCCESS` : Toutes les données ont été traitées avec succès
- `PARTIAL_SUCCESS` : Certaines données ont été traitées avec succès, d'autres ont échoué
- `ERROR` : Toutes les données ont échoué

**Structure des erreurs** :
Chaque erreur dans le tableau `errors` contient :
- `model` : Le modèle concerné (ex: "transactions", "properties", "declarants")
- `type` : Le type d'erreur (ex: "ValidationError")
- `error` : Le message d'erreur détaillé
- `created_at` : Date de création de l'erreur (format ISO 8601)
- `id` : L'identifiant de l'élément en erreur

### Erreur (400 Bad Request)

```json
{
  "status": "KO",
  "type": "ValidationError",
  "message": "Données invalides",
  "errors": "Détails de l'erreur"
}
```

**Types d'erreurs possibles** :
- `ValidationError` : Les données ne respectent pas le schéma attendu
- `WrongFormat` : Le JSON est malformé
- `ValueError` : Données invalides fournies
- `KeyError` : Clé manquante dans les données

### Erreur serveur (500 Internal Server Error)

```json
{
  "status": "KO",
  "type": "InternalServerError",
  "message": "Erreur interne du serveur",
  "error": "Détails de l'erreur"
}
```

## Exemples d'implémentation

### JavaScript / Node.js

```bash
npm install axios
```

```javascript
const axios = require('axios');

const apiUrl = 'https://stg.api.qlower.com/api/third_party/loader'; // ou 'prod' pour production

const loaderData = {
  inigPtynm: 'qlower',
  apiKey: 'votre-cle-api',
  creDtTm: new Date().toISOString(),
  versionId: '2.0',
  declarants: [],
  properties: [],
  transactions: []
};

const response = await axios.post(apiUrl, loaderData, {
  headers: { 'Content-Type': 'application/json' }
});

console.log(response.data);
```

### Python

```bash
pip install requests
```

```python
import requests
from datetime import datetime

api_url = 'https://stg.api.qlower.com/api/third_party/loader'  # ou 'prod' pour production

loader_data = {
    'inigPtynm': 'qlower',
    'apiKey': 'votre-cle-api',
    'creDtTm': datetime.now().isoformat(),
    'versionId': '2.0',
    'declarants': [],
    'properties': [],
    'transactions': []
}

response = requests.post(api_url, json=loader_data)
result = response.json()

print(result)
```

