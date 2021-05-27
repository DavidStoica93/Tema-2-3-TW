
function addIngredient(data, status="old"){

    //STATUS  = SCHIMB ACEST PARAMETRU DOAR CAND ADAUG UN NOU INGREDIENT PT A NU PUNE MEREU PE SERVER SI IL FAC NEW DIN HTML
    // DATA = OBJ DIN JSON: id+title

    text = data.title;
    let newLine = document.createElement('li');
    // am creat linia
    newLine.id = data.id;
    // pastrez id aici pentru a sti pe care linie ma aflu cand fac update
    if(status == "new"){
        pushNewIngredientToServer(text, newLine);
        // daca il adaug prima data
    }

    let newElementEfectiveText = document.createElement('span');
    newElementEfectiveText.innerHTML = text;
    newLine.appendChild(newElementEfectiveText);
    // creare <span>title</span> si il adaug in linia nou creata

    let newElementButton = document.createElement('button');
    newElementButton.className="btn"
    newElementButton.innerHTML = 'Change ingredient';
    newElementButton.addEventListener('click', ()=>{
                // se executa functia asta cand apasa cineva click 

        let newingredient = prompt('new ingredient');
        newElementButton.previousElementSibling.innerHTML = newingredient;
        // id = newElementButton.parentNode.id;
        updateIngredient(newingredient, newElementButton.parentNode.id);
        // functia care se executa cand se da click, merg pe fratele lui si ii modific textul
    })
    newLine.appendChild(newElementButton);
    // adaug butonul care schimba ingredientul

    let newElementButtonDelete = document.createElement('button');
    newElementButtonDelete.className="btnDelete"
    newElementButtonDelete.addEventListener('click', ()=>{
        // se executa functia asta cand apasa cineva click 
        deleteIngredient(newElementButton.parentNode.id)
        newElementButton.parentNode.remove();
    })

    newElementButtonDelete.innerHTML = 'Delete ingredient';
    newLine.appendChild(newElementButtonDelete);
    // adaug butonul care sterge ingredientul

    // am creat o linie noua
    document.getElementById('container-ingredients').appendChild(newLine);
}

// --------FACEM un request pe toate ingredientele START

var xhttp = new XMLHttpRequest();
//get , READ
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // AICI MI-A FOST RETURNAT CEVA DE PE SERVER : XHTTPS.RESPONSEtEXT
       let ingredients = JSON.parse(xhttp.responseText);
       console.log(ingredients);
       for(ingredient of ingredients){
            addIngredient(ingredient);
            console.log(ingredient.title)
       }
    }
};
xhttp.open("GET", "http://localhost:3000/ingredients", true);
xhttp.send();

// FACEM un request pe toate ingredientele


// POST TEST

function pushNewIngredientToServer(text, line){
    //POST + CREATE
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 201) {
        // Typical action to be performed when the document is ready:
        let ingredients = JSON.parse(xhttp.responseText);
        console.log(ingredients)
        line.id = ingredients.id;
        }
    };
    xhttp.open("POST", "http://localhost:3000/ingredients", true);
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhttp.send(JSON.stringify({
        title:text
    }));
    // TRIMIT CATRE SERVER TITLUL, STIE EL SA SI PUNA ID
}

function updateIngredient(text, id){
    //PUT + UPDATE
// FUNCTIE CARE FACE UPDATE PE SERVER LA ID, O APELEC CAND FAC O MODIFICARE
console.log(text, id);
var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {};
    xhttp.open("PUT", `http://localhost:3000/ingredients/${id}`, true);
    // ` ` INLOCUIESTE LA FINAL ID cu valoarea lui ca sa am ingredients/3 de ex
    xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhttp.send(JSON.stringify({
        title:text
    }));
    // trimit titlul pe care l vreau acum

}


function deleteIngredient(id){
    //DELETE - DELETE
    // FUNCTIE CARE STERGE PE SERVER, O APELEC CAND STERG
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {};
        xhttp.open("DELETE", `http://localhost:3000/ingredients/${id}`, true);
        // `` INLOCUIESTE LA FINAL ID cu valoarea lui
        xhttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhttp.send();
    }
    //delete la fel, doar ca nu trimit nimic