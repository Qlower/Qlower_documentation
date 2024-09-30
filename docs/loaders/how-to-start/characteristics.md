---
sidebar_position: 2
---

# Fichier caractéristiques

Les **caractéristiques** regroupent des informations détaillées sur les propriétés, leur fiscalité associée, ainsi que les éléments locatifs liés aux propriétés. Cela inclut des caractéristiques telles que :

- Les propriétés,
- Le déclarant,
- Le propriétaire,
- Le contrat de bail,
- Le locataire.

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
- **activeContract** : Ce module contient toutes les informations relatives aux contrats de location (baux) associés à la propriété. Chaque activeContract doit être lié à 1 propriété.
- **tenants** : Représente les locataires occupant les biens en vertu d'un contrat de location. Chaque tenant doit être lié à 1 activeContract.

### Modèle propriété

| **Attributs**                     | **Obligatoire** | **Description**                                                   | **Valeur par défaut** | **Clé JSON**       | **Iso**     | **Domaine de validité**                                                                |
| --------------------------------- | :-------------: | ----------------------------------------------------------------- | --------------------- | ------------------ | ----------- | -------------------------------------------------------------------------------------- |
| **Description d’une propriété**   |       [x]       | Votre identifiant de la propriété                                 |                       | `id`               |             | Clé d'identification unique (chaîne de caractères)                                     |
| **Identifiant tiers**             |                 | Demande de suppression                                            |                       | `remove`           |             | ``, `R`                                                                                |
| **Type**                          |                 | Type de propriété                                                 |                       | `type`             |             | `A (appartement)`, `H (maison)`, `CL (commerce)`, `P (parking)`                        |
| **Description**                   |       [x]       | Nom complet de la propriété                                       |                       | `description`      |             | Chaîne de caractères représentant le dossier à traiter                                 |
| **Meublé**                        |                 | Le logement est-il meublé ?                                       | `N`                   | `furnished`        |             | `O`, `N`                                                                               |
| **Gestion**                       |                 | Mode de Gestion                                                   | `N`                   | `managed`          |             | `D (direct)`, `A (agence)`, `STRP (plateforme temporaire)`, `M (mandataire)`           |
| **Numéro**                        |       [x]       | Numéro dans la rue                                                |                       | `bldgNb`           | 20022       | Chaîne de caractères                                                                   |
| **Rue**                           |       [x]       | Nom de la rue                                                     |                       | `streetName`       | 20022       | Chaîne de caractères                                                                   |
| **Rue (partie 2)**                |       [x]       | Nom de la rue (deuxième partie)                                   |                       | `streetName2`      | 20022       | Chaîne de caractères                                                                   |
| **Ville**                         |       [x]       | Nom de la ville                                                   |                       | `townName`         | 20022       | Chaîne de caractères                                                                   |
| **Code Postale**                  |       [x]       | Code postal de la ville                                           |                       | `postCode`         | 20022       | Chaîne de caractères                                                                   |
| **Pays**                          |       [x]       | Indicatif de pays                                                 | `FR`                  | `ctry`             | iso alpha 2 | Code de pays `FR`                                                                      |
| **Nom**                           |       [x]       | Nom du propriétaire                                               |                       | `lastName`         |             | Chaîne de caractères                                                                   |
| **Prénom**                        |       [x]       | Prénom du propriétaire                                            |                       | `firstName`        |             | Chaîne de caractères                                                                   |
| **Numéro de téléphone**           |                 | Numéro de téléphone du propriétaire                               |                       | `telNumber`        |             | Numéro de téléphone                                                                    |
| **Email**                         |       [x]       | Email du propriétaire                                             |                       | `email`            |             | Chaîne de caractères                                                                   |
| **Date de construction**          |                 | Date de construction                                              | None                  | `constructionDate` | ISO 8601    | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Date d’acquisition**            |       [x]       | Date d’acquisition                                                |                       | `acquisitionDate`  | ISO 8601    | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Nombre de pièces**              |                 | Nombres de pièces du logement                                     |                       | `nbrRooms`         |             | Nombre entier                                                                          |
| **Surface**                       |                 | Surface du logement                                               | None                  | `area`             |             | Nombre décimal (exemple : `13.56`)                                                     |
| **Surface de la Terrasse**        |                 | Surface de la terrasse (si applicable)                            | None                  | `terrArea`         |             | Nombre décimal (exemple : `13.56`)                                                     |
| **Surface du Jardin**             |                 | Surface du jardin (si applicable)                                 | None                  | `gardArea`         |             | Nombre décimal (exemple : `13.56`)                                                     |
| **Etage**                         |                 | Etage du bien                                                     | None                  | `nbrFloors`        |             | Nombre entier                                                                          |
| **Parking**                       |                 | Nombre de places de parking                                       |                       | `nbrPark`          |             | Nombre entier                                                                          |
| **Siret**                         |       [x]       | Identifiant SIRET de la société (si applicable)                   | None                  | `siretId`          |             | Chaîne de caractères                                                                   |
| **TVA**                           |       [x]       | La propriété est-elle soumise à la TVA ?                          |                       | `tvaOption`        |             | `N`, `10%`, `20%`                                                                      |
| **Valeur actualisée**             |                 | Valeur actualisée du bien (si disponible)                         | 0                     | `netReevaluation`  |             | Nombre décimal (exemple : `13.56`)                                                     |
| **Date de début d’activité**      |                 | Date de début d'activité P0i                                      |                       | `debActDate`       | ISO 8601    | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Fiscalité**                     |       [x]       | Quel est le régime fiscal courant de ce bien                      | 7                     | `taxRegime`        |             | Identifiant de régime fiscal (cf annexe 1 pour la liste des régimes fiscaux)           |
| **DAT**                           |                 | Date d’achèvement des travaux (si disponible)                     |                       | `workCompDate`     | ISO 8601    | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Prix de revient**               |                 | Prix de revient (si disponible)                                   |                       | `costPrice`        |             | Nombre décimal (exemple : `13.56`)                                                     |
| **Neuf/vefa**                     |                 | Statut de completion à la date d'acquisition (neuf, vefa, ancien) |                       | `completionStatus` |             | `NEW` (neuf), `VEFA` (VEFA), `OLD` (ancien)                                            |
| **Dépôt de permis de construire** |                 | Date de dépôt du permis de construire (si disponible)             |                       | `startConstrDate`  | ISO 8601    | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Id du déclarant**               |       [x]       | Déclarant associé                                                 |                       | `associateId`      |             | Clé d'identification unique (chaîne de caractères)                                     |
| **Contrats de bail**              |                 | Contrats de bail courants                                         | [ ]                   | `activeContract`   |             |                                                                                        |

