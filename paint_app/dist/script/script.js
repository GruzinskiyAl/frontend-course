window.onload = function() {
    init();
};

function init() {
    window.tabManager = new TabManager();

    window.addTabBtn = document.getElementById("addTabButton");

    window.paintPanel = document.getElementById("paintPanel");

    addEventListeners();
}

function addEventListeners() {
    addTabBtn.onclick = addTab;

    paintPanel.onmousemove = mouseMoveHandler;
    paintPanel.onmousedown = startPainting;
    paintPanel.onmouseup = stopPainting;
    paintPanel.onmouseleave = stopPainting;
    paintPanel.onclick = mouseClickHandler;
}

function addTab() {
    tabManager.createNewTab();
}