---
sidebar_position: 2
---

# Architecture

L'architecture du connecteur Qlower est conçue pour une intégration fluide et sécurisée de vos données. Elle gère l'ensemble du processus, de la réception de vos loads à la restitution de vos dossiers.

## Flux de données simplifié

Le processus d'intégration des données suit un pipeline structuré :

1.  **Envoi des données** : Vous envoyez vos données JSON à Qlower, soit via l'API REST pour un traitement en temps réel, soit en déposant des fichiers JSON sur un bucket AWS S3 pour des traitements par lots.
2.  **Validation et Transformation** : Les données reçues sont automatiquement validées et transformées pour s'adapter au format interne de Qlower.
3.  **Intégration** : Les données validées sont intégrées dans les systèmes fonctionnels de Qlower.
4.  **Accusé de réception** : Vous recevez un accusé de réception (dans la réponse de l'API ou par email) qui confirme le statut du traitement (succès, succès partiel ou échec) et, pour un load envoyé par l'API REST, le lien du Welcome Dashboard de chaque client.
5.  **Restitution** : Vous pouvez récupérer en [sortie](./sorties/presentation.md) l'état à jour de vos clients, les paiements effectués et, dès début 2027, leurs prévisionnels.

## Sécurité et Conformité

La protection de vos données est une priorité. L'architecture intègre des mécanismes de sécurité robustes :

-   **Chiffrement des données** : Les données sont chiffrées au repos et en transit.
-   **Gestion des accès** : Les accès sont strictement contrôlés via des mécanismes d'authentification et d'autorisation.
-   **Audit et Traçabilité** : Toutes les opérations sont journalisées pour assurer un suivi précis et la conformité.
-   **Conformité RGPD** : Les processus respectent les exigences du RGPD pour la gestion des données personnelles.

Pour plus de détails sur les méthodes d'envoi, consultez la section [Intégration](./entree/integration/api.md).
