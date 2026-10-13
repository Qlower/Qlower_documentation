---
sidebar_position: 1
sidebar_label: Vue d'ensemble
---

# Sorties

Les sorties sont ce que vous pouvez récupérer chez nous, en retour de ce que vous nous envoyez en [entrée](../entree/structure.md).

:::info[Prérequis]
Les sorties ne fonctionnent qu'après une initialisation en entrée : vos clients doivent nous avoir été transmis par un load, et vous devez disposer de vos accréditations, c'est-à-dire votre clé d'API.
:::

L'accusé de réception d'un load n'est pas une sortie : il rend compte du traitement de ce load et porte le [lien du Welcome Dashboard](./welcome-dashboard.md) de chaque client. Il est décrit avec l'[API REST](../entree/integration/api-rest.md) et l'[upload S3](../entree/integration/api-s3.md).

| Sortie                                              | Ce que vous obtenez                                                          | Mode                                          | Partenaires concernés                  |
| --------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------- |
| [Lien du Welcome Dashboard](./welcome-dashboard.md) | Le lien d'accès à l'espace de chacun de vos clients                          | Accusé de réception du load, route de lecture | Tous                                   |
| [Paiement effectué](./paiement/overview.md)         | La commande réglée, les biens et exercices couverts, la facture              | Webhook, route de lecture                     | Ceux qui nous délèguent l'encaissement |
| [Clients](./clients.md)                             | Vos clients, leurs déclarants et leurs biens, avec leurs identifiants        | Route de lecture                              | Tous                                   |
| [Prévisionnels](./previsionnels.md)                 | Pour chaque bien, ses simulations sur cinq ans et le lien pour les consulter | Envoi par nos soins, début 2027               | Tous                                   |
| [À venir](./a-venir.md)                             | Documents, factures électroniques                                            | Annoncé                                       | Tous                                   |

## Deux modes

- **Nous vous appelons** : à chaque évènement, nous envoyons un `POST` vers votre endpoint. C'est le cas du paiement effectué, notifié par webhook.
- **Vous nous appelez** : vous interrogez une route de lecture quand vous en avez besoin. C'est le cas de vos clients, de leur lien d'accès et de vos paiements.

## Appeler une route de lecture

Les routes de lecture s'appellent en `GET`, authentifiées par votre clé d'API dans l'en-tête `Authorization`. C'est la même clé que pour vos loads.

```
Authorization: Bearer <apiKey>
```

| Environnement | URL de base                   |
| ------------- | ----------------------------- |
| Production    | `https://prod.api.qlower.com` |
| Staging       | `https://stg.api.qlower.com`  |

Une clé absente ou invalide renvoie `401`. Un identifiant qui ne désigne aucun de vos clients renvoie `404`.

## Identifiants

Chaque objet restitué porte un identifiant :

- **le vôtre**, si vous nous l'avez transmis en entrée ;
- **le nôtre**, toujours préfixé `qlw_`, si l'objet a été créé chez nous, par exemple un bien que votre client a ajouté depuis son espace.

Un identifiant `qlw_` est stable. Si vous nous renvoyez l'objet en entrée avec cet identifiant, nous le rapprochons de l'existant au lieu de créer un doublon.

Dans les routes de lecture et les prévisionnels, l'identifiant est le champ `id`, comme en entrée. Dans le webhook de paiement, c'est le champ `external_id`.
