---
sidebar_position: 2
---

# Fichier caractéristiques

Les **caractéristiques** regroupent des informations détaillées sur les propriétés, leur fiscalité associée, ainsi que les éléments locatifs liés aux propriétés. Cela inclut des caractéristiques telles que :

- Les propriétés,
- Le déclarant,
- Le propriétaire

Un **partenaire B2B** peut avoir, dans son compte Qlower, plusieurs propriétés :

- Soit parce qu'il les gère (administrateur de bien, agences, notaires, gestionnaires de résidences gérées, mandataires, etc.),
- Soit parce qu'il offre une prestation de service aux propriétaires de ces biens (expert-comptable, CGPI, promoteurs, banques, etc.).

> **Note :**  
> Une même propriété peut être associée à plusieurs baux (d'où la présence d'une liste dans le modèle JSON). Ce cas se présente dans des situations comme une colocation formelle au sein d'une même propriété, ou encore lors du départ d'un locataire et de l'arrivée d'un autre.

De la même manière, un même bail peut être associé à un ou plusieurs locataires lorsque deux locataires sont contractuellement engagés à payer une part du loyer chacun. Ils sont alors **co-titulaires**.

### Représentation schématique

![Schema loader](/img/loader-characteristics.svg)

- **properties** : Représente l'élément central des caractéristiques. Il s'agit du bien immobilier concerné.
- **aggregations** : Ce sont les individus ou entités responsables de la déclaration des informations associées à la propriété. Chaque propriété peut être liée à 0 ou 1 aggregation.
- **aggregationAssociates** : Indique les individus ou entités propriétaires de l’aggregation déclarant. Chaque propriété peut être liée à un ou plusieurs propriétaires. Chaque associate doit être lié à 1 aggregation.

### Modèle propriété

