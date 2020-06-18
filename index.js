//Creo il prototipo della funz. Persona
function Persona(n,c,cf){
    this.nome = n;
    this.cognome = c;
    this.codfis = cf;
}

//Creiamo un array vuoto
let anagrafica = [];

let totContatti = 0;

//INIT dell'app (START):
//ONLOAD controlla se ci sono elementi nello storage ed in caso positivo li preleva e li usa per inizializzare l'array
//Stringa del Local Storage --> Elementi dell'array
window.onload = () => {
    if(window.localStorage.getItem('utenti') != null){
        let datiStore = JSON.parse(window.localStorage.getItem('utenti'))
        //Inizializzo l'anagrafica con i dati presenti nel Local Storage
        anagrafica = datiStore;
        console.log('Start: ho preso la stringa del Local Storage');
        updateCounter();
        //readStorage();
    } 
    //Inizializzo il contatore a zero
    updateCounter();
}

//Aggiorno il contatore degli utenti
function updateCounter(){
    totContatti = anagrafica.length;
    //Stampa nell'HTML il valore numerico del contatore
    document.getElementById('contatore-contatti').innerHTML = totContatti;
}

//Resetto il form
function azzeraForm(){
    document.getElementById('nome').value = '';
    document.getElementById('cognome').value = '';
    document.getElementById('cf').value = '';
}


//Immagazzino i dati di una persona nello Storage
function salvaDatiStorage(n,c,cf){
    let p = new Persona(n, c, cf);
    anagrafica.push(p);
    window.localStorage.setItem('utenti', JSON.stringify(anagrafica));
    alert('Utente inserito!');
    azzeraForm();
    updateCounter();
    //Rimuovo la classe 'erroreCF' dall'elemento 'cf' (Tolgo il colore rosso dal bordo della casella CF)
    document.getElementById('cf').classList.remove('erroreCF');
    
}


//Prelevo i dati dal form di contatto e li inserisco nello Storage (Chiave-Valore)
function insertStorage(){
    //Collegare le variabili JS all'HTML
    let nomeInput = document.getElementById('nome').value;
    let cognomeInput = document.getElementById('cognome').value;
    let cfInput = document.getElementById('cf').value;

    let trovato = false;

    //Se si lascia uno o più campi vuoti
    if(nomeInput == '' || cognomeInput == '' || cfInput == ''){
        alert('Tutti i campi sono obbligatori');
    }

    //Altrimenti, se i campi vengono riempiti tutti
    else{
        //Se c'è almeno una persona nell'array anagrafica
        if(anagrafica.length > 0){
            //Controllo che all'interno dell'array non ci sia un caso di omonimia (stesso codice fiscale)
            
            //Arrow function: Ciclo for-each
            anagrafica.forEach((p) => {
                if(p.codfis == cfInput){
                    trovato = true;
                    //Aggiungo la classe 'erroreCF' all'elemento 'cf' (Metto il colore rosso nel bordo della casella del CF)
                    document.getElementById('cf').classList.add('erroreCF');
                    alert('ATTENZIONE: utente presente nella lista!!!');
                    azzeraForm();
                    return;
                }
            });
            //Fine ciclo for-each

            if(!trovato){
                salvaDatiStorage(nomeInput, cognomeInput, cfInput);
            }
            else{
                document.getElementById('cf').classList.add('erroreCF');
                alert('Gia presente');
                azzeraForm();
            }
        }
        else{
            //Altrimenti, se l'anagrafica è vuota
            salvaDatiStorage(nomeInput, cognomeInput, cfInput);
        }
    }
    //Stampo a schermo i dati appena inseriti
    console.log(nomeInput + " " + cognomeInput + " " + cfInput);
}





//Leggo e stampo la lista degli elementi dello Storage
function readStorage(){
    let datiStore = JSON.parse(window.localStorage.getItem('utenti'))
    //Inizializzo l'anagrafica con i dati presenti nel Local Storage
    anagrafica = datiStore;
    console.log('Start: ho preso la stringa del Local Storage');
    updateCounter();
    //Stampo ad uno ad uno gli utenti dell'anagrafica
    for(i=1; i<=anagrafica.length; i++){
        console.log(anagrafica.Persona);
    }

        anagrafica.getElementById()
    
    //Inizializzo il contatore a zero
    updateCounter();

}

//Creo la funzione per cercare un utente a partire dal suo CF
function searcPersona(){

    //Scorro l'array

    //Trovo l'elemento

    //Stampo a schermo l'elemento
}

function deletePersona(){

}
