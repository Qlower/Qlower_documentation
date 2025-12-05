---
sidebar_position: 2
---

# Configuration

## Informations à fournir

Pour activer l'intégration Stripe, vous devez nous communiquer les informations suivantes :

| Information | Description | Exemple                                              |
|-------------|-------------|------------------------------------------------------|
| **Webhook URL (Staging)** | URL pour les tests | `https://staging.partner.com/api/comptappart/orders` |
| **Webhook URL (Production)** | URL pour la production | `https://api.partner.com/api/comptappart/orders`     |

---

## Prérequis techniques

Votre endpoint webhook doit respecter les exigences suivantes :

- ✅ Accepte `Content-Type: application/json`
- ✅ Retourne un code **2xx** (200, 201, 204) en cas de succès
- ✅ Retourne un code **4xx ou 5xx** en cas d'erreur
- ✅ Utilise **HTTPS** (requis pour la sécurité)
- ✅ Temps de réponse inférieur à **10 secondes**

---

## API Key (Optionnel)

Pour sécuriser davantage les webhooks, nous pouvons inclure une **API key** dans le header `X-API-KEY`.

### Pour activer :

1. Générez une clé secrète forte (minimum 32 caractères)
2. Communiquez-la nous de manière sécurisée
3. Nous la configurerons dans notre système
4. Vérifiez-la dans votre endpoint

### Exemple de vérification :

```javascript
const apiKey = req.headers['x-api-key'];
if (apiKey !== process.env.COMPTAPPART_API_KEY) {
  return res.status(401).json({ error: 'Unauthorized' });
}
```

---

## Environnements

### Staging (Tests)

- Utilise Stripe Test Mode
- Aucun vrai paiement
- Webhook envoyé vers votre endpoint de staging
- Factures PDF générées mais marquées "TEST"

**Carte de test Stripe :**
- Numéro : `4242 4242 4242 4242`
- Date : N'importe quelle date future
- CVC : N'importe quel code à 3 chiffres

### Production

- Vrais paiements Stripe
- Webhook envoyé vers votre endpoint de production
- Factures PDF officielles
- Emails envoyés aux vrais clients

---

## Processus d'intégration

1. Nous configurons votre endpoint dans notre système
2. Nous effectuons des tests en environnement staging
3. Validation conjointe des tests
4. Mise en production
