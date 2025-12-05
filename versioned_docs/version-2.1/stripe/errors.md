---
sidebar_position: 6
---

# Gestion des erreurs

## Codes de réponse

| Code | Description | Action ComptAppart |
|------|-------------|-------------------|
| **200-299** | Succès | Notification complétée |
| **400-499** | Erreur client | Pas de retry, alerte envoyée |
| **500-599** | Erreur serveur | **Retry automatique** (3 tentatives) |
| **Timeout** | Pas de réponse en 10s | Retry automatique |

### Politique de retry

En cas d'échec (5xx ou timeout) :

| Tentative | Délai |
|-----------|-------|
| Tentative 1 | Immédiate |
| Tentative 2 | Après 5 minutes |
| Tentative 3 | Après 30 minutes |

Après 3 échecs : notification marquée comme **définitivement échouée**.

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

### Timeout (> 10s)

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
- Nombre de retries

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
