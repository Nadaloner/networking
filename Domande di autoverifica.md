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

## Correzione errori — [[Codici di correzione errori (Reed-Solomon, CRC, LDPC)]]

> [!question]- Qual è la differenza principale tra Hamming e Reed-Solomon?
> Hamming lavora sui singoli bit, Reed-Solomon su simboli (byte o gruppi di byte) ed è basato sull'aritmetica polinomiale: per questo è molto efficace contro gli errori di burst.

> [!question]- Quanti simboli errati può correggere un codice RS(n,k)?
> Fino a (n−k)/2 simboli.

> [!question]- Cosa significa RS(204,188) nella TV digitale?
> Ogni 204 byte del flusso, 188 sono dati effettivi e 16 sono di ridondanza per la correzione degli errori.

> [!question]- Perché un'erasure è "meglio" di un errore di trasmissione?
> Perché nella cancellazione si conosce già la posizione del dato mancante, quindi il codice deve solo ricostruirlo e non anche trovarlo.

> [!question]- Cosa ha dimostrato Shannon riguardo alla correzione degli errori?
> Che aumentando la forza di correzione il data rate non tende a 0 ma a un valore finito (la capacità del canale): esistono codici che trasmettono in modo affidabile fino a quel limite.

> [!question]- Qual è il prezzo dei codici LDPC?
> Il decoding è molto lento: migliorare la correzione mantenendo il data rate costa in tempo di calcolo e memoria.

> [!question]- Come si rappresenta 1011 come polinomio CRC?
> x³ + x + 1 (il termine x² manca perché quel bit è 0).

> [!question]- Come fa il ricevente a capire con il CRC che c'è stato un errore?
> Divide il frame ricevuto (messaggio shiftato meno il resto) per il polinomio generatore: se il resto è diverso da 0 c'è stato un errore di trasmissione.

> [!question]- Il CRC corregge gli errori?
> No, li rileva soltanto. CRC-32 è usato in zip, PNG ed Ethernet.

> [!question]- Cosa sono i livelli L, M, Q, H di un QR code?
> I livelli di error recovery di Reed-Solomon: da circa 7% (L) a circa 30% (H) del codice recuperabile.

> [!question]- Quando conviene correggere (FEC) invece di rilevare e ritrasmettere (ARQ)?
> Quando ritrasmettere è costoso o impossibile: sonde spaziali (ritardi enormi), CD (nessuno da cui farsi rimandare il dato), TV broadcast (nessun canale di ritorno), wireless molto rumoroso. Su canali affidabili (fibra) conviene rilevare e ritrasmettere.

> [!question]- Che distanza minima di Hamming serve per correggere e errori? E per rilevarli?
> Per correggere e errori serve d ≥ 2e+1; per rilevarli d ≥ e+1.

> [!question]- Codifica i dati 1011 con Hamming (7,4) (parità nelle posizioni 1, 2, 4).
> 0110011. Se il bit 6 arriva invertito, falliscono i controlli di peso 2 e 4 → sindrome 6 → si inverte il bit 6.

> [!question]- Perché Reed-Solomon gestisce bene i burst e Hamming no?
> RS lavora su simboli (es. byte): un byte con tutti gli 8 bit sbagliati conta come un solo errore. Hamming corregge un solo bit per codeword.

> [!question]- Con e errori ed s cancellazioni, quando RS(n,k) riesce a correggere tutto?
> Quando 2e + s ≤ n − k: ogni cancellazione "costa" metà di un errore perché la sua posizione è già nota.

> [!question]- Calcola il CRC del messaggio 1101011111 con generatore 10011.
> Si aggiungono 4 zeri (grado 4) e si divide in aritmetica mod 2: resto 0010. Si trasmette 11010111110010.

> [!question]- Quali errori rileva sicuramente un CRC con generatore di grado r ben scelto?
> Tutti gli errori su un bit, tutti quelli con numero dispari di bit (se G contiene il fattore x+1) e tutti i burst lunghi al massimo r bit.

> [!question]- Il CRC protegge da modifiche intenzionali dei dati?
> No: un attaccante può modificare i dati e ricalcolare il CRC. Servono hash crittografici o MAC.

## Livello data-link — [[Livello data-link (controllo di flusso, Stop and Wait)]]

> [!question]- A cosa serve il controllo di flusso?
> A evitare che il mittente mandi più dati di quanti il destinatario riesca a gestire, congestionando il canale: il destinatario può chiedere uno stop e poi far riprendere.

> [!question]- Come funziona lo Stop and Wait e qual è il suo limite?
> Si invia un frame e si aspetta l'ACK prima di inviare il successivo. Basta un canale half-duplex, ma la comunicazione è lentissima: enorme overhead.

> [!question]- Perché serve un timeout nello Stop and Wait?
> Perché l'ACK viene mandato solo se il frame è corretto: se il frame è sbagliato o perso non arriva nulla, e il mittente deve capire dopo un certo tempo che va reinviato.

> [!question]- Perché si numerano i frame con 0/1?
> Se si perde l'ACK il mittente reinvia lo stesso frame: con la numerazione alternata il destinatario riconosce il duplicato (es. 1 seguito da 1) e lo scarta.

> [!question]- Cos'è il piggybacking e quando funziona male?
> L'ACK viene inviato insieme ai dati che si devono comunque trasmettere. Funziona male se la comunicazione non è equilibrata: l'ACK attende dati che non arrivano e scattano i timeout.

> [!question]- Perché un prodotto banda × RTT grande mette in crisi Stop and Wait?
> Perché nel canale potrebbero stare molti bit contemporaneamente, ma si manda un solo frame e poi si aspetta un RTT intero: quasi tutta la capacità viene sprecata.

> [!question]- Quali sono i tre compiti principali del livello data-link?
> Framing (delimitare i frame), controllo degli errori e controllo di flusso.

> [!question]- Perché, quando arriva un frame duplicato, il destinatario deve comunque rimandare l'ACK?
> Perché il duplicato significa che l'ACK precedente si è perso: senza un nuovo ACK il mittente continuerebbe ad andare in timeout e a ritrasmettere.

> [!question]- Cosa succede se il timeout è troppo corto? E troppo lungo?
> Troppo corto: scade prima che l'ACK torni, quindi ritrasmissioni inutili e duplicati. Troppo lungo: dopo una perdita il mittente resta fermo a lungo e il throughput cala.

> [!question]- Calcola l'efficienza dello Stop and Wait: 50 kbit/s, RTT 500 ms, frame da 1000 bit.
> Il frame richiede 20 ms; poi si attendono 500 ms. U = 20 / 520 ≈ 4%.

> [!question]- Come si risolve il problema dei timeout nel piggybacking con traffico sbilanciato?
> Il ricevente aspetta un tempo breve: se ha dati da mandare ci attacca l'ACK, altrimenti invia un ACK separato prima che scada il timeout del mittente.

> [!question]- Qual è la soluzione ai limiti dello Stop and Wait su canali con banda × ritardo grande?
> I protocolli a finestra scorrevole (sliding window, es. Go-Back-N e Selective Repeat), che permettono di avere più frame in viaggio prima di ricevere gli ACK.

## Collegamenti
- [[Reti di Calcolatori|torna all'indice]]
- [[Glossario e formulario]]
