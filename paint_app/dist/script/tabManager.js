"use strict";

class TabManager{
    constructor(){
        this.paintPanel = document.getElementById('paintPanel');
        this.tabAggregator = document.getElementById("tabAggregator");
        this.layerAggregator = document.getElementById("layerAggregator");

        this.tabArray = [];
        this.tabCount = this.tabArray.length;
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

    acivateTab(tab){

    }

    createNewTab(){
        const newTab = new PaintTab({color: this.currentSettings.color,
                                brushSize: this.currentSettings.size,
                                isBrushStatus: this.currentSettings.isBrushStatus,
                                figure: this.currentSettings.figure,
                                numId: this.tabCount+1});

        this.tabArray.push(newTab);
    }

    setCurrentSettings(settings){
        this.currentSettings = settings;
    }

    unActivateTab(tab){
        tab.unActivateTab();
    }

    activateTab(tab){
        this.tabArray.forEach((tab) => {
            this.unActivateTab(tab);
        });
        tab.activateTab();
    }

    addTab(){
        this.tabArray.forEach((tab) => {
            this.unActivateTab(tab);
        });
        let currentCount = this.tabArray.length;
        let tab = new PaintTab({color: this.currentSettings.color,
                            brushSize: this.currentSettings.size,
                            isBrushStatus: this.currentSettings.isBrushStatus,
                            figure: this.currentSettings.figure,
                            numId: currentCount+1,
                            parent: this.paintPanel});
        this.tabArray.push(tab);
    }
}