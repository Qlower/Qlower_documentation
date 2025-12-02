---
sidebar_position: 3
---

# Upload S3

L'upload vers S3 est adapté pour les traitements par lots (batch) ou lorsque vous préférez déposer des volumes importants de données. Le système Qlower détecte automatiquement les nouveaux fichiers JSON uploadés et lance le traitement de manière asynchrone.

## Configuration AWS

### Credentials AWS

Lors de la prise en charge de votre partenariat, l'équipe Qlower génère et vous fournit automatiquement :

- **AWS_ACCESS_KEY_ID** : Identifiant de clé d'accès AWS
- **AWS_SECRET_ACCESS_KEY** : Clé secrète d'accès AWS

Ces credentials sont spécifiques à votre partenaire et vous permettent d'uploader des fichiers JSON uniquement dans votre bucket dédié.

:::info[Important]
Les credentials AWS sont générés lors de la mise en place du partenariat. Si vous ne les avez pas reçus, contactez l'équipe Qlower.
:::

### Informations nécessaires

Pour effectuer l'upload, vous aurez besoin de :

- **Nom du bucket S3** : Format `ql-loader-{environnement}-{partnername}`
  - `prod` pour l'environnement de production
  - `stg` pour l'environnement de staging
  - Exemple : `ql-loader-prod-qlower` ou `ql-loader-stg-mypartner`
- **Clés d'accès AWS** : Access Key ID et Secret Access Key (fournies par l'équipe Qlower lors de la prise en charge)
- **Région AWS** : Région où se trouve le bucket (ex: `eu-west-1`)

## Préparation des données JSON

### Structure de base

Les données JSON doivent respecter la structure définie dans la section [Structure des données JSON](../../loader). Elles doivent contenir au minimum :

- **En-tête** : Informations d'identification (voir [Structure des données JSON](../../loader#2-en-tête))
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

## Implémentation

### JavaScript / Node.js

```bash
npm install @aws-sdk/client-s3
```

```javascript
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: 'eu-west-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const loaderData = {
  inigPtynm: 'qlower',
  apiKey: 'votre-cle-api',
  creDtTm: new Date().toISOString(),
  versionId: '2.0',
  declarants: [],
  properties: [],
  transactions: []
};

const bucketName = 'ql-loader-stg-qlower'; // ou 'prod' pour production
const fileName = `loader-${Date.now()}.json`;

await s3Client.send(new PutObjectCommand({
  Bucket: bucketName,
  Key: fileName,
  Body: JSON.stringify(loaderData),
  ContentType: 'application/json',
}));
```

### Python

```bash
pip install boto3
```

```python
import json
import os
import boto3
from datetime import datetime

s3_client = boto3.client(
    's3',
    region_name='eu-west-1',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
)

loader_data = {
    'inigPtynm': 'qlower',
    'apiKey': 'votre-cle-api',
    'creDtTm': datetime.now().isoformat(),
    'versionId': '2.0',
    'declarants': [],
    'properties': [],
    'transactions': []
}

bucket_name = 'ql-loader-stg-qlower'  # ou 'prod' pour production
file_name = f'loader-{int(datetime.now().timestamp() * 1000)}.json'

s3_client.put_object(
    Bucket=bucket_name,
    Key=file_name,
    Body=json.dumps(loader_data),
    ContentType='application/json'
)
```

## Notifications

Une fois le fichier JSON uploadé sur S3, le système Qlower détecte automatiquement le nouveau fichier, lance le traitement de manière asynchrone et envoie une notification par email avec les résultats du traitement.

