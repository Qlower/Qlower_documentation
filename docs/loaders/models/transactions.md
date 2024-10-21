---
sidebar_position: 4
---

# Transaction

Les **transactions** regroupent des informations détaillées sur les transactions financières liées à la location de biens immobiliers.

### Attributs

| **Attributs**         | **Obligatoire** | **Description**                  | **Valeur par défaut**                             | **Clé JSON**  | **Domaine de validité**                                                |
| --------------------- | :-------------: | -------------------------------- | ------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| **Identifiant tiers** |       [x]       | Votre identifiant de transaction |                                                   | `id`          | Clé d'identification unique (chaîne de caractères)                     |
| **Date**              |       [x]       | Date de la transaction           | None                                              | `reqdExctnDt` | `YYYY-MM-DD`                                                           |
| **Propriété**         |       [x]       | Votre identifiant de propriété   |                                                   | `id-prty`     | Clé d'identification unique (chaîne de caractères)                     |
| **Montant**           |       [x]       | Montant signé TTC                | Montant négatif = débit, Montant positif = crédit | `amt`         | Nombre décimal avec partie décimale séparée par un “.” (ex. : “13.56”) |
| **Devise**            |                 | Devise normalisée                | `EUR`                                             | `ccy`         | `EUR`, `USD`, `GBP`                                                    |
| **Catégorie**         |                 | Votre code catégorie             |                                                   | `purpose`     | Votre liste de catégories                                              |
| **Référence**         |       [x]       | Description de la transaction    | None                                              | `ref`         | Chaîne de caractères                                                   |

### JSON

```json
{
  "id": "TRANS114725836912",
  "reqdExctnDt": "2023-06-15",
  "id-prty": "exemple-propriete",
  "amt": 1500.0,
  "ccy": "EUR",
  "purpose": "Loyer",
  "ref": "PAIEMENT12345"
}
```
