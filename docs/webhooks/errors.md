---
sidebar_position: 6
---

# Gestion des erreurs

## Codes de réponse

| Code | Description | Action ComptAppart |
|------|-------------|-------------------|
| **200-299** | Succès | Notification complétée |
| **408, 409, 425, 429** | Surcharge ou conflit temporaire | Nouvelle tentative |
| **400-499** (autres) | Erreur client | Échec définitif, aucune nouvelle tentative |
| **500-599** | Erreur serveur | Nouvelle tentative |
| **Timeout** | Pas de réponse en 30s | Nouvelle tentative |

Les échecs transitoires sont renvoyés jusqu'à 5 fois (30 s, 2 min, 10 min, 30 min, 1 h), soit une
fenêtre de rattrapage d'environ 2 h 45 — voir [En cas d'échec](./webhook#en-cas-déchec).

:::warning[Ne répondez jamais 4xx pour un problème de votre côté]
Un 4xx (hors 408/409/425/429) est lu comme un refus définitif du payload : nous n'insistons pas et la
commande est perdue. Une base indisponible, une dépendance en timeout, une exception inattendue
doivent renvoyer **5xx** pour déclencher une nouvelle tentative.
:::

---

## Erreurs courantes

### Erreur 401 - API Key invalide

```javascript
const apiKey = req.headers['x-api-key'];
if (apiKey !== process.env.COMPTAPPART_API_KEY) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

### Erreur 400 - Payload invalide

```javascript
const { event_type, order_id, customer, order, invoice } = req.body;
if (!event_type || !order_id || !customer || !order || !invoice) {
  return res.status(400).json({ error: 'Missing required fields' });
}
```

### Erreur 500 - Exception non gérée

```javascript
app.post('/api/comptappart/orders', async (req, res) => {
  try {
    await processOrder(req.body);
    res.status(200).json({ success: true });
  } catch (error) {
    logger.error('Webhook error', { error: error.message, order_id: req.body.order_id });
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
```

### Timeout (> 30s)

**Solution** : Traitement asynchrone

```javascript
app.post('/api/comptappart/orders', async (req, res) => {
  // Valider rapidement
  validatePayload(req.body);

  // Ajouter à une queue
  await queue.add('process-order', req.body);

  // Répondre immédiatement
  res.status(200).json({ success: true });
});
```

---

## Monitoring

**Métriques à surveiller :**
- Taux de succès des webhooks
- Temps de réponse moyen
- Taux d'erreur par type

**Logs recommandés :**
```javascript
logger.info('Webhook received', {
  order_id: req.body.order_id,
  event_type: req.body.event_type
});

logger.error('Webhook failed', {
  order_id: req.body.order_id,
  error: error.message
});
```

---

## Support

### Informations à fournir

En cas d'incident, communiquez-nous :
- Order ID ou Event ID
- Timestamp de l'événement
- Logs de votre endpoint
- Code d'erreur retourné
- Environnement (staging/production)

### Contact

- Email : support@comptappart.com
