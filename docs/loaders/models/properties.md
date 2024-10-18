---
sidebar_position: 3
---

# Propriété

Les **propriétés** regroupent des informations détaillées sur les biens immobiliers, leur fiscalité associée, ainsi que les éléments locatifs liés aux propriétés.

### Attributs

| **Attributs**                     | **Obligatoire** | **Description**                                                   | **Valeur par défaut** | **Clé JSON**       | **Domaine de validité**                                                                |
| --------------------------------- | :-------------: | ----------------------------------------------------------------- | --------------------- | ------------------ | -------------------------------------------------------------------------------------- |
| **Description d’une propriété**   |       [x]       | Votre identifiant de la propriété                                 |                       | `id`               | Clé d'identification unique (chaîne de caractères)                                     |
| **Identifiant du déclarant**      |                 | Identifiant du déclarant associé à la propriété                   |                       | `declarantId`      | Chaîne de caractères                                                                   |
| **Identifiant tiers**             |                 | Demande de suppression                                            |                       | `remove`           | ``, `R`                                                                                |
| **Type**                          |                 | Type de propriété                                                 |                       | `type`             | `A (appartement)`, `H (maison)`, `CL (commerce)`, `P (parking)`                        |
| **Description**                   |       [x]       | Nom complet de la propriété                                       |                       | `description`      | Chaîne de caractères représentant le dossier à traiter                                 |
| **Meublé**                        |                 | Le logement est-il meublé ?                                       | `N`                   | `furnished`        | `O`, `N`                                                                               |
| **Gestion**                       |                 | Mode de Gestion                                                   | `N`                   | `managed`          | `D (direct)`, `A (agence)`, `STRP (plateforme courte durée)`, `M (mandataire)`           |
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
| **Siret**                         |                 | Identifiant SIRET de la société (si applicable)                   | None                  | `siretId`          | Chaîne de caractères                                                                   |
| **TVA**                           |       [x]       | La propriété est-elle soumise à la TVA ?                          |                       | `tvaOption`        | `N`, `10`, `20`                                                                        |
| **Valeur actualisée**             |                 | Valeur actualisée du bien (si disponible)                         | 0                     | `netReevaluation`  | Nombre décimal (exemple : `13.56`)                                                     |
| **Date de début d’activité**      |                 | Date de début d'activité P0i                                      |                       | `debActDate`       | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Fiscalité**                     |       [x]       | Quel est le régime fiscal courant de ce bien                      | 7                     | `taxRegime`        | Identifiant de régime fiscal ([annexe](/docs/loaders/annexes/regimes-fiscaux))           |
| **DAT**                           |                 | Date d’achèvement des travaux (si disponible)                     |                       | `workCompDate`     | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Prix de revient**               |                 | Prix de revient (si disponible)                                   |                       | `costPrice`        | Nombre décimal (exemple : `13.56`)                                                     |
| **Neuf/vefa**                     |                 | Statut de completion à la date d'acquisition (neuf, vefa, ancien) |                       | `completionStatus` | `NEW` (neuf), `VEFA` (VEFA), `OLD` (ancien)                                            |
| **Dépôt de permis de construire** |                 | Date de dépôt du permis de construire (si disponible)             |                       | `startConstrDate`  | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Documents**                     |                 | Liste des documents associés à la propriété                       |                       | `documents`        | Tableau d'objets représentant les documents associés à la propriété                    |
| **Propriété démembrée** |               | La propriété est-elle démembrée ?                   |`FALSE`      |`dismemberedProperty` | `TRUE`, `FALSE`

### JSON

```json
{
  "id": "exemple-propriété",
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
  "constructionDate": "2000-01-01",
  "acquisitionDate": "2020-01-01",
  "nbrRooms": 3,
  "area": 75.5,
  "terrArea": 10.0,
  "gardArea": 20.0,
  "nbrFloors": 2,
  "nbrPark": 1,
  "siretId": "12345678901234",
  "tvaOption": "20%",
  "netReevaluation": 250000.0,
  "debActDate": "2020-01-01",
  "taxRegime": 7,
  "workCompDate": "2021-01-01",
  "costPrice": 200000.0,
  "completionStatus": "NEW",
  "startConstrDate": "1999-01-01",
  "dismemberedProperty": false,
  "documents": []
}
```
