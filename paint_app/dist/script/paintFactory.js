'use strict';

const brashInput = document.getElementById('isBrushStatus');

class PaintTab {
    constructor({color, brushSize, isBrushStatus, figure, numId, sizes}) {
        this.brushColor = color;
        this.figure = figure;
        this.brushSize = brushSize;
        this.isBrushStatus = isBrushStatus;
        this.paintingStatus = true;


        this.createTabButton('Tab ' + numId);
        this.createLayerList();
        this.createWrapperBlock(sizes);


        // brashInput.onchange = this.changeBrushStatusHandler.bind(this);
        // this.wrapperBlock.onmousemove = this.mouseMoveHandler.bind(this);
        // this.wrapperBlock.onmousedown = this.startPainting.bind(this);
        // this.wrapperBlock.onmouseup = this.stopPainting.bind(this);
        // this.wrapperBlock.onmouseleave = this.stopPainting.bind(this);
        // this.wrapperBlock.onclick = this.mouseClickHandler.bind(this);
    };

    createTabButton(name){
        const tabButton = new TabButton(name);
        this.tabButton = tabButton.getElement();
        this.deleteButton = tabButton.getDeleteButton();
    }

    createLayerList(){
        this.layerList = new LayerList();
    }

    createWrapperBlock(sizes){
        let element = document.createElement("DIV");
        element.style.width = sizes.width;
        element.style.height = sizes.height;
        element.className = "canvas-wrapper canvas-wrapper_default";
        this.wrapperBlock = element
    }

    showLayers(layerWrapper){
        this.layerList.forEach((layer) => {
            layerWrapper.appendChild(layer)
        })
    }

    activateButton(){
        this.tabButton.activate();
    }

    deactivateButton(){
        this.tabButton.deactivate();
    }

    getDeleteButton(){
        return this.deleteButton;
    }


    unActivateTab(){
        this.wrapperBlock.classList.remove(this.paintTabActiveClass);
        this.tab.classList.remove(this.tabActiveClass);
    }

    activateTab(){
        this.wrapperBlock.classList.add(this.paintTabActiveClass);
        this.tab.classList.add(this.tabActiveClass);
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
        this.mainCanvas.paintPoint(point, size, color);
    }

    paintWithFigure(point, size, color = "#000", figure = "Hexagon") {
        (figure === "Circle") ? this.mainCanvas.paintPoint(point, size, color):
            (figure === "Square")? this.mainCanvas.paintSquare(point, size, color):
                this.mainCanvas.paintHexagon(point, size, color);
    }


    hideTab() {
        this.wrapperBlock.style.display = "none";
        this.tab.style.display = "none";
    };
}

class Canvas{
    constructor(size){
        this.size    = size;
        this.element = document.createElement("CANVAS");
        this.ctx     = this.element.getContext('2d');
        this.setSize(size);
    }

    setSize(size){
        this.element.width  = size.width;
        this.element.height = size.height;
    }

    paintPoint(point, size, color) {
        this.ctx.fillStyle = color;

        this.ctx.beginPath();
        this.ctx.arc(point.left, point.top, size / 2, 50, Math.PI * 2, true);
        this.ctx.fill();
    }

    paintSquare(point, size, color) {
        this.ctx.fillStyle = color;

        this.ctx.fillRect(point.left, point.top, point.left+size, point.top+size)
    }

    paintHexagon(point, size, color){
        this.ctx.fillStyle = color;

        let hexagonSize = size/1.5;
        this.ctx.beginPath();
        this.ctx.moveTo(point.left + hexagonSize * Math.cos(0), point.top + hexagonSize * Math.sin(0));

        for (let side = 0; side < 7; side++) {
            this.ctx.lineTo(point.left + hexagonSize * Math.cos(side * 2 * Math.PI / 6), point.top + hexagonSize * Math.sin(side * 2 * Math.PI / 6));
        };

        this.ctx.fill();
    }

    clear(){
        this.ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
}

class LayerList{
    constructor(){
        this.array = [];
    }

    createLayer(){
        const canvas = new Canvas()
    }
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

    getElement(){
        return this.element
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