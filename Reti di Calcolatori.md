---
tags: [RetiDiCalcolatori/MOC]
aliases: ["RdC", "Reti"]
---

# 🕸️ Reti di Calcolatori — Indice del corso

> [!tip] Come usare questa vault
> Ogni nota è un concetto atomico. Segui i `[[wikilink]]` per muoverti, usa i tag `#RetiDiCalcolatori/...` per vedere tutte le note di un'area nel pannello Tag, e prima dell'esame passa dalla nota [[Domande di autoverifica]] per autoverificarti.

## 📅 Timeline delle lezioni

```mermaid
timeline
    title Reti di Calcolatori — percorso del corso
    8 Ottobre : Satelliti (LEO, MEO, GEO)
    9-15 Ottobre : Segnali, banda, Fourier, Nyquist, Shannon, storia dei cavi
    15-21 Ottobre : Telefono, modem, modulazione, DSL/ADSL
    21-22 Ottobre : Fibra ottica, multiplexing, TV digitale, switching, telefonia mobile
    19 Novembre : Correzione errori (Reed-Solomon, CRC, LDPC)
    20 Novembre : Livello data-link, Stop and Wait, piggybacking
```

## 🗂️ Mappa dei concetti

```mermaid
graph TD
    A[Reti di Calcolatori] --> B[Fisica del segnale]
    A --> C[Storia delle reti]
    A --> D[Telefonia fissa]
    A --> E[Accesso a banda larga]
    A --> F[Televisione]
    A --> G[Switching]
    A --> H[Telefonia mobile]
    A --> I[Livello data-link]

    B --> B1[Segnali, banda e teoremi]
    B --> B2[Satelliti]

    D --> D1[Dal telefono al modem]
    D --> D2[Multiplexing]

    E --> E1[DSL e fibra ottica]

    H --> H1[0G/1G/2G e CDMA]

    I --> I1[Correzione errori]
    I --> I2[Controllo di flusso]
```

## 📚 Note per argomento

### Fondamenti del segnale
- [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]] — ampiezza/frequenza/fase, bit rate vs baud rate, limiti di canale
- [[Satelliti (LEO, MEO, GEO)]] — orbite, fasce di Van Allen, GNSS/GPS

### Storia e infrastruttura
- [[Storia delle reti e dei cavi sottomarini]] — telegrafo, cavi transatlantici, TAT-1/TAT-8

### Telefonia fissa e accesso dati
- [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]] — PSTN, modem, costellazioni
- [[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]] — local loop, splitter, PON
- [[Multiplexing (FDM e TDM)]] — divisione di frequenza e di tempo

### Applicazioni e commutazione
- [[Televisione digitale e satellitare]] — QPSK vs QAM, OFDM
- [[Switching (Circuit, Message, Packet)]] — le tre filosofie di commutazione

### Telefonia mobile
- [[Telefonia mobile — 0G, 1G, 2G e CDMA]] — celle, handoff, GSM, SIM, CDMA

### Livello data-link
- [[Codici di correzione errori (Reed-Solomon, CRC, LDPC)]] — RS, ripetizione, limite di Shannon, LDPC, CRC
- [[Livello data-link (controllo di flusso, Stop and Wait)]] — controllo di flusso, ACK, timeout, piggybacking

### Strumenti per lo studio
- [[Glossario e formulario]] — tutte le formule e i termini chiave in un posto
- [[Domande di autoverifica]] — quiz a scomparsa per il ripasso pre-esame

## 🧭 Filo logico (perché le cose si incastrano)

1. Ogni mezzo fisico ha una **banda limitata** → da qui nascono i teoremi di Nyquist e Shannon ([[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]]).
2. Per superare i limiti del **local loop** analogico si inventano modulazione e modem ([[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]).
3. Per sfruttare meglio lo stesso cavo nascono **DSL/ADSL/VDSL**, poi si elimina il rame con la **fibra** ([[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]]).
4. Per far condividere un canale a più utenti servono le tecniche di **multiplexing** ([[Multiplexing (FDM e TDM)]]), che riappaiono identiche nella telefonia mobile come FDM/TDM/CDMA ([[Telefonia mobile — 0G, 1G, 2G e CDMA]]).
5. Per instradare l'informazione servono strategie di **switching** ([[Switching (Circuit, Message, Packet)]]).
6. I satelliti sono un caso particolare di mezzo trasmissivo con i suoi limiti di potenza/distanza/latenza ([[Satelliti (LEO, MEO, GEO)]]), e tornano anche nella TV ([[Televisione digitale e satellitare]]).
7. Sopra il livello fisico, il **data-link** rende il collegamento affidabile: rileva/corregge gli errori ([[Codici di correzione errori (Reed-Solomon, CRC, LDPC)]]) e regola il flusso con ACK e timeout ([[Livello data-link (controllo di flusso, Stop and Wait)]]).
