---
sidebar_position: 2
sidebar_label: Lien du Welcome Dashboard
---

# Lien du Welcome Dashboard

Chacun de vos clients dispose d'un espace à votre marque, le Welcome Dashboard. Il y retrouve ses biens, ses déclarations et les services que vous lui avez ouverts. Il y accède par un lien unique, que nous lui envoyons et que nous vous rendons en parallèle, dans l'accusé de réception de vos loads.

## L'adresse de votre espace

Votre espace a sa propre adresse, à votre nom, sur le domaine `espacefiscal.com` :

```
https://<votre-marque>.<code>.espacefiscal.com
```

| Élément          | Exemple            | Sens                                                                    |
| ---------------- | ------------------ | ----------------------------------------------------------------------- |
| `<votre-marque>` | `votremarque`      | Le nom de votre marque, pour que vos clients reconnaissent leur espace  |
| `<code>`         | `k7m2xq`           | Un code de six caractères propre à votre espace, attribué par nos soins |
| Domaine          | `espacefiscal.com` | Le domaine commun à tous les espaces partenaires                        |

Le code est indispensable : sans lui, connaître votre nom ne suffit pas à trouver l'adresse de votre espace. Il vous est communiqué à l'ouverture de vos accès.

Chaque client est rattaché à un seul espace, celui du partenaire qui nous l'a transmis : il ne peut pas se connecter à l'espace d'un autre partenaire.

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
      "welcome_url": "https://votremarque.k7m2xq.espacefiscal.com/..."
    }
  ]
}
```

Les loads déposés sur S3 sont traités en différé : récupérez le lien par la route [Clients](./clients.md).

:::tip[Utilisez le lien tel quel]
Ne reconstruisez pas le lien vous-même : seule l'adresse de votre espace est fixe, la suite du lien peut évoluer. L'adresse de staging vous est communiquée avec vos accès de test.
:::

## Ce que ce lien n'est pas

:::info[Ce lien n'est pas un identifiant de connexion]
Il ouvre l'écran d'accès de l'espace : votre client saisit son email, reçoit un code à six chiffres, puis entre dans son espace. Il n'a aucun mot de passe à créer.
:::

Vous pouvez donc afficher ce lien dans votre outil sans précaution particulière : sans accès à la boîte mail du client, il ne donne accès à rien. Chaque connexion est journalisée.

Transmettez-nous l'adresse que votre client utilise réellement. C'est celle qu'il devra saisir pour retrouver les biens que vous nous avez envoyés.

## Durée de vie

Le lien est durable : il ne change pas d'un load à l'autre et n'expire pas. Nous pouvons le révoquer, par exemple à la demande du client ; la route [Clients](./clients.md) renvoie toujours le lien en vigueur.
