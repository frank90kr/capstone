<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 1: Introduzione all\'HTML',
            'course_id' => 1,
            'content' => 'Volete creare il sito web dei vostri sogni, ma senza che sembri fatto con uno stampino. Chiunque abbia esperienza di web design vi dirà che prima di tutto dovete conoscere l’HTML. Ma cos’è l’HTML e come si impara?

Volete che il sito web che gestite si distingua e sia originale. Volete elementi e design che nessun altro nel vostro settore utilizza. Dopo tutto, il vostro sito web è la prima impressione che molti potenziali clienti hanno della vostra attività.

Ma prima di poterlo fare, dovete imparare un linguaggio informatico chiamato HTML. In sostanza, è il linguaggio che stabilisce cosa un browser web deve mostrare a un visitatore quando arriva sul vostro sito.

In questo articolo vi spiegheremo cos’è l’HTML, come è nato, come si usa, come funziona e vi offriremo una formazione di base sull’HTML con consigli su come saperne di più.

Non vedete l’ora di imparare a programmare il vostro sito web senza incappare in pagine non funzionanti? Iniziamo subito.

Cos’È l’HTML?
HTML è l’acronimo di “hypertext markup language” ed è un linguaggio relativamente semplice utilizzato per creare pagine web. Poiché non ammette variabili o funzioni, non è considerato un “linguaggio di programmazione”, ma piuttosto un “linguaggio di markup”, un linguaggio che si serve dei tag per definire gli elementi di un documento.

Se chiedete a qualcuno nel mondo del web design che cos’è l’HTML, è probabile che riceverete una lunga spiegazione che vi farà girare la testa, soprattutto se, come la maggior parte del mondo, non avete la più pallida idea di come programmare e creare un sito web da zero. Cosa significa l’acronimo che in italiano possiamo tradurre come “linguaggio di markup per ipertesti”? Vediamo di analizzarlo.

L’ipertesto è un testo ordinato che collega elementi correlati, di solito tramite link (chiamati anche collegamenti ipertestuali). Il linguaggio di markup descrive lo stile e la struttura di una pagina ai browser web.

Quindi l’HTML è ciò che assicura che il testo e le immagini vengano visualizzati al posto giusto e che gli utenti possano navigare nel vostro sito web senza problemi. I browser web caricano queste informazioni dal vostro server web per generare i siti web che vedete ogni giorno.

Se doveste osservare l’HTML nella sua forma grezza, vedreste molti simboli e parentesi che apparentemente non hanno senso. Tuttavia, tutto contribuisce al prodotto finale rivolto al cliente.

La struttura stessa dei siti web viene creata attraverso l’HTML. Questo linguaggio lavora insieme a CSS (Cascading Style Sheets) e JavaScript per creare siti web visivamente accattivanti e interattivi per gli utenti.

Il punto fondamentale è che l’HTML è la base di una buona pagina web. Senza di esso, non sareste in grado di condividere il testo con chi visita un sito web, tanto meno di aggiungere il vostro tocco personale al sito dei vostri sogni.',
            'images' => json_encode([])
        ]);

        

        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 2: Tag HTML: A Cosa Serve',
            'course_id' => 1,
            'content' => 'La risposta semplice a questa domanda è che l’HTML viene utilizzato per creare siti web per uso personale e aziendale in tutto il mondo.

La risposta vera e propria è molto più dettagliata.

L’HTML è stato il linguaggio predefinito utilizzato per i documenti e i siti web a partire dagli anni ’90. Funziona con i browser per aiutarli a comprendere la struttura di un sito web e lo stile a esso associato.

In sostanza, l’HTML è un progetto che indica al browser web come comporre il vostro sito per le persone che lo visitano. Quando un utente digita il vostro URL, il browser assembla la pagina sulla base dei blocchi stabiliti nel codice HTML. Questo, a sua volta, aiuta la pagina ad avere l’aspetto desiderato quando viene visualizzata da un utente, se combinato con un foglio di stile CSS che stilizza gli elementi disposti nel documento HTML.

La versione attuale dell’HTML consente anche di eseguire video, audio, fogli di calcolo e altre applicazioni direttamente sui siti web. Se vi è capitato di ammirare questi elementi su un sito web, dovete ringraziare l’HTML5.

Questo linguaggio di markup garantisce anche una navigazione interna fluida di un sito web, grazie ai collegamenti ipertestuali.

I designer di siti web possono anche usare l’HTML per creare moduli di lead generation per raccogliere email e nomi (a patto che l’azione sia alimentata da un file codificato in un’altra lingua).

Se usate dei plugin esterni, potete usare l’HTML anche per creare sistemi di prenotazione o moduli di ricerca all’interno di un sito, per facilitare la prenotazione e la navigazione.

