"use strict";

const DEFAULT_PAINT_SETTINGS = {
    "brushColor": "black",
    "brushSize": 25,
    "figure": "Circle",
    "isBrushStatus": true
}

class TabManager{
    constructor(){
        this.paintPanel = document.getElementById('paintPanel');
        this.tabAggregator = document.getElementById("tabAggregator");
        this.layerAggregator = document.getElementById("layerAggregator");

        this.tabArray = [];
        this.tabCount = 0;    // for tab name
        this.activeTab = null;
        this.sheetSize = {    // for canvasWrapper and canvas
            width: this.paintPanel.clientWidth + "px",
            height: this.paintPanel.clientHeight + "px",
        };

        this.currentSettings = this.getInitialPaintSettings(); // load from localStorage or get default
    }

    getInitialPaintSettings(){
        let settings = localStorage.getItem("settings");
        if (settings) {
            return JSON.parse(settings)
        } else {
            localStorage.setItem("settings", JSON.stringify(DEFAULT_PAINT_SETTINGS));
            return DEFAULT_PAINT_SETTINGS;
        }
    }

    changeSettings(key, value){
        this.currentSettings[key] = value;
        localStorage.setItem("settings", JSON.stringify(this.currentSettings));
        if (this.activeTab) {
            this.activeTab.changeTabSettings(key, value)
        }
        
    }

    // for creating new tabs
    clearPaintPanel(){
        while (this.paintPanel.firstChild) {
            this.paintPanel.removeChild(this.paintPanel.firstChild);
        }
    }

    // for creating new tab layerButtons
    clearLayerAggregator(){
        while (this.layerAggregator.firstChild) {
            this.layerAggregator.removeChild(this.layerAggregator.firstChild);
        }
    }

    // activate last tab after deleting current tab
    activateLastTab(){
        const lastTab = this.tabArray[this.tabArray.length - 1];
        if(lastTab) this.activateTab(lastTab);
    }

    // on tab creating set delete function to tabButton
    setDeleteTabAction(tab){
        const deleteButton = tab.getDeleteButton();
        deleteButton.onclick = (event) => {
            const i = this.tabArray.indexOf(tab);
            this.tabArray.splice(i, 1);

            this.tabAggregator.removeChild(tab.tabButton);
            this.clearPaintPanel();
            this.clearLayerAggregator();

            this.activateLastTab();
            event.stopImmediatePropagation();
        }
    }

    // on tab creating set activation funcion to tabButton
    setActivateTabAction(tab){
        const tabButton = tab.tabButton;
        tabButton.onclick = (event) => {
            this.activateTab(tab);
            event.stopImmediatePropagation();
        }
    }

    // show tabButton as active and deactivate current tabButton
    activateTabButton(tab){
        if (this.activeTab) {
            this.activeTab.deactivateButton();
        }
        tab.activateButton();
    }

    activateTab(tab){
        this.clearPaintPanel();
        
        this.paintPanel.appendChild(tab.wrapperBlock); // add sheet to paintPanel
        
        this.renderLayerButtons(tab);                  // show layers of tab
        this.activateTabButton(tab);
        this.activeTab = tab;
    }

    // refresh layer button list
    renderLayerButtons(tab){
        this.clearLayerAggregator();

        tab.layerList.forEach((layer) => {
            this.layerAggregator.appendChild(layer.layerButton)
        })
    }

    createNewTab(){
        const newTab = new PaintTab({paintSettings: this.currentSettings,
                                numId: ++this.tabCount,
                                sizes: this.sheetSize});

        this.tabArray.push(newTab);
        
        // add action listeners to tabButton
        this.setActivateTabAction(newTab);
        this.setDeleteTabAction(newTab);

        this.tabAggregator.appendChild(newTab.tabButton);
        this.activateTab(newTab);
    }

    createNewTabLayer(){
        let newLayer = this.activeTab.addLayer();
        this.renderLayerButtons(this.activeTab)

        newLayer.deleteLayerButton.onclick = () => {
            this.activeTab.deleteLayer(newLayer);
            this.renderLayerButtons(this.activeTab);
        }
    }
}