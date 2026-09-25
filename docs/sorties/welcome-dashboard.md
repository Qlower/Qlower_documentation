---
sidebar_position: 2
sidebar_label: Lien du Welcome Dashboard
---

# Lien du Welcome Dashboard

Chacun de vos clients dispose d'un espace à votre marque, le Welcome Dashboard. Il y retrouve ses biens, ses déclarations et les services que vous lui avez ouverts. Il y accède par un lien unique, que nous lui envoyons et que nous vous rendons en parallèle, dans l'accusé de réception de vos loads.

## Ce que reçoit votre client

À la création de son compte, votre client reçoit par email son lien d'accès, à votre marque. Vous n'avez rien à lui envoyer.

## Ce que vous recevez

Le même lien, pour l'afficher dans votre outil : votre client n'a pas à retrouver un email reçu des semaines plus tôt.

### Dans l'accusé de réception du load

L'accusé de réception de chaque load envoyé par l'[API REST](../entree/integration/api-rest.md) porte, pour chaque client, son lien dans le champ `welcome_url` :

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

Les loads déposés sur S3 sont traités en différé : récupérez le lien par la route [Clients](./clients.md).

:::tip[Utilisez le lien tel quel]
Ne reconstruisez pas le lien vous-même : son format peut évoluer. Il est servi sur `secure.comptappart.com` en production et sur `stg.comptappart.com` en staging.
:::

## Ce que ce lien n'est pas

:::info[Ce lien n'est pas un identifiant de connexion]
Il ouvre l'écran d'accès de l'espace : votre client saisit son email, reçoit un code à six chiffres, puis entre dans son espace. Il n'a aucun mot de passe à créer.
:::

Vous pouvez donc afficher ce lien dans votre outil sans précaution particulière : sans accès à la boîte mail du client, il ne donne accès à rien. Chaque connexion est journalisée.

Transmettez-nous l'adresse que votre client utilise réellement. C'est celle qu'il devra saisir pour retrouver les biens que vous nous avez envoyés.

## Durée de vie

Le lien est durable : il ne change pas d'un load à l'autre et n'expire pas. Nous pouvons le révoquer, par exemple à la demande du client ; la route [Clients](./clients.md) renvoie toujours le lien en vigueur.
