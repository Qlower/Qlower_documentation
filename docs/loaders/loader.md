---
sidebar_position: 3
---

# Charger un fichier

### Introduction

Le fichier de **chargement (load)** a pour rôle d'intégrer des données dans le système tout en respectant une structure précise. Il permet d'importer des informations relatives aux **déclarants**, **propriétés**, **associés**, **transactions** et **documents**. Ce fichier est essentiel pour la gestion des données fiscales et administratives, en assurant la cohérence et l'intégrité des informations à travers plusieurs sections.

### 1. **Structure du fichier**

Le fichier est divisé en plusieurs sections principales, chacune jouant un rôle spécifique :

- **En-tête** : Contient les informations d'identification du fichier, telles que le nom du partenaire, la date de création et la version du fichier.
- **Déclarants** : Comprend les déclarants, avec la possibilité d'y ajouter des propriétés et des associés.
- **Transactions** : Inclut les transactions financières liées aux propriétés.
- **Documents** : Regroupe les fichiers associés aux propriétés, comme des justificatifs ou documents fiscaux.
- **Propriétés** : Contient les informations sur les propriétés, qui peuvent être indépendantes des déclarants ou liées via le champ **declarantId**.

#### Exemple de structure du fichier JSON

```json
{
  "inigPtynm": "",
  "apiKey": "",
  "creDtTm": "",
  "versionId": "",
  "declarants": [
    {
      "properties": [
        {
          "documents": []
        }
      ],
      "associates": []
    }
  ],
  "transactions": [],
  "properties": []
}
```

### 2. **Déclarants**

La section **déclarants** permet de décrire les individus ou les entités qui déclarent les informations dans le système. Un déclarant peut inclure :

- Un tableau de **propriétés** détenues par ce déclarant.
- Un tableau d'**associés** représentant des personnes physiques ou morales liées au déclarant (comme des copropriétaires ou actionnaires).

Chaque déclarant est identifié par un identifiant unique et peut inclure des informations légales, fiscales, et géographiques.

Voir [Modèle Déclarant](/docs/loaders/models/declarants) pour plus d'informations.

### 3. **Propriétés**

Les **propriétés** sont des biens immobiliers ou actifs financiers qui peuvent être déclarés dans deux contextes :

1. **Dans le cadre d'un déclarant** : Si une propriété appartient directement à un déclarant, elle est incluse dans la section correspondante de ce dernier.
2. **Indépendamment d'un déclarant** : Une propriété peut être déclarée séparément en dehors de la section **déclarants**, avec un champ `declarantId` facultatif pour établir un lien entre la propriété et un déclarant spécifique.

Chaque **propriété** inclut des détails tels que l'adresse, le type de bien (appartement, maison, local commercial), la gestion (meublée ou non), ainsi que des informations relatives à sa superficie, nombre de pièces, date d'acquisition, et plus encore.

Voir [Modèle Propriété](/docs/loaders/models/properties) pour plus d'informations.

### 4. **Associés**

Les **associés** sont les personnes physiques ou morales associées à un déclarant, comme des copropriétaires, des actionnaires, ou des représentants légaux. Cette section permet de lier des individus ou des entreprises à un déclarant, avec des informations spécifiques comme le nom, l'adresse, et les coordonnées.

Les associés peuvent également inclure des rôles spécifiques comme celui de gestionnaire.

Voir [Modèle Associé](/docs/loaders/how-to-start/models/associates) pour plus d'informations.

### 5. **Transactions**

La section **transactions** est dédiée aux mouvements financiers et opérations relatives aux propriétés, telles que des paiements de loyer, des factures ou des charges. Chaque transaction doit inclure :

- Un identifiant unique de la transaction.
- La date d'exécution prévue ou réelle.
- L'identifiant de la propriété concernée.
- Le montant de la transaction, la devise, et la raison ou le motif (exemple : "Loyer mensuel").

Cela permet de suivre les flux financiers associés à la gestion des propriétés déclarées.

