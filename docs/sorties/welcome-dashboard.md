---
sidebar_position: 2
sidebar_label: Lien du Welcome Dashboard
---

# Lien du Welcome Dashboard

Chacun de vos clients dispose d'un espace à votre marque, le Welcome Dashboard. Il y retrouve ses biens, ses déclarations et les services que vous lui avez ouverts. Il y accède par un lien unique, que nous lui envoyons et que nous vous mettons à disposition en parallèle.

## Ce que reçoit votre client

À la création de son compte, votre client reçoit par email son lien d'accès, à votre marque. Vous n'avez rien à lui envoyer.

## Ce que vous recevez

Le même lien, pour l'afficher dans votre outil : votre client n'a pas à retrouver un email reçu des semaines plus tôt. Vous l'obtenez de deux façons.

### Dans la réponse du load

Chaque load envoyé par l'[API REST](../entree/integration/api-rest.md) rend, pour chaque client, son lien dans le champ `welcome_url` :

```json
{
  "status": "SUCCESS",
  "clients": [
    {
      "id": "CLT-00042",
      "email": "jean.dupont@example.com",
      "status": "CREATED",
      "welcome_url": "https://secure.comptappart.com/declaration/..."
    }
  ]
}
```

Les loads déposés sur S3 sont traités en différé : récupérez le lien par la route de lecture.

:::tip[Utilisez le lien tel quel]
Ne reconstruisez pas le lien vous-même : son format peut évoluer. Il est servi sur `secure.comptappart.com` en production et sur `stg.comptappart.com` en staging.
:::

### Par la route de lecture

```
GET /api/third_party/clients/{id}/welcome-link
```

`{id}` est votre identifiant du client, ou l'identifiant `qlw_` que nous lui avons attribué. L'authentification est décrite dans la [vue d'ensemble](./presentation.md#appeler-une-route-de-lecture).

#### Réponse (200 OK)

```json
{
  "id": "CLT-00042",
  "email": "jean.dupont@example.com",
  "welcome_url": "https://secure.comptappart.com/declaration/...",
  "created_at": "2026-12-02T09:45:10+00:00"
}
```

| Champ         | Type   | Description                                           |
| ------------- | ------ | ----------------------------------------------------- |
| `id`          | string | Votre identifiant du client                           |
| `email`       | string | L'email du client, celui qui lui sert à se connecter  |
| `welcome_url` | string | Le lien d'accès à son espace                          |
| `created_at`  | string | Date de création du lien, ISO 8601                    |

#### Erreurs

| Code  | Cas                                           |
| ----- | --------------------------------------------- |
| `401` | Clé d'API absente ou invalide                 |
| `404` | Aucun de vos clients ne porte cet identifiant |

## Ce que ce lien n'est pas

:::info[Ce lien n'est pas un identifiant de connexion]
Il ouvre l'écran d'accès de l'espace : votre client saisit son email, reçoit un code à six chiffres, puis entre dans son espace. Il n'a aucun mot de passe à créer.
:::

Vous pouvez donc afficher ce lien dans votre outil sans précaution particulière : sans accès à la boîte mail du client, il ne donne accès à rien. Chaque connexion est journalisée.

Transmettez-nous l'adresse que votre client utilise réellement. C'est celle qu'il devra saisir pour retrouver les biens que vous nous avez envoyés.

## Durée de vie

Le lien est durable : il ne change pas d'un load à l'autre et n'expire pas. Nous pouvons le révoquer, par exemple à la demande du client ; la route de lecture renvoie toujours le lien en vigueur.
