# Guide de Versioning de la Documentation

Ce guide explique comment créer et gérer les versions de la documentation.

## Créer la version 3.0.0

### Étape 1 : Commiter vos changements actuels

```bash
git add .
git commit -m "Refonte complète de la documentation - Version 3.0.0"
```

### Étape 2 : Créer la version 3.0.0

```bash
npm run docusaurus docs:version 3.0
```

Cette commande va :

- Créer un dossier `versioned_docs/version-3.0/` avec une copie de vos docs actuels
- Créer un fichier `versioned_sidebars/version-3.0-sidebars.json`
- Marquer la version 3.0 comme version actuelle

### Étape 3 : Vérifier la configuration

Après avoir créé la version, votre `docusaurus.config.ts` devrait automatiquement avoir :

```typescript
docs: {
  sidebarPath: "./sidebars.ts",
  versions: {
    current: {
      label: "3.0.0",
      path: "3.0",
    },
    "2.0": {
      label: "2.0.0",
      path: "2.0",
    },
  },
},
```

### Étape 4 : Tester localement

```bash
npm run start
```

Vous devriez voir un sélecteur de version dans la navbar qui permet de basculer entre les versions.

## Structure après versioning

```
docs/                    # Version actuelle (3.0.0) - en développement
versioned_docs/
  version-2.0/          # Version précédente (si elle existe)
  version-3.0/          # Version 3.0.0 figée
versioned_sidebars/
  version-2.0-sidebars.json
  version-3.0-sidebars.json
```

## Workflow recommandé

1. **Développement** : Travaillez dans `docs/` (version actuelle)
2. **Création de version** : Quand vous êtes prêt, créez une nouvelle version avec `npm run docusaurus docs:version X.Y`
3. **Déploiement** : La version actuelle sera automatiquement la dernière créée

## Commandes utiles

- `npm run version:create X.Y` : Créer une nouvelle version (ex: `npm run version:create 3.0`)
- `npm run version:delete X.Y` : Supprimer une version (ex: `npm run version:delete 2.0`)
- `npm run start` : Tester avec toutes les versions
- `npm run build` : Builder avec toutes les versions

## Notes importantes

- Les versions sont figées : une fois créée, une version ne change plus
- La version actuelle (`docs/`) est toujours la dernière version en développement
- Les liens entre versions sont automatiquement gérés par Docusaurus
- Le sélecteur de version apparaît automatiquement dans la navbar quand il y a plusieurs versions
