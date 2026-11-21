---
tags: [RetiDiCalcolatori/glossario]
---

# 📖 Glossario e formulario

← [[Reti di Calcolatori|Indice del corso]]

## Formule chiave

| Formula | Significato | Fonte |
|---|---|---|
| $s(t) = A\sin(2\pi ft + \varphi)$ | segnale periodico | [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]] |
| $T = 1/f$ | periodo | ↑ |
| $\lambda = v/f$ | lunghezza d'onda | ↑ |
| $B = f_{max} - f_{min}$ | larghezza di banda | ↑ |
| $\text{bitrate} = \text{baudrate} \times \log_2(V)$ | relazione bit/baud rate | ↑ |
| $C = 2B\log_2(V)$ | **Nyquist** — capacità canale senza rumore | ↑ |
| $C = B\log_2(1+S/N)$ | **Shannon** — capacità canale con rumore | ↑ |
| $10\log_{10}(S/N)$ | S/N in decibel (30 dB = S/N 1000) | ↑ |
| attenuazione ∝ distanza² | perdita di segnale nello spazio libero | [[Satelliti (LEO, MEO, GEO)]] |
| $RS(n,k)$ corregge $(n-k)/2$ simboli | capacità di correzione Reed-Solomon | [[Codici di correzione errori (Reed-Solomon, CRC, LDPC)]] |
| $1011 = x^3+x+1$ | stringa binaria → polinomio (CRC) | ↑ |
| $2e + s \leq n - k$ | RS: e errori + s cancellazioni correggibili | [[Codici di correzione errori (Reed-Solomon, CRC, LDPC)]] |
| $d \geq e+1$ / $d \geq 2e+1$ | distanza minima per rilevare / correggere e errori | ↑ |
| $(m + r + 1) \leq 2^r$ | bit di controllo Hamming per correggere 1 errore | ↑ |
| code rate $= k/n$ | frazione di bit utili in un codeword | ↑ |
| $U = T_{frame}/(T_{frame}+RTT)$ | efficienza Stop and Wait | [[Livello data-link (controllo di flusso, Stop and Wait)]] |
| bandwidth × RTT | bit "in volo" sul canale | [[Livello data-link (controllo di flusso, Stop and Wait)]] |
| $S\cdot T = 0$, $S\cdot S = 1$, $S\cdot(-S)=-1$ | ortogonalità dei codici CDMA | [[Telefonia mobile — 0G, 1G, 2G e CDMA]] |

## Tabella orbite satellitari

| Orbita | Altitudine | Latenza | Esempio |
|---|---|---|---|
| LEO | 200–2.000 km | bassa (ms) | Starlink, Iridium |
| MEO | 5.000–20.000 km | media | GPS, Galileo |
| GEO | 35.786 km | alta (250–280+ ms) | Meteosat, TV satellitare |

## Tabella modulazioni

| Sigla | Divide... | Dove |
|---|---|---|
| ASK | ampiezza | modem base |
| FSK | frequenza | modem base |
| PSK / QPSK | fase | modem, satellite TV |
| QAM | ampiezza + fase | digitale terrestre, DOCSIS |
| OFDM | tante sottoportanti ortogonali | digitale terrestre (anti-echi) |

## Tabella multiplexing

| Sigla | Divide | Dove |
|---|---|---|
| FDM | frequenze | 1G AMPS, fibra ottica (colori) |
| TDM | tempo | 2G D-AMPS/GSM, PON |
| CDMA | codici | 2G americano IS-95, base 3G |

## Glossario rapido (ordine alfabetico)

- **ACK** — conferma di ricezione di un frame, vedi [[Livello data-link (controllo di flusso, Stop and Wait)]]
- **A-GPS** — Assisted GPS: la rete cellulare aiuta il primo aggancio ai satelliti
- **ARQ** — Automatic Repeat reQuest: rilevazione + ritrasmissione su timeout
- **ASK/FSK/PSK** — modulazioni base per ampiezza/frequenza/fase, vedi [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]
- **Baud rate** — simboli al secondo
- **Bit rate** — bit al secondo
- **CDMA** — accesso multiplo a divisione di codice, vedi [[Telefonia mobile — 0G, 1G, 2G e CDMA]]
- **CRC** — Cyclic Redundancy Check, solo rilevazione errori tramite resto polinomiale (CRC-32: zip, PNG, Ethernet)
- **DGPS** — Differential GPS, correzione via stazioni a terra
- **Distanza di Hamming** — numero di bit diversi tra due codeword
- **Erasure** — cancellatura netta (es. graffio): errore di posizione nota, più facile da correggere
- **FEC** — Forward Error Correction: il ricevente corregge da solo, senza ritrasmissione
- **Footprint** — area coperta dal cono di segnale di un satellite
- **Framing** — delimitazione dei frame nel flusso di bit (flag + bit/byte stuffing)
- **FTTC/FTTB/FTTH** — fibra fino all'armadietto / al piano / a casa, vedi [[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]]
- **Hamming** — codice di correzione che lavora sui singoli bit
- **Handoff / Handover** — passaggio di una chiamata da una cella/satellite a un altro
- **IMSI / Ki / SRES** — identificativi e segreti della SIM per l'autenticazione
- **ITU** — ente che assegna le posizioni orbitali GEO
- **LDPC** — Low Density Parity Check, codice vicino al limite di Shannon, decoding lento
- **Local loop** — ultimo miglio, collegamento casa↔centrale, spesso ancora analogico
- **MAHO** — Mobile Assisted HandOff, l'handoff deciso dal telefono (da 2G)
- **Near-far problem** — in CDMA, un telefono vicino "copre" quelli lontani
- **OFDM** — FDM ortogonale, combatte gli echi nel digitale terrestre
- **PCM** — Pulse Code Modulation, digitalizzazione della voce (8000 campioni/s × 8 bit)
- **Piggybacking** — ACK attaccato ai dati in uscita invece che inviato da solo
- **PON** — Passive Optical Network, fibra senza ripetitori attivi
- **PSTN** — Public Switched Telephone Network
- **Rain fade** — attenuazione del segnale satellitare per pioggia/neve (banda Ka)
- **Reed-Solomon (RS)** — codice polinomiale su simboli/byte, ottimo per burst ed erasures (CD, DVB, QR, NASA)
- **Sliding window** — protocolli con più frame in viaggio (Go-Back-N, Selective Repeat)
- **Splitter (DSL)** — separa linea dati (senza filtro) e linea voce (con filtro, in casa)
- **Spot beam** — fascio satellitare stretto e mirato, per riuso delle frequenze
- **Spread spectrum** — segnale CDMA "spalmato" su tutta la banda
- **Stop and Wait** — protocollo: un frame, poi attesa dell'ACK
- **Timeout** — tempo dopo cui il mittente reinvia un frame senza ACK
- **Trilaterazione** — calcolo posizione GPS da distanze (non angoli) a più satelliti
- **Van Allen (fasce di)** — regioni di particelle cariche da evitare nelle orbite satellitari

## Collegamenti
Tutte le note del corso → [[Reti di Calcolatori|torna all'indice]]
