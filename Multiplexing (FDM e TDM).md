---
tags: [RetiDiCalcolatori/multiplexing]
---

# 🔀 Multiplexing (FDM e TDM)

← [[Reti di Calcolatori|Indice del corso]]

Ogni standard di fibra (vedi [[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]]) usa colori di luce diversi — si possono mixare tra case/end-user diversi.

## FDM — Frequency Division Multiplexing

Tecnica per far passare più comunicazioni diverse nello stesso canale, assegnando ad ognuna una **frequenza diversa**.

Nella fibra ottica, l'FDM consiste nel trasmettere più segnali contemporaneamente usando diverse **lunghezze d'onda della luce**, esattamente come l'FDM tradizionale usa frequenze diverse.

### Crescita della capacità nel tempo (FDM ottico)

| Anno | Capacità |
|---|---|
| 2007 | 124 canali × 50 Gbps = ~1.033 film/secondo |
| 2021 | 319.000 Gbps → ~53.000 film/secondo |
| 2022 | ~250.000 film/secondo |
| 2026 | **3 milioni** di film al secondo |

## TDM — Time Division Multiplexing

Multiplexing **temporale**: ognuno trasmette per un tot di secondi, poi tocca al prossimo.

- Usato dal **PON** (fibra ottica)
- Anche la musica stereo funziona così, dividendo canale sinistro e destro

> [!info] Dove ritorna
> FDM e TDM non sono solo concetti di accesso fisso: **ricompaiono identici** nella telefonia mobile — FDM nell'1G, TDM nel 2G (D-AMPS, GSM). Vedi [[Telefonia mobile — 0G, 1G, 2G e CDMA]].

## Collegamenti
- [[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]]
- [[Telefonia mobile — 0G, 1G, 2G e CDMA]]
- [[Glossario e formulario]]
