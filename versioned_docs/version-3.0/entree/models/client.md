---
sidebar_position: 0
---

# Client

Le **client** est la personne pour qui vous nous transmettez des données : votre client final. Il ouvre chaque entrée du tableau `clients` d'un load, et c'est à lui que nous ouvrons un espace à votre marque.

### Attributs

| **Attributs**             | **Obligatoire** | **Description**                                                                                          | **Valeur par défaut** | **Clé JSON**  | **Domaine de validité**                            |
| ------------------------- | :-------------: | -------------------------------------------------------------------------------------------------------- | --------------------- | ------------- | -------------------------------------------------- |
| **Identifiant du client** |       [x]       | Votre identifiant de client                                                                               |                       | `id`          | Clé d'identification unique (chaîne de caractères) |
| **Email**                 |       [x]       | Adresse de votre client. Elle lui sert à accéder à son espace et à recevoir son lien d'accès             |                       | `email`       | Adresse email valide                               |
| **Prénom**                |       [x]       | Prénom du client                                                                                         |                       | `firstName`   | Chaîne de caractères                               |
| **Nom**                   |       [x]       | Nom du client                                                                                            |                       | `lastName`    | Chaîne de caractères                               |
| **Téléphone**             |                 | Téléphone du client                                                                                      |                       | `phoneNumber` | Chaîne de caractères                               |

### Rapprochement

Nous retrouvons votre client par son email parmi vos clients. À défaut, nous lui créons un compte.

Dans les [sorties](../../sorties/presentation.md), votre client porte notre identifiant, toujours préfixé `qlw_` : voir [Clients](../../sorties/clients.md).

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
