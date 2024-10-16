---
sidebar_position: 4
---

# Transaction

Les **transactions** regroupent des informations détaillées sur les transactions financières liées à la location de biens immobiliers.

### Attributs

| **Attributs**         | **Obligatoire** | **Description**                  | **Valeur par défaut**                             | **Clé JSON**  | **Domaine de validité**                                                |
| --------------------- | :-------------: | -------------------------------- | ------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| **Identifiant tiers** |       [x]       | Votre identifiant de transaction |                                                   | `id`          | Clé d'identification unique (chaîne de caractères)                     |
| **Date**              |       [x]       | Date de la transaction           | None                                              | `reqdExctnDt` | YYYY-MM-DD                                                             |
| **Propriété**         |       [x]       | Votre identifiant de propriété   |                                                   | `propertyId`  | Clé d'identification unique (chaîne de caractères)                     |
| **Montant**           |       [x]       | Montant signé TTC                | Montant négatif = débit, Montant positif = crédit | `amt`         | Nombre décimal avec partie décimale séparée par un “.” (ex. : “13.56”) |
| **Devise**            |                 | Devise normalisée                | "EUR"                                             | `ccy`         | EUR, USD, GBP, …                                                       |
| **Catégorie**         |                 | Votre code catégorie             |                                                   | `purpose`     | Votre liste de catégories                                              |
| **Référence**         |       [x]       | Description de la transaction    | None                                              | `ref`         | Chaîne de caractères                                                   |

### JSON

```json
{
  "id": "qlower-loader-transaction",
  "reqdExctnDt": "2024-10-01",
  "id-prty": "qlower-loader-property-666",
  "amt": 850,
  "ccy": "EUR",
  "purpose": "Loyer",
  "tax": 0,
  "ref": "Loyer 10-01"
}
```
