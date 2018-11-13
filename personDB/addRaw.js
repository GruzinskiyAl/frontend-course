onload = function () {
    init();
};

function init() {
    window.idFld = document.getElementById("inputId");
    window.firstNameFld = document.getElementById("inputFirstName");
    window.lastNameFld = document.getElementById("inputLastName");
    window.ageFld = document.getElementById("inputAge");

    window.errorField = document.getElementById("error");

    addEventListeners();
}

function addEventListeners() {
    let createBtn = document.getElementById("createBtn");
    let readBtn = document.getElementById("readBtn");
    let updateBtn = document.getElementById("updateBtn");
    let deleteBtn = document.getElementById("deleteBtn");

    let indexBtn = document.getElementById("indexBtn");
    let webBtn = document.getElementById("webBtn");
    let lsBtn = document.getElementById("lsBtn");
    let wsBtn = document.getElementById("wsBtn");

    createBtn.onclick = createPerson;
    readBtn.onclick = readPerson;
    updateBtn.onclick = updatePerson;
    deleteBtn.onclick = deletePerson;

    indexBtn.onclick = setIndexStorage;
    webBtn.onclick = setServerStorage;
    lsBtn.onclick = setLocalStorage;
    wsBtn.onclick = setWindowStorage;
}

function renderPersonList(personListObj) {
    const tableBody = document.getElementById("tableBody");

    while (tableBody.firstChild){
        tableBody.removeChild(tableBody.firstChild)
    }

    for(let keyId in personListObj) {
        let raw = document.createElement("DIV");
        let id = document.createElement("DIV");
        let firstName = document.createElement("DIV");
        let lastName = document.createElement("DIV");
        let age = document.createElement("DIV");

        id.innerText = personListObj[keyId]["id"];
        firstName.innerText = personListObj[keyId]["firstName"];
        lastName.innerText = personListObj[keyId]["lastName"];
        age.innerText = personListObj[keyId]["age"];

        raw.className = "table-block__raw";
        id.className = "table-block__raw-id";
        firstName.className = "table-block__raw-first-name";
        lastName.className = "table-block__raw-last-name";
        age.className ="table-block__raw-age";

        raw.appendChild(id);
        raw.appendChild(firstName);
        raw.appendChild(lastName);
        raw.appendChild(age);

        tableBody.appendChild(raw);
    }
}

function containsUndefined(obj) {
    for(let key in obj) {
        if (!obj[key]) return true;
    }
    return false
}

function raiseError(text) {
    errorField.innerText = text;
}

function createPerson() {
    if (personDAO) {
        const id = idFld.value;
        const firstName = firstNameFld.value;
        const lastName = lastNameFld.value;
        const age = ageFld.value;

        const person = {
            id,
            firstName,
            lastName,
            age
        };

        if (!containsUndefined(person)) {
            personDAO.createPerson(person);
        } else {
            raiseError("Include empty field!");
        }

        personDAO.getPersonList((persons)=>{
            renderPersonList(persons);
        })
    } else {
        raiseError("Storage is not chosen")
    }
}

function readPerson() {
    const id = idFld.value;
    if (!id) raiseError("Id field is invalid");

    if (personDAO) {
        personDAO.getPerson(id, (person) => {
            if (person) {
                firstNameFld.value = person.firstName;
                lastNameFld.value = person.lastName;
                ageFld.value = person.age;
            } else {
                raiseError("No such person")
            }
        })
    } else {
        raiseError("Storage is not chosen")
    }
}

function updatePerson(){
    if (personDAO) {

    const person = {
        id: idFld.value,
        firstName: firstNameFld.value,
        lastName: lastNameFld.value,
        age: ageFld.value
    };

    if (!containsUndefined(person)) {
        personDAO.updatePerson(person);
    } else {
        raiseError("Include empty field!");
    }

    personDAO.getPersonList((persons)=>{
        renderPersonList(persons);
    });

    } else {
        raiseError("Storage is not chosen")
    }
}

function deletePerson() {
    const id = idFld.value;

    if (personDAO) {
        personDAO.deletePerson(id);
        personDAO.getPersonList((persons)=>{
            renderPersonList(persons);
        })
    } else {
        raiseError("Storage is not chosen")
    }
}