### Modèle déclarant

| **Attributs**                  | **Obligatoire** | **Description**                                | **Valeur par défaut** | **Clé JSON**    | **Iso**  | **Domaine de validité**                                                                |
| ------------------------------ | :-------------: | ---------------------------------------------- | --------------------- | --------------- | -------- | -------------------------------------------------------------------------------------- |
| **Description d’un déclarant** |       [x]       | Votre identifiant de déclarant                 |                       | `id`            |          | Clé d'identification unique (chaîne de caractères)                                     |
| **SIREN**                      |                 | Identifiant SIREN du déclarant (si applicable) |                       | `sirenId`       |          | Chaîne de caractères (9 caractères)                                                    |
| **NIC**                        |                 | NIC du déclarant (si applicable)               |                       | `nicId`         |          | Chaîne de caractères (5 caractères)                                                    |
| **Forme juridique**            |       [x]       | Forme juridique du déclarant (si applicable)   |                       | `legalStatusId` |          | Identifiant des statuts (annexe 2 pour la liste)                                       |
| **Imposition (IR/IS)**         |                 | Régime d’imposition des revenus                | None                  | `taxRegime`     |          | `IR` (appartement), `IS` (maison)                                                      |
| **Nom**                        |       [x]       | Raison sociale ou à défaut nom et prénom       |                       | `corporateName` |          | Chaîne de caractères                                                                   |
| **Date de création**           |                 | Date de création de l’activité locative        |                       | `debActDate`    | ISO 8601 | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Adresse**                    |       [x]       | Adresse de l’activité locative                 |                       | `address`       |          | Chaîne de caractères                                                                   |
| **Ville**                      |       [x]       | Ville de l’activité locative                   |                       | `townName`      | 20022    | Chaîne de caractères                                                                   |
| **Code postal**                |       [x]       | Code postal de l’activité locative             |                       | `postCode`      | 20022    | Chaîne de caractères                                                                   |
| **SIRET OGA**                  |                 | Siret de l’OGA                                 |                       | `ogaSiretId`    |          | Chaîne de caractères                                                                   |
| **Nom OGA**                    |                 | Nom de l’OGA                                   |                       | `ogaName`       |          | Chaîne de caractères                                                                   |
| **Agrément OGA**               |                 | Numéro d’agrément de l’OGA                     |                       | `ogaId`         |          | Chaîne de caractères                                                                   |
| **Numéro adhérent**            |                 | Numéro d’adhérent OGA du déclarant             |                       | `ogaNumber`     |          | Chaîne de caractères                                                                   |

