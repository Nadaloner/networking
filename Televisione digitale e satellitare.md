---
tags: [RetiDiCalcolatori/televisione]
---

# 📺 Televisione digitale e satellitare

← [[Reti di Calcolatori|Indice del corso]]

Digitale terrestre e TV satellitare usano modulazioni diverse per motivi opposti: **il satellite usa QPSK**, il **digitale terrestre usa QAM** (vedi [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]] per entrambe).

## Satellite

Problemi di **potenza** e **interferenza** → serve uno schema robusto con simboli ben distanziati → **QPSK**.

## Digitale terrestre

Sfrutta **QAM** (16-QAM o 64-QAM): più simboli possibili grazie a minori interferenze rispetto al satellite.

### Il problema degli echi: OFDM

Nelle città, tra gli edifici, i segnali rimbalzano (echi) e arrivano in ritardo → si usa **OFDM** (FDM Ortogonale, simile alla DMT dell'ADSL — vedi [[Multiplexing (FDM e TDM)]]):

- Ogni canale è diviso in migliaia di **sottoportanti**
- Modalità **2k** ≈ 1.705 sottoportanti
- Modalità **8k** ≈ 6.817 sottoportanti
- La modalità **non dipende** da SD o HD

> [!example] Perché "sfarfalla" durante un temporale
> Guardando un canale, in realtà stiamo ricevendo migliaia di sottoportanti più piccole. Quando c'è un temporale e l'immagine si disturba, è perché **alcune sottoportanti** sono disturbate, non l'intero segnale.

Per risparmiare spazio, il flusso viene compresso/decompresso con **MPEG2**: la TV deve solo decodificare quello che arriva.

## Collegamenti
- [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]
- [[Multiplexing (FDM e TDM)]]
- [[Satelliti (LEO, MEO, GEO)]]
- [[Glossario e formulario]]
