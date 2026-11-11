# Reti di Calcolatori — appunti

Il sito si genera da solo dalle note Markdown (Obsidian) in questa cartella.

- **Modificare le note:** scrivi in Obsidian come sempre, poi `git add -A && git commit -m "note" && git push`. GitHub Actions ricostruisce il sito in ~1 minuto.
- **Anteprima locale:** `python3 .site/build.py && python3 -m http.server -d _site 8000` → http://localhost:8000
- **Codice del sito:** `.site/` (cartella nascosta, Obsidian la ignora). Titolo e nota indice in `.site/config.json`.

Funzioni: ricerca full-text (`/`), flashcard dalle callout `[!question]` con ripetizione dilazionata, avanzamento di studio, indice della nota, backlink, tema chiaro/scuro, modalità focus (`f`). Tutti i dati di studio restano nel browser.
