---
sidebar_position: 2
---

# En-tête du fichier

L'en-tête regroupe les informations générales et descriptives associées à chaque fichier de données chargé dans le système.

L'en-tête d'un loader représente un ensemble de métadonnées cruciales fournissant des informations de suivi et de gestion des échanges de données. Il permet d'identifier l'origine des données, l'instant de leur création, ainsi que des détails sur la partie émettrice. L'ajout du numéro de version garantit une gestion claire des différentes itérations du fichier dans le cadre des mises à jour ou corrections.

| **Attributs**         | **Obligatoire** | **Description**                      | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                                        |
| --------------------- | :-------------: | ------------------------------------ | --------------------- | ------------ | -------------------------------------------------------------- |
| **Nom du Partenaire** |       [x]       | Id du partenaire attribué par Qlower |                       | `inigPtynm`  | Chaîne de caractères                                           |
| **Clé d'accès**       |       [x]       | Clé d'accès générée par notre équipe |                       | `apiKey`     | Chaîne de caractères                                           |
| **Date d’émission**   |       [x]       | Date d’émission du message           |                       | `creDtTm`    | ISO 8601 (en l’absence de fuseau horaire, fuseau Paris/France) |
| **Version du loader** |       [x]       | Version du loader utilisée           |                       | `versionId`  | Chaîne de caractères                                           |

## Exemple

```json
{
  "inigPtynm": "qlower",
  "apiKey": "7Swvx0CZDKXLkeJ6iaOeH8Cb6TPdbHAL",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "versionId": "2.0"
}
```
