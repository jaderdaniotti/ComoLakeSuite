# Procedura: chiavi e link iCal per sincronizzare i calendari

Questa guida spiega come ottenere i **link iCal** (o le chiavi) da **Booking.com**, **Airbnb** e **Expedia** per sincronizzare le prenotazioni con il calendario del sito Como Lake Suites.

---

## 1. Booking.com

### Export calendario (le tue prenotazioni → fuori da Booking)

1. Accedi alla **Partner Hub** (extranet): [https://admin.booking.com](https://admin.booking.com)
2. Seleziona la **struttura** (property) corretta.
3. Vai in **Struttura** → **Calendario** (o **Rates & Availability** → **Calendar**).
4. Cerca la sezione **Sincronizzazione calendario** / **Calendar sync**.
5. Trova **Link di export iCal** (o “Export calendar link” / “URL per esportare le prenotazioni”).
6. **Copia il link** (è un URL che termina con un codice segreto tipo `?token=...`).  
   Questo link è il tuo **feed iCal in uscita**: le prenotazioni Booking appariranno in qualsiasi calendario che importa questo URL.

### Import calendario (bloccare date da un altro calendario)

1. Nella stessa area **Sincronizzazione calendario** trovi **Importa calendario** / **Import calendar**.
2. Incolla l’**URL iCal** del tuo calendario principale (o del sito) nel campo indicato.
3. Booking leggerà quel calendario e bloccherà le date già occupate, evitando doppie prenotazioni.

**Nota:** Conserva il link di export in un posto sicuro; non condividerlo pubblicamente (contiene un token segreto).

---

## 2. Airbnb

### Export calendario (prenotazioni Airbnb → fuori da Airbnb)

1. Accedi a [https://www.airbnb.it](https://www.airbnb.it) e vai in **Menu** (icona profilo) → **Annunci**.
2. Seleziona l’**annuncio** della suite.
3. Vai in **Calendario** (scheda in alto).
4. Clicca su **Disponibilità** (o **Availability**) e cerca **Sincronizza calendari** / **Calendar sync**.
5. Nella sezione **Esporta calendario** / **Export calendar** trovi un **link iCal** (es. “Collega il tuo calendario ad altri strumenti”).
6. Clicca su **Esporta il tuo calendario** e **copia l’URL** (link segreto).  
   Questo è il tuo **feed iCal in uscita** per le prenotazioni Airbnb.

### Import calendario (bloccare date da un altro calendario)

1. Nella stessa pagina **Sincronizza calendari** trovi **Importa calendario** / **Import calendar**.
2. Incolla l’**URL iCal** del calendario principale (o del sito).
3. Airbnb aggiornerà la disponibilità in base a quell’URL.

**Link diretto (dopo login):**  
[https://www.airbnb.it/manage-your-space/33795851/calendar](https://www.airbnb.it/manage-your-space/33795851/details) → scheda Calendario → Sincronizza calendari.

---

## 3. Expedia (Partner Central)

### Export / Import calendario

1. Accedi al portale partner: [https://partner.expedia.com](https://partner.expedia.com) (o [https://www.expediapartnercentral.com](https://www.expediapartnercentral.com) a seconda del mercato).
2. Seleziona la **proprietà** (hotel/unit).
3. Cerca il menu **Room availability**, **Calendar** o **Rate & Availability**.
4. Cerca la sezione **iCal** o **Calendar sync** / **Sincronizzazione calendario**.
5. **Export:** copia il **link iCal** fornito da Expedia per esportare le prenotazioni.
6. **Import:** se disponibile, incolla l’URL iCal del tuo calendario principale per l’import e aggiornare la disponibilità.

**Nota:** L’interfaccia Expedia può variare per brand (Expedia, Vrbo, ecc.). Se non trovi “iCal” o “Calendar sync”, cerca nel help del portale “calendar sync” o “iCal feed”.

---

## Riepilogo: cosa conservare

| Piattaforma   | Cosa ottenere | Dove usarlo |
|---------------|----------------|------------|
| **Booking.com** | URL export iCal + (opz.) URL import | Export → calendario sito; Import → incollare URL del sito in Booking |
| **Airbnb**      | URL export iCal + (opz.) URL import | Export → calendario sito; Import → incollare URL del sito in Airbnb |
| **Expedia**     | URL export iCal + (opz.) URL import | Export → calendario sito; Import → incollare URL del sito in Expedia |

---

## Passi successivi (sul sito)

1. **Salvare i link in modo sicuro**  
   Es. variabili d’ambiente (`.env.local`) o backend:
   - `BOOKING_ICAL_URL=...`
   - `AIRBNB_ICAL_URL=...`
   - `EXPEDIA_ICAL_URL=...`

2. **Sincronizzare sul backend**  
   Un cron job o servizio che:
   - scarica periodicamente i feed iCal (GET agli URL),
   - interpreta le date occupate,
   - aggiorna il database o il calendario usato dal sito.

3. **Generare un URL iCal per il sito**  
   Se il sito espone un calendario “master”, generare un link iCal (endpoint che restituisce un file `.ics`) e incollare **quel link** nei campi “Import” di Booking, Airbnb e Expedia, così le prenotazioni prese dal sito bloccano le date sulle piattaforme.

Se vuoi, nel passo 2 possiamo entrare nel dettaglio tecnico (formato iCal, librerie e esempio di script per leggere i feed e aggiornare il calendario del sito).
