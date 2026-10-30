---
sidebar_position: 4
sidebar_label: Clients
---

# Clients

La route Clients vous rend vos clients tels qu'ils sont chez nous : ce que vous nous avez transmis, avec ce que vos clients ont enrichi, modifié ou ajouté eux-mêmes depuis leur espace, comme un bien complémentaire. Ce que votre client saisit prime sur vos loads.

## Requête

```
GET /api/third_party/clients
```

Les en-têtes, l'enveloppe de réponse, la pagination et les erreurs communes sont décrits dans la [vue d'ensemble](./presentation.md#appeler-une-route-de-lecture).

### Paramètres

Tous les paramètres sont facultatifs.

| Paramètre       | Type    | Description                                                                                                  |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `email`         | string  | Ne renvoie que le client portant cet email, sans tenir compte de la casse                                    |
| `updated_since` | string  | Ne renvoie que les clients modifiés depuis cette date, eux, leurs déclarants ou leurs biens                  |
| `page`          | integer | Numéro de page, à partir de 1                                                                                |
| `page_size`     | integer | Nombre de clients par page : 100 par défaut, 500 au maximum                                                  |

Sans paramètre, la route renvoie tous vos clients, par ordre de création.

```
GET /api/third_party/clients?email=jean.dupont@example.com
GET /api/third_party/clients?updated_since=2026-12-01T00:00:00Z&page=2
```

Pour vous resynchroniser régulièrement, conservez la date de votre dernier appel et passez-la en `updated_since`.

## Réponse (200 OK)

```json
{
  "status": 1,
  "errors": "",
  "results": {
    "count": 1,
    "page": 1,
    "results": [
      {
        "id": "qlw_3b7e91d0-5c2a-4f8e-b1d6-0a9c4e27f513",
        "email": "jean.dupont@example.com",
        "firstName": "Jean",
        "lastName": "Dupont",
        "updatedAt": "2026-12-02T09:45:10+00:00",
        "declarants": [
          {
            "id": "DECL9876543211",
            "corporateName": "Mon Entreprise",
            "sirenId": "123456789",
            "properties": [
              { "id": "exemple-propriete", "type": "A", "description": "Appartement 1", "declarantId": "DECL9876543211" },
              { "id": "qlw_9f2c1b84-3d7e-4a21-9c05-6b8f2ea71d43", "type": "H", "description": "Résidence principale", "declarantId": "DECL9876543211" }
            ]
          }
        ],
        "properties": []
      }
    ]
  }
}
```

L'exemple est abrégé : chaque déclarant et chaque bien porte toutes les clés listées ci-dessous, à `null` quand la donnée n'est pas renseignée.

### Client

| Champ        | Type   | Description                                                                                      |
| ------------ | ------ | ------------------------------------------------------------------------------------------------ |
| `id`         | string | Notre identifiant du client, préfixé `qlw_`                                                      |
| `email`      | string | Email du client, celui qui lui sert à se connecter                                               |
| `firstName`  | string | Prénom                                                                                           |
| `lastName`   | string | Nom                                                                                              |
| `updatedAt`  | string | Date ISO 8601 de la dernière modification du client, de l'un de ses déclarants ou de l'un de ses biens |
| `declarants` | array  | Ses déclarants actifs, chacun avec ses biens                                                     |
| `properties` | array  | Ses biens rattachés à aucun de ses déclarants                                                    |

### Déclarant et propriété

Mêmes clés qu'en entrée, avec leur signification et leur domaine de validité :

| Objet     | Message d'entrée                                      | Clés non restituées                  |
| --------- | ----------------------------------------------------- | ------------------------------------ |
| Déclarant | [Déclarant](../entree/models/declarants.md)           | `associates`                         |
| Propriété | [Propriété](../entree/models/properties.md)           | `bldgNb`, `telNumber`, `documents`   |

Ne sont restitués ni les transactions, ni les biens désactivés ou de simulation.

Le champ `id` de chaque objet suit la règle des [identifiants](./presentation.md#identifiants).

## Erreurs

| Code  | Cas                                                |
| ----- | -------------------------------------------------- |
| `400` | `updated_since` n'est pas une date ISO 8601 valide |
