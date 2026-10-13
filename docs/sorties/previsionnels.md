---
sidebar_position: 5
sidebar_label: Prévisionnels
---

# Prévisionnels

:::info[Disponible début 2027]
Cette sortie ouvrira début 2027. Nous publions son format dès maintenant pour que vous puissiez préparer votre intégration.
:::

Pour chaque bien de vos clients, nous calculons un prévisionnel sur cinq ans, à partir de son dernier exercice clôturé. Il réunit quatre simulations : trésorerie, fiscalité, rendement et patrimoine. Vous le recevez sous deux formes :

- **un lien** vers l'écran de simulation de votre client, à votre marque : ses courbes année par année et, pour chaque indicateur, un commentaire de lecture rédigé automatiquement ;
- **les résultats**, pour les afficher dans votre outil : une valeur par année et par indicateur.

## Mode

Vous n'avez rien à demander : nous calculons les prévisionnels de vos clients par vagues, et vous envoyons chacun dès qu'il est prêt. Le canal de réception sera précisé avant l'ouverture.

Un bien reçoit un prévisionnel quand son dernier exercice est clôturé chez nous : ses comptes servent de base au calcul.

## Format

```json
{
  "client": { "id": "CLT-00042" },
  "property": { "id": "exemple-propriete" },
  "base_year": 2026,
  "simulation_url": "https://votremarque.k7m2xq.espacefiscal.com/...",
  "simulations": {
    "cashflow": [],
    "taxable_cashflow": [],
    "yield": [],
    "net_asset_value": []
  }
}
```

| Champ            | Type    | Description                                                                                |
| ---------------- | ------- | ------------------------------------------------------------------------------------------ |
| `client.id`      | string  | Votre identifiant du client                                                                |
| `property.id`    | string  | Votre identifiant du bien, ou le nôtre, préfixé `qlw_`, si votre client l'a créé lui-même |
| `base_year`      | integer | L'exercice clôturé qui sert de base au calcul                                              |
| `simulation_url` | string  | Le lien vers l'écran de simulation, à votre marque                                         |
| `simulations`    | object  | Les quatre simulations, détaillées ci-dessous                                              |

Chaque simulation est un tableau de cinq entrées, une par année : l'exercice de base, puis les quatre années suivantes. Les montants sont en euros, les rendements en pourcentage. Les exemples ci-dessous sont abrégés à deux années.

## Trésorerie

Clé `cashflow` : ce qui entre et sort chaque année pour le bien.

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

Clé `taxable_cashflow` : le passage du revenu locatif à l'impôt, selon le régime fiscal du bien.

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

Clé `yield` : les rendements du bien, rapportés à son prix d'acquisition, frais inclus.

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

Clé `net_asset_value` : la valeur du bien, son financement et l'actif net qui en résulte.

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

Sans tableau d'amortissement pour les emprunts du bien, seuls `acquisition_cost`, `gross_patrimony` et `latent_capital_gain` sont calculés : les autres valent `null`.

## Le lien de simulation

`simulation_url` ouvre l'écran de simulation dans l'espace de votre client, à votre marque : il y accède avec le même email que pour son [Welcome Dashboard](./welcome-dashboard.md). Chaque prévisionnel porte son propre lien.

:::tip[Utilisez le lien tel quel]
Ne reconstruisez pas le lien vous-même : son format peut évoluer.
:::
