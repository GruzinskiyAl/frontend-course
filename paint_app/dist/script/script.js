window.onload = function() {
    init();
};

function init() {
    window.tabManager = new TabManager();
    window.addLayerBtn = document.querySelector("#addLayerBtn");
    window.addTabBtn = document.querySelector("#addTabButton");
    window.paintPanel = document.querySelector("#paintPanel");

    window.colorField = document.querySelector("#colorField");
    window.setColorBtn = document.querySelector("#colorChangeBtn");
    window.sizeScale = document.querySelector("#sizeScale");
    window.figureSelect = document.querySelector("#figureMenu");
    window.isBrushCheckbox = document.querySelector("#isBrushStatus");

    window.colorIndicator = document.querySelector("#colorIndicator");
    
    addEventListeners();
    setInitialSettingValues();
}

function addEventListeners() {
    addTabBtn.onclick = () => {
        tabManager.createNewTab();
    };

    addLayerBtn.onclick = () => {
        tabManager.createNewTabLayer();
    };

    setColorBtn.onclick = () => {
        let color = colorField.value;
        tabManager.changeSettings("brushColor", color)
        colorIndicator.style.backgroundColor = color;
    }

    sizeScale.oninput = () => {
        let size = sizeScale.value;
        tabManager.changeSettings("brushSize", size)
    }

    figureSelect.onchange = () => {
        let figure = figureSelect.value;
        tabManager.changeSettings("figure", figure)
    }

    isBrushCheckbox.onclick = () => {
        let status = isBrushCheckbox.checked;
        tabManager.changeSettings("isBrushStatus", status)
    }

}

function setInitialSettingValues() {
    // show last settings on controll panel
    colorField.value = tabManager.currentSettings.brushColor;
    colorIndicator.style.backgroundColor = tabManager.currentSettings.brushColor;

    sizeScale.value = tabManager.currentSettings.brushSize;
    figureSelect.value = tabManager.currentSettings.figure;
    isBrushCheckbox.checked = tabManager.currentSettings.isBrushStatus;
}