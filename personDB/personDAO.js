let personDAO = null;
let personList = {};

function setWindowStorage() {
    personDAO = new PersonDAOWindow;
    personDAO.getPersonList((persons)=>{
        renderPersonList(persons);
    })
}

function setLocalStorage() {
    personDAO = new PersonDAOLocal;
    personDAO.getPersonList((persons)=>{
        renderPersonList(persons);
    })
}

function setServerStorage() {
    personDAO = new PersonDAOServer;
    personDAO.getPersonList((persons)=>{
        renderPersonList(persons);
    })
}

function setIndexStorage() {
    personDAO = new PersonDAOIndex;
    personDAO.getPersonList((persons)=>{
        renderPersonList(persons);
    })
}


class PersonDAOWindow{
    constructor(){
        if (PersonDAOWindow.instance){
            return PersonDAOWindow.instance
        } else {
            PersonDAOWindow.instance = this;
            personList = {};
        }
    }

    getPersonList(render) {
        render(personList);
    }

    createPerson(person){
        if(!personList[person.id]) personList[person.id] = person;
    }

    getPerson(id, render){
        render(personList[id]);
    }

    updatePerson(person){
        personList[person.id] = person;
    }

    deletePerson(id){
        delete personList[id];
    }
}


class PersonDAOLocal{
    constructor(){
        if (PersonDAOLocal.instance){
            return PersonDAOLocal.instance
        } else {
            PersonDAOLocal.instance = this;
        }
    }

    getPersonList(render) {
        const personList = JSON.parse(localStorage.getItem("persons"));
        if (personList){
            render(personList)
        } else {
            render({})
        }
    }

    createPerson(person){
        const personList = JSON.parse(localStorage.getItem("persons"));
        if (personList) {
            personList[person.id] = person;
            localStorage.setItem("persons", JSON.stringify(personList))
        }
    }

    getPerson(id, render){
        const personList = JSON.parse(localStorage.getItem("persons"));
        if (personList) {
            render(personList[id]);
        }
    }

    updatePerson(person){
        const personList = JSON.parse(localStorage.getItem("persons"));
        if(personList) {
            personList[person.id] = person;
            localStorage.setItem("persons", JSON.stringify(personList));
        }
    }

    deletePerson(id){
        const personList = JSON.parse(localStorage.getItem("persons"));
        if (personList) {
            delete personList[id];
            localStorage.setItem("persons", JSON.stringify(personList));
        }
    }
}


class PersonDAOServer{
    constructor(){
        if (PersonDAOServer.instance){
            return PersonDAOServer.instance
        } else {
            PersonDAOServer.instance = this;
        }
    }

    static errorHandler(transaction, error){
        console.log("Error: " + error.message + " (Code: " + error.code + ")");
        return true;
    }

    getPersonList(render) {
        const persons = {};

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM persons",
                [],
                (tx, result) => {
                    for (let i = 0; i < result.rows.length; i++){
                        persons[result.rows.item(i)['id']] = {
                            "id": result.rows.item(i)['id'],
                            "firstName": result.rows.item(i)["firstName"],
                            "lastName": result.rows.item(i)["lastName"],
                            "age": result.rows.item(i)["age"]
                        }
                    }
                    render(persons);
                },
                PersonDAOServer.errorHandler
            )
        });
    }

    createPerson(person){
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO persons (id, firstName, lastName, age) VALUES (?, ?, ?, ?);",
                [person.id, person.firstName, person.lastName, person.age],
                null,
                PersonDAOServer.errorHandler)
        })
    }

    getPerson(id, render){
        const person = {};

        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM persons WHERE id=?",
                [id],
                (tx, result) => {
                    if(result.rows.length === 1) {
                        person.firstName = result.rows.item(0)["firstName"];
                        person.lastName = result.rows.item(0)["lastName"];
                        person.age = result.rows.item(0)["age"];
                        console.log(person);
                        render(person);
                    } else {
                        raiseError("No such person")
                    }
                },
                PersonDAOServer.errorHandler
            )
        });
    }

    updatePerson(person){

    }

    deletePerson(id){

    }
}


class PersonDAOIndex{
    constructor(){
        if (PersonDAOIndex.instance){
            return PersonDAOIndex.instance
        } else {
            PersonDAOIndex.instance = this;
        }
    }

    getPersonList() {

    }

    createPerson(person){
        indexDB.persons.add({
            id: person.id,
            person: JSON.stringify(person)
        //     shoeSize: 8}).then (function(){
        //     //
        //     // Then when data is stored, read from it
        //     //
        //     return db.friends.get('Nicolas');
        // }).then(function (friend) {
        //     //
        //     // Display the result
        //     //
        //     alert ("Nicolas has shoe size " + friend.shoeSize);
        // }).catch(function(error) {
        //     //
        //     // Finally don't forget to catch any error
        //     // that could have happened anywhere in the
        //     // code blocks above.
        //     //
        //     alert ("Ooops: " + error);
        });
    }

    getPerson(id){

    }

    updatePerson(person){

    }

    deletePerson(id){

    }
}