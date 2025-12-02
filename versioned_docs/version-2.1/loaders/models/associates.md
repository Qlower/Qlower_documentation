---
sidebar_position: 2
---

# Associé

**L'associé** est la personne physique ou morale qui possède une part dans une société. Il est lié à un déclarant.

### Attributs

| **Attributs**                | **Obligatoire** | **Description**                 | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                            |
| ---------------------------- | :-------------: | ------------------------------- | --------------------- | ------------ | -------------------------------------------------- |
| **Description d’un associé** |       [x]       | Votre identifiant de déclarant  |                       | `id`         | Clé d'identification unique (chaîne de caractères) |
| **Civilité (M/MME/société)** |       [x]       | Type de propriétaire            |                       | `civility`   | `M` (monsieur), `MME` (madame), `SOC` (société)    |
| **Prénom**                   |                 | Prénom du propriétaire          |                       | `firstName`  | Chaîne de caractères                               |
| **Nom**                      |                 | Nom du propriétaire             |                       | `lastName`   | Chaîne de caractères                               |
| **Adresse**                  |                 | Adresse du propriétaire         |                       | `address`    | Chaîne de caractères                               |
| **Ville**                    |                 | Ville du propriétaire           |                       | `townName`   | Chaîne de caractères                               |
| **Pays**                     |                 | Pays du propriétaire            |                       | `ctry`       | Code de pays `FR`                                  |
| **Email**                    |       [x]       | Email du propriétaire           |                       | `email`      | Chaîne de caractères                               |
| **Gérant**                   |                 | Le propriétaire est le gérant ? | `N`                   | `manager`    | `O`, `N`                                           |

### JSON

```json
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
```
