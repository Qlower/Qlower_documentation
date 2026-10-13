---
sidebar_position: 0
---

# Client

Le **client** est la personne pour qui vous nous transmettez des données : votre client final. Il ouvre chaque entrée du tableau `clients` d'un load, et c'est à lui que nous ouvrons un espace à votre marque.

### Attributs

| **Attributs**             | **Obligatoire** | **Description**                                                                                          | **Valeur par défaut** | **Clé JSON**  | **Domaine de validité**                            |
| ------------------------- | :-------------: | -------------------------------------------------------------------------------------------------------- | --------------------- | ------------- | -------------------------------------------------- |
| **Identifiant du client** |       [x]       | Votre identifiant de client. Nous vous le rendons dans toutes les [sorties](../../sorties/presentation.md) |                       | `id`          | Clé d'identification unique (chaîne de caractères) |
| **Email**                 |       [x]       | Adresse de votre client. Elle lui sert à accéder à son espace et à recevoir son lien d'accès             |                       | `email`       | Adresse email valide                               |
| **Prénom**                |       [x]       | Prénom du client                                                                                         |                       | `firstName`   | Chaîne de caractères                               |
| **Nom**                   |       [x]       | Nom du client                                                                                            |                       | `lastName`    | Chaîne de caractères                               |
| **Téléphone**             |                 | Téléphone du client                                                                                      |                       | `phoneNumber` | Chaîne de caractères                               |

### Rapprochement

Nous retrouvons votre client par son `id`. Si cet `id` nous est inconnu, nous le recherchons par son email. À défaut, nous lui créons un compte.

Un client créé de notre côté, sans que vous nous l'ayez transmis, porte un identifiant que nous émettons, toujours préfixé `qlw_` : voir [Clients](../../sorties/clients.md).

### Exemple

```json
{
  "id": "CLT-00042",
  "email": "jean.dupont@example.com",
  "firstName": "Jean",
  "lastName": "Dupont",
  "phoneNumber": "+33612345678"
}
```
