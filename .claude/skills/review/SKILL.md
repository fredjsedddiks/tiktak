---
invoke: user
---

# Review

Review complet du projet tiktak avant ou après modification.

## Étapes

1. **Lis `tictactoe.html`** en entier.

2. **Review du code** — vérifie les points suivants :
   - Logique de jeu : `play()`, `checkWin()`, détection de match nul, alternance des joueurs
   - Cohérence entre `cells`, `currentPlayer`, `gameOver` et le DOM rendu par `render()`
   - CSS : lisibilité, états `.x`, `.o`, `.win`, hover, disabled
   - Accessibilité : boutons avec texte, états disabled corrects
   - Pas de bug évident (ex. double-clic, état post-victoire)

3. **Review avant push** — si des modifications ont été faites dans cette session :
   - Résume ce qui a changé par rapport à la version précédente
   - Signale tout effet de bord potentiel
   - Propose un message de commit clair

4. **Rapport final** — structure ta réponse ainsi :
   - OK Ce qui est bon
   - WARN Points à améliorer (avec ligne dans le fichier si possible)
   - PUSH Suggestion de message de commit (si applicable)
