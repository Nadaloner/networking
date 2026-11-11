---
tags: [RetiDiCalcolatori/accesso-banda-larga]
---

# 🌐 DSL, ADSL, VDSL e fibra ottica

← [[Reti di Calcolatori|Indice del corso]]

## DSL — Digital Subscriber Line

Nasce perché 56k (vedi [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]) è limitante. Il punto debole della linea telefonica è il cavo **UTP-3** dell'**ultimo miglio** (**local loop**) — cambiarlo fisicamente avrebbe costi folli.

**Trucco**: togliere il filtro fisico alla base del local loop → si passa da **4.000 Hz** a **~1.100.000 Hz**.

Questo libera però frequenze "pericolose" → nasce lo **splitter**, che divide:
- linea **dati** → senza filtro
- linea **telefonica** → il filtro resta, ma spostato **dentro casa** (non più in cabina)

> [!warning] Lo splitter genera interferenze
> Su tutta la linea che passa per la casa → per questo il numero massimo consigliato di splitter è **1**.

La velocità DSL è **inversamente proporzionale** alla distanza dall'armadietto: ogni metro di UTP-3 in più fa crollare le prestazioni.

Se più persone in casa usano contemporaneamente la linea, si assegna un range di simboli diverso a ogni end-point per evitare interferenze.

## ADSL — Asymmetric DSL

**Asimmetrica**: come i vecchi standard telefonici, garantisce più dati in **download** che in **upload**.

- **PSTN** = voce
- Zona fra 4 kHz e la banda upload = **guard zone/band**: lasciata libera per separare bene dati e voce (e proteggere le orecchie).

## UTP e canalizzazione (ADSL/VDSL)

UTP = *Unshielded* Twisted Pair → l'ambiente può causare interferenze. Tutto il range di frequenze è diviso in **256 canali da 4.312 Hz** ciascuno, per isolare le interferenze locali dal canale globale: 1 canale voce, **5 vuoti** (guard band), **32 in upstream**, il resto in download.

Per aumentare la velocità si può allargare il range di frequenze — rischio con UTP-3: perdita di simboli.

Se si rinuncia del tutto alla telefonia, si può **sbloccare la guard zone** e usare anche quelle frequenze per la velocità.

## VDSL / VDSL2

DSL molto più veloce: amplia la banda di frequenze usata. Più frequenze disponibili + meno cavo UTP-3 possibile = meno perdita di dati. Usata per lo **streaming video**.

| Anno | Standard | Download | Upload |
|---|---|---|---|
| 2001 | VDSL | 55 Mb | 3 Mb |
| 2006 | **VDSL2** | 200 Mb | 100 Mb |

Le prestazioni crollano con local loop lunghi.

**Obiettivo generale**: dimensionare la capacità in base alle esigenze tipiche dell'utente — nelle connessioni domestiche si riceve più di quanto si trasmette, quindi ADSL privilegia il download; VDSL consente velocità maggiori mantenendo comunque un'organizzazione (opzionalmente) asimmetrica.

## Fibra ottica: FTTC, FTTB, FTTH

La soluzione migliore è rimuovere del tutto il local loop in rame, portando la fibra dentro casa.

| Sigla | Significato | Local loop in rame |
|---|---|---|
| **FTTC** | Fiber To The Cabinet (armadietto) | sì, cabinet→casa |
| **FTTB** | Fiber To The Basement | ridotto ma non eliminato, retrocompatibile |
| **FTTH** | Fiber To The Home | **nessuno** — PON, solo fasci di luce, senza ripetitori |

Standard **PON** (Passive Optical Network): **GPON**, **XG-PON**, **NG-PON2**.

### Velocità a confronto

| Tecnologia | Download | Upload | Note |
|---|---|---|---|
| ADSL Lite | 1.5 Mb | 0.5 Mb | |
| ADSL | 8 Mb | 1 Mb | |
| ADSL2 | ~12 Mb | ~1 Mb | |
| ADSL2+ | 24 Mb | 1 Mb | |
| VDSL (2001) | 55 Mb | 3 Mb | banda di frequenze più ampia |
| VDSL2 (2006) | 200 Mb | 100 Mb | crolla con local loop lunghi |
| GPON | 2.5 Gb | 1.2 Gb | **condivisi** tra gli utenti dell'armadietto |
| XG-PON | 10 Gb | 2.5 Gb | condivisi tra gli utenti |
| NG-PON2 | 10 Gb | 10 Gb | **simmetrica**, più colori (lunghezze d'onda) |

> [!tip] NG-PON2
> È **simmetrica** → adatta ai content creator (molto upload e download). Trasmette luce con più colori → colori diversi assegnabili a utenti diversi (vedi [[Multiplexing (FDM e TDM)]] sull'FDM ottico).

## Collegamenti
- [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]
- [[Multiplexing (FDM e TDM)]]
- [[Storia delle reti e dei cavi sottomarini]]
- [[Glossario e formulario]]
