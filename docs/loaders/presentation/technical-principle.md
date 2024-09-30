---
sidebar_position: 3
---

# Principe technique

Les **loaders 2.0** sont conçus pour automatiser le flux de données, de la récupération à l'enregistrement, tout en garantissant une transformation adéquate et la protection des informations sensibles. Cette section décrit les principales étapes du fonctionnement des loaders, en détaillant chaque phase du processus.

---

### Récupération des données

Le processus commence par la récupération des fichiers JSON déposés sur un bucket S3 AWS spécifique. Ces fichiers contiennent les données brutes à traiter et respectent un format strict pour être pris en charge par les loaders.

1. **Dépôt des fichiers JSON sur S3**  
   Les utilisateurs, ou systèmes tiers, déposent des fichiers JSON dans un emplacement spécifique du bucket S3, accessible via une URL préconfigurée ou par accès AWS (2 environnements sont disponibles : test et production).

2. **Validation initiale**  
   Lors du dépôt, le système effectue une validation basique du fichier pour vérifier qu’il respecte les conventions attendues :

   - Format JSON valide
   - Nommage respecté
   - Présence des champs obligatoires

3. **Mécanisme de récupération**  
   Un événement S3 déclenche l'exécution d'une fonction Lambda AWS, qui récupère les fichiers nouvellement déposés, les envoie au processus de transformation et les archive dans les sous-dossiers.

4. **Reprise sur erreur**  
   En cas de problème de récupération (fichier corrompu, permissions insuffisantes), le fichier est déplacé dans le sous-dossier `failure` et une notification est envoyée par mail. Il peut ensuite être traité manuellement ou redéposé.

---

### Interprétation des données

Une fois récupérées, les données brutes des fichiers JSON doivent être transformées pour être utilisables dans les systèmes en aval. Cette étape assure la **normalisation** et l’**enrichissement** des informations.

1. **Validation approfondie des fichiers**  
   Avant toute transformation, une validation approfondie est réalisée pour vérifier :

   - La structure des objets JSON (champs obligatoires, types de données corrects, formats respectés, etc.)
   - Cohérence entre l’en-tête et le nom du fichier
   - Présence de l’en-tête complet et des champs obligatoires
   - Cohérence de la date d’émission
   - Nature du fichier reconnue
   - Compte Qlower du partenaire reconnu
   - Cohérence entre le compte Qlower et le nom de l’émetteur du fichier

     :::danger[Doublons]
     Si une transaction avec le même identifiant existe déjà dans Qlower, elle ne sera pas recréée.
     :::

2. **Authentification**  
   Avant l'importation, une vérification est effectuée sur l'en-tête du fichier JSON pour s'assurer qu'il appartient bien à l'organisation déposante et que l'authentification est conforme. Les erreurs de validation sont consignées et remontées par mail.

3. **Transformation et mapping**  
   Les données brutes sont ensuite **mappées** et **transformées** en fonction des besoins des systèmes cibles.

4. **Gestion des exceptions**  
   En cas d’anomalies (ex. : propriété inexistante pour l’import d’une transaction), l’ensemble du fichier traitable est traité, tandis que le fichier JSON est déplacé dans le sous-dossier `Failure`. Les anomalies sont consignées et remontées par mail.

---

### Protection des données

La protection des données est une priorité dans l’architecture des loaders, que ce soit pendant la récupération, la transformation ou l’enregistrement. Plusieurs mesures sont mises en œuvre pour garantir la sécurité des informations sensibles.

1. **Chiffrement des données**  
   Les fichiers stockés dans le bucket S3 sont **chiffrés au repos** grâce au chiffrement S3-SSE (Server-Side Encryption), garantissant que seuls les utilisateurs autorisés peuvent accéder aux données.

2. **Gestion des accès et permissions**  
   L’accès aux fichiers JSON sur le bucket S3 est contrôlé via des politiques **AWS IAM** (Identity and Access Management).

   - Seuls les utilisateurs et rôles ayant des permissions spécifiques peuvent déposer ou récupérer des fichiers.
   - L’accès aux fichiers et aux systèmes cibles (bases de données, autres systèmes de stockage) est géré par des mécanismes d'authentification robustes (IAM, clés d'API, etc.).

3. **Audits et traçabilité**  
   Chaque interaction avec les fichiers (dépôt, transformation, enregistrement) est loguée. Cela permet de retracer l'historique des actions en cas de besoin, par exemple lors d’audits de sécurité ou d’investigations post-incidents.

   - Chaque fichier est renommé avec la date du processus lors du chargement, facilitant l'archivage des imports.
   - Chaque objet loader (transactions, propriétés, etc.) dispose d’un **ID externe** permettant la traçabilité de la base de données du partenaire à celle de Qlower.

4. **Conformité RGPD**  
   Pour assurer la conformité avec le **RGPD**, un message spécifique est prévu dans le loader **Caractéristiques**. Si ce message est positionné à “R” (pour “remove”), Qlower procédera à la suppression des données dans l’application ainsi que tout ce qu’elle contient (propriétés, baux, documents, transactions) :

   - Envoi des informations comptables historiques si nécessaire
   - Suppression de l’ensemble des données caractéristiques
   - Suppression des transactions comptables
   - Suppression des documents associés

   Aucun historique ne sera récupérable après cette suppression.

---
