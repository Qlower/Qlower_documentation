---
sidebar_position: 1
---

# Fonctionnalités

A ce jour les loaders existants **(Caractéristiques, Transactions, Documents**) permettent de répondre aux besoins suivants :

| Activité                       | Offre Qlower                                                                                                                                                                                                                                                 | Caractéristiques | Transactions | Documents |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------: | :----------: | :-------: |
| **Gestion Locative**           | Un partenaire qui a un outil de gestion locative, peut enrichir son offre en appelant Qlower pour assurer la gestion de la comptabilité locative (entrée, sorties, échus, encaissements, actualisation, calculs de commissions, virements, quittancement...) |       [x]        |     [ ]      |    [ ]    |
| **Formalités administratives** | Qlower dispose du statut de formaliste auprès du Greffe. Ainsi, les partenaires peuvent proposer des prestations à la carte comme une déclaration d’activité P0i, FCMB, P2P4i par exemple30                                                                  |       [x]        |     [ ]      |    [x]    |
| **Gestion comptable**          | Dans le cas d’une gestion déléguée, un partenaire peut alimenter comptabilité à partir du CRG. Qlower se chargera de compléter ces informations. Un CRG est considéré ici comme un ensemble de transactions.                                                 |       [x]        |     [x]      |    [x]    |

Techniquement les loaders peuvent fonctionner suivant différentes modalités, à des rythmes différents :

| Activité                           | Modalités                                                                                                                                                                                 | Caractéristiques | Transactions | Documents |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------: | :----------: | :-------: |
| **Batch automatique hebdomadaire** | Toutes les nuits le partenaire dépose une fichier complet de ses informations, créations comme mises à jour, informations qui sont elles-mêmes mises à jour dans son environnement Qlower |       [x]        |     [x]      |    [x]    |
| **Batch manuel**                   | En cours de journée, le partenaire a la possibilité de demander un lancement manuel des fichiers présents dans son espace                                                                 |       [x]        |     [ ]      |    [ ]    |
| **API**                            | Intégration du load via un système d'api REST                                                                                                                                             |       [ ]        |     [ ]      |    [ ]    |
