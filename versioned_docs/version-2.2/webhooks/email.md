---
sidebar_position: 4
---

# Email et facture

## Ce que le client reçoit

Après chaque règlement, nous envoyons automatiquement au client un email de confirmation avec sa
facture PDF en pièce jointe, dans la minute qui suit la confirmation du paiement. La facture est
conforme (TVA, mentions légales) et porte votre marque.

Vous n'avez rien à envoyer de votre côté, et rien à faire pour que cela se produise.

## Ce que vous recevez

La même facture vous est accessible via le bloc `invoice` du webhook — URL signée valide 7 jours,
numéro, nom de fichier. Les détails sont dans [Le webhook de commande](./webhook.md#invoice).

Si vous devez archiver la facture, téléchargez-la à la réception plutôt que de conserver l'URL.
