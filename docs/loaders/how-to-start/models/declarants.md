---
sidebar_position: 1
---

# Déclarant

Le **déclarant** est la personne physique ou morale qui déclare les revenus fonciers issus de la location de biens immobiliers.

### Attributs

| **Attributs**                  | **Obligatoire** | **Description**                                | **Valeur par défaut** | **Clé JSON**      | **Domaine de validité**                                                                |
| ------------------------------ | :-------------: | ---------------------------------------------- | --------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| **Description d’un déclarant** |       [x]       | Votre identifiant de déclarant                 |                       | `id`              | Clé d'identification unique (chaîne de caractères)                                     |
| **SIREN**                      |                 | Identifiant SIREN du déclarant (si applicable) |                       | `sirenId`         | Chaîne de caractères (9 caractères)                                                    |
| **NIC**                        |                 | NIC du déclarant (si applicable)               |                       | `nicId`           | Chaîne de caractères (5 caractères)                                                    |
| **Forme juridique**            |       [x]       | Forme juridique du déclarant (si applicable)   |                       | `legalStatusType` | Identifiant des statuts (annexe 2 pour la liste)                                       |
| **Imposition (IR/IS)**         |                 | Régime d’imposition des revenus                | None                  | `taxRegime`       | `IR` (appartement), `IS` (maison)                                                      |
| **Nom**                        |       [x]       | Raison sociale ou à défaut nom et prénom       |                       | `corporateName`   | Chaîne de caractères                                                                   |
| **Date de création**           |                 | Date de création de l’activité locative        |                       | `debActDate`      | Chaîne de caractères (en l'absence de fuseau horaire, celui-ci est mis à Paris/France) |
| **Adresse**                    |       [x]       | Adresse de l’activité locative                 |                       | `address`         | Chaîne de caractères                                                                   |
| **Ville**                      |       [x]       | Ville de l’activité locative                   |                       | `townName`        | Chaîne de caractères                                                                   |
| **Code postal**                |       [x]       | Code postal de l’activité locative             |                       | `postCode`        | Chaîne de caractères                                                                   |
| **SIRET OGA**                  |                 | Siret de l’OGA                                 |                       | `ogaSiretId`      | Chaîne de caractères                                                                   |
| **Nom OGA**                    |                 | Nom de l’OGA                                   |                       | `ogaName`         | Chaîne de caractères                                                                   |
| **Agrément OGA**               |                 | Numéro d’agrément de l’OGA                     |                       | `ogaId`           | Chaîne de caractères                                                                   |
| **Numéro adhérent**            |                 | Numéro d’adhérent OGA du déclarant             |                       | `ogaNumber`       | Chaîne de caractères                                                                   |

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
  "ogaSiretId": "12345678901234",
  "ogaName": "Exemple OGA",
  "ogaId": "2",
  "ogaNumber": "0987654321"
}
```
