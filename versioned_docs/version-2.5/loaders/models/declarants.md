---
sidebar_position: 1
---

# Déclarant

Le **déclarant** est la personne physique ou morale qui déclare les revenus fonciers issus de la location de biens immobiliers.

### Attributs

| **Attributs**                  | **Obligatoire** | **Description**                                | **Valeur par défaut** | **Clé JSON**           | **Domaine de validité**                                                                   |
| ------------------------------ | :-------------: | ---------------------------------------------- | --------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| **Description d’un déclarant** |       [x]       | Votre identifiant de déclarant                 |                       | `id`                   | Clé d'identification unique (chaîne de caractères)                                        |
| **SIREN**                      |                 | Identifiant SIREN du déclarant (si applicable) |                       | `sirenId`              | Chaîne de caractères (9 caractères)                                                       |
| **NIC**                        |                 | NIC du déclarant (si applicable)               |                       | `nicId`                | Chaîne de caractères (5 caractères)                                                       |
| **Forme juridique**            |       [x]       | Forme juridique du déclarant (si applicable)   |                       | `legalStatusId`        | Identifiant statut juridique ([annexe](/docs/loaders/annexes/statuts-juridiques))         |
| **Imposition (IR/IS)**         |                 | Régime d’imposition des revenus                | None                  | `taxRegimeAggregation` | `IR` (impôt sur le revenu), `IS` (impôt sur les sociétés)                                 |
| **Catégorie fiscale**          |                 | Catégorie fiscale                              | None                  | `taxCategoryId`        | Identifiant catégorie fiscale ([annexe](/docs/loaders/annexes/categories-fiscales))       |
| **Régime fiscal**              |                 | Régime fiscal                                  | None                  | `taxRegimeId`          | Identifiant régime fiscale ([annexe](/docs/loaders/annexes/regimes-fiscaux-aggreagation)) |
| **Nom**                        |       [x]       | Raison sociale ou, à défaut, nom et prénom     |                       | `corporateName`        | Chaîne de caractères                                                                      |
| **Date de création**           |                 | Date de création de l’activité locative        |                       | `debActDate`           | `YYYY-MM-DD`                                                                              |
| **Adresse**                    |       [x]       | Adresse de l’activité locative                 |                       | `address`              | Chaîne de caractères                                                                      |
| **Ville**                      |       [x]       | Ville de l’activité locative                   |                       | `townName`             | Chaîne de caractères                                                                      |
| **Code postal**                |       [x]       | Code postal de l’activité locative             |                       | `postCode`             | Chaîne de caractères                                                                      |
| **SIRET OGA**                  |                 | Siret de l’OGA (Organisme de Gestion Agréé)    |                       | `ogaSiretId`           | Chaîne de caractères                                                                      |
| **Nom OGA**                    |                 | Nom de l’OGA                                   |                       | `ogaName`              | Chaîne de caractères                                                                      |
| **Agrément OGA**               |                 | Numéro d’agrément de l’OGA                     |                       | `ogaId`                | Chaîne de caractères                                                                      |
| **Numéro adhérent**            |                 | Numéro d’adhérent OGA du déclarant             |                       | `ogaNumber`            | Chaîne de caractères                                                                      |
| **Propriétés**                 |                 | Liste des propriétés associées au déclarant    |                       | `properties`           | Tableau d'objets représentant les propriétés                                              |
| **Associés**                   |                 | Liste des associés du déclarant                |                       | `associates`           | Tableau d'objets représentant les associés                                                |

### JSON

```json
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
  "properties": [],
  "associates": []
}
```
