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
        console.log('START: ho preso la stringa del Local Storage');
        updateCounter();
        aggiornaListaContatti();
    } 
    //Inizializzo il contatore a zero
    updateCounter();
    aggiornaListaContatti();
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

    azzeraForm();
    updateCounter();
    aggiornaListaContatti();
    //Rimuovo la classe 'erroreCF' dall'elemento 'cf' (Tolgo il colore rosso dal bordo della casella CF)
    document.getElementById('cf').classList.remove('erroreCF');
    
}


//Prelevo i dati dal form di contatto e li inserisco nello Storage (Chiave-Valore)
function insertStorage(){
    //Collegare le variabili JS all'HTML: Preleva i dati dall'input
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
            //Controllo che all'interno dell'array non ci sia un caso di omonimia (stesso CF)
            
            //Arrow function: Ciclo for-each (Stiamo ciclando anagrafica)
            anagrafica.forEach((p) => {
                if(p.codfis == cfInput){
                    trovato = true;
                    //Aggiungo alla class="cf" la class='erroreCF' (Metto il colore rosso nel bordo della casella del CF)
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
function aggiornaListaContatti(){

    //<ul class="list-group list-group-flush" id="mylist">
    //    <li class="list-group-item">Mario Bianchi <span class="cf">MB</span><span><i class="fa fa-trash-o text-danger float-right" aria-hidden="true" onclick="deletePersona()"></i></span></li>                
    //</ul>

    //Sto creando il codice che c'è sopra
    let ul = document.createElement('ul');                //Creo <ul>
    ul.classList.add('list-group', 'list-group-flush');   //aggiungo ad ul class="list-group list-group-flus"
    ul.id = 'myList';                                     //aggiungo ad ul id="myList"
    //Creo <li> vuoto
    let tagLi = '';
    //Inizio a ciclare anagrafica
    anagrafica.forEach((ele) => {
        //Template Literal
        tagLi += `<li class="list-group-item">${ele.nome} ${ele.cognome} <span class="cf">${ele.codfis}</span><span><i class="fa fa-trash-o text-danger float-right" aria-hidden="true" onclick="deletePersona('${ele.codfis}')"></i></span></li>`;
    });

    document.getElementById('contatti').appendChild(ul);
    document.getElementById('myList').innerHTML = tagLi;
}

//Visualizza contatto
function visualizzaContatto(cf){
    if(cf != undefined && cf != ''){
        anagrafica.forEach((ele) => {
            if(ele.codfis == cf){
                let ul = document.createElement('ul');
                ul.classList.add('list-group', 'list-group-flush');
                ul.id = 'myListSearch';
                let tagLi = '';
                document.getElementById('risultatiRicerca').appendChild(ul);
                //Template Literal
                tagLi += `<li class="list-group-item">${ele.nome} ${ele.cognome} <span class="cf">${ele.codfis}</span><span><i class="fa fa-trash-o text-danger float-right" aria-hidden="true" onclick="deletePersona('${ele.codfis}')"></i></span></li>`;
                document.getElementById('myListSearch').innerHTML = tagLi;
                return;
            }
            
        });
    }
    else{
        document.getElementById('myListSearch').remove();
        document.getElementById('searchCF').value;
    }
}

//Creo la funzione per cercare un utente a partire dal suo CF
function searchPersona(){
    let cf = document.getElementById('searchCF').value;
    visualizzaContatto(cf);
}

function deletePersona(cf){
    //Creo una confirm per far spuntare una finstra del browser che mi faccia una domanda boolean
    let res = confirm(`Sei sicuro di voler eliminare il contatto avente CF: ${cf} ?`);
    if (res){
        
        let posPersona = -1;
        anagrafica.forEach((ele, index) => {
            if(ele.codfis == cf){
                //Conservo l'indice della persona da eliminare
                posPersona = index;
                return;
            }
        });
        //Se l'elemento è stato trovato...
        if(posPersona != -1){
            //Splice(posPersona,1): elimina a partire da posPersona un solo elemento
            anagrafica.splice(posPersona, 1);
            window.localStorage.setItem('utenti', JSON.stringify(anagrafica));
            updateCounter();
            aggiornaListaContatti();
            visualizzaContatto();
        }
    }  
}
