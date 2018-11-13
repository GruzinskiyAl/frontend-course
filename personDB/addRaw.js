window.onload = function () {
    init();
};

function init() {
    rowFunc();
}

//достаем все записи с БД
function rowFunc() {
    //const items = createRows();
    const items = Storage.readAllItems();
    if (items.length !== 0) {
        for (let i = 0; i < items.length; i ++){
            let tbl = document.getElementById('tbl');
            this.tr = document.createElement('tr');
            this.tr.id = 'tr' + (items[i].id);
            this.idTd = document.createElement('td');
            this.idTd.id = 'id-td' + (i+1);
            this.fNameTd = document.createElement('td');
            this.fNameTd.id = 'fname-td' + (i+1);
            this.lNameTd = document.createElement('td');
            this.lNameTd.id = 'lname-td' + (i+1);
            this.ageTd = document.createElement('td');
            this.ageTd.id = 'age-td' + (i+1);
            this.textId = document.createTextNode(items[i].id);
            this.textFName = document.createTextNode(items[i].fname);
            this.texttLName = document.createTextNode(items[i].lname);
            this.textAge = document.createTextNode(items[i].age);
            this.idTd.appendChild(this.textId);
            this.fNameTd.appendChild(this.textFName);
            this.lNameTd.appendChild(this.texttLName);
            this.ageTd.appendChild(this.textAge);
            this.tr.appendChild(this.idTd);
            this.tr.appendChild(this.fNameTd);
            this.tr.appendChild(this.lNameTd);
            this.tr.appendChild(this.ageTd);
            tbl.appendChild(this.tr);
        }
    }
}

//добавление в БД
function createBtn() {
    var item = createRow();

    if (inputId !== '' && inputFName !== '' && inputLName !== '' && inputAge !== ''){
        //сохранение в БД
        dbPromise.then(function(db) {
            var tx = db.transaction('store', 'readwrite');
            var store = tx.objectStore('store');

            store.add(item);

            return tx.complete;
        }).then(function() {
            console.log('added item to the store os!');
        });
    }else{
        document.getElementById('warn').innerHTML = 'Заполните все поля';
        document.getElementById('warn').style.color = 'red';
    }

}

function readBtn() {
    let rInput = document.getElementById('inputId').value;
    dbPromise.then(function(db) {
        var tx = db.transaction('store', 'readonly');
        var store = tx.objectStore('store');
        return store.get(rInput);
    }).then(function(val) {
        alert('id: ' + val.id + ' First name: ' + val.fname + ' Last name: ' + val.lname + ' Age: ' + val.age);
    });
}

function updateBtn() {
    const inputId = document.getElementById("inputId").value;
    const inputFName = document.getElementById('inputFName').value;
    const inputLName = document.getElementById('inputLName').value;
    const inputAge = document.getElementById('inputAge').value;
    let parent = document.getElementById('tbl');
    let trChild = document.getElementById('tr' + inputId);
    dbPromise.then(function(db) {
        var tx = db.transaction('store', 'readwrite');
        var store = tx.objectStore('store');
        var item = {
            id: inputId,
            fname: inputFName,
            lname: inputLName,
            age: inputAge
        };
        store.put(item);

        //удаление сразу же с экрана
        parent.removeChild(trChild);
        //добавление сразу же на экран
        let tbl = document.getElementById('tbl');
        this.tr = document.createElement('tr');
        this.tr.id = 'tr' + inputId;
        this.idTd = document.createElement('td');
        this.idTd.id = 'id-td' + inputId;
        this.fNameTd = document.createElement('td');
        this.fNameTd.id = 'fname-td' + inputId;
        this.lNameTd = document.createElement('td');
        this.lNameTd.id = 'lname-td' + inputId;
        this.ageTd = document.createElement('td');
        this.ageTd.id = 'age-td' + inputId;
        this.textId = document.createTextNode(inputId);
        this.textFName = document.createTextNode(inputFName);
        this.texttLName = document.createTextNode(inputLName);
        this.textAge = document.createTextNode(inputAge);
        this.idTd.appendChild(this.textId);
        this.fNameTd.appendChild(this.textFName);
        this.lNameTd.appendChild(this.texttLName);
        this.ageTd.appendChild(this.textAge);
        this.tr.appendChild(this.idTd);
        this.tr.appendChild(this.fNameTd);
        this.tr.appendChild(this.lNameTd);
        this.tr.appendChild(this.ageTd);
        tbl.appendChild(this.tr);

        return tx.complete;
    }).then(function() {
        console.log('item updated!');
    });
}

function deleteBtn() {
    let dInput = document.getElementById('inputId').value;
    let parent = document.getElementById('tbl');
    let trChild = document.getElementById('tr' + dInput);
    dbPromise.then(function(db) {
        var tx = db.transaction('store', 'readonly');
        var store = tx.objectStore('store');
        return store.get(dInput);
    }).then(function(val) {
        dbPromise.then(function(db) {
            var tx = db.transaction('store', 'readwrite');
            var store = tx.objectStore('store');
            store.delete(val.id);
            parent.removeChild(trChild);
            return tx.complete;
        }).then(function() {
            console.log('Item deleted');
        });
    });
}

function createRows(items) {
    let itemsRet = null
    dbPromise.then(function(db) {
        var tx = db.transaction('store', 'readonly');
        var store = tx.objectStore('store');
        return store.getAll();
    }).then(function(items) {
        itemsRet = items;
    });
    return items;
}
function createRow() {
    const inputId = document.getElementById("inputId").value;
    const inputFName = document.getElementById('inputFName').value;
    const inputLName = document.getElementById('inputLName').value;
    const inputAge = document.getElementById('inputAge').value;
// вывод сразу же на экран
    const item = {
        id: inputId,
        fname: inputFName,
        lname: inputLName,
        age: inputAge
    };

    const tbl = document.getElementById('tbl');
    this.tr = document.createElement('tr');
    this.tr.id = 'tr' + inputId;
    this.idTd = document.createElement('td');
    this.idTd.id = 'id-td' + inputId;
    this.fNameTd = document.createElement('td');
    this.fNameTd.id = 'fname-td' + inputId;
    this.lNameTd = document.createElement('td');
    this.lNameTd.id = 'lname-td' + inputId;
    this.ageTd = document.createElement('td');
    this.ageTd.id = 'age-td' + inputId;
    this.textId = document.createTextNode(inputId);
    this.textFName = document.createTextNode(inputFName);
    this.texttLName = document.createTextNode(inputLName);
    this.textAge = document.createTextNode(inputAge);
    this.idTd.appendChild(this.textId);
    this.fNameTd.appendChild(this.textFName);
    this.lNameTd.appendChild(this.texttLName);
    this.ageTd.appendChild(this.textAge);
    this.tr.appendChild(this.idTd);
    this.tr.appendChild(this.fNameTd);
    this.tr.appendChild(this.lNameTd);
    this.tr.appendChild(this.ageTd);
    tbl.appendChild(this.tr);
    return item
}
