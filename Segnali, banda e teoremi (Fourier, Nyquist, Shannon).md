---
tags: [RetiDiCalcolatori/segnali]
---

# 📡 Segnali, banda e teoremi

← [[Reti di Calcolatori|Indice del corso]]

## Il segnale periodico

Un segnale periodico si descrive con 3 parametri:

$$s(t) = A \cdot \sin(2\pi f t + \varphi)$$

| Parametro | Significato | Nota |
|---|---|---|
| **Ampiezza (A)** | valore massimo raggiunto dal segnale | la potenza è ∝ A² → raddoppiando A, la potenza **quadruplica** |
| **Frequenza (f)** | numero di cicli completi al secondo (Hz) | periodo $T = 1/f$ |
| **Fase (φ)** | sfasamento rispetto a un riferimento | misurata in gradi o radianti |

La **lunghezza d'onda** λ è la distanza nello spazio fra due picchi consecutivi:

$$\lambda = v/f$$

dove *v* è la velocità di propagazione nel mezzo (dipende dal materiale).

> [!info] Tempo vs spazio
> **T** dice ogni quanto si ripete l'onda nel *tempo*. **λ** dice ogni quanto si ripete nello *spazio*.

## Larghezza di banda

La **bandwidth** (Hz) è l'intervallo di frequenze che un canale lascia passare senza attenuarle troppo:

$$B = f_{max} - f_{min}$$

Es. la linea telefonica analogica passa da 300 a 3400 Hz → B = 3,1 kHz. È una proprietà **fisica** del mezzo (cavo, fibra, aria) oppure un limite imposto per **legge** (assegnazione frequenze radio).

> [!warning] Banda ≠ data rate
> Nel linguaggio comune "ho una banda di 100 mega" significa un **data rate** di 100 Mbit/s — ma è un abuso di linguaggio. La banda in Hz **limita** il data rate, non coincide con esso.

Il **data rate** (bit/s) è la quantità di informazione trasmessa al secondo.

## Bit rate vs Baud rate

Un **simbolo** è uno stato distinguibile del segnale mantenuto per un intervallo di tempo (es. un livello di tensione, una fase, una frequenza, o una combinazione ampiezza+fase).

- **Baud rate** = numero di simboli trasmessi al secondo
- **Bit rate** = numero di bit trasmessi al secondo

Se l'alfabeto ha **V** simboli, ogni simbolo porta $\log_2(V)$ bit (con k bit si distinguono $2^k$ casi):

$$\text{bit rate} = \text{baud rate} \times \log_2(V)$$

> [!danger] Trade-off
> Aumentare V aumenta il bit rate a parità di baud rate — ma i simboli diventano più "vicini" tra loro e **il rumore aumenta** (collegare a [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]] per QAM/QPSK).

## Serie di Fourier

Fourier: qualsiasi segnale periodico di periodo T, anche un'onda quadrata, si può scrivere come somma (eventualmente infinita) di sinusoidi.

- Le sinusoidi a frequenza *nf* si chiamano **armoniche**; *n=1* è la **fondamentale**, le altre sono multipli.
- I coefficienti *a* e *b* della serie dicono "quanto" di ciascuna armonica c'è e con quale fase.
- Ampiezza dell'armonica n-esima: $\sqrt{a_n^2 + b_n^2}$; il suo quadrato è l'**energia** contenuta in quella frequenza.

Per segnali **non periodici** si usa la **trasformata** di Fourier → spettro continuo invece di armoniche discrete.

> [!example] Curiosità: Shazam
> La trasformata di Fourier è alla base di Shazam: da uno spettrogramma di pochi secondi di canzone, individua gli hash delle coppie di picchi della trasformata e li confronta con un database di canzoni.

### Perché Fourier c'entra con le reti

Un canale con banda B lascia passare solo le armoniche sotto una certa frequenza e **taglia via le altre**: il segnale ricevuto è quindi una versione arrotondata e distorta dell'onda originale.

## Teorema di Nyquist (canale senza rumore)

Un segnale di banda B è ricostruito **perfettamente** campionandolo **2B** volte al secondo; di più non serve.

Massimo data rate (capacità teorica senza rumore):

$$C = 2B \cdot \log_2(V) \ \text{bit/s}$$

## Teorema di Shannon (canale con rumore)

Limite effettivo non superabile con **nessuna** modulazione, qualunque sia V:

$$C = B \cdot \log_2(1 + S/N) \ \text{bit/s}$$

dove S/N è il rapporto segnale/rumore in scala lineare. In decibel: $10 \log_{10}(S/N)$ → **30 dB corrispondono a S/N = 1000**.

> [!success] Da ricordare per l'esame
> - Nyquist → limite legato solo alla **banda** (canale ideale).
> - Shannon → limite legato a banda **e rumore** (canale reale) — è il vincolo che conta davvero (vedi applicazione pratica nel limite dei 56k in [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]).

## Solitoni

Onde non lineari di forma permanente: mantengono forma e velocità nel tempo, usate per comunicare a **distanze molto lunghe** (vedi il cavo transatlantico in fibra in [[Storia delle reti e dei cavi sottomarini]]).

## Collegamenti
- [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]
- [[Satelliti (LEO, MEO, GEO)]] (attenuazione ∝ distanza²)
- [[Glossario e formulario]]