### Modèle Indivisaire

| **Attributs**                | **Obligatoire** | **Description**                 | **Valeur par défaut** | **Clé JSON** | **Iso**     | **Domaine de validité**                            |
| ---------------------------- | :-------------: | ------------------------------- | --------------------- | ------------ | ----------- | -------------------------------------------------- |
| **Description d’un associé** |       [x]       | Votre identifiant de déclarant  |                       | `id`         |             | Clé d'identification unique (chaîne de caractères) |
| **Civilité (M/MME/société)** |       [x]       | Type de propriétaire            |                       | `civility`   |             | `M` (monsieur), `MME` (madame), `SOC` (société)    |
| **Prénom**                   |                 | Prénom du propriétaire          |                       | `firstName`  |             | Chaîne de caractères                               |
| **Nom**                      |                 | Nom du propriétaire             |                       | `lastName`   |             | Chaîne de caractères                               |
| **Adresse**                  |                 | Adresse du propriétaire         |                       | `adress`     |             | Chaîne de caractères                               |
| **Ville**                    |                 | Ville du propriétaire           |                       | `townName`   |             | Chaîne de caractères                               |
| **Pays**                     |                 | Pays du propriétaire            |                       | `ctry`       | iso alpha 2 | Code de pays `FR`                                  |
| **Email**                    |       [x]       | Email du propriétaire           |                       | `email`      |             | Chaîne de caractères                               |
| **Gérant**                   |                 | Le propriétaire est le gérant ? | FALSE                 | `manager`    |             | `TRUE`, `FALSE`                                    |

### Modèle Contrat de bail

| **Attributs**                          | **Obligatoire** | **Description**                                            | **Valeur par défaut** | **Clé JSON**   | **Iso**  | **Domaine de validité**                                                                |
| -------------------------------------- | :-------------: | ---------------------------------------------------------- | --------------------- | -------------- | -------- | -------------------------------------------------------------------------------------- |
| **Identifiant tiers**                  |       [x]       | Votre identifiant du bail                                  |                       | `id`           |          | Clé d'identification unique (chaîne de caractères)                                     |
| **Périodicité**                        |                 | Périodicité du bail                                        | `M`                   | `periodicity`  |          | `M` (month), `Q` (quarter), `O` (other)                                                |
| **Caution**                            |                 | Montant du dépôt de garantie                               | None                  | `depAmt`       |          | Nombre décimal (exemple : `13.56`)                                                     |
| **Nature du bail**                     |                 | Régime du bail                                             | `V`                   | `rentType`     |          | `V` (vide), `M` (meublé), `T` (temporaire), `C` (commercial)                           |
| **Date de prise d’effet**              |                 | Date de prise d’effet du bail                              | None                  | `startDate`    | ISO 8601 | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Date de fin**                        |                 | Date de fin du bail                                        | None                  | `endDate`      | ISO 8601 | Chaîne de caractères (timezone France par défaut)                                      |
| **Date de dernière révision du loyer** |                 | Date de dernière révision du loyer du bail                 | None                  | `lastAdjuDate` | ISO 8601 | Chaîne de caractères (timezone France par défaut)                                      |
| **Nature des charges**                 |                 | Charges au forfait, provision ou absence de charges        | None                  | `natCharges`   |          | `P` (provision), `F` (forfait), ``                                                     |
| **Jour de paiement du loyer**          |                 | Jour dans le mois de paiement du loyer                     | None                  | `payRentDate`  |          | Nombre entier                                                                          |
| **Délai de première relance**          |                 | Nombre de jours avant la relance après le jour de paiement | None                  | `relDelay`     |          | Nombre entier                                                                          |
| **Indice de référence**                |                 | Indice pour l’actualisation des loyers                     | `IRL`                 | `indice`       |          | `IRL`, `ILC`, `ICC`, `ILAT`                                                            |
| **Locataire(s)** (non-implémenté)      |                 | Liste contenant la description du ou des locataires        | [ ]                   | `tenants`      |          | Liste d’objets JSON (cf section “Locataire”)                                           |

