let xhr = null;

window.onload = function() {
    xhr = new XMLHttpRequest()
};

const btn = document.getElementById('btn');
const div = document.getElementById('div');
console.log(btn);
btn.addEventListener('click', read);

function read() {
    xhr.open( 'GET', 'file:///D:/front-end/requests/data.json');
    xhr.onreadystatechange = readyState;
    xhr.send(null)
}

function readyState() {
    if ( xhr.readyState === 4 ) {
        let data = JSON.parse(xhr.responseText);
        let manList = getMans(data.file);
        console.log(manList);
        div.innerHTML = JSON.stringify(manList);
    }
}

function getMans(personsList) {
    return personsList.filter((person)=>{return person.sex === "m"})
}
// Чат:
//     - форма регистрации/авторизации
// - бд сервера (логин ник пароль)
// - на сервере активные юзеры
// - юзер логинется и разлогинивается
// - регистрация с валидацией полей
