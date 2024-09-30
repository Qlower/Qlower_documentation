---
sidebar_position: 2
---

# Architecture fonctionnelle

L’architecture globale des loaders 2.0 est articulée autour de plusieurs couches fonctionnelles, qui interagissent entre elles pour assurer le traitement fluide des données.

## Schéma fonctionnel

![Schema loader](/img/loader-schema.svg)

Le schéma ci-dessus présente les principaux blocs fonctionnels impliqués dans le processus :

1. **Utilisateur**  
   L'utilisateur dépose des fichiers JSON dans un bucket AWS S3.

2. **AWS S3**  
   Stocke les fichiers JSON soumis.

3. **AWS Lambda / Celery (Validation)**  
   Un premier module Lambda valide les fichiers JSON déposés.

4. **AWS Lambda / Celery (Traitement)**  
   Si la validation réussit, un deuxième module Lambda traite les données.

5. **AWS Lambda / Celery (Archivage)**  
   Si le traitement a lieu, le dossier est déplacé dans les sous-dossiers `success` ou `failure` du bucket S3 pour des audits futurs.

6. **BDD / Stockage**  
   Les données traitées sont ensuite sauvegardées dans un système de stockage ou une base de données (ex. S3, RDS, etc.).

7. **Monitoring**  
   Permet d’obtenir les résultats du processus de chargement par mail, tout en capturant les logs et métriques pour analyse.

Chaque couche est pensée pour être **extensible** et **indépendante**, permettant ainsi des ajustements ou des mises à jour sans perturber l’ensemble du système.

---

## Modules Impliqués

L’architecture des **loaders 2.0** inclut plusieurs modules fonctionnels, chacun étant responsable d'une étape spécifique du processus d’intégration des données :

- **Module d'ingestion des données**  
  Responsable de la réception des fichiers et flux de données entrants. Il supporte différents protocoles (SFTP, API) et formats (JSON), garantissant une flexibilité dans l’intégration des systèmes tiers.

- **Module de validation des données**  
  Applique des règles strictes pour s'assurer que les données sont conformes aux exigences. Les données invalides sont signalées via des rapports d’erreur, permettant aux partenaires de corriger les informations avant un nouveau traitement.

- **Module de transformation**  
  Normalise et reformate les données pour correspondre au modèle interne de Qlower. Ce module inclut également l’enrichissement des données avec des informations supplémentaires, ainsi que la gestion des règles métier spécifiques.

- **Module de traitement et d'intégration**  
  Après validation et transformation, les données sont traitées de manière asynchrone et intégrées dans les différents systèmes fonctionnels de Qlower (gestion locative, comptabilité, gestion des paiements, etc.).

- **Module de reporting et de notification**  
  Après traitement, ce module envoie des rapports détaillés sur l’état des opérations et des notifications en temps réel (par email ou via des webhooks) en cas de succès ou d’échec.

---

## Technologies Utilisées

Les **loaders 2.0** s’appuient sur une architecture moderne basée sur les services cloud d'AWS, principalement pour la réception et le traitement de fichiers JSON déposés sur un bucket AWS S3.

### Technologies Clés

- **AWS S3 (Simple Storage Service)**  
  Le dépôt des fichiers JSON s'effectue exclusivement via un bucket AWS S3. Ce service cloud assure un stockage sécurisé, résilient et hautement disponible, avec une scalabilité automatique selon le volume des fichiers entrants. S3 est conçu pour manipuler des quantités massives de données de manière fiable, tout en garantissant la persistance, l'accessibilité rapide et la sécurité des fichiers.

- **Format de fichier JSON**  
  Les loaders 2.0 acceptent exclusivement des fichiers au format JSON. Ce format est idéal pour représenter des données structurées, facilitant leur manipulation, validation et transformation. Il est largement utilisé dans les échanges de données, notamment dans les environnements web et cloud, en raison de sa lisibilité et de sa compatibilité avec de nombreux langages et outils.

---

Ce format améliore la lisibilité, avec des titres clairs, des listes ordonnées pour les étapes, et des paragraphes bien distincts.
