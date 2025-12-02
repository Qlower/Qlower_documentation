---
sidebar_position: 3
---

# Structure des données JSON

Le format JSON de **chargement (load)** a pour rôle d'intégrer des données dans le système tout en respectant une structure précise. Il permet d'importer des informations relatives aux **déclarants**, **propriétés**, **associés**, **transactions** et **documents**. Ce format est essentiel pour la gestion des données fiscales et administratives, en assurant la cohérence et l'intégrité des informations à travers plusieurs sections.

### 1. **Structure du JSON**

Le format JSON est divisé en plusieurs sections principales, chacune jouant un rôle spécifique :

- **En-tête** : Contient les informations d'identification, telles que le nom du partenaire, la date de création et la version du format.
- **Déclarants** : Comprend les déclarants, avec la possibilité d'y ajouter des propriétés et des associés.
- **Transactions** : Inclut les transactions financières liées aux propriétés.
- **Documents** : Regroupe les fichiers associés aux propriétés, comme des justificatifs ou documents fiscaux.
- **Propriétés** : Contient les informations sur les propriétés, qui peuvent être indépendantes des déclarants ou liées via le champ **declarantId**.

#### Exemple de structure JSON

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

### 2. **En-tête**

L'en-tête regroupe les informations générales et descriptives associées à chaque envoi de données JSON dans le système. Il représente un ensemble de métadonnées cruciales fournissant des informations de suivi et de gestion des échanges de données. Il permet d'identifier l'origine des données, l'instant de leur création, ainsi que des détails sur la partie émettrice. L'ajout du numéro de version garantit une gestion claire des différentes itérations des données dans le cadre des mises à jour ou corrections.

