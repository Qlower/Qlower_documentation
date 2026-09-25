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

L'endpoint `/api/third_party/loader` accepte un load au format du connecteur et lance immédiatement le traitement. Son accusé de réception indique le statut du traitement, le détail des succès et des erreurs, et pour chaque client son lien d'accès (voir [Lien du Welcome Dashboard](../../sorties/welcome-dashboard.md)).

## Headers

```
Content-Type: application/json
```

## Corps de la requête

Le corps de la requête doit contenir un load conforme au format du connecteur (voir [Structure des données JSON](../structure.md)).

## Accusé de réception

La réponse à un load est son accusé de réception (A/R). Elle rend compte du traitement du load ; ce n'est pas une [sortie](../../sorties/presentation.md).

### Succès (200 OK)

Format de réponse :

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
  "clients": [
    {
      "id": "CLT-00042",
      "email": "jean.dupont@example.com",
      "status": "CREATED",
      "welcome_url": "https://secure.comptappart.com/declaration/..."
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
      "error": "Champ 'amt' dans transactions 'TRANS-2026-0544' invalide : Field required",
      "created_at": "2025-12-02T10:46:28.480939Z",
      "id": "TRANS-2026-0544"
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

**Structure des clients** :
Chaque entrée du tableau `clients` rend compte d'un client du load :

- `id` : votre identifiant du client
- `email` : son email
- `status` : `CREATED` si nous lui avons créé un compte, `EXISTING` s'il était déjà connu, `ERROR` si son entrée a échoué
- `welcome_url` : le lien d'accès à son espace, absent en cas d'erreur (voir [Lien du Welcome Dashboard](../../sorties/welcome-dashboard.md))

**Structure des erreurs** :
Chaque erreur dans le tableau `errors` contient :

- `model` : Le message concerné (ex: "transactions", "properties", "declarants")
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
const axios = require("axios");

const apiUrl = "https://stg.api.qlower.com/api/third_party/loader"; // ou 'prod' pour production

const load = {
  inigPtynm: "qlower",
  apiKey: "votre-cle-api",
  creDtTm: new Date().toISOString(),
  versionId: "3.0",
  clients: [
    {
      client: {
        id: "CLT-00042",
        email: "jean.dupont@example.com",
        firstName: "Jean",
        lastName: "Dupont",
      },
      declarants: [],
      properties: [],
      transactions: [],
    },
  ],
};

const response = await axios.post(apiUrl, load, {
  headers: { "Content-Type": "application/json" },
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

load = {
    'inigPtynm': 'qlower',
    'apiKey': 'votre-cle-api',
    'creDtTm': datetime.now().isoformat(),
    'versionId': '3.0',
    'clients': [
        {
            'client': {
                'id': 'CLT-00042',
                'email': 'jean.dupont@example.com',
                'firstName': 'Jean',
                'lastName': 'Dupont'
            },
            'declarants': [],
            'properties': [],
            'transactions': []
        }
    ]
}

response = requests.post(api_url, json=load)
result = response.json()

print(result)
```
