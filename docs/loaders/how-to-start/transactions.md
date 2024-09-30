---
sidebar_position: 3
---

# Fichier transactions

La liste des catégories associées à vos transactions, ainsi que leur signification, est nécessaire pour procéder à l’association avec nos propres catégories comptables et fiscales. Cette liste dépasse le cadre des catégories prévues par la norme **ISO 2002**, ce qui rend sa fourniture **essentielle**. À défaut de cette liste, la catégorisation nécessitera une intervention manuelle pour chaque transaction reçue par **Qlower**.

- Toute transaction **non catégorisée** ou associée à un code catégorie non prévu dans votre liste sera tout de même chargée, mais classifiée comme **“non catégorisée”**.
- Les transactions uploadées seront regroupées et accessibles dans l’écran **Transactions** de Qlower, pour visualisation et contrôle.
- Elles seront directement stockées comme **“validées”**, et alimenteront ainsi les différentes comptabilités (Propriété/Locataire/Fiscalité).

:::tip[Bon à savoir]

Le renseignement de l’**ID externe** permet non seulement de garantir une piste d’audit, mais aussi, et surtout, de prévenir la création de **doublons**. Cependant, certaines transactions spécifiques (telles que les immobilisations et amortissements) ainsi que les opérations de fin d’année devront être saisies **directement** dans Qlower.

:::

### Modèle transaction

| **Attributs**         | **Obligatoire** | **Description**                  | **Valeur par défaut**                             | **Clé JSON**  | **ISO**    | **Domaine de validité**                                                |
| --------------------- | :-------------: | -------------------------------- | ------------------------------------------------- | ------------- | ---------- | ---------------------------------------------------------------------- |
| **Identifiant tiers** |       [x]       | Votre identifiant de transaction |                                                   | `id`          |            | Clé d'identification unique (chaîne de caractères)                     |
| **Date**              |       [x]       | Date de la transaction           | None                                              | `reqdExctnDt` | YYYY-MM-DD | Chaîne de caractères                                                   |
| **Propriété**         |       [x]       | Votre identifiant de propriété   |                                                   | `id-prty`     |            | Clé d'identification unique (chaîne de caractères)                     |
| **Locataire**         |                 | Votre identifiant de locataire   | None                                              | `id-tenant`   |            | Clé d'identification unique (chaîne de caractères)                     |
| **Montant**           |       [x]       | Montant signé TTC                | Montant négatif = débit, Montant positif = crédit | `amt`         | 20022      | Nombre décimal avec partie décimale séparée par un “.” (ex. : “13.56”) |
| **Devise**            |                 | Devise normalisée                | "EUR"                                             | `ccy`         | 20022      | EUR, USD, GBP, …                                                       |
| **Catégorie**         |                 | Votre code catégorie             |                                                   | `purpose`     | 20022      | Votre liste de catégories                                              |
| **TVA**               |                 | Montant signé                    | Montant négatif = débit, Montant positif = crédit | `tax`         | 20022      | Nombre décimal avec partie décimale séparée par un “.” (ex. : “13.56”) |
| **Référence**         |       [x]       | Description de la transaction    | None                                              | `ref`         | 20022      | Chaîne de caractères                                                   |

### Exemple

```json
{
  "msgId": "transactions",
  "creDtTm": "2023-08-28T10:15:43.25+01:00",
  "inigPtyOrgId" : "qlower",
  "inigPtyId" : "0620000001",
  "version" : "2.0",
  "inigPtynm" : "qlower",
  "transactions" : [
    {
      "id" : "12312121268978tr",
      "reqdExctnDt" : "2023-08-28",
      "id-prty" : "12345678azerty",
      "id-tenant" : "65465azertyuio",
      "amt" : 522.99,
      "ccy" : "EUR",
      "purpose" : "Loyer",
      "tax-amount" : 0, # non-implémenté
      "ref" : "Loyer de Jean durand payé le 28 août 2023 "
    }
  ]
}
```