| **Attributs**         | **Obligatoire** | **Description**                      | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                                        |
| --------------------- | :-------------: | ------------------------------------ | --------------------- | ------------ | -------------------------------------------------------------- |
| **Nom du Partenaire** |       [x]       | Id du partenaire attribué par Qlower |                       | `inigPtynm`  | Chaîne de caractères                                           |
| **Clé d'accès**       |       [x]       | Clé d'accès générée par notre équipe |                       | `apiKey`     | Chaîne de caractères                                           |
| **Date d'émission**   |       [x]       | Date d'émission du message           |                       | `creDtTm`    | ISO 8601 (en l'absence de fuseau horaire, fuseau Paris/France) |
| **Version du loader** |       [x]       | Version du loader utilisée           |                       | `versionId`  | Chaîne de caractères (**'1.0'** / **'2.0'**)                   |

## Exemple d'en-tête

```json
{
  "inigPtynm": "qlower",
  "apiKey": "7Swvx0CZDKXLkeJ6iaOeH8Cb6TPdbHAL",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "versionId": "2.0"
}
```

### 3. **Déclarants**

La section **déclarants** permet de décrire les individus ou les entités qui déclarent les informations dans le système. Un déclarant peut inclure :

- Un tableau de **propriétés** détenues par ce déclarant.
- Un tableau d'**associés** représentant des personnes physiques ou morales liées au déclarant (comme des copropriétaires ou actionnaires).

Voir [Modèle Déclarant](/docs/loaders/models/declarants) pour plus d'informations.

### 4. **Propriétés**

Les **propriétés** sont des biens immobiliers ou actifs financiers qui peuvent être déclarés dans deux contextes :

1. **Dans le cadre d'un déclarant** : Si une propriété appartient directement à un déclarant, elle est incluse dans la section correspondante de ce dernier.
2. **Indépendamment d'un déclarant** : Une propriété peut être déclarée séparément en dehors de la section **déclarants**, avec un champ `declarantId` facultatif pour établir un lien entre la propriété et un déclarant spécifique.

Chaque **propriété** inclut des détails tels que l'adresse, le type de bien (appartement, maison, local commercial), la gestion (meublée ou non), ainsi que des informations relatives à sa superficie, nombre de pièces, date d'acquisition, et plus encore.

Voir [Modèle Propriété](/docs/loaders/models/properties) pour plus d'informations.

### 5. **Associés**

Les **associés** sont les personnes physiques ou morales associées à un déclarant, comme des copropriétaires, des actionnaires, ou des représentants légaux. Cette section permet de lier des individus ou des entreprises à un déclarant, avec des informations spécifiques comme le nom, l'adresse, et les coordonnées.

Voir [Modèle Associé](/docs/loaders/models/associates) pour plus d'informations.

### 6. **Transactions**

La section **transactions** est dédiée aux mouvements financiers et opérations relatives aux propriétés, telles que des paiements de loyer, des factures ou des charges. Chaque transaction doit inclure :

- Un identifiant unique de la transaction.
- La date d'exécution prévue ou réelle.
- L'identifiant de la propriété concernée.
- Le montant de la transaction, la devise, et la raison ou le motif (exemple : "Loyer mensuel").

Cela permet de suivre les flux financiers associés à la gestion des propriétés déclarées.

Voir [Modèle Transaction](/docs/loaders/models/transactions) pour plus d'informations.

### 7. **Documents**

Les **documents** sont des fichiers associés aux propriétés. Ils permettent d'attacher des justificatifs, tels que des liasses fiscales, des factures, ou des preuves d'acquisition. Chaque document comprend des informations comme :

- Le nom du fichier.
- Le type de fichier (ex : PDF, image, etc.).
- L'année de référence.
- Un lien vers le fichier hébergé.

Les documents peuvent être liés directement à une propriété ou déclarés indépendamment avec un lien via le champ `propertyId`.

#### Types de déclaration des documents :

1. **Dans le cadre d'une propriété** : Les documents sont attachés à une propriété spécifique via la section `documents` de cette propriété.
2. **Indépendamment d'une propriété** : Un document peut être déclaré indépendamment dans la section principale `documents`, en utilisant un `declarantId` pour lier ce document à une propriété ou un déclarant spécifique.

Voir [Modèle Document](/docs/loaders/models/documents) pour plus d'informations.

### 8. **Règles importantes à respecter**

:::danger[Mise à jour]

- **Aucune modification post-création** : Tous les modèles doivent être correctement créés lors de leur première intégration. Il n'est pas possible de modifier un modèle après sa création initiale.
  :::

  :::info[Indépendance]

- **Propriétés ou documents** : Il est possible de lier des **documents** et des **propriétés** indépendamment. Assurez-vous de respecter la structure de lien entre les entités.
  :::

### 9. **Exemple complet de données JSON**

Voici un exemple complet de données JSON illustrant les différentes sections, avec un déclarant, des propriétés, des associés, des transactions et des documents.

```json
{
  "inigPtynm": "tristan",
  "apiKey": "YcSk0ZAab6ahG7Kgimu138qFtV4DNKPB",
  "creDtTm": "2020-10-10",
  "versionId": "2.0",
  "declarants": [
    {
      "id": "DECL9876543211",
      "sirenId": "123456789",
      "nicId": "00012",
      "legalStatusId": "5426",
      "taxRegimeAggregation": "IS",
      "taxCategoryId": "3",
      "taxRegimeId": "3",
      "corporateName": "Mon Entreprise",
      "debActDate": "2020-05-01",
      "address": "123 Avenue des Champs",
      "townName": "Paris",
      "postCode": "75008",
      "ogaSiretId": "31517251000036",
      "ogaName": "OGI-France",
      "ogaId": "105350",
      "ogaNumber": "98079",
      "properties": [
        {
          "id": "exemple-propriete",
          "type": "A",
          "description": "Appartement 1",
          "furnished": "N",
          "managed": "D",
          "bldgNb": "123",
          "streetName": "rue Exemple",
          "streetName2": "Appartement 1",
          "townName": "Exempleville",
          "postCode": "12345",
          "ctry": "FR",
          "lastName": "Dupont",
          "firstName": "Jean",
          "telNumber": "0123456789",
          "email": "jean.dupont@example.com",
          "constructionDate": "2020-01-01",
          "acquisitionDate": "2020-01-01",
          "nbrRooms": 3,
          "area": 75.5,
          "terrArea": 10.0,
          "gardArea": 20.0,
          "nbrFloors": 2,
          "nbrPark": 1,
          "siretId": "12345678901234",
          "tvaOption": "N",
          "netReevaluation": 250000.0,
          "debActDate": "2020-01-01",
          "taxRegime": 5,
          "workCompDate": "2021-01-01",
          "costPrice": 200000.0,
          "completionStatus": "NEW",
          "startConstrDate": "1999-01-01",
          "dismemberedProperty": "N",
          "documents": [
            {
              "id": "9876543211234iddocuments",
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
          "id": "ASSOC12345678",
          "civility": "M",
          "firstName": "John",
          "lastName": "Doe",
          "address": "12 Rue de la République, Lyon, France",
          "townName": "Paris",
          "ctry": "FR",
          "email": "johndoe@example.com",
          "manager": "O"
        }
      ]
    }
  ],
  "transactions": [
    {
      "id": "TRANS114725836912",
      "reqdExctnDt": "2023-06-15",
      "id-prty": "exemple-propriete",
      "amt": 1500.0,
      "ccy": "EUR",
      "purpose": "Loyer",
      "ref": "PAIEMENT12345"
    }
  ]
}
```

### Conclusion

Le format JSON de **chargement (load)** permet d'importer des données complexes concernant les déclarants, propriétés, associés, transactions, et documents. Il est crucial de bien structurer les données dès la première intégration.