### Modèle Locataire

| **Attributs**           | **Obligatoire** | **Description**                                   | **Valeur par défaut** | **Clé JSON** | **Iso** | **Domaine de validité**                            |
| ----------------------- | :-------------: | ------------------------------------------------- | --------------------- | ------------ | ------- | -------------------------------------------------- |
| **Identifiant tiers**   |       [x]       | Votre identifiant du locataire                    |                       | `id`         |         | Clé d'identification unique (chaîne de caractères) |
| **Nom**                 |                 | Nom du locataire                                  | None                  | `lastName`   |         | Chaîne de caractères                               |
| **Prénom**              |                 | Prénom du locataire                               | None                  | `firstName`  |         | Chaîne de caractères                               |
| **Numéro de téléphone** |                 | Numéro de téléphone du locataire                  | None                  | `telNumber`  |         | Chaîne de caractères                               |
| **Email**               |                 | Email du locataire                                | None                  | `email`      |         | Chaîne de caractères                               |
| **Loyer**               |                 | Loyer payé par le locataire ou le cotitulaire     | None                  | `rentAmt`    |         | Nombre décimal (exemple : `"13.56"`)               |
| **Charges**             |                 | Charges payées par le locataire ou le cotitulaire | None                  | `chargesAmt` |         | Nombre décimal (exemple : `"13.56"`)               |

### Exemple

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId" : "qlower",
  "inigPtyId" : "0620000001",
  "inigPtynm" : "qlower",
  "versionId" : "2.0",
  "aggregations" :[
    {
      "id" : "9876543211234idaggregation",
      "remove" : "",
      "type" : "A",
      "description" : "Christophe Duprat - studio Paris - exemple sans aggregation"
      "properties" : [
        {
          "id" : "987654321property",
        }
      ],
      "aggregationAssociates" : [
        {
          "id" : "9876543211234idassocie",
        }
      ],
    }
  ]
 ,
  "properties" : [
    {
      "id" : "12345678azerty",
      "remove" : "",
      "type" : "A",
      "description" : "Christophe Duprat - studio Paris - exemple sans aggregation",
      "furnished" : "N",
      "managed" : "D",
      "bldgNb" : "22bis",
      "streetName" : "Rue Arthur Rimbaud",
      "streetName2" : "",
      "townName" : "Charleville",
      "postCode" : "08109",
      "ctry" : "FR",
      "lastName" : "Duprat",
            "firstName" : "Christophe",
      "telNumber" : "33188404199",
      "email" : "support@qlower.com",
      "constructionDate" : "1946-01-01T00:00:00+01:00",
      "acquisitionDate" : "1946-01-01T00:00:00+01:00",
      "nbrRooms" : 2,
      "area" : 37.51,
      "terrArea" : 9.44,
      "gardArea" : 0.5,
      "nbrFloors" : 1,
      "nbrPark" : 2,
      "siretId" : "88338675700016",
      "tvaOption" : "10%",
      "netReevaluation" : "120000",
      "debActDate" : "1946-01-01T00:00:00+01:00",
      "taxRegime" : 5,
      "activeContract" : [
        {
          "id" : "1232157azertyu",
          "periodicity" : "M",
          "depAmt" : 800,
          "rentType" : "V",
          "startDate" : "1920-01-01T00:00:00+01:00",
          "endDate" : "1921-01-01T00:00:00+01:00",
          "lastAdjuDate" : "1921-01-01T00:00:00+01:00",
          "natCharges" : "F",
          "payRentDate" : "2",
          "relDelay" : "3",
          "indice" : "IRL",
          "tenants" : [
            {
              "id" : "65465azertyuio",
              "lastName" : "Jean",
              "firstName" : "Dure",
              "telNumber" : "33635383773",
              "email" : "jean.dure@qlower.com",
              "rentAmt" : 400.00,
              "chargesAmt" : 20.00
            }
          ]
        }
      ]
    }
  ]
}
```
