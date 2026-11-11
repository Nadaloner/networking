---
tags: [RetiDiCalcolatori/quiz]
---

# ❓ Domande di autoverifica

← [[Reti di Calcolatori|Indice del corso]]

> [!tip] Come usarle
> Leggi la domanda, rispondi a voce o per iscritto, poi clicca sulla risposta per aprirla e verificare.

## Segnali e teoremi — [[Segnali, banda e teoremi (Fourier, Nyquist, Shannon)]]

> [!question]- Se raddoppio l'ampiezza di un segnale, cosa succede alla sua potenza?
> Quadruplica (potenza ∝ A²).

> [!question]- Qual è la differenza fisica tra Nyquist e Shannon?
> Nyquist descrive il limite di un canale **senza rumore** (dipende solo dalla banda B e dal numero di livelli V: C=2B·log₂V). Shannon descrive il limite reale di un canale **con rumore** (dipende da banda e rapporto S/N: C=B·log₂(1+S/N)) ed è il vincolo che non si supera mai, qualunque sia la modulazione.

> [!question]- Perché "ho una banda di 100 mega" è un abuso di linguaggio?
> La banda si misura in Hz ed è il range di frequenze che passa nel canale; il data rate (bit/s) è limitato dalla banda ma non coincide con essa.

## Satelliti — [[Satelliti (LEO, MEO, GEO)]]

> [!question]- Perché le orbite satellitari evitano le fasce di Van Allen?
> Perché contengono particelle cariche (protoni, elettroni) che danneggiano l'elettronica dei satelliti in poco tempo.

> [!question]- Perché un satellite GEO ha una latenza così alta rispetto a un LEO?
> Perché orbita a 35.786 km contro i 200-2.000 km del LEO: il segnale deve percorrere una distanza molto maggiore (~250-280 ms solo andata).

> [!question]- Quanti satelliti GPS minimi servono per calcolare una posizione, e perché?
> Almeno 4: 3 per le coordinate spaziali (lat, long, altitudine) e 1 per correggere l'errore dell'orologio del ricevitore.

> [!question]- In che orbita era lo Sputnik 1? (trappola comune)
> LEO (~215-940 km), non MEO.

## Telefono e modem — [[Dal telefono al modem (modulazione ASK, FSK, PSK, QAM)]]

> [!question]- Qual era il problema scalabilità della rete telefonica Point-to-Point originaria?
> Con n utenti servivano n(n-1)/2 cavi, crescita O(n²) — non scalabile. Risolto nel 1878 con gli switching center (topologia a stella).

> [!question]- Perché aumentare solo la fase (QPSK con troppi stati) non funziona bene?
> Le differenze di fase diventano troppo piccole e il rumore causa errori di decodifica — per questo si combina ampiezza e fase (QAM).

> [!question]- Perché il limite del modem telefono↔telefono (35k) raddoppia a ~70k nel caso telefono↔dispositivo digitale?
> Perché c'è meno rumore con un solo lato analogico del collegamento.

## DSL e fibra — [[DSL, ADSL, VDSL e fibra ottica (FTTC, FTTB, FTTH)]]

> [!question]- Qual è il "trucco" principale del DSL rispetto al modem 56k?
> Rimuovere il filtro fisico del local loop, passando da una banda utile di 4.000 Hz a ~1.100.000 Hz, mantenendo lo stesso cavo UTP-3.

> [!question]- Qual è la differenza tra FTTC, FTTB e FTTH?
> FTTC: fibra fino all'armadietto, poi rame. FTTB: fibra fino al palazzo/piano, local loop ridotto ma presente. FTTH: fibra fino a casa, nessun rame, rete PON.

> [!question]- Perché GPON "condivide" la velocità tra più utenti mentre NG-PON2 è definita simmetrica e più versatile?
> GPON distribuisce una capacità totale (2.5 Gb) tra tutti gli utenti collegati allo stesso armadietto di fibra. NG-PON2 usa più colori di luce assegnabili a utenti diversi e offre stessa velocità in download e upload.

## Multiplexing — [[Multiplexing (FDM e TDM)]]

> [!question]- Qual è la differenza concettuale tra FDM e TDM?
> FDM assegna una frequenza diversa a ogni comunicazione (divisione nello spettro); TDM assegna un turno di tempo diverso a ogni comunicazione (divisione nel tempo), sullo stesso canale/frequenza.

## Televisione — [[Televisione digitale e satellitare]]

> [!question]- Perché il satellite usa QPSK e il digitale terrestre usa QAM?
> Il satellite ha problemi di potenza e interferenza, quindi serve uno schema robusto con pochi simboli ben distanziati (QPSK). Il digitale terrestre ha meno interferenze e può usare più simboli (16-QAM, 64-QAM) per più bit/simbolo.

> [!question]- A cosa serve l'OFDM nel digitale terrestre?
> A combattere gli echi dovuti ai rimbalzi del segnale tra edifici, dividendo il canale in migliaia di sottoportanti ortogonali (modalità 2k o 8k).

## Switching — [[Switching (Circuit, Message, Packet)]]

> [!question]- Qual è il problema principale del Message Switching?
> Il limite di memoria dello switch: un messaggio troppo grande può occupare uno spazio eccessivo nello switch intermedio.

> [!question]- Quali sono i due problemi tipici del Packet Switching?
> 1) Se un nodo di switching si guasta senza sostituto, l'informazione resta bloccata. 2) I pacchetti possono arrivare disordinati al destinatario.

## Telefonia mobile — [[Telefonia mobile — 0G, 1G, 2G e CDMA]]

> [!question]- Perché il 2G introduce il MAHO e perché è importante?
> Perché decentralizza la decisione di handoff dal centralino al telefono stesso: è il telefono che valuta la qualità del segnale e decide di cambiare cella. È collegato alle "tacche" di segnale sui telefoni moderni.

> [!question]- Qual è il principio del teorema dei 4 colori applicato alle celle 1G, e cosa implica?
> Bastano 4 range di frequenza per evitare che celle adiacenti interferiscano, con conseguente riduzione delle prestazioni a 1/4 rispetto all'uso di tutte le frequenze disponibili in ogni cella.

> [!question]- In CDMA, come fa il ricevitore a capire se un utente non ha trasmesso nulla?
> Il prodotto scalare tra il segnale ricevuto e il codice dell'utente dà 0 se quell'utente non ha trasmesso (invece di +1 per bit 1 o -1 per bit 0).

> [!question]- Perché il CDMA elimina il "problema dei colori" delle frequenze?
> Perché tutte le celle possono usare tutte le frequenze contemporaneamente — ciò che distingue gli utenti non è la frequenza ma il codice ortogonale, quindi il riuso delle frequenze è 1 invece di 1/4.

> [!question]- Cos'è il problema "near-far" in CDMA e come si risolve?
> Un telefono vicino all'antenna trasmette con un segnale molto più forte di uno lontano, "coprendo" quest'ultimo. Si risolve con il controllo di potenza: la stazione base regola continuamente la potenza di trasmissione di ogni telefono (fino a 800 volte/secondo in IS-95).

## Collegamenti
- [[Reti di Calcolatori|torna all'indice]]
- [[Glossario e formulario]]
