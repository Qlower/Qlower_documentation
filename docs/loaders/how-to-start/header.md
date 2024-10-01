---
sidebar_position: 1
---

# En-tête du fichier

L'en-tête regroupe les informations générales et descriptives associées à chaque fichier de données chargé dans le système.

L'en-tête d'un loader représente un ensemble de métadonnées cruciales fournissant des informations de suivi et de gestion des échanges de données. Il permet d'identifier l'origine des données, l'instant de leur création, ainsi que des détails sur la partie émettrice. L'ajout du numéro de version garantit une gestion claire des différentes itérations du fichier dans le cadre des mises à jour ou corrections.

| **Attributs**                     | **Obligatoire** | **Description**                            | **Valeur par défaut** | **Clé JSON**   | **Domaine de validité**                                        |
| --------------------------------- | :-------------: | ------------------------------------------ | --------------------- | -------------- | -------------------------------------------------------------- |
| **Message**                       |       [x]       | Identification du message                  |                       | `msgId`        | `transactions` ou `caractéristiques`                           |
| **Date d’émission**               |       [x]       | Date d’émission du message                 |                       | `creDtTm`      | ISO 8601 (en l’absence de fuseau horaire, fuseau Paris/France) |
| **Émetteur du fichier**           |       [x]       | Nom de l’organisation émettrice du fichier |                       | `inigPtyOrgId` | Chaîne de caractères                                           |
| **Compte Qlower du partenaire**   |       [x]       | Numéro de téléphone lié au compte Qlower   |                       | `inigPtyId`    | Chaîne de caractères                                           |
| **Nom du Partenaire dans Qlower** |       [x]       | Id du partenaire attribué par Qlower       |                       | `inigPtynm`    | Chaîne de caractères                                           |
| **Version du loader**             |                 | Version du loader utilisée                 |                       | `versionId`    | Chaîne de caractères                                           |

## Exemple

```json
{
  "msgId": "caractéristiques",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId": "qlower",
  "inigPtyId": "0620000001",
  "inigPtynm": "qlower",
  "versionId": "2.0"
}
```
