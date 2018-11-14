"use strict";

class TabManager{
    constructor(){
        this.paintPanel = document.getElementById('paintPanel');
        this.tabAggregator = document.getElementById("tabAggregator");
        this.layerAggregator = document.getElementById("layerAggregator");

        this.tabArray = [];
        this.activeTab = null;
        this.sheetSize = {
            width: this.paintPanel.clientWidth + "px",
            height: this.paintPanel.clientHeight + "px",
        };

        this.currentSettings = {
            color: "",
            size: "",
            isBrushStatus: "",
            figure: ""
        }
    }

    clearPaintPanel(){
        while (this.paintPanel.firstChild) {
            this.paintPanel.removeChild(this.paintPanel.firstChild);
        }
    }

    clearLayerAggregator(){
        while (this.layerAggregator.firstChild) {
            this.layerAggregator.removeChild(this.layerAggregator.firstChild);
        }
    }

    activateLastTab(){
        const lastTab = this.tabArray[this.tabArray.length - 1];
        if(lastTab) this.activateTab(lastTab);
    }

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

    setActivateTabAction(tab){
        const tabButton = tab.tabButton;
        tabButton.onclick = (event) => {
            this.activateTab(tab);
            event.stopImmediatePropagation();
        }
    }

    activateTabButton(tab){
        this.tabArray.forEach((tab) => {
            tab.deactivateButton();
        });
        tab.activateButton();
    }

    activateTab(tab){
        this.clearPaintPanel();
        // add sheet to paintPanel
        this.paintPanel.appendChild(tab.wrapperBlock);
        // show layers of tab
        this.renderLayers(tab);
        this.activateTabButton(tab);
        this.activeTab = tab;
    }

    renderLayers(tab){
        this.clearLayerAggregator();

        tab.layerButtonList.forEach((button)=>{
            this.layerAggregator.appendChild(button)
        })
    }

    createNewTab(){
        this.tabCount = this.tabArray.length;

        const newTab = new PaintTab({color: this.currentSettings.color,
                                brushSize: this.currentSettings.size,
                                isBrushStatus: this.currentSettings.isBrushStatus,
                                figure: this.currentSettings.figure,
                                numId: this.tabCount+1,
                                sizes: this.sheetSize});

        this.tabArray.push(newTab);
        // add action listeners to tabButton
        this.setActivateTabAction(newTab);
        this.setDeleteTabAction(newTab);

        this.tabAggregator.appendChild(newTab.tabButton);
        this.activateTab(newTab);
    }

    createNewTabLayer(){
        this.activeTab.addLayer();
        this.renderLayers(this.activeTab)
    }

    setCurrentSettings(settings){
        this.currentSettings = settings;
    }

}