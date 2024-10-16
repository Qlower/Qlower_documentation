---
sidebar_position: 1
---

# Présentation

L'architecture des loaders 2.0 repose sur une **infrastructure cloud évolutive** et **modulaire**, principalement basée sur les services **AWS** (Amazon Web Services). Chaque étape du traitement des données, depuis leur réception jusqu'à leur stockage, est soigneusement orchestrée pour assurer fluidité, sécurité et extensibilité.

#### Schéma d’Architecture

L'architecture suit un **pipeline structuré** composé de plusieurs modules fonctionnels interconnectés :

1. **Utilisateur** : L'utilisateur (ou le système tiers) dépose des fichiers JSON contenant les données (ex. : transactions, caractéristiques de biens, documents) dans un **bucket AWS S3**.
2. **AWS S3 (Stockage des données)** : Les fichiers sont stockés dans un bucket sécurisé S3, qui sert de point d'entrée central pour le traitement des données. S3 garantit une **haute disponibilité** et la **scalabilité automatique**, adaptée au volume des fichiers entrants.

3. **AWS Lambda/Celery (Validation)** : Dès qu’un fichier JSON est déposé, un **événement S3** déclenche une **fonction AWS Lambda** ou un worker Celery qui valide les fichiers. Cette validation initiale vérifie que le format JSON est correct et que tous les champs obligatoires sont présents.

4. **AWS Lambda/Celery (Traitement)** : Si la validation réussit, un deuxième module Lambda prend en charge le **traitement des données**. Cela inclut la normalisation, la transformation des données au format Qlower, et l'enrichissement si nécessaire (comme l’ajout de données manquantes ou calculées).

5. **Archivage et gestion des erreurs** : Après traitement, les fichiers JSON sont déplacés dans des sous-dossiers "success" ou "failure" dans S3, en fonction de l’issue. Cela permet une **traçabilité** complète pour les audits ou corrections futures.

6. **BDD / Stockage** : Une fois transformées et validées, les données sont sauvegardées dans les systèmes fonctionnels de Qlower (ex. : bases de données relationnelles comme **AWS RDS**, stockage S3 pour les documents ou autres systèmes internes).

7. **Monitoring et Notifications** : Un **module de monitoring** envoie des **notifications en temps réel** (par email ou via des webhooks) à l'utilisateur pour indiquer le statut du traitement (succès ou échec). Il capture également les logs et métriques pour faciliter l'analyse et la résolution des erreurs.

---

### Ordonnancement des Services

Le **flux de traitement des loaders** repose sur un **ordonnancement asynchrone** qui garantit l'efficacité et la flexibilité du système. Il permet une gestion fluide des données à différentes fréquences et modes, en fonction des besoins du partenaire.

#### 1. **Modes d’Intégration**

- **Photo quotidienne (Batch)** : Chaque nuit, les partenaires peuvent déposer un **instantané complet** (photo) de leurs données. Ce traitement batch assure la mise à jour quotidienne des informations dans la plateforme Qlower, permettant d’intégrer à la fois les nouvelles données et les mises à jour.
- **Rafraîchissement intraday (Batch + API)** : En cours de journée, il est possible de **rafraîchir** les données en fonction des changements depuis la dernière photo, grâce à un traitement par lot intraday. Cela garantit une **mise à jour plus rapide**, adaptée à des environnements plus dynamiques.

- **Mode fil de l’eau (API)** : Ce mode utilise une **API temps réel** pour répliquer instantanément les modifications faites dans le système partenaire vers la plateforme Qlower. Chaque modification est traitée à la volée, assurant une **synchronisation en temps réel**.

#### 2. **Étapes du Processus de Traitement**

Les étapes suivantes sont orchestrées de manière séquentielle et asynchrone pour maximiser l'efficacité :

- **Ingestion des données** : Les fichiers JSON sont déposés sur S3 et immédiatement validés par une fonction Lambda. Cette validation se fait en parallèle pour chaque fichier déposé.
- **Validation initiale** : Si le fichier est valide (nommage respecté, champs obligatoires présents), il est envoyé au module de transformation. En cas d’échec (ex. : fichier corrompu ou incomplet), il est archivé dans un sous-dossier "failure", et une notification est envoyée.

- **Transformation et mapping** : Les données valides sont transformées et mappées selon le modèle interne de Qlower. Ce processus peut inclure des étapes d’enrichissement et de validation métier spécifique (ex. : vérification de la cohérence des transactions ou des propriétés).

- **Intégration asynchrone** : Les données traitées sont intégrées aux systèmes fonctionnels de Qlower (comptabilité, gestion locative, paiements, etc.). Cela se fait de manière asynchrone pour éviter tout blocage dans le pipeline de traitement.

- **Archivage et Reporting** : À la fin du processus, les fichiers JSON sont déplacés dans des sous-dossiers d’archivage (success ou failure). Les résultats du traitement sont rapportés via des emails ou webhooks, et des rapports détaillés sont générés pour analyse ultérieure.

---

### Technologies Clés Utilisées

- **AWS S3** : Stockage sécurisé et scalable pour la réception des fichiers.
- **AWS Lambda** : Exécution sans serveur pour la validation, transformation et traitement des données.
- **Celery** : Outil de traitement asynchrone pour orchestrer les tâches en arrière-plan et gérer les workloads élevés.
- **JSON** : Format de fichier standardisé pour la manipulation et l’échange de données entre les systèmes partenaires et Qlower.

---

### Sécurité et Conformité

La protection des données est assurée à chaque étape :

- **Chiffrement des données** (S3-SSE) au repos pour protéger les fichiers stockés.
- **IAM (Identity and Access Management)** d’AWS pour limiter l'accès aux fichiers et aux systèmes de traitement.
- **Audit et Traçabilité** : Chaque interaction avec les fichiers est journalisée, permettant un suivi précis des opérations pour la conformité et les audits de sécurité.
- **Conformité RGPD** : En cas de demande de suppression, le loader "Caractéristiques" supprime toutes les données associées (propriétés, transactions, documents, etc.).

---

Grâce à cette architecture modulaire et cet ordonnancement flexible, les loaders 2.0 de Qlower permettent de **gérer efficacement des volumes massifs de données** tout en maintenant des niveaux élevés de **sécurité**, de **traçabilité** et de **conformité** aux régulations comme le RGPD.
