---
sidebar_position: 3
---

# Structure des données JSON

Le format JSON de **chargement (load)** intègre vos données dans Qlower : déclarants, propriétés, associés, transactions, documents. Cette page décrit la structure complète du JSON ; pour le détail champ par champ de chaque type, voir les [modèles de données](./models/declarants).

## Vue d'ensemble

Un JSON de chargement comprend :

| Section       | Clé JSON       | Contenu                                                                    |
| ------------- | -------------- | --------------------------------------------------------------------------- |
| En-tête       | *(racine)*     | Identification du partenaire et version du format                          |
| Déclarants    | `declarants`   | Personnes ou entités qui déclarent, avec leurs propriétés et associés       |
| Propriétés    | `properties`   | Biens immobiliers, imbriqués dans un déclarant ou liés via `declarantId`    |
| Associés      | `associates`   | Personnes ou entités liées à un déclarant (copropriétaires, actionnaires…)  |
| Transactions  | `transactions` | Mouvements financiers liés à une propriété                                  |
| Documents     | `documents`    | Fichiers liés à une propriété ou un déclarant                               |

Ces données se regroupent par client destinataire, dans un tableau **`clients`** : chaque entrée désigne un compte via un bloc `client`, puis porte les sections ci-dessus, propres à ce client — voir [Bloc `client`](#bloc-client).

```json
{
  "inigPtynm": "",
  "apiKey": "",
  "creDtTm": "",
  "versionId": "2.0",
  "clients": [
    {
      "client": {
        "email": "",
        "firstName": "",
        "lastName": ""
      },
      "declarants": [],
      "properties": [],
      "transactions": [],
      "documents": []
    }
  ]
}
```

## En-tête

L'en-tête identifie l'émetteur des données et le format utilisé. Il est obligatoire, à la racine du JSON.

| **Attributs**         | **Obligatoire** | **Description**                      | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                                        |
| --------------------- | :--------------: | ------------------------------------ | --------------------- | ------------ | -------------------------------------------------------------- |
| **Nom du Partenaire** |       [x]       | Id du partenaire attribué par Qlower |                       | `inigPtynm`  | Chaîne de caractères                                            |
| **Clé d'accès**       |       [x]       | Clé d'accès générée par notre équipe |                       | `apiKey`     | Chaîne de caractères                                            |
| **Date d'émission**   |       [x]       | Date d'émission du message           |                       | `creDtTm`    | ISO 8601 (en l'absence de fuseau horaire, fuseau Paris/France)  |
| **Version du loader** |       [x]       | Version du loader utilisée           |                       | `versionId`  | Chaîne de caractères (**'1.0'** / **'2.0'**)                    |

### Exemple

```json
{
  "inigPtynm": "qlower",
  "apiKey": "7Swvx0CZDKXLkeJ6iaOeH8Cb6TPdbHAL",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "versionId": "2.0"
}
```

## Bloc `client`

Chaque entrée de `clients` désigne un compte destinataire et porte son propre lot de données. Elle contient :

- Un bloc **`client`** qui identifie le compte cible par son email : l'identifiant unique qui permet de retrouver le même utilisateur aussi bien chez vous que chez Qlower.
- Les sections `declarants`, `properties`, `transactions`, `documents` habituelles, **propres à ce client**.

### Exemple

```json
{
  "inigPtynm": "",
  "apiKey": "",
  "creDtTm": "",
  "versionId": "2.0",
  "clients": [
    {
      "client": {
        "email": "jean.dupont@example.com",
        "firstName": "Jean",
        "lastName": "Dupont"
      },
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
  ]
}
```

### Champs du bloc `client`

| **Attributs** | **Obligatoire** | **Description**                                                                                                                       | **Valeur par défaut** | **Clé JSON**  | **Domaine de validité** |
| ------------- | :--------------: | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | -------------- | ------------------------ |
| **Email**     |       [x]        | Identifiant unique du client, partagé entre votre système et celui de Qlower : c'est ce qui permet de retrouver le même utilisateur des deux côtés. Un client déjà connu (même email) est réutilisé ; sinon un compte lui est créé. |                        | `email`        | Adresse email valide     |
| **Prénom**    |       [x]        | Prénom du client                                                                                                                       |                        | `firstName`    | Chaîne de caractères     |
| **Nom**       |       [x]        | Nom du client                                                                                                                          |                        | `lastName`     | Chaîne de caractères     |
| **Téléphone** |                  | Téléphone du client, utilisé uniquement à la création du compte                                                                        |                        | `phoneNumber`  | Chaîne de caractères     |

### Comportement

:::info[Une entrée = un client]
Une entrée de `clients` échoue **seule** si son bloc `client` est invalide ou que le compte ne peut pas être créé : les autres entrées du même envoi sont traitées normalement.
:::

## Déclarants

La section **déclarants** permet de décrire les individus ou les entités qui déclarent les informations dans le système. Un déclarant peut inclure :

- Un tableau de **propriétés** détenues par ce déclarant.
- Un tableau d'**associés** représentant des personnes physiques ou morales liées au déclarant (comme des copropriétaires ou actionnaires).

Voir [Modèle Déclarant](/docs/loaders/models/declarants) pour la liste complète des champs.

## Propriétés

Les **propriétés** sont des biens immobiliers ou actifs financiers qui peuvent être déclarés dans deux contextes :

1. **Dans le cadre d'un déclarant** : si une propriété appartient directement à un déclarant, elle est incluse dans la section `properties` de ce dernier.
2. **Indépendamment d'un déclarant** : une propriété peut être déclarée séparément, avec un champ `declarantId` facultatif pour établir un lien vers un déclarant spécifique.

Chaque **propriété** inclut des détails tels que l'adresse, le type de bien (appartement, maison, local commercial), la gestion (meublée ou non), la superficie, le nombre de pièces, la date d'acquisition, etc.

Voir [Modèle Propriété](/docs/loaders/models/properties) pour la liste complète des champs.

## Associés

Les **associés** sont les personnes physiques ou morales associées à un déclarant, comme des copropriétaires, des actionnaires, ou des représentants légaux. Cette section permet de lier des individus ou des entreprises à un déclarant, avec des informations spécifiques comme le nom, l'adresse, et les coordonnées.

Voir [Modèle Associé](/docs/loaders/models/associates) pour la liste complète des champs.

## Transactions

La section **transactions** est dédiée aux mouvements financiers et opérations relatives aux propriétés, telles que des paiements de loyer, des factures ou des charges. Chaque transaction doit inclure :

- Un identifiant unique de la transaction.
- La date d'exécution prévue ou réelle.
- L'identifiant de la propriété concernée.
- Le montant de la transaction, la devise, et la raison ou le motif (exemple : « Loyer mensuel »).

Cela permet de suivre les flux financiers associés à la gestion des propriétés déclarées.

Voir [Modèle Transaction](/docs/loaders/models/transactions) pour la liste complète des champs.

## Documents

Les **documents** sont des fichiers associés aux propriétés. Ils permettent d'attacher des justificatifs, tels que des liasses fiscales, des factures, ou des preuves d'acquisition. Chaque document comprend des informations comme :

- Le nom du fichier.
- Le type de fichier (ex : PDF, image, etc.).
- L'année de référence.
- Un lien vers le fichier hébergé.

### Deux façons de lier un document

1. **Dans le cadre d'une propriété** : le document est attaché à une propriété spécifique via la section `documents` de cette propriété.
2. **Indépendamment d'une propriété** : le document est déclaré dans la section principale `documents`, en utilisant `propertyId` ou `declarantId` pour le rattacher.

Voir [Modèle Document](/docs/loaders/models/documents) pour la liste complète des champs.

## Règles importantes à respecter

:::danger[Mise à jour]
**Aucune modification post-création** : tous les modèles doivent être correctement créés lors de leur première intégration. Il n'est pas possible de modifier un modèle après sa création initiale.
:::

:::info[Indépendance]
**Propriétés ou documents** : il est possible de lier des **documents** et des **propriétés** indépendamment. Assurez-vous de respecter la structure de lien entre les entités.
:::

## Exemple complet de données JSON

Exemple complet illustrant toutes les sections, avec un déclarant, ses propriétés, ses associés, une transaction et un document.

```json
{
  "inigPtynm": "tristan",
  "apiKey": "YcSk0ZAab6ahG7Kgimu138qFtV4DNKPB",
  "creDtTm": "2020-10-10",
  "versionId": "2.0",
  "clients": [
    {
      "client": {
        "email": "jean.dupont@example.com",
        "firstName": "Jean",
        "lastName": "Dupont"
      },
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
              "agencyFee": 5000.0,
              "notaryFee": 8000.0,
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
  ]
}
```

## Conclusion

Le format JSON de **chargement (load)** permet d'importer des données complexes concernant les déclarants, propriétés, associés, transactions, et documents. Il est crucial de bien structurer les données dès la première intégration.
