---
sidebar_position: 1
---

# Déclarant

Le **déclarant** est la personne physique ou morale qui déclare les revenus fonciers issus de la location de biens immobiliers.

### Attributs

| **Attributs**                  | **Obligatoire** | **Description**                                | **Valeur par défaut** | **Clé JSON**           | **Domaine de validité**                                                         |
| ------------------------------ | :-------------: | ---------------------------------------------- | --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| **Description d’un déclarant** |       [x]       | Votre identifiant de déclarant                 |                       | `id`                   | Clé d'identification unique (chaîne de caractères)                              |
| **SIREN**                      |                 | Identifiant SIREN du déclarant (si applicable) |                       | `sirenId`              | Chaîne de caractères (9 caractères)                                             |
| **NIC**                        |                 | NIC du déclarant (si applicable)               |                       | `nicId`                | Chaîne de caractères (5 caractères)                                             |
| **Forme juridique**            |       [x]       | Forme juridique du déclarant (si applicable)   |                       | `legalStatusId`        | Identifiant des statuts ([annexe](/docs/loaders/annexes/statuts-juridiques))    |
| **Imposition (IR/IS)**         |                 | Régime d’imposition des revenus                | None                  | `taxRegimeAggregation` | `IR` (impôt sur le revenu), `IS` (impôt sur les sociétés)                       |
| **Catégorie fiscale**          |                 | Catégorie fiscale                              | None                  | `taxCategoryId`        | Identifiant des statuts ([annexe](/docs/loaders/annexes/categories-fiscales))   |
| **Régime fiscal**              |                 | Régime fiscale                                 | None                  | `taxRegimeId`          | Identifiant des statuts ([annexe](/docs/loaders/annexes/regimes-fiscaux))       |
| **Nom**                        |       [x]       | Raison sociale ou, à défaut, nom et prénom     |                       | `corporateName`        | Chaîne de caractères                                                            |
| **Date de création**           |                 | Date de création de l’activité locative        |                       | `debActDate`           | Chaîne de caractères (en l'absence de fuseau horaire, Paris/France est utilisé) |
| **Adresse**                    |       [x]       | Adresse de l’activité locative                 |                       | `address`              | Chaîne de caractères                                                            |
| **Ville**                      |       [x]       | Ville de l’activité locative                   |                       | `townName`             | Chaîne de caractères                                                            |
| **Code postal**                |       [x]       | Code postal de l’activité locative             |                       | `postCode`             | Chaîne de caractères                                                            |
| **SIRET OGA**                  |                 | Siret de l’OGA (Organisme de Gestion Agréé)    |                       | `ogaSiretId`           | Chaîne de caractères                                                            |
| **Nom OGA**                    |                 | Nom de l’OGA                                   |                       | `ogaName`              | Chaîne de caractères                                                            |
| **Agrément OGA**               |                 | Numéro d’agrément de l’OGA                     |                       | `ogaId`                | Chaîne de caractères                                                            |
| **Numéro adhérent**            |                 | Numéro d’adhérent OGA du déclarant             |                       | `ogaNumber`            | Chaîne de caractères                                                            |
| **Propriétés**                 |                 | Liste des propriétés associées au déclarant    |                       | `properties`           | Tableau d'objets représentant les propriétés                                    |
| **Associés**                   |                 | Liste des associés du déclarant                |                       | `associates`           | Tableau d'objets représentant les associés                                      |

### JSON

```json
{
  "id": "exemple-declarant",
  "sirenId": "987654321",
  "nicId": "54321",
  "legalStatusType": "SCI",
  "taxRegime": "IR",
  "corporateName": "Exemple Société",
  "debActDate": "2023-01-01",
  "address": "123 rue Exemple",
  "townName": "Exempleville",
  "postCode": "12345",
  "ogaSiretId": "31517251000036",
  "ogaName": "OGI-France",
  "ogaId": "105350",
  "ogaNumber": "98079",
  "properties": [],
  "associates": []
}
```
