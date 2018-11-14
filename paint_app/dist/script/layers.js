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

class Layer{
    constructor(sizes, index){
        const layerButton = document.createElement("DIV");
        const checkbox = document.createElement("INPUT");
        const name = document.createElement("SPAN");

        this.deleteLayerButton = document.createElement("SPAN");

        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.onclick = this.changeLayerVisible;
        checkbox.className = "layer__checkbox layer__checkbox_default";

        name.innerText = "Layer " + index;
        name.className = "layer__name layer__name_default";

        this.deleteLayerButton.appendChild(document.createTextNode("\u00D7"));
        this.deleteLayerButton.className = "layer__delete-btn layer__delete-btn_default";

        layerButton.className = "layer layer_default";
        layerButton.appendChild(checkbox);
        layerButton.appendChild(name);
        layerButton.appendChild(this.deleteLayerButton);

        this.layerButton = layerButton;
        this.canvas = new Canvas(sizes);
        this.canvas.element.style.zIndex = index;
    }

    changeLayerVisible(event){
        if (event.target.checked === true){
            this.canvas.style.display = "block"
        } else {
            this.canvas.style.display = "none";
        }
    }

    getDeleteLayerButton(){
        return this.deleteLayerButton;
    }
}


class LayerFactory{
    constructor(sizes){
        this.sizes = sizes;
        this.index = 0;
    }

    createLayer(){
        return new Layer(this.sizes, this.index++)
    }
}