| **Attributs**                     | **Obligatoire** | **Description**                                                   | **Valeur par défaut** | **Clé JSON**       | **Domaine de validité**                                                                |
| --------------------------------- | :-------------: | ----------------------------------------------------------------- | --------------------- | ------------------ | -------------------------------------------------------------------------------------- |
| **Description d’une propriété**   |       [x]       | Votre identifiant de la propriété                                 |                       | `id`               | Clé d'identification unique (chaîne de caractères)                                     |
| **Identifiant tiers**             |                 | Demande de suppression                                            |                       | `remove`           | ``, `R`                                                                                |
| **Type**                          |                 | Type de propriété                                                 |                       | `type`             | `A (appartement)`, `H (maison)`, `CL (commerce)`, `P (parking)`                        |
| **Description**                   |       [x]       | Nom complet de la propriété                                       |                       | `description`      | Chaîne de caractères représentant le dossier à traiter                                 |
| **Meublé**                        |                 | Le logement est-il meublé ?                                       | `N`                   | `furnished`        | `O`, `N`                                                                               |
| **Gestion**                       |                 | Mode de Gestion                                                   | `N`                   | `managed`          | `D (direct)`, `A (agence)`, `STRP (plateforme temporaire)`, `M (mandataire)`           |
| **Numéro**                        |       [x]       | Numéro dans la rue                                                |                       | `bldgNb`           | Chaîne de caractères                                                                   |
| **Rue**                           |       [x]       | Nom de la rue                                                     |                       | `streetName`       | Chaîne de caractères                                                                   |
| **Rue (partie 2)**                |       [x]       | Nom de la rue (deuxième partie)                                   |                       | `streetName2`      | Chaîne de caractères                                                                   |
| **Ville**                         |       [x]       | Nom de la ville                                                   |                       | `townName`         | Chaîne de caractères                                                                   |
| **Code Postale**                  |       [x]       | Code postal de la ville                                           |                       | `postCode`         | Chaîne de caractères                                                                   |
| **Pays**                          |       [x]       | Indicatif de pays                                                 | `FR`                  | `ctry`             | Code de pays `FR`                                                                      |
| **Nom**                           |       [x]       | Nom du propriétaire                                               |                       | `lastName`         | Chaîne de caractères                                                                   |
| **Prénom**                        |       [x]       | Prénom du propriétaire                                            |                       | `firstName`        | Chaîne de caractères                                                                   |
| **Numéro de téléphone**           |                 | Numéro de téléphone du propriétaire                               |                       | `telNumber`        | Numéro de téléphone                                                                    |
| **Email**                         |       [x]       | Email du propriétaire                                             |                       | `email`            | Chaîne de caractères                                                                   |
| **Date de construction**          |                 | Date de construction                                              | None                  | `constructionDate` | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Date d’acquisition**            |       [x]       | Date d’acquisition                                                |                       | `acquisitionDate`  | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Nombre de pièces**              |                 | Nombres de pièces du logement                                     |                       | `nbrRooms`         | Nombre entier                                                                          |
| **Surface**                       |                 | Surface du logement                                               | None                  | `area`             | Nombre décimal (exemple : `13.56`)                                                     |
| **Surface de la Terrasse**        |                 | Surface de la terrasse (si applicable)                            | None                  | `terrArea`         | Nombre décimal (exemple : `13.56`)                                                     |
| **Surface du Jardin**             |                 | Surface du jardin (si applicable)                                 | None                  | `gardArea`         | Nombre décimal (exemple : `13.56`)                                                     |
| **Etage**                         |                 | Etage du bien                                                     | None                  | `nbrFloors`        | Nombre entier                                                                          |
| **Parking**                       |                 | Nombre de places de parking                                       |                       | `nbrPark`          | Nombre entier                                                                          |
| **Siret**                         |       [x]       | Identifiant SIRET de la société (si applicable)                   | None                  | `siretId`          | Chaîne de caractères                                                                   |
| **TVA**                           |       [x]       | La propriété est-elle soumise à la TVA ?                          |                       | `tvaOption`        | `N`, `10%`, `20%`                                                                      |
| **Valeur actualisée**             |                 | Valeur actualisée du bien (si disponible)                         | 0                     | `netReevaluation`  | Nombre décimal (exemple : `13.56`)                                                     |
| **Date de début d’activité**      |                 | Date de début d'activité P0i                                      |                       | `debActDate`       | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Fiscalité**                     |       [x]       | Quel est le régime fiscal courant de ce bien                      | 7                     | `taxRegime`        | Identifiant de régime fiscal (cf annexe 1 pour la liste des régimes fiscaux)           |
| **DAT**                           |                 | Date d’achèvement des travaux (si disponible)                     |                       | `workCompDate`     | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Prix de revient**               |                 | Prix de revient (si disponible)                                   |                       | `costPrice`        | Nombre décimal (exemple : `13.56`)                                                     |
| **Neuf/vefa**                     |                 | Statut de completion à la date d'acquisition (neuf, vefa, ancien) |                       | `completionStatus` | `NEW` (neuf), `VEFA` (VEFA), `OLD` (ancien)                                            |
| **Dépôt de permis de construire** |                 | Date de dépôt du permis de construire (si disponible)             |                       | `startConstrDate`  | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |

### Modèle déclarant

| **Attributs**                  | **Obligatoire** | **Description**                                | **Valeur par défaut** | **Clé JSON**    | **Domaine de validité**                                                                |
| ------------------------------ | :-------------: | ---------------------------------------------- | --------------------- | --------------- | -------------------------------------------------------------------------------------- |
| **Description d’un déclarant** |       [x]       | Votre identifiant de déclarant                 |                       | `id`            | Clé d'identification unique (chaîne de caractères)                                     |
| **SIREN**                      |                 | Identifiant SIREN du déclarant (si applicable) |                       | `sirenId`       | Chaîne de caractères (9 caractères)                                                    |
| **NIC**                        |                 | NIC du déclarant (si applicable)               |                       | `nicId`         | Chaîne de caractères (5 caractères)                                                    |
| **Forme juridique**            |       [x]       | Forme juridique du déclarant (si applicable)   |                       | `legalStatusId` | Identifiant des statuts (annexe 2 pour la liste)                                       |
| **Imposition (IR/IS)**         |                 | Régime d’imposition des revenus                | None                  | `taxRegime`     | `IR` (appartement), `IS` (maison)                                                      |
| **Nom**                        |       [x]       | Raison sociale ou à défaut nom et prénom       |                       | `corporateName` | Chaîne de caractères                                                                   |
| **Date de création**           |                 | Date de création de l’activité locative        |                       | `debActDate`    | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Adresse**                    |       [x]       | Adresse de l’activité locative                 |                       | `address`       | Chaîne de caractères                                                                   |
| **Ville**                      |       [x]       | Ville de l’activité locative                   |                       | `townName`      | Chaîne de caractères                                                                   |
| **Code postal**                |       [x]       | Code postal de l’activité locative             |                       | `postCode`      | Chaîne de caractères                                                                   |
| **SIRET OGA**                  |                 | Siret de l’OGA                                 |                       | `ogaSiretId`    | Chaîne de caractères                                                                   |
| **Nom OGA**                    |                 | Nom de l’OGA                                   |                       | `ogaName`       | Chaîne de caractères                                                                   |
| **Agrément OGA**               |                 | Numéro d’agrément de l’OGA                     |                       | `ogaId`         | Chaîne de caractères                                                                   |
| **Numéro adhérent**            |                 | Numéro d’adhérent OGA du déclarant             |                       | `ogaNumber`     | Chaîne de caractères                                                                   |

