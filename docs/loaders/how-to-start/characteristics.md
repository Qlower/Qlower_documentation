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

# Transaction

Les **transactions** regroupent des informations détaillées sur les transactions financières liées à la location de biens immobiliers.

### Attributs

| **Attributs**         | **Obligatoire** | **Description**                  | **Valeur par défaut**                             | **Clé JSON**  | **Domaine de validité**                                                |
| --------------------- | :-------------: | -------------------------------- | ------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| **Identifiant tiers** |       [x]       | Votre identifiant de transaction |                                                   | `id`          | Clé d'identification unique (chaîne de caractères)                     |
| **Date**              |       [x]       | Date de la transaction           | None                                              | `reqdExctnDt` | YYYY-MM-DD                                                             |
| **Propriété**         |       [x]       | Votre identifiant de propriété   |                                                   | `id-prty`     | Clé d'identification unique (chaîne de caractères)                     |
| **Montant**           |       [x]       | Montant signé TTC                | Montant négatif = débit, Montant positif = crédit | `amt`         | Nombre décimal avec partie décimale séparée par un “.” (ex. : “13.56”) |
| **Devise**            |                 | Devise normalisée                | "EUR"                                             | `ccy`         | EUR, USD, GBP, …                                                       |
| **Catégorie**         |                 | Votre code catégorie             |                                                   | `purpose`     | Votre liste de catégories                                              |
| **Référence**         |       [x]       | Description de la transaction    | None                                              | `ref`         | Chaîne de caractères                                                   |

# Document

Les **documents** regroupent des informations détaillées sur les fichiers associés aux propriétés immobilières.

### Attributs

| **Attributs**             | **Obligatoire** | **Description**                      | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                            |
| ------------------------- | :-------------: | ------------------------------------ | --------------------- | ------------ | -------------------------------------------------- |
| **Identifiant**           |       [x]       | Votre identifiant de document        |                       | `id`         | Clé d'identification unique (chaîne de caractères) |
| **Identifiant Propriété** |       [x]       | Identifiant de la propriété associée |                       | `propertyId` | Clé d'identification unique (chaîne de caractères) |
| **Nom du fichier**        |       [x]       | Nom du fichier                       |                       | `fileName`   | Chaîne de caractères                               |
| **Type de fichier**       |       [x]       | Type de fichier                      |                       | `fileType`   | Code numérique représentant le type de fichier     |
| **Année**                 |       [ ]       | Année du document                    |                       | `year`       | Année en format YYYY                               |
| **Lien du fichier**       |       [x]       | URL du fichier                       |                       | `fileLink`   | URL valide                                         |
