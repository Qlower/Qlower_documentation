---
sidebar_position: 4
sidebar_label: Clients
---

# Clients

La route Clients vous rend vos clients tels qu'ils sont chez nous, et vous permet de vous resynchroniser sans échange de fichiers. Elle restitue ce que vous nous avez transmis, avec ce que vos clients ont enrichi, modifié ou ajouté eux-mêmes depuis leur espace, comme un bien complémentaire : ce que votre client saisit prime sur vos loads.

## Endpoints

```
GET /api/third_party/clients
GET /api/third_party/clients/{id}
GET /api/third_party/clients/{id}/welcome-link
```

La première renvoie la liste paginée de vos clients. La deuxième renvoie un client, désigné par votre identifiant ou par l'identifiant `qlw_` que nous lui avons attribué. La troisième renvoie son lien d'accès au Welcome Dashboard. L'authentification est décrite dans la [vue d'ensemble](./presentation.md#appeler-une-route-de-lecture).

## Paramètres de la liste

| Paramètre       | Type    | Description                                                                                         |
| --------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `updated_since` | string  | ISO 8601. Ne renvoie que les clients modifiés depuis cette date. Sans ce paramètre, tous vos clients |
| `page`          | integer | Numéro de page, à partir de 1                                                                       |
| `page_size`     | integer | Nombre de clients par page : 100 par défaut, 500 au maximum                                         |

Pour vous resynchroniser régulièrement, conservez la date de votre dernier appel et passez-la en `updated_since`.

## Format

Le même qu'en [entrée](../entree/structure.md), limité au client, à ses déclarants et à leurs biens. Chaque objet porte l'ensemble des champs de son message : voir [Client](../entree/models/client.md), [Déclarant](../entree/models/declarants.md) et [Propriété](../entree/models/properties.md). Les transactions, les associés et les documents ne sont pas restitués.

Un bien rattaché à un déclarant figure dans ce déclarant ; un bien sans déclarant figure dans le tableau `properties` du client.

## Réponse (200 OK)

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "client": {
        "id": "CLT-00042",
        "email": "jean.dupont@example.com",
        "firstName": "Jean",
        "lastName": "Dupont",
        "phoneNumber": "+33612345678",
        "updatedAt": "2026-12-02T09:45:10+00:00"
      },
      "declarants": [
        {
          "id": "DECL9876543211",
          "corporateName": "Mon Entreprise",
          "properties": [
            {
              "id": "exemple-propriete",
              "type": "A",
              "description": "Appartement 1"
            },
            {
              "id": "qlw_9f2c1b84-3d7e-4a21-9c05-6b8f2ea71d43",
              "type": "H",
              "description": "Résidence principale"
            }
          ]
        }
      ],
      "properties": []
    }
  ]
}
```

| Champ      | Type           | Description                                               |
| ---------- | -------------- | --------------------------------------------------------- |
| `count`    | integer        | Nombre total de clients correspondant à la requête        |
| `next`     | string ou null | URL de la page suivante, `null` sur la dernière page      |
| `previous` | string ou null | URL de la page précédente, `null` sur la première page    |
| `results`  | array          | Les clients de la page, dans le format décrit ci-dessus   |

La route `GET /api/third_party/clients/{id}` renvoie directement un élément de `results`.

## Lien d'accès d'un client

`GET /api/third_party/clients/{id}/welcome-link` renvoie le lien d'accès du client au Welcome Dashboard : le même que celui de l'[accusé de réception](./welcome-dashboard.md) de vos loads. Utile pour un load déposé sur S3, ou pour réafficher le lien plus tard.

```json
{
  "id": "CLT-00042",
  "email": "jean.dupont@example.com",
  "welcome_url": "https://secure.comptappart.com/declaration/...",
  "created_at": "2026-12-02T09:45:10+00:00"
}
```

| Champ         | Type   | Description                                          |
| ------------- | ------ | ---------------------------------------------------- |
| `id`          | string | Votre identifiant du client                          |
| `email`       | string | L'email du client, celui qui lui sert à se connecter |
| `welcome_url` | string | Le lien d'accès à son espace                         |
| `created_at`  | string | Date de création du lien, ISO 8601                   |

## Objets créés chez nous

Un objet que vous ne nous avez pas transmis porte un identifiant préfixé `qlw_` :

- un **bien** que votre client a ajouté depuis son espace ;
- un **client** qui a ouvert son espace sans que vous nous l'ayez transmis.

Créez-le de votre côté avec cet identifiant. Si vous nous le renvoyez ensuite en entrée, nous le rapprochons de l'existant au lieu de créer un doublon.

## Erreurs

| Code  | Cas                                                |
| ----- | -------------------------------------------------- |
| `400` | `updated_since` n'est pas une date ISO 8601 valide |
| `401` | Clé d'API absente ou invalide                      |
| `404` | Aucun de vos clients ne porte cet identifiant      |
