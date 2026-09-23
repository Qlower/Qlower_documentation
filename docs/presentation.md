---
sidebar_position: 2
---

# Architecture

L'architecture des loaders 2.0 de Qlower est conçue pour une intégration fluide et sécurisée de vos données. Elle gère l'ensemble du processus, de la réception à l'intégration finale dans la plateforme.

## Flux de données simplifié

Le processus d'intégration des données suit un pipeline structuré :

1.  **Envoi des données** : Vous envoyez vos données JSON à Qlower, soit via l'API REST pour un traitement en temps réel, soit en déposant des fichiers JSON sur un bucket AWS S3 pour des traitements par lots.
2.  **Validation et Transformation** : Les données reçues sont automatiquement validées et transformées pour s'adapter au format interne de Qlower.
3.  **Intégration** : Les données validées sont intégrées dans les systèmes fonctionnels de Qlower.
4.  **Notification** : Vous recevez une notification (via la réponse API ou par email) confirmant le statut du traitement (succès, succès partiel ou échec).

## Sécurité et Conformité

La protection de vos données est une priorité. L'architecture intègre des mécanismes de sécurité robustes :

-   **Chiffrement des données** : Les données sont chiffrées au repos et en transit.
-   **Gestion des accès** : Les accès sont strictement contrôlés via des mécanismes d'authentification et d'autorisation.
-   **Audit et Traçabilité** : Toutes les opérations sont journalisées pour assurer un suivi précis et la conformité.
-   **Conformité RGPD** : Les processus respectent les exigences du RGPD pour la gestion des données personnelles.

Pour plus de détails sur les méthodes d'envoi, consultez la section [Intégration](./integration/api).
