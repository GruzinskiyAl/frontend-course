'use strict';

const brashInput = document.getElementById('isBrushStatus');

class PaintTab {
    constructor({color, brushSize, isBrushStatus, figure, numId, sizes}) {
        this.brushColor = color;
        this.figure = figure;
        this.brushSize = brushSize;
        this.isBrushStatus = isBrushStatus;
        this.paintingStatus = true;

        this.layerList = [];

        this.createTabButton('Tab ' + numId);
        this.createLayerFactory(sizes);
        this.createWrapperBlock(sizes);


        brashInput.onchange = this.changeBrushStatusHandler.bind(this);
        this.wrapperBlock.onmousemove = this.mouseMoveHandler.bind(this);
        this.wrapperBlock.onmousedown = this.startPainting.bind(this);
        this.wrapperBlock.onmouseup = this.stopPainting.bind(this);
        this.wrapperBlock.onmouseleave = this.stopPainting.bind(this);
        this.wrapperBlock.onclick = this.mouseClickHandler.bind(this);
    };

    createTabButton(name){
        this.tabButtonObj = new TabButton(name);
        this.tabButton = this.tabButtonObj.element;
        this.deleteButton = this.tabButtonObj.getDeleteButton();
    }

    createLayerFactory(sizes){
        this.layerFactory = new LayerFactory(sizes);
    }

    createWrapperBlock(sizes){
        let element = document.createElement("DIV");
        element.style.width = sizes.width;
        element.style.height = sizes.height;
        element.className = "canvas-wrapper canvas-wrapper_default";
        this.wrapperBlock = element
    }

    addLayer(){
        const newLayer = this.layerFactory.createLayer();
        this.layerList.push(newLayer);
        this.wrapperBlock.appendChild(newLayer.canvas.element)

        return newLayer;
    }

    deleteLayer(layer){
        this.wrapperBlock.removeChild(layer.canvas.element);
        let index = this.layerList.indexOf(layer);
        this.layerList.splice(index,1);
    }

    getActiveCanvas(){
        for (let i=this.layerList.length-1; i>=0; i--) {
            if (this.layerList[i].canvas.element.style.display !== "none") {
                return this.layerList[i].canvas;
            } else {
                continue;
            }
        }
    }

    activateButton(){
        this.tabButtonObj.activate();
    }

    deactivateButton(){
        this.tabButtonObj.deactivate();
    }

    getDeleteButton(){
        return this.deleteButton;
    }

    setBrushColor(color){
        this.brushColor = color;
    }

    setBrushSize(size){
        this.brushSize = size;
    }

    setIsBrushStatus(status){
        this.isBrushStatus = status;
    }

    setFigure(figure){
        this.figure = figure;
    }

    changeBrushStatusHandler(event) {
        this.isBrushStatus = event.target.checked;
    }

    mouseMoveHandler(event) {
        const point = {
            left: event.offsetX,
            top: event.offsetY
        };

        if (this.isBrushStatus) {
            if (this.paintingStatus) {
                this.paintWithBrush(point, this.brushSize, this.brushColor);
            }
        }
    }

    mouseClickHandler(event) {
        const point = {
            left: event.offsetX,
            top: event.offsetY
        };

        if (!this.isBrushStatus) {
            this.paintWithFigure(point, this.brushSize, this.brushColor, this.figure);
        }

    }

    startPainting() {
        this.paintingStatus = true;
    }

    stopPainting() {
        this.paintingStatus = false;
    }

    paintWithBrush(point, size, color = '#000') {
        let canvas = this.getActiveCanvas();
        if (canvas){
            this.getActiveCanvas().paintPoint(point, size, color);
        }
    }

    paintWithFigure(point, size, color = "#000", figure = "Hexagon") {
        let canvas = this.getActiveCanvas();
        if (canvas){
            (figure === "Circle") ? canvas.paintPoint(point, size, color):
                (figure === "Square")? canvas.paintSquare(point, size, color):
                    canvas.paintHexagon(point, size, color);
        }
    }


    hideTab() {
        this.wrapperBlock.style.display = "none";
        this.tab.style.display = "none";
    };
}

class TabButton{
    constructor(name){
        this.element = document.createElement("DIV");
        const button = document.createElement("INPUT");
        const span = document.createElement("SPAN");
        span.appendChild(document.createTextNode("\u00D7"));
        button.type = "button";
        button.value = name;
        button.classList.add("tab__btn");
        button.classList.add("tab__btn_default");
        span.classList.add("tab__closer");
        span.classList.add("tab__closer_default");
        this.element.classList.add("tab");
        this.element.classList.add("tab_default");
        this.element.appendChild(button);
        this.element.appendChild(span);
    }

    activate(){
        this.element.classList.add("tab_active");
    }

    deactivate(){
        this.element.classList.remove("tab_active");
    }

    getDeleteButton(){
        const btn = this.element.children[1];
        if(btn) return btn
    }
}

const createTabBtn = document.getElementById('addTabButton');
const paintPanel = document.getElementById('paintPanel');

let i = 1;

createTabBtn.onclick = e => {
    const tab = new PaintTab({
        parent: paintPanel,
        numId: i++,
        isBrushStatus: brashInput.checked,
        brushSize: 10
    });
};