### Modèle associé

| **Attributs**                | **Obligatoire** | **Description**                 | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                            |
| ---------------------------- | :-------------: | ------------------------------- | --------------------- | ------------ | -------------------------------------------------- |
| **Description d’un associé** |       [x]       | Votre identifiant de déclarant  |                       | `id`         | Clé d'identification unique (chaîne de caractères) |
| **Civilité (M/MME/société)** |       [x]       | Type de propriétaire            |                       | `civility`   | `M` (monsieur), `MME` (madame), `SOC` (société)    |
| **Prénom**                   |                 | Prénom du propriétaire          |                       | `firstName`  | Chaîne de caractères                               |
| **Nom**                      |                 | Nom du propriétaire             |                       | `lastName`   | Chaîne de caractères                               |
| **Adresse**                  |                 | Adresse du propriétaire         |                       | `adress`     | Chaîne de caractères                               |
| **Ville**                    |                 | Ville du propriétaire           |                       | `townName`   | Chaîne de caractères                               |
| **Pays**                     |                 | Pays du propriétaire            |                       | `ctry`       | Code de pays `FR`                                  |
| **Email**                    |       [x]       | Email du propriétaire           |                       | `email`      | Chaîne de caractères                               |
| **Gérant**                   |                 | Le propriétaire est le gérant ? | FALSE                 | `manager`    | `TRUE`, `FALSE`                                    |

---

## Exemple d'un load fractionné

Afin de vous aider à mieux comprendre le format attendu, détaillons ensemble les différentes parties qui composent ce fichier et comment l'intégration fonctionne à travers un exemple concret.

Le fichier est composé de deux parties principales :

- **header** comprenant les informations générales du fichier, cela permet d'identifier le partenaire et le type de fichier. **Obligatoire et présent dans tous les fichiers chargés.**
- **aggregations** : Représente un tableau de déclarants. Chaque déclarant est composé de propriétés et d'associés. C'est donc le haut de l'entonnoir et sera systématiquement présent dans le fichier.

  Chaque déclarant est composé de :

  - **properties** : un tableau d'objets représentant les propriétés. Chaque propriété est composée de caractéristiques spécifiques.
  - **aggregationAssociates** : un tableau d'objets représentant les associés. Chaque associé est composé de caractéristiques spécifiques.

### Création d'un déclarant

Dans ce premier exemple, nous illustrons la création d'un déclarant sans propriétés ni associés. Créons un premier fichier avec l'en-tête et le minimum requis pour créer un premier déclarant.

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId": "qlower",
  "inigPtyId": "0620000001",
  "inigPtynm": "qlower",
  "versionId": "2.0",
  "aggregations": [
    {
      "id": "123456789declarant",
      "legalStatusId": "SARL",
      "corporateName": "Qlower",
      "address": "22bis Rue Arthur Rimbaud",
      "townName": "Charleville",
      "postCode": "08109"
    }
  ]
}
```

À présent, nous avons créé un premier déclarant `123456789declarant`. Nous allons ensuite ajouter une propriété à ce déclarant. Pour cela, nous allons ajouter un objet `properties` à l'intérieur de l'objet `aggregations` tout en lui fournissant l'identifiant du déclarant précédemment créé.

> **Note :** `properties` étant un tableau, nous pouvons ajouter autant de propriétés que nécessaire.

### Création d'une propriété à travers un déclarant

Grâce à l'identifiant fourni obligatoirement, nous allons pouvoir créer une première propriété et la lier à notre déclarant.

:::tip[Mise à jour]
Le déclarant ayant déjà été créé au préalable dans l'exemple précédent, les champs présents au niveau du déclarant seront donc désormais des **UPDATE** du déclarant.

> **INFO :** Dans ce cas-ci, nous avons ajouté un champ **corporateName**, mettant à jour le nom de la société de `Qlower` à `Comptappart`.

:::

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId": "qlower",
  "inigPtyId": "0620000001",
  "inigPtynm": "qlower",
  "versionId": "2.0",
  "aggregations": [
    {
      "id": "123456789declarant",
      "corporateName": "Comptappart",
      "properties": [
        {
          "id": "123456789property",
          "type": "A",
          "description": "Appartement 1",
          "furnished": "N",
          "managed": "D",
          "bldgNb": "22",
          "streetName": "Rue Arthur Rimbaud",
          "streetName2": "Appartement 1",
          "townName": "Charleville",
          "postCode": "08109",
          "ctry": "FR",
          "lastName": "Dupont",
          "firstName": "Jean",
          "telNumber": "0601020304",
          "email": "jean@example.com"
        }
      ]
    }
  ]
}
```

