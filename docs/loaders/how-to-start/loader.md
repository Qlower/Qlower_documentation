---
sidebar_position: 2
---

# Loader un fichier

Le fichier de **load** a pour rôle d'intégrer des données dans le système en respectant une structure précise. Il contient des informations relatives aux **déclarants**, aux **propriétés**, aux **associés**, et aux **transactions**. Désormais, il est également possible d'ajouter des **propriétés** en dehors d'un déclarant et de relier ces propriétés à des **déclarants** via un champ `declarantId`. De plus, chaque propriété peut être associée à un **tableau de documents**.

### 1. **Structure du fichier**

Le fichier se divise en plusieurs parties principales :

- **Header** : Contient les informations d'identification du fichier (ID, créateur, date de création, version).
- **Déclarants** : Contient les déclarants, avec la possibilité d'inclure des propriétés et des associés.
- **Transactions** : Ce modèle est le seul pouvant être mis à jour après création.
- **Documents** : Un tableau de documents lié à chaque propriété, contenant des fichiers associés.
- **Propriétés** : Propriétés pouvant être indépendantes des déclarants, mais reliées par un champ `declarantId`.

### 2. **Déclarants**

La section **déclarants** permet de décrire les individus ou les entités responsables des informations déclarées. Un **déclarant** peut contenir :

- Un tableau de **propriétés** détenues par ce déclarant.
- Un tableau d'**associés**, qui représentent des personnes physiques ou morales liées au déclarant.

Voir [Modèle Déclarant](/docs/loaders/how-to-start/models/declarants) pour plus d'informations.

### 3. **Propriétés**

Les **propriétés** peuvent être déclarées de deux manières :

1. **Dans le cadre d'un déclarant** : Si une propriété appartient directement à un déclarant, elle est incluse dans le tableau de propriétés au sein de la section du déclarant.
2. **Indépendamment d'un déclarant** : Une propriété peut également être déclarée de manière indépendante, en dehors de la section **déclarants**. Dans ce cas, un champ `declarantId` permet de faire le lien entre la propriété et son déclarant.

Chaque **propriété** contient des informations comme l'adresse, le type de bien, le statut de gestion, etc.

Voir [Modèle Propriété](/docs/loaders/how-to-start/models/properties) pour plus d'informations.

### 4. **Associés**

Les **associés** sont les personnes physiques ou morales liées à un déclarant (copropriétaires, actionnaires, représentants légaux). Ils sont définis directement sous la section du déclarant et incluent des informations telles que le nom, l'adresse, et les contacts.

Voir [Modèle Associé](/docs/loaders/how-to-start/models/associates) pour plus d'informations.

### 5. **Transactions**

Les **transactions** sont des mouvements financiers ou des opérations liées aux propriétés, telles que des paiements ou des factures. C’est la **seule section du fichier** pouvant être mise à jour après son chargement initial. Chaque transaction inclut des informations spécifiques à l'opération effectuée.

Voir [Modèle Transaction](/docs/loaders/how-to-start/models/transactions) pour plus d'informations.

### 6. **Documents**

Les **documents** sont des fichiers associés à des propriétés. Chaque document contient des informations sur le fichier (nom, type, année) et un lien vers le fichier en question. Les documents se positionnent au niveau de chaque propriété et permettent de joindre des pièces importantes, telles que des liasses fiscales ou des justificatifs.

Voir [Modèle Document](/docs/loaders/how-to-start/models/documents) pour plus d'informations.

### 7. **Règles importantes à respecter**

- **Les mises à jour** : Seules les **transactions** peuvent être mises à jour après le premier chargement. Les déclarants, propriétés, associés, et documents doivent être créés correctement lors de leur premier chargement, car ils ne peuvent pas être modifiés par la suite.
- **Propriétés hors déclarant** : Les propriétés peuvent être indépendantes des déclarants, mais elles doivent contenir un champ `declarantId` pour les relier à un déclarant. Une propriété ne peut pas exister sans ce lien.
- **Documents associés aux propriétés** : Un ou plusieurs documents peuvent être associés à chaque propriété. Ces documents permettent d’attacher des fichiers numériques relatifs à la gestion ou à la déclaration de la propriété.

### 8. **Exemple complet de fichier de load**

Voici un exemple complet illustrant la structure du fichier avec un déclarant, des propriétés, des associés, des transactions et des documents.

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
          "remove": "",
          "type": "A",
          "description": "Appartement au centre-ville",
          "furnished": "O",
          "managed": "A",
          "bldgNb": "45",
          "streetName": "Rue des Fleurs",
          "streetName2": "",
          "townName": "Marseille",
          "postCode": "13001",
          "ctry": "FR",
          "lastName": "Durand",
          "firstName": "Marie",
          "telNumber": "0601020304",
          "email": "mariedurand@example.com",
          "constructionDate": "2010-06-15",
          "acquisitionDate": "2022-01-20",
          "nbrRooms": 4,
          "area": 85.5,
          "terrArea": 10.0,
          "gardArea": 25.0,
          "nbrFloors": 3,
          "nbrPark": 1,
          "siretId": "12345678900011",
          "tvaOption": "20%",
          "netReevaluation": 350000.0,
          "debActDate": "2022-03-01",
          "taxRegime": "7",
          "workCompDate": "2022-02-15",
          "costPrice": 300000.0,
          "completionStatus": "NEW",
          "startConstrDate": "2009-09-01",
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
          "adress": "12 Rue de la République",
          "townName": "Lyon",
          "ctry": "FR",
          "email": "johndoe@example.com",
          "manager": "TRUE"
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

Le fichier de **load** permet d'importer des données structurées relatives aux déclarants, propriétés, associés, transactions, et documents. Les **transactions** peuvent être mises à jour, mais les autres éléments doivent être bien structurés lors de leur création initiale. La flexibilité du fichier permet de déclarer des **propriétés indépendantes** et de les relier à un déclarant via le champ `declarantId`, tout en associant des **documents** aux propriétés pour enrichir les informations disponibles.
