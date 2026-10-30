---
sidebar_position: 5
sidebar_label: Prévisionnels
---

# Prévisionnels

Pour chaque bien de vos clients, nous calculons un prévisionnel sur cinq ans, à partir de son dernier exercice clôturé : ses comptes servent de base au calcul. Il réunit quatre simulations, trésorerie, fiscalité, rendement et patrimoine, que vous lisez par une route pour les afficher dans votre outil.

Nous calculons les prévisionnels par vagues. Un bien dont aucun prévisionnel n'est encore prêt n'apparaît pas dans la réponse.

## Requête

```
GET /api/third_party/forecasts
```

Les en-têtes, l'enveloppe de réponse, la pagination et les erreurs communes sont décrits dans la [vue d'ensemble](./presentation.md#appeler-une-route-de-lecture).

### Paramètres

Indiquez `property_id`, `email` ou les deux.

| Paramètre     | Type    | Obligatoire        | Description                                                                                  |
| ------------- | ------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `property_id` | string  | L'un des deux      | L'identifiant du bien, tel que la route [Clients](./clients.md) vous le rend                 |
| `email`       | string  | L'un des deux      | L'email du client : renvoie les prévisionnels de tous ses biens                              |
| `type`        | string  |                    | Une seule simulation : `cashflow`, `taxable_cashflow`, `yield` ou `net_asset_value`          |
| `year`        | integer |                    | Ne renvoie que les prévisionnels calculés cette année-là                                     |

```
GET /api/third_party/forecasts?property_id=exemple-propriete
GET /api/third_party/forecasts?email=jean.dupont@example.com&type=yield
```

## Réponse (200 OK)

Une liste, avec une entrée par bien et par simulation : le prévisionnel le plus récent. La liste est vide si aucun prévisionnel n'est prêt.

```json
{
  "status": 1,
  "errors": "",
  "results": [
    {
      "property_id": "exemple-propriete",
      "type": "cashflow",
      "base_year": 2026,
      "results": [
        { "year": 2026, "incomes": 9600.0, "outcomes": -7600.0, "cashflow": 2000.0 },
        { "year": 2027, "incomes": 9888.0, "outcomes": -7624.0, "cashflow": 2264.0 }
      ]
    }
  ]
}
```

| Champ         | Type    | Description                                                                         |
| ------------- | ------- | ----------------------------------------------------------------------------------- |
| `property_id` | string  | L'identifiant du bien, selon la règle des [identifiants](./presentation.md#identifiants) |
| `type`        | string  | La simulation : `cashflow`, `taxable_cashflow`, `yield` ou `net_asset_value`        |
| `base_year`   | integer | L'année de calcul du prévisionnel, première année de `results`                      |
| `results`     | array   | Cinq entrées, une par année : `year` et les indicateurs de la simulation, détaillés ci-dessous |

Les montants sont en euros, les rendements en pourcentage, arrondis à deux décimales. Les exemples ci-dessous ne montrent que le contenu de `results`, abrégé à deux années.

## Trésorerie

Type `cashflow` : ce qui entre et sort chaque année pour le bien.

```json
[
  {
    "year": 2026,
    "incomes": 9600.0,
    "outcomes": -7600.0,
    "cashflow": 2000.0
  },
  {
    "year": 2027,
    "incomes": 9888.0,
    "outcomes": -7624.0,
    "cashflow": 2264.0
  }
]
```

| Clé        | Indicateur | Description                                                  |
| ---------- | ---------- | ------------------------------------------------------------ |
| `incomes`  | Revenus    | Les loyers de l'année                                        |
| `outcomes` | Dépenses   | Les charges et les mensualités d'emprunt, en valeur négative |
| `cashflow` | Trésorerie | Les revenus moins les dépenses                               |

## Fiscalité

Type `taxable_cashflow` : le passage du revenu locatif à l'impôt, selon le régime fiscal du bien.

```json
[
  {
    "year": 2026,
    "incomes": 9600.0,
    "deductibles": -7800.0,
    "taxable_incomes": 1800.0,
    "net_result": 1800.0,
    "annual_rental_income_taxes": 849.6,
    "net_tax_result": 950.4
  },
  {
    "year": 2027,
    "incomes": 9888.0,
    "deductibles": -7724.0,
    "taxable_incomes": 2164.0,
    "net_result": 2164.0,
    "annual_rental_income_taxes": 1021.41,
    "net_tax_result": 1142.59
  }
]
```

| Clé                          | Indicateur                     | Description                                                |
| ---------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `incomes`                    | Revenus                        | Les recettes locatives de l'année                          |
| `deductibles`                | Charges déductibles            | Les charges déductibles, en valeur négative                |
| `taxable_incomes`            | Revenus taxables               | Les revenus soumis à l'impôt                               |
| `net_result`                 | Résultat fiscal                | Le résultat fiscal, après report des déficits antérieurs   |
| `annual_rental_income_taxes` | Impôt sur les revenus locatifs | L'impôt dû sur les revenus locatifs de l'année             |
| `net_tax_result`             | Résultat fiscal net            | Le résultat fiscal, moins l'impôt                          |

## Rendement

Type `yield` : les rendements du bien, rapportés à son prix d'acquisition, frais inclus.

```json
[
  {
    "year": 2026,
    "gross_yield": 6.0,
    "net_yield": 4.5,
    "net_net_yield": 3.97
  },
  {
    "year": 2027,
    "gross_yield": 6.18,
    "net_yield": 4.67,
    "net_net_yield": 4.03
  }
]
```

| Clé             | Indicateur               | Description                                           |
| --------------- | ------------------------ | ----------------------------------------------------- |
| `gross_yield`   | Rendement brut           | Les loyers de l'année                                 |
| `net_yield`     | Rendement net            | Les loyers moins les charges, hors intérêts d'emprunt |
| `net_net_yield` | Rendement net-net fiscal | Le rendement net, après impôt                         |

## Patrimoine

Type `net_asset_value` : la valeur du bien, son financement et l'actif net qui en résulte.

```json
[
  {
    "year": 2026,
    "acquisition_cost": 160000.0,
    "gross_patrimony": 185000.0,
    "remaining_capital": 60000.0,
    "latent_capital_gain": 25000.0,
    "net_patrimony_book": 100000.0,
    "net_patrimony": 125000.0,
    "net_patrimony_after_disposal": 115750.0
  },
  {
    "year": 2027,
    "acquisition_cost": 160000.0,
    "gross_patrimony": 186850.0,
    "remaining_capital": 56000.0,
    "latent_capital_gain": 26850.0,
    "net_patrimony_book": 104000.0,
    "net_patrimony": 130850.0,
    "net_patrimony_after_disposal": 121507.5
  }
]
```

| Clé                            | Indicateur              | Description                                                  |
| ------------------------------ | ----------------------- | ------------------------------------------------------------ |
| `acquisition_cost`             | Valeur d'acquisition    | Le prix d'achat du bien, frais inclus                        |
| `gross_patrimony`              | Valeur de marché        | La valeur estimée du bien sur le marché                      |
| `remaining_capital`            | Capital restant dû      | Ce qui reste à rembourser sur les emprunts du bien           |
| `latent_capital_gain`          | Appréciation            | La valeur de marché moins la valeur d'acquisition            |
| `net_patrimony_book`           | Actif net comptable     | La valeur d'acquisition moins le capital restant dû          |
| `net_patrimony`                | Actif net actualisé     | La valeur de marché moins le capital restant dû              |
| `net_patrimony_after_disposal` | Actif net après cession | L'actif net actualisé, moins des frais de cession estimés    |

## Erreurs

| Code  | Cas                                                                              |
| ----- | -------------------------------------------------------------------------------- |
| `400` | Ni `property_id` ni `email`, `type` inconnu, ou `year` qui n'est pas une année   |
| `404` | Aucun de vos clients ne porte cet email, ou aucun de leurs biens cet identifiant |
