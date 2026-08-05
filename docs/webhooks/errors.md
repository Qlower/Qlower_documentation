---
sidebar_position: 5
---

# Échecs et reprises

## Codes de réponse

| Code | Interprétation | Notre action |
|------|----------------|--------------|
| **2xx** | Commande prise en charge | Terminé |
| **408, 409, 425, 429** | Surcharge ou conflit temporaire | Nouvelle tentative |
| **5xx** | Erreur de votre côté | Nouvelle tentative |
| **Timeout** (> 30 s) | Pas de réponse | Nouvelle tentative |
| **4xx** (autres) | Refus du payload | Échec définitif |

:::warning[Ne répondez jamais 4xx pour un incident de votre côté]
Un 4xx est lu comme un refus définitif : nous n'insistons pas et la commande est perdue. Une base
indisponible, une dépendance en timeout, une exception inattendue doivent renvoyer **5xx**.
:::

## Politique de reprise

Un échec transitoire est renvoyé jusqu'à 5 fois, avec un délai croissant :

| Tentative | Délai depuis la précédente |
|-----------|----------------------------|
| 2 | 30 secondes |
| 3 | 2 minutes |
| 4 | 10 minutes |
| 5 | 30 minutes |
| 6 | 1 heure |

Soit une fenêtre de rattrapage d'environ **2 h 45** : une indisponibilité plus courte que cela se
résorbe sans intervention. Chaque tentative re-signe le payload avec un horodatage frais.

Passé la dernière tentative, la commande est marquée en échec et n'est plus renvoyée automatiquement.
Nous conservons le journal de chaque tentative — horodatage, code HTTP, votre réponse — et pouvons
rejouer la livraison à votre demande.

## Déduplication

Les reprises impliquent que **vous recevrez parfois deux fois la même commande** : typiquement si votre
endpoint l'a traitée puis a expiré avant de répondre. L'`event_id` est stable d'une tentative à
l'autre, c'est votre clé.

Posez une **contrainte d'unicité** dessus plutôt qu'un test d'existence préalable : une lecture suivie
d'une écriture laisse passer deux tentatives simultanées. Et enregistrez-le dans la **même
transaction** que le traitement, sinon un échec à mi-parcours vous laisse avec un marqueur posé et un
travail inachevé, que nos reprises ne rattraperont pas. L'implémentation est dans
[Le webhook de commande](./webhook.md#implémentation).

## Répondre vite, traiter ensuite

Le plafond est de 30 secondes. Si votre traitement peut être long, accusez réception immédiatement et
travaillez en tâche de fond :

```javascript
app.post('/api/qlower/orders', async (req, res) => {
  validatePayload(req.body);
  await queue.add('process-order', req.body);
  res.status(200).json({ success: true });
});
```

Attention à la contrepartie : un 2xx nous fait considérer la commande livrée. Si votre file échoue
ensuite, nous ne le saurons pas et ne renverrons rien.

## Support

Adressez-vous à vos interlocuteurs habituels chez Qlower, en précisant :

- l'`event_id` ou l'`order_id` concerné
- l'environnement (staging ou production)
- les logs de votre endpoint, si vous les avez

L'un des deux identifiants nous suffit à retrouver le payload envoyé et l'historique complet des
tentatives.
