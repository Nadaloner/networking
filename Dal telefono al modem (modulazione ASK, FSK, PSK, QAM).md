---
tags: [RetiDiCalcolatori/telefonia-fissa, RetiDiCalcolatori/modulazione]
---

# ☎️ Dal telefono al modem

← [[Reti di Calcolatori|Indice del corso]]

## La rete telefonica (PSTN)

Nasce come overlay sopra la rete del telegrafo. Riconoscimento storico a **Bell** (presidente della Bell Company).

Nasce come rete **Point-to-Point**: ogni linea collega una coppia di telefoni → con n utenti servono $n(n-1)/2$ cavi, $O(n^2)$ → **non scalabile**.

**1878** → nascono gli **switching center**: ogni utente ha un solo cavo fino al centralino, gli operatori collegano chi serve → **topologia a stella**. Quando uno switching center è pieno, intervengono switch center di 2° livello, poi una gerarchia fino al **5° livello** → questa rete prende il nome di **PSTN** (Public Switched Telephone Network).

Cavi usati: **doppino UTP** (casa–centrale), **coassiale/fibra** (tra centri).

**1996** → nasce il diritto di proprietà di un numero telefonico.

## Trasmissione dati sulla rete telefonica

La rete interna è ormai digitale, ma il **local loop** (collegamento casa ↔ switching point) resta quasi sempre analogico.

Per passare da digitale ad analogico serve il **MODEM** (**MO**dulatore-**DE**Modulatore).

### Perché AC e non DC

Un'onda digitale "quadrata" in corrente continua ha uno spettro ampio → soffre molto di attenuazione e distorsione (vedi [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]] sulla serie di Fourier). Per questo si usa **AC**: una portante sinusoidale che viene modulata.

## Tecniche di modulazione

Una sinusoide ha 3 parametri → 3 modi base di modulazione:

| Tecnica | Principio |
|---|---|
| **ASK** (Amplitude Shift Keying) | 0 = ampiezza bassa, 1 = ampiezza alta |
| **FSK** (Frequency Shift Keying) | 0 = frequenza bassa, 1 = frequenza alta |
| **PSK** (Phase Shift Keying) | un bit provoca uno sfasamento dell'onda |

- **Baud rate** = simboli al secondo (cambi di segnale al secondo)
- **Bit rate** = bit al secondo
- Con un alfabeto di M simboli: $\text{bitrate} = \text{baudrate} \times \log_2 M$

### QPSK (Quadrature Phase Shift Keying)

4 sfasamenti simmetrici: 45° / 135° / 225° / 315° → 4 simboli = 2 bit/simbolo → bitrate = 2× baudrate.

> [!warning] Il problema della sola fase
> Con troppi sfasamenti, le differenze di fase diventano piccolissime e poco distinguibili, e il rumore causa errori → **analogia con i satelliti GEO**: in un'orbita ne stanno solo un tot per evitare che siano troppo vicini (vedi [[Satelliti (LEO, MEO, GEO)]]).
>
> **Soluzione**: combinare ampiezza e fase mantenendo la frequenza fissa — come avere più satelliti sulla stessa orbita (fase) ma spaziati in altitudine (ampiezza).

## Diagrammi a costellazione

Un piano dove ogni punto = un simbolo: **angolo = fase**, **distanza dall'origine = ampiezza**.

**QAM** (Quadrature Amplitude Modulation):
- **QAM-16** → 16 simboli, 4 bit (2× meglio di QPSK)
- **QAM-64** → 64 simboli, 6 bit (3× meglio di QPSK)

> [!tip] Costellazioni circolari vs rettangolari
> Le costellazioni **circolari** sono teoricamente migliori (massimizzano la distanza minima fra punti a parità di energia), ma in pratica si usano QAM **rettangolari** per semplicità di generazione/decodifica.

## I modem e il limite di Shannon

Limite di Shannon: $C = B \cdot \log_2(1 + S/N)$ (vedi [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]]).

Il local loop è filtrato a **4000 Hz** per avere meno interferenze. Tra due modem (telefono↔telefono, canale **duplex**: entrambi mandano e ricevono) il limite fisico è circa **35.000 bit/s**, limite fisico invalicabile.

Se la comunicazione è telefono↔dispositivo digitale (es. servizio Internet), il limite fisico **raddoppia** (meno rumore, un solo lato analogico) → si supera il limite fisico arrivando a **~70k**.

### Velocità massima dei modem

Non si è andati oltre i 56k. Negli USA si usano 7 bit per i dati (l'ottavo è rubato per segnalazioni interne — *robbed-bit signaling*) → ASCII ("A" = American) → con 7 bit/simbolo si arriva a **56k** precisamente.

Lo standard definisce il bitrate; gli standard più recenti sono **asimmetrici** (download > upload).

- Da **v.34** in poi fax e modem condividono gli standard, ma il fax si ferma al suo limite fisico di 35k bit/s.
- **v.92** → 56k download / 48k upload.

### PCM (Pulse Code Modulation)

La voce viaggia in digitale dentro la rete: quando il segnale analogico arriva alla centrale, viene convertito con **PCM**:
- La centrale misura il segnale **8000 volte al secondo** (campionamento/*sampling*)
- Ogni campione è descritto con **8 bit**

## Collegamenti
- [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]]
- [[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]]
- [[Satelliti (LEO, MEO, GEO)]] (analogia costellazioni)
- [[Multiplexing (FDM e TDM)]]
- [[Glossario e formulario]]
