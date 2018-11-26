const THEME_SETTINGS = {
    "light": {
        "bgc": "#80bfff",
        "sheetBgc": "#fff",
        "titleColor": "#111",
        "btnColor": "#80bfff",
        "controllBgc": "#fff",
        "fontColor": "#000"
    },
    "dark": {
        "bgc": "#660000",
        "sheetBgc": "#808080",
        "titleColor": "#fff",
        "btnColor": "#660000",
        "controllBgc": "#111",
        "fontColor": "#fff"
    }
}

const LANGUAGE_SETTINGS = {
    "en": {
        "title": "Paint",
        "isBrush":"brush",
        "layers": "Layers",
        "enter": "Enter",
        "settings": "Settings"
    },
    "ru": {
        "title": "Пейнт",
        "isBrush":"карандаш",
        "layers": "Слои",
        "enter": "Принять",
        "settings": "Настройки"
    }
}
// language items
const appTitleLabel = document.querySelector("#appTitle");
const isBrushLabel = document.querySelector("#isBrushStatusLabel");
const layersLabel = document.querySelector("#layersLabel");
const colorChangeBtnLabel = document.querySelector("#colorChangeBtn");
const settingBlockLabel = document.querySelector("#openSettings");
//
// main paint items
const mainWindow = document.querySelector("#mainWindow");
const controllPanel = document.querySelector("#paintController");
const paintSheet = document.querySelector("#paintPanel");
const appTitle = document.querySelector("#appTitle");
const appButtons = document.querySelectorAll(".paintapp-btn");
const settingBlock = document.querySelector("#settingMenu");
//
const settingsMenu = document.querySelector("#settingsMenuBlock")
const closeSettingsBtn = document.querySelector("#closeSettingsBtn");
const openSettingsBtn = document.querySelector("#openSettings");

const darkThemeBtn = document.querySelector("#darkTheme");
const lightThemeBtn = document.querySelector("#lightTheme");
const enLanBtn = document.querySelector("#enLan");
const ruLanBtn = document.querySelector("#ruLan");

openSettingsBtn.onclick = () => {
    settingsMenu.style.display = "block"
}

closeSettingsBtn.onclick = () => {
    settingsMenu.style.display = "none"
}

darkThemeBtn.onclick = () => {
    setPaintTheme("dark");
}

lightThemeBtn.onclick = () => {
    setPaintTheme("light");
}

enLanBtn.onclick = () => {
    setPaintLanguage("en")
}

ruLanBtn.onclick = () => {
    setPaintLanguage("ru")
}

function setPaintTheme(theme) {
    let data = THEME_SETTINGS[theme];

    mainWindow.style.backgroundColor = data.bgc;
    mainWindow.style.color = data.fontColor;
    paintController.style.backgroundColor = data.controllBgc;
    paintSheet.style.backgroundColor = data.sheetBgc;

    appButtons.forEach((button) => {
        button.style.backgroundColor = data.btnColor;
    });

    setSettingsMenuTheme(data.bgc);
}

function setSettingsMenuTheme (color) {
    closeSettingsBtn.style.backgroundColor = color;
    document.querySelectorAll(".top-lvl-menu__item").forEach(el=>{el.style.backgroundColor = color})
    document.querySelectorAll(".sec-lvl-menu__item").forEach(el=>{el.style.backgroundColor = color})
}

function setPaintLanguage(language) {
    let data = LANGUAGE_SETTINGS[language];

    appTitleLabel.innerHTML = data.title;
    isBrushLabel.innerHTML = data.isBrush;
    layersLabel.innerHTML = data.layers;
    colorChangeBtnLabel.innerHTML = data.enter;
    settingBlockLabel.innerHTML = data.settings;
}
