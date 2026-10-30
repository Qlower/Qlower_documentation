---
sidebar_position: 1
sidebar_label: Vue d'ensemble
---

# Sorties

Les sorties sont ce que vous pouvez récupérer chez nous, en retour de ce que vous nous envoyez en [entrée](../entree/structure.md).

:::info[Prérequis]
Les sorties demandent vos accréditations, c'est-à-dire votre clé d'API. Elles restituent vos clients, qu'ils vous aient été transmis par un load ou créés chez nous, par exemple lors d'un paiement.
:::

L'accusé de réception d'un load n'est pas une sortie : il rend compte du traitement de ce load. Il est décrit avec l'[API REST](../entree/integration/api-rest.md) et l'[upload S3](../entree/integration/api-s3.md).

| Sortie                                              | Ce que vous obtenez                                                          | Mode                                          | Partenaires concernés                  |
| --------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------- |
| [Lien du Welcome Dashboard](./welcome-dashboard.md) | L'adresse de votre espace, commune à tous vos clients                        | Communiquée à l'ouverture de vos accès        | Tous                                   |
| [Paiement effectué](./paiement/overview.md)         | La commande réglée, les biens et exercices couverts, la facture              | Webhook, route de lecture                     | Ceux qui nous délèguent l'encaissement |
| [Clients](./clients.md)                             | Vos clients, leurs déclarants et leurs biens, avec leurs identifiants        | Route de lecture                              | Tous                                   |
| [Prévisionnels](./previsionnels.md)                 | Pour chaque bien, ses simulations sur cinq ans                               | Route de lecture                              | Tous                                   |
| [À venir](./a-venir.md)                             | Documents, factures électroniques                                            | Annoncé                                       | Tous                                   |

## Deux modes

- **Nous vous appelons** : à chaque évènement, nous envoyons un `POST` vers votre endpoint. C'est le cas du paiement effectué, notifié par webhook.
- **Vous nous appelez** : vous interrogez une route de lecture quand vous en avez besoin. C'est le cas de vos clients, de vos paiements et des prévisionnels.

## Appeler une route de lecture

Les routes de lecture s'appellent en `GET`, authentifiées par votre clé d'API dans l'en-tête `Authorization`. C'est la même clé que pour vos loads.

```
Authorization: Bearer <apiKey>
```

| Environnement | URL de base                   |
| ------------- | ----------------------------- |
| Production    | `https://prod.api.qlower.com` |
| Staging       | `https://stg.api.qlower.com`  |

Les paramètres se passent en query string, les dates au format ISO 8601 (`2026-12-01` ou `2026-12-01T00:00:00Z`).

### Réponse

Toute réponse est enveloppée : `status` vaut `1` en cas de succès, et le contenu est dans `results`.

```json
{ "status": 1, "errors": "", "results": { } }
```

Une liste paginée (Clients, Paiements) porte dans `results` le nombre total d'éléments, le numéro de la page et les éléments de la page. On la parcourt avec les paramètres `page`, à partir de 1, et `page_size`.

```json
{ "status": 1, "errors": "", "results": { "count": 230, "page": 1, "results": [ ] } }
```

### Erreurs

Une erreur renvoie `status` à `0` et le motif dans `errors`. Chaque route précise ses propres cas ; ceux-ci valent pour toutes :

| Code  | Cas                                                  |
| ----- | ---------------------------------------------------- |
| `401` | Clé d'API absente ou invalide                        |
| `429` | Plus de 600 appels par minute avec la même clé d'API |

## Identifiants

Chaque objet restitué porte un identifiant :

- un **client** porte toujours le nôtre, préfixé `qlw_`. Vous le retrouvez par son email, puis vous conservez son identifiant ;
- un **déclarant** ou un **bien** porte le vôtre si vous nous l'avez transmis en entrée, sinon le nôtre, préfixé `qlw_`, par exemple pour un bien que votre client a ajouté depuis son espace.

Un identifiant `qlw_` est stable. Si vous nous renvoyez un déclarant ou un bien en entrée avec cet identifiant, nous le rapprochons de l'existant au lieu de créer un doublon.

L'identifiant est le champ `id`, sauf pour un bien du bloc `coverage` du webhook et de la route Paiements, où c'est le champ `external_id`.
