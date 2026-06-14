## Contexte
Le footer actuel (`src/components/oeko-footer.tsx`) regroupe les liens légaux (Mentions légales, Politique de confidentialité, Gérer mes cookies) dans la colonne **Coordonnées**, mélangés avec l'adresse, le téléphone et l'email. L'objectif est de les repositionner en bas du footer, sous la ligne de copyright, pour une meilleure séparation visuelle et une UX plus standard.

## Modifications prévues

### 1. Colonne "Coordonnées" (`src/components/oeko-footer.tsx`)
- Retirer les 3 éléments suivants de la liste `<ul>` de la colonne Coordonnées :
  - `Mentions légales`
  - `Politique de confidentialité`
  - `Gérer mes cookies`

### 2. Nouvelle barre de liens légaux (en dessous de la barre de copyright)
- Ajouter une nouvelle section (par exemple `<div class="border-t ...">`) juste après la barre de copyright existante, contenant :
  - Les 3 liens légaux alignés horizontalement avec un séparateur (ex: `·`)
  - Style discret et cohérent avec le footer existant (text-xs, couleurs `primary-foreground`, hover `accent`)

### Résultat attendu
Structure visuelle du footer :
```
[4 colonnes : Logo / Prestations / Certifications / Coordonnées]
--------------------------------------------------
© 2026 OEKO. Tous droits réservés.    |    Mention Phénix...
--------------------------------------------------
Mentions légales · Politique de confidentialité · Gérer mes cookies
```