Voir [Modèle Transaction](/docs/loaders/how-to-start/models/transactions) pour plus d'informations.

### 6. **Documents**

Les **documents** sont des fichiers associés aux propriétés. Ils permettent d'attacher des justificatifs, tels que des liasses fiscales, des factures, ou des preuves d'acquisition. Chaque document comprend des informations comme :

- Le nom du fichier.
- Le type de fichier (ex : PDF, image, etc.).
- L'année de référence.
- Un lien vers le fichier hébergé.

Les documents peuvent être liés directement à une propriété ou déclarés indépendamment avec un lien via le champ `propertyId`.

#### Types de déclaration des documents :

1. **Dans le cadre d'une propriété** : Les documents sont attachés à une propriété spécifique via la section `documents` de cette propriété.
2. **Indépendamment d'une propriété** : Un document peut être déclaré indépendamment dans la section principale `documents`, en utilisant un `declarantId` pour lier ce document à une propriété ou un déclarant spécifique.

Voir [Modèle Document](/docs/loaders/how-to-start/models/documents) pour plus d'informations.

### 7. **Règles importantes à respecter**

:::danger[Mise à jour]

- **Aucune modification post-création** : Tous les modèles doivent être correctement créés lors de leur première intégration. Il n'est pas possible de modifier un modèle après sa création initiale.
  :::

  :::info[Indépendance]

- **Propriétés ou documents** : Il est possible de lier des **documents** et des **propriétés** indépendamment ou directement à un déclarant. Assurez-vous de respecter la structure de lien entre les entités.
  :::

### 8. **Exemple complet de fichier de chargement**

Voici un exemple complet de fichier illustrant les différentes sections, avec un déclarant, des propriétés, des associés, des transactions et des documents.

```json
{
  "inigPtynm": "qlower",
  "apiKey": "7Swvx0CZDKXLkeJ6iaOeH8Cb6TPdbHAL",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "versionId": "2.0",
  "declarants": [
    {
      "id": "DECL123456789",
      "sirenId": "123456789",
      "nicId": "00012",
      "legalStatusId": "SARL",
      "taxRegime": "IS",
      "corporateName": "Mon Entreprise",
      "debActDate": "2020-05-01",
      "address": "123 Avenue des Champs",
      "townName": "Paris",
      "postCode": "75008",
      "ogaSiretId": "12345678900012",
      "ogaName": "OGA Expert",
      "ogaId": "OGA123456",
      "ogaNumber": "ADH20200456",
      "properties": [
        {
          "id": "PROP12345678AZERTY",
          "type": "A",
          "description": "Appartement au centre-ville",
          "furnished": "O",
          "managed": "A",
          "address": "45 Rue des Fleurs, Marseille, 13001, France",
          "constructionDate": "2010-06-15",
          "acquisitionDate": "2022-01-20",
          "nbrRooms": 4,
          "area": 85.5,
          "documents": [
            {
              "id": "9876543211234iddocument",
              "propertyId": "PROP12345678AZERTY",
              "fileName": "Liasse 2022 Appartement XXX",
              "fileType": "26",
              "year": "2022",
              "fileLink": "https://liasse20220601a.pdf"
            }
          ]
        }
      ],
      "associates": [
        {
          "id": "ASSOC123456",
          "civility": "M",
          "firstName": "John",
          "lastName": "Doe",
          "adress": "12 Rue de la République, Lyon, France",
          "email": "johndoe@example.com",
          "manager": true
        }
      ]
    }
  ],
  "transactions": [
    {
      "id": "TRANS123456789",
      "reqdExctnDt": "2023-06-15",
      "id-prty": "PROP12345678AZERTY",
      "amt": 1500.0,
      "ccy": "EUR",
      "purpose": "Loyer mensuel",
      "ref": "PAIEMENT12345"
    }
  ]
}
```

### Conclusion

Le fichier de **chargement (load)** permet d'importer des données complexes concernant les déclarants, propriétés, associés, transactions, et documents. Il est crucial de bien structurer les données dès la première
