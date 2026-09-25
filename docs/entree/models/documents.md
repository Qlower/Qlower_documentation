---
sidebar_position: 5
---

# Document

Les **documents** regroupent des informations détaillées sur les fichiers associés aux propriétés immobilières.

### Attributs

| **Attributs**                   | **Obligatoire** | **Description**                                                                                                                   | **Valeur par défaut** | **Clé JSON**  | **Domaine de validité**                            |
| ------------------------------- | :-------------: | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ------------- | -------------------------------------------------- |
| **Identifiant du document**     |       [x]       | Votre identifiant de document                                                                                                     |                       | `id`          | Clé d'identification unique (chaîne de caractères) |
| **Identifiant de la propriété** |                 | Identifiant de la propriété associée. Requis si le document n'est pas imbriqué dans la section `documents` d'une propriété.       |                       | `propertyId`  | Clé d'identification unique (chaîne de caractères) |
| **Identifiant du déclarant**    |                 | Identifiant du déclarant associé, alternative à `propertyId` pour un document rattaché à un déclarant plutôt qu'à un bien précis. |                       | `declarantId` | Clé d'identification unique (chaîne de caractères) |
| **Nom du fichier**              |                 | Nom du fichier                                                                                                                    |                       | `fileName`    | Chaîne de caractères                               |
| **Type de fichier**             |                 | Type de fichier                                                                                                                   | None                  | `fileType`    | Code numérique représentant le type de fichier     |
| **Année**                       |       [x]       | Année du document                                                                                                                 |                       | `year`        | `YYYY`                                             |
| **Lien du fichier**             |       [x]       | URL du fichier                                                                                                                    |                       | `fileLink`    | URL valide                                         |

### JSON

```json
{
  "id": "9876543211234iddocuments",
  "propertyId": "PROP12345678AZERTY",
  "fileName": "Liasse 2022 Appartement XXX",
  "fileType": "26",
  "year": "2022",
  "fileLink": "https://liasse20220601a.pdf"
}
```
