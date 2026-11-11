---
tags: [RetiDiCalcolatori/satelliti]
---

# 🛰️ Satelliti

← [[Reti di Calcolatori|Indice del corso]]

## Concetti generali

I satelliti di comunicazione si classificano per **altitudine dell'orbita**: **LEO**, **MEO**, **GEO** (+ orbite particolari come HEO, SSO).

### Fasce di Van Allen

Due regioni attorno alla Terra dove il campo magnetico terrestre intrappola particelle cariche (protoni, elettroni) dal vento solare e dai raggi cosmici — **danneggiano l'elettronica** in poco tempo, quindi le orbite si scelgono preferibilmente **fuori** da esse. Non sono "atmosferiche": sono nella magnetosfera, ben oltre l'atmosfera.

- Fascia interna: ≈ 1.000 – 6.000 km
- Fascia esterna: ≈ 13.000 – 60.000 km (più intensa verso 15.000–20.000 km)

### Footprint

Ogni satellite irradia un **cono** di segnale verso Terra: l'area coperta è il **footprint**.

- Più il satellite è **alto**, più il footprint è **ampio**.
- I satelliti moderni usano **spot beam**: fasci stretti su zone specifiche, per riusare le frequenze.

### Potenza e distanza

L'attenuazione nello spazio libero cresce col **quadrato della distanza** (e col quadrato della frequenza) → satellite più lontano = più potenza o antenne più grandi richieste (vedi [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]]).

### Frequenze usate

Microonde (GHz) perché: più banda disponibile, antenne più piccole e direttive, attraversano la ionosfera (le basse frequenze vengono riflesse). Svantaggio: non superano ostacoli → serve **linea di vista**; pioggia/neve attenuano il segnale (**rain fade**, specie in banda Ka).

| Banda | Frequenza |
|---|---|
| L | 1–2 GHz |
| S | 2–4 GHz |
| C | 4–8 GHz |
| Ku | 12–18 GHz |
| Ka | 26–40 GHz |

**Uplink** (Terra→satellite) e **downlink** (satellite→Terra) usano frequenze diverse per non interferire. Il **transponder** riceve, amplifica e ritrasmette il segnale.

---

## LEO — Low Earth Orbit (≈ 200–2.000 km)

Sotto la fascia di Van Allen interna (alcuni testi estendono il limite fino a ~5.000 km).

**Vantaggi**: bassa latenza (pochi ms, ok per voce/video/gaming); poca potenza richiesta (anche telefoni satellitari); lancio più economico.

**Svantaggi**: orbita in 90–120 min, visibile da un punto per pochi minuti; servono **costellazioni**; serve **handover** tra satelliti; vita operativa più breve (attrito atmosferico residuo).

| Esempio | Dettagli |
|---|---|
| **Iridium** | 66 satelliti attivi, ~780 km, copre i poli, comunicano **tra loro** (inter-satellite link) |
| **Globalstar** | ~48 satelliti, ~1.400 km, "ripetitore" — segnale sempre via stazioni a terra |
| **Starlink / OneWeb** | mega-costellazioni moderne, banda larga; Starlink migliaia di satelliti, ~550 km |

## MEO — Medium Earth Orbit (≈ 5.000–20.000 km)

Tra le due fasce di Van Allen. Periodo orbitale: ore → ~12h. Latenza intermedia tra LEO e GEO; servono meno satelliti di LEO, più che GEO.

> [!warning] Errore comune
> Lo **Sputnik 1** (1957) NON era in MEO ma in **LEO** (~215–940 km). I primi satelliti erano quasi tutti in orbita bassa perché più facile da raggiungere.

### GNSS (sistemi di navigazione satellitare)

**GPS** (USA): ~31 satelliti operativi a **~20.200 km**, periodo ~12h.

**Come funziona**: ogni satellite trasmette posizione + ora esatta (orologi atomici) → il ricevitore misura il tempo di arrivo → ne deriva la distanza → interseca le distanze da più satelliti = **trilaterazione** (non triangolazione, che usa gli angoli). Servono **almeno 4 satelliti**: 3 per le coordinate, 1 per correggere l'errore dell'orologio del ricevitore.

| Sistema | Paese | Altitudine |
|---|---|---|
| GPS | USA | ~20.200 km |
| Galileo | UE | ~23.200 km |
| GLONASS | Russia | ~19.100 km |
| BeiDou | Cina | MEO + GEO |

Varianti: **servizio civile/militare** (il militare più preciso e cifrato), **DGPS** (stazioni a terra correggono l'errore, precisione sub-metrica), **A-GPS** (rete cellulare velocizza il primo aggancio), **RTK** (precisione centimetrica — topografia, agricoltura di precisione).

## GEO — Geostationary Earth Orbit (35.786 km)

Sopra l'equatore, ben oltre le fasce di Van Allen. Orbita in **24h** = stessa rotazione della Terra → il satellite appare **fermo nel cielo** (antenne fisse, parabole TV).

**Vantaggi**: footprint enorme — **3 satelliti** coprono quasi tutta la Terra (idea di Arthur C. Clarke, 1945); niente handover né inseguimento.

**Svantaggi**: latenza alta (~250–280 ms solo andata, oltre 500 ms andata/ritorno — fastidiosa per telefonate/videogiochi); serve molta potenza e antenne grandi; **regioni polari non coperte**; posizioni orbitali assegnate dall'**ITU**.

Usi: TV satellitare (Eutelsat Hot Bird), meteo (Meteosat), Internet satellitare "classico".

## Altre orbite

- **HEO** (Highly Elliptical Orbit): orbite molto ellittiche (es. **Molniya**), per zone ad alta latitudine (Russia) dove i GEO si vedono troppo bassi.
- **SSO** (Sun-Synchronous Orbit): LEO quasi polare, passa sopra ogni zona sempre alla stessa ora solare → osservazione della Terra.

## Collegamenti
- [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]]
- [[Televisione digitale e satellitare]]
- [[Glossario e formulario]]