Nous voici donc avec un déclarant ID `123456789declarant` possédant une propriété `123456789property` nommée `Appartement 1`. Nous avons fourni les informations minimales pour la création d'une propriété. Vous pouvez ajouter autant de champs et propriétés que nécessaire et ainsi les lier à votre déclarant.

### Création d'un associé à travers un déclarant

Pour ajouter un associé à notre déclarant, nous allons ajouter un objet `aggregationAssociates` à l'intérieur de l'objet `aggregations` de la même manière que pour les propriétés.

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId": "qlower",
  "inigPtyId": "0620000001",
  "inigPtynm": "qlower",
  "versionId": "2.0",
  "aggregations": [
    {
      "id": "123456789declarant",
      "aggregationAssociates": [
        {
          "id": "123456789associate",
          "civility": "M",
          "firstName": "Jean",
          "lastName": "Dupont",
          "adress": "22bis Rue Arthur Rimbaud",
          "townName": "Charleville",
          "ctry": "FR",
          "email": "jean@example.com"
        }
      ]
    }
  ]
}
```

Nous avons donc créé un associé `123456789associate` lié à notre déclarant `123456789declarant`. Vous pouvez ajouter autant d'associés que nécessaire et les lier à votre déclarant.

### Mise à jour d'une propriété

Pour mettre à jour une propriété, il suffit de fournir l'identifiant de la propriété à mettre à jour et de fournir les champs à mettre à jour.

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId": "qlower",
  "inigPtyId": "0620000001",
  "inigPtynm": "qlower",
  "versionId": "2.0",
  "aggregations": [
    {
      "id": "123456789declarant",
      "properties": [
        {
          "id": "123456789property",
          "description": "Appartement mis à jour"
        },
        {
          "id": "123456789property2",
          "description": "Nouvel appartement"
        }
      ]
    }
  ]
}
```

Enfin dans ce dernier exemple, nous avons mis à jour la description de la propriété `123456789property` et ajouté une nouvelle propriété `123456789property2`.

## Exemple d'un load complet

Ci-dessous, un exemple complet d'un fichier de caractéristiques avec un déclarant, une propriété et un associé.

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId": "qlower",
  "inigPtyId": "0620000001",
  "inigPtynm": "qlower",
  "versionId": "2.0",
  "aggregations": [
    {
      "id": "123456789declarant",
      "corporateName": "Comptappart",
      "properties": [
        {
          "id": "123456789property",
          "type": "A",
          "description": "Appartement 1",
          "furnished": "N",
          "managed": "D",
          "bldgNb": "22",
          "streetName": "Rue Arthur Rimbaud",
          "streetName2": "Appartement 1",
          "townName": "Charleville",
          "postCode": "08109",
          "ctry": "FR",
          "lastName": "Dupont",
          "firstName": "Jean",
          "telNumber": "0601020304",
          "email": "jean@qlower.com"
        },
      ],
      "aggregationAssociates": [
        {
          "id": "123456789associate",
          "civility": "M",
          "firstName": "Jean",
          "lastName": "Dupont",
          "adress": "22bis Rue Arthur Rimbaud",
          "townName": "Charleville",
          "ctry": "FR",
          "email": "
        }
      ]
    }
  ]
}
```

## Conclusion

Vous avez maintenant toutes les informations nécessaires pour créer un fichier de caractéristiques. Vous pouvez ajouter autant de déclarants, propriétés et associés que nécessaire. N'hésitez pas à consulter les modèles ci-dessus pour plus d'informations sur les champs disponibles.
