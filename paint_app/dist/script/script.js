window.onload = function() {
    init();
};

function init() {
    window.tabManager = new TabManager();

    window.addLayerBtn = document.getElementById("addLayerBtn");

    window.addTabBtn = document.getElementById("addTabButton");

    window.paintPanel = document.getElementById("paintPanel");

    addEventListeners();
}

function addEventListeners() {
    addTabBtn.onclick = addTab;

    addLayerBtn.onclick = addLayer;
}

function addTab() {
    tabManager.createNewTab();
}

function addLayer() {
    tabManager.createNewTabLayer();
}