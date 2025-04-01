// Aggiungiamo la componente js di interazione con l’utente.
// Quando l’utente fa click sul bottone submit del form, il sito deve calcolare l’ammontare del preventivo per le ore di lavoro richieste. 

// Il prezzo finale è dato dal numero di ore per prezzo orario. Supponiamo per semplicità che ogni progetto richieda lo stesso numero di ore di lavoro (es: 10 ore).

// Il prezzo orario per una commissione varia in questo modo:
// se la commissione riguarda lo sviluppo backend il prezzo orario è di 20.50€/l’ora
// se la commissione riguarda lo sviluppo frontend il prezzo orario è di 15.30€/l’ora
// se la commissione riguarda l’analisi progettuale il prezzo orario è di 33.60€/l’ora

// L’utente potrebbe decidere di utilizzare un codice promozionale tra i seguenti: YHDNU32, JANJC63, PWKCN25, SJDPO96, POCIE24.

// Se l’utente inserisce un codice promozionale valido, ha diritto ad uno sconto del 25% sul prezzo finale. Se il codice inserito non è valido, il sito deve informare l’utente che il codice non è valido e il prezzo finale viene calcolato senza applicare sconti.

// Il risultato del calcolo del prezzo finale deve essere visualizzato in “forma umana” (con 2 decimali e il simbolo dell’euro).


/* esecuzione logica
- al clik sul bottone salvo il prezzo orario in base al  tipo di lavoro in una costante 
- calcolo il prezzo in base al tipo di lavoro * 10 (10 ore di lavoro)
- creo una variabile sconto = 0 
- verifico se l' utente ha inserito uno di questi codici YHDNU32, JANJC63, PWKCN25,     SJDPO96, POCIE24.
    - se il codice corrisponde salvo nella variabile sconto sconto = 25% e stampo il prezzo scontato con due decimali
    - altrimenti stampo un messaggio in pagina che il codice sconto non è valido e stampo il prezzo non scontato con due decimali


*/

//prelevo gli input 
const userForm = document.getElementById("userForm");
const workTypeInput = document.getElementById("workType");
const codeInput = document.getElementById("code");
const finalPriceElem = document.getElementById("finalPrice");
const validPromoCodeElem = document.getElementById("validPromoCode");
const messageElem = document.getElementById("message")
console.log(messageElem)

//array codici promozionali
const promoCode = ["YHDNU32", "JANJC63", "PWKCN25", "SJDPO96", "POCIE24"];
// salvo nelle costanti i valori dei prezzi in base al tipo di lavoro e salvo le ore di lavoro 
const backendDevelopment = 20.5;
const frontendDevelopment = 15.3;
const projectAnalysis = 33.6
const workingHours = 10;
const discount = 0.25;

userForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault(); //evito che il browser ricarichi la pagina nel momento del submit
    const workType = workTypeInput.value
    console.log("Tipo di workType:", typeof workType);
    const code = codeInput.value

    console.log(workType);
    console.log("Codice promozionale inserito:", code);
    

    // Determino il prezzo in base al tipo di lavoro
    let workPrice;
    if (workType === "Backend Development") {
        workPrice = backendDevelopment;

    } else if (workType === "Frontend Development") {
        workPrice = frontendDevelopment;

    } else {
        workPrice = projectAnalysis;
    }

    console.log("Prezzo orario:", workPrice);

    // Calcolo il prezzo standard
    const standardPrice = workingHours * workPrice;
    console.log("Prezzo totale:", standardPrice);

    //Rimuovo le classi che colorano il testo del messaggio
    messageElem.classList.remove("text-sucess", "text-danger");

    let finalPrice = standardPrice;
    let message = "";
    //se presente il codice promozionale applico lo sconto
    

    // Controllo il codice promozionale
    if (code === "") {
        message = ""; // Nessun messaggio se non viene inserito un codice promo
    } else if (promoCode.includes(code)) {
        finalPrice = standardPrice - (standardPrice * discount);
        messageElem.classList.add("text-success")
        message = "Il codice inserito è valido, hai diritto a uno sconto del 25%!";
    } else {
        messageElem.classList.add("text-danger")
        message = "Il codice inserito è errato!";
    }
    console.log(finalPrice.toFixed(2));
    // converto il valore in una stringa e sostituisco il punto con la virgola
    const finalPriceSr = finalPrice.toFixed(2).toString().replace(".", ",");

    // divido i due valori per stampare la parte intera in bold e la parte con la virgola no
    let [int, decimal] = finalPriceSr.split(",")
    console.log(int, decimal)


    //stampo in pagina il prezzo finale
    finalPriceElem.innerHTML = `<p class="fw-bolder">Prezzo finale<br><span class= "fs-3">€ ${int}</span><span class= "fs-4 fw-light">,${decimal}</span></p>`
    console.log(finalPriceElem)
    //mostro il messaggio in base se il codice viene applicato o meno
    messageElem.innerText = `${message}`;
    console.log(message)
    //ripulisco i campi del form
    userForm.reset();
}

