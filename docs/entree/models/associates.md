---
sidebar_position: 2
---

# Associé

**L'associé** est la personne physique ou morale qui possède une part dans une société. Il se déclare dans le tableau `associates` de son déclarant : c'est ce qui le rattache à ce déclarant, sans identifiant à renseigner.

### Attributs

| **Attributs**                | **Obligatoire** | **Description**              | **Valeur par défaut** | **Clé JSON** | **Domaine de validité**                            |
| ---------------------------- | :-------------: | ---------------------------- | --------------------- | ------------ | -------------------------------------------------- |
| **Identifiant de l'associé** |       [x]       | Votre identifiant d'associé  |                       | `id`         | Clé d'identification unique (chaîne de caractères) |
| **Civilité (M/MME/société)** |       [x]       | Civilité de l'associé        |                       | `civility`   | `M` (monsieur), `MME` (madame), `SOC` (société)    |
| **Prénom**                   |                 | Prénom de l'associé          |                       | `firstName`  | Chaîne de caractères                               |
| **Nom**                      |                 | Nom de l'associé             |                       | `lastName`   | Chaîne de caractères                               |
| **Adresse**                  |                 | Adresse de l'associé         |                       | `address`    | Chaîne de caractères                               |
| **Ville**                    |                 | Ville de l'associé           |                       | `townName`   | Chaîne de caractères                               |
| **Pays**                     |                 | Pays de l'associé            | None                  | `ctry`       | Code de pays `FR`                                  |
| **Email**                    |       [x]       | Email de l'associé           |                       | `email`      | Chaîne de caractères                               |
| **Gérant**                   |                 | L'associé est-il le gérant ? | `N`                   | `manager`    | `O`, `N`                                           |

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
