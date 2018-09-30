var SCALE = {
    unitSize : 0,
    unitQuantityX : 0,
    unitQuantityY : 0,
    set : false,
    define : function(unitQuant){
        this.unitSize=window.innerWidth/unitQuant;
        this.unitQuantityX=unitQuant;
        this.unitQuantityY=parseInt(window.innerHeight/this.unitSize);
        this.set=true;
    },
    unitsToPixels : function(units){
        return units*this.unitSize;
    },
    pixelsToUnits : function(pixels){
        return parseInt(pixels/this.unitSize);
    }
}