L’HTML è il modo in cui si inseriscono i contenuti non dinamici in un sito web: quelli che volete che ogni persona veda allo stesso modo. Se volete contenuti dinamici, dovete usare JavaScript, PHP o altri linguaggi di programmazione.',
            'images' => json_encode([])
        ]);
        
        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 3: Tag HTML: Come Funziona',
            'course_id' => 1,
            'content' => 'A maggio 2022, esistono più di 3,56 miliardi di pagine web su Internet. Molte di queste pagine sono semplici file HTML. (Nota bene: non stiamo parlando di siti web, ma di pagine web)

Tradizionalmente, se il vostro sito era composto da 150 pagine, probabilmente avevate 150 file HTML separati. Ma oggi le cose sono cambiate. Se usate un sistema di gestione dei contenuti (CMS) (e la maggior parte delle persone lo fa), non avrete a che fare con file separati perché di solito il CMS genera dinamicamente le pagine in base ai dati memorizzati in un database.. Questi file sono chiamati anche documenti HTML e sono gli elementi costitutivi del vostro sito web. Ogni pagina ha diversi elementi on-page e off-page che trovano posto nei documenti HTML. Tra questi ci sono elementi di back-end come meta tag, tag title e alt tag, ma anche elementi fisici come video, immagini, blocchi di testo e altri elementi rivolti all’utente.',
            'images' => json_encode([])
        ]);
        
        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 4: Tag HTML: Quali Elementi Compongono un Documento HTML?',
            'course_id' => 1,
            'content' => 'Tutti i documenti HTML terminano con l’estensione .html o .htm. Questi documenti contengono tutto il testo e i tag che forniscono informazioni statiche a un browser web.

Il documento HTML è il manuale di istruzioni usato dal browser web dell’utente per costruire il sito. Tutti i file a cui fa riferimento (fogli di stile CSS, file JavaScript che alimentano gli elementi dinamici, ecc.) vengono letti dal browser, che poi esegue il rendering della pagina di conseguenza, consentendo alle persone di vederla nel modo previsto. Il rendering è la costruzione vera e propria e avviene ogni volta che qualcuno naviga verso una pagina specifica del vostro sito.

Se ci sono problemi con il vostro documento HTML o con uno dei file che include, il sito non verrà renderizzato correttamente. Sarebbe come cercare di assemblare una scrivania IKEA senza un pezzo o uno strumento fondamentale.

I siti web moderni contengono diversi elementi HTML composti da tag e attributi. Questi elementi creano la struttura di una pagina. I tag associati a ciascun elemento indicano dove inizia e dove finisce. Senza un tag che chiude un elemento, il browser inserirà tutti i contenuti successivi all’interno di quella colonna o riga, anche se non è quello che intendevate.

Gli attributi associati a ciascun elemento di una pagina illustrano le varie caratteristiche che li compongono.

Tutti i documenti HTML iniziano con una dichiarazione <!DOCTYPE>. Questa definizione di tipo di documento, nota anche come DTD, determina la struttura e gli elementi di un documento XML.

Se in passato <div> era la scelta principale per creare blocchi di contenuto, in HTML5 esistono anche blocchi specifici come <main> che indicano ai crawler il tipo di contenuto che sarà presente in un blocco – in questo caso, il contenuto principale del blog/articolo..',
            'images' => json_encode([])
        ]);
        
        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 5: Elementi HTML',
            'course_id' => 1,
            'content' => 'Tutti gli elementi HTML, a prescindere dalla loro creazione, hanno gli stessi tre componenti. Ci sono un tag di apertura, il contenuto stesso e un tag di chiusura. Il tag di apertura mostra al browser web dove iniziano gli elementi della pagina. Per esempio, possono indicare dove inizia un lettore video o un paragrafo di testo nella pagina. Tutti i tag di apertura usano parentesi angolari di apertura e di chiusura per contrassegnarsi. Per esempio, il tag di apertura <em> dà enfasi al contenuto, come il corsivo. Dovreste posizionare questo tag prima del testo che volete enfatizzare.

Il contenuto vero e proprio è l’informazione che l’utente vede. Può essere un testo scritto, come un articolo di un blog. Può anche essere un’immagine o un codice embed di un video. Se posizionato dopo il tag di apertura, il contenuto inizierà nel punto indicato.

Il tag di chiusura è uguale al tag di apertura, ma aggiunge una barra in avanti prima del nome dell’elemento. Per tornare al nostro esempio di tag di enfasi di prima, dovreste posizionare il tag </em> alla fine del testo che state cercando di enfatizzare.

Quindi, per esempio, se volete mettere in corsivo la parola “esattamente”, dovete codificare in questo modo:

<em>esattamente.</em>

Nella pagina reale rivolta all’utente, il codice sarà così:

Esattamente.

Gli elementi HTML includono anche gli attributi, che contengono un nome e un valore. Il nome dell’attributo indica ciò che l’utente sta aggiungendo, mentre il valore fornisce informazioni aggiuntive.

Per quanto riguarda i tag immagine, dovete ovviamente specificare quale immagine volete mostrare, quindi il risultato è questo:

<img src=”img_girl.jpg”>

