---
sidebar_position: 4
---

# Transaction

Une **transaction** est une opération financière issue d'un système de gestion amont : un loyer encaissé, une charge payée, un remboursement.

Qlower accepte des transactions de plusieurs sources : saisies par le client, issues d'une connexion bancaire, d'un relevé de compte bancaire, d'un compte rendu de gestion complet ou partiel, d'un agent IA sécurisé et, depuis peu, des factures électroniques. Le connecteur charge tout type de transaction.

Une fois chargée, chaque transaction est :

1. **catégorisée**, contrôlée et validée par le client ;
2. **répartie** entre TVA et HT, le cas échéant ;
3. **complétée** des transactions manquantes (taxe foncière, assurance...) ;
4. **comptabilisée**, pour produire à la fois une comptabilité de trésorerie et une comptabilité fiscale.

### Attributs

| **Attributs**                     | **Obligatoire** | **Description**                                                                      | **Valeur par défaut**                             | **Clé JSON**  | **Domaine de validité**                                                |
| --------------------------------- | :-------------: | ------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------- | ---------------------------------------------------------------------- |
| **Identifiant de la transaction** |       [x]       | Votre identifiant de transaction                                                     |                                                   | `id`          | Clé d'identification unique (chaîne de caractères)                     |
| **Date**                          |       [x]       | Date de la transaction                                                               | None                                              | `reqdExctnDt` | `YYYY-MM-DD`                                                           |
| **Identifiant de la propriété**   |       [x]       | Votre identifiant de propriété                                                       |                                                   | `id-prty`     | Clé d'identification unique (chaîne de caractères)                     |
| **Identifiant du locataire**      |                 | Votre identifiant de locataire, pour rattacher la transaction à un locataire du bien |                                                   | `id-tenant`   | Clé d'identification unique (chaîne de caractères)                     |
| **Montant**                       |       [x]       | Montant signé TTC                                                                    | Montant négatif = débit, Montant positif = crédit | `amt`         | Nombre décimal avec partie décimale séparée par un “.” (ex. : “13.56”) |
| **Devise**                        |                 | Devise normalisée                                                                    | `EUR`                                             | `ccy`         | `EUR`, `USD`, `GBP`                                                    |
| **Catégorie**                     |                 | Votre code catégorie                                                                 |                                                   | `purpose`     | Votre liste de catégories                                              |
| **Référence**                     |       [x]       | Description de la transaction                                                        | None                                              | `ref`         | Chaîne de caractères                                                   |

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
