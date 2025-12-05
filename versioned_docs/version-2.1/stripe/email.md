---
sidebar_position: 4
---

# Email et Facture PDF

## Envoi automatique au client

Après chaque paiement réussi, **nous envoyons automatiquement** :

- ✅ Email au client avec facture PDF en pièce jointe
- ✅ Envoi immédiat (< 1 minute après confirmation Stripe)
- ✅ Facture conforme (TVA, mentions légales)

---

## Accès à la facture dans le webhook

L'URL de la facture PDF est fournie dans le webhook :

```json
{
  "invoice": {
    "pdf_url": "https://qlower-documents.s3.eu-west-3.amazonaws.com/...",
    "number": "FQCA-2025-000156"
  }
}
```

**⚠️ Important :** L'URL est valide pendant **24 heures** pour des raisons de sécurité. Si vous devez conserver la facture, téléchargez-la immédiatement.