Se volete rendere rosso un paragrafo della vostra pagina usando il font Arial, potete usare l’attributo style:

<p style=”color:red;font-family:arial”>.

In questo esempio, stiamo usando il tag di apertura <p> per un nuovo paragrafo. Con questi attributi, tutto ciò che è contenuto nel paragrafo sarà rosso con il font Arial, fino al tag di chiusura </p>.

Tuttavia, nello sviluppo web moderno, è prassi comune non usare l’attributo di stile HTML per regolare il design dei singoli elementi, ma piuttosto stilizzare l’intera pagina con un foglio di stile CSS separato.

La classe HTML e l’ID sono due attributi di un elemento HTML che gli danno un “nome” e vi aiutano a indirizzare questi elementi con CSS o JavaScript in un secondo momento. Questo aiuta lo sviluppo e lo rende più efficace. Utilizzando l’ID o la classe di un elemento, potete inserire informazioni di stile in elementi come il colore di sfondo, i bordi, il colore dei caratteri e altro ancora. ',
            'images' => json_encode([])
        ]);
        
       
        
        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 6: Tag ed Elementi HTML Più Usati',
            'course_id' => 1,
            'content' => 'Esistono 142 diversi tag HTML che vi permettono di creare elementi. Questi sono composti da elementi a livello di blocco e in linea.

Gli elementi a livello di blocco coprono l’intera larghezza della pagina, iniziando una nuova riga all’interno del documento.

Ecco alcuni tag comuni a livello di blocco che potreste usare nel vostro sito web:

<head> Questo tag serve per elencare le meta-informazioni, come il titolo della pagina.
<html> Questo è un elemento radice. Appare all’inizio e definisce il documento HTML.
<body> Il tag body identifica il contenuto della pagina.
da <h1> a <h6> Questi sei diversi tag identificano le varie intestazioni che potete usare.
<p> Questo è il tag paragrafo, che indica l’inizio di un nuovo paragrafo nel vostro contenuto.
<ol> Questo tag crea un elenco ordinato.
<ul> Il tag ul crea elenchi non ordinati.
<li> Questo è il tag per gli elementi dell’elenco. È racchiuso all’interno di tag di elenco ordinato o non ordinato per ogni elemento dell’elenco.
<div> Questo è un tag di blocco che crea una “sezione” che potete riempire di contenuti (e stilizzare in seguito con i CSS). La maggior parte dei siti e dei template si basa molto su questi elementi per strutturare i contenuti.
<header> Questo è un tag di blocco specifico per il contenuto dell’intestazione.
<main> Questo è un tag di blocco specifico per il contenuto principale del blog.
<footer> Questo tag di blocco è per le informazioni nel footer, come il copyright, i link, ecc.
Gli elementi in linea sono quelli che formattano il contenuto all’interno degli elementi a livello di blocco. Possono includere testi enfatizzati, come i caratteri in grassetto e in corsivo. I contenuti in linea possono anche essere dei link, sia a contenuti interni che esterni.

I link in linea formattano il testo senza interrompere il flusso dei contenuti.

Esistono alcuni tag inline comuni che potreste usare nel vostro sito web. Eccone alcuni, in ordine sparso:

<strong> Questo è il tag che si usa per creare il testo in grassetto.
<em> Il tag em, che abbiamo usato in un esempio precedente, mostra il corsivo.
<a> Questo è il tag di collegamento ipertestuale. Avrebbe bisogno di un attributo href per mostrare dove punta il link (proprio come i tag img hanno bisogno di un attributo src)..',
            'images' => json_encode([])
        ]);
        
        Lesson::create([
            'language' => 'HTML',
            'title' => 'Lezione 7: Riepilogo',
            'course_id' => 1,
            'content' => 'Abbiamo spiegato cos’è l’HTML e alcune delle nozioni di base a esso associate. Ora è arrivato il momento di parlare del processo di apprendimento dell’HTML e di come questo possa aiutare il vostro futuro e le vostre aspirazioni di carriera.

L’HTML è molto più di un linguaggio di programmazione popolare. È il linguaggio di internet e questo non cambierà presto. Va a braccetto con servizi popolari come WordPress e potete usare l’HTML per modificare molti template di WordPress e trasformarli in qualcosa di unicamente vostro.

Quindi, iniziamo dal motivo per cui qualcuno dovrebbe imparare a conoscere WordPress.

Perché Imparare l’HTML?
Imparare l’HTML è importante per chiunque voglia intraprendere una carriera nello sviluppo web. Sviluppatrici e sviluppatori web di talento sono sempre molto richiesti, sia che lavorino per agenzie che in modo indipendente, e l’apprendimento dell’HTML è la base di queste competenze.

Non solo c’è molta richiesta per questa posizione, ma chi lavora nello sviluppo web può facilmente guadagnare stipendi a sei cifre. Lo stipendio medio degli sviluppatori web è di 98.565 dollari nel 2022..',
            'images' => json_encode([])
        ]);
        
    }
}
