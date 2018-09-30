//REQUIRES SCALE!

class Static{
    tierConstructor(posx,posy,width,height,tiersQuant,ranges,tierColors,transparency){
        this.positionX=posx;
        this.positionY=posy;
        this.width=width;
        this.height=height;
        this.tiersQuantity=tiersQuant;
        this.transparency=transparency;
        this.graphicType='tier';
        this.genuinePositionX=this.positionX;
        this.genuinePositionY=this.positionY;
        
        if(tiersQuant>1){
            this.tierRanges = [];
            this.tierColors = [];
            if(tiersQuant>2){
                for(let i=0;i<tiersQuant-1;i++){
                    this.tierRanges.push(ranges[i]);
                }
                
            }
            else{
                this.tierRanges.push(ranges);
            }
            
            for(let j=0;j<tiersQuant;j++){
                this.tierColors.push(tierColors[j]);
            }
        }
        else{
            this.tierColor=tierColors;
        }
    }
    
    imageConstructor(posx,posy,width,height,imageSrc,animatalbe,transparency){
        this.positionX=posx;
        this.positionY=posy;
        this.transparency=transparency;
        this.graphicType='image';
        this.width=width;
        this.height=height;
        this.genuinePositionX=this.positionX;
        this.genuinePositionY=this.positionY;
        
        if(!animatalbe){
            this.texture = new Image();
            this.texture.src=imageSrc;
            this.animatable=false;
            this.imagePointer=this.texture;
        }
        else{
            this.textures = [];
            for(let i=0;i<imageSrc.length;i++){
                let tempImg = new Image();
                tempImg.src=imageSrc[i];
                this.textures.push(tempImg);
            }
            this.animatable=true;
            this.imagePointer=this.textures[0];
            this.frameIndex=0;
        }
            
        
    }
    
    show(canvasID){
        var canvas = $('#'+canvasID)[0];
        var canvasContext = canvas.getContext('2d');
        
        if(this.graphicType=='tier'){
            if(this.tiersQuantity>1){
                var lastPoint=0;
                for(let i=0;i<this.tiersQuantity;i++){
                    canvasContext.fillStyle = this.tierColors[i];
                    if(i==(this.tiersQuantity-1)){
                        canvasContext.fillRect(SCALE.unitsToPixels(this.positionX),SCALE.unitsToPixels(this.positionY+lastPoint),SCALE.unitsToPixels(this.width),SCALE.unitsToPixels(this.height-lastPoint));
                    }
                    else{
                       canvasContext.fillRect(SCALE.unitsToPixels(this.positionX),SCALE.unitsToPixels(this.positionY+lastPoint),SCALE.unitsToPixels(this.width),SCALE.unitsToPixels(this.tierRanges[i]));
                        lastPoint+=this.tierRanges[i];
                    }
                }
            }
            else{
                    canvasContext.fillStyle = this.tierColor;
                    canvasContext.fillRect(SCALE.unitsToPixels(this.positionX),SCALE.unitsToPixels(this.positionY),SCALE.unitsToPixels(this.width),SCALE.unitsToPixels(this.height));
            }
        }   
        else if(this.graphicType=='image'){
            if(!this.animatable){
                let tempImg = this.imagePointer;
                let tempPosX = SCALE.unitsToPixels(this.positionX);
                let tempPosY = SCALE.unitsToPixels(this.positionY);
                let tempWidth = SCALE.unitsToPixels(this.width);
                let tempHeight = SCALE.unitsToPixels(this.height);

                this.imagePointer.onload = function(){
                    canvasContext.drawImage(tempImg,tempPosX,tempPosY,tempWidth,tempHeight); 
                }
            }
            else{
                canvasContext.drawImage(this.imagePointer,this.positionX,this.positionY,SCALE.unitsToPixels(this.width),SCALE.unitsToPixels(this.height));
            }
        }
    }
    
    animate(){
        if(this.animatable){
            if(this.frameIndex>=this.textures.length){
                this.frameIndex=0;
                this.imagePointer=this.textures[0];
            }
            else{
                this.frameIndex++;
                this.imagePointer=this.textures[this.frameIndex];
            }
        }
    }
    
    setPath(points){
        this.points = new Array(points.length);
        this.passedPoints = [];
        for(let i=0;i<this.points.length;i++){
            this.points[i] = [points[i][0],points[i][1]]
            this.passedPoints.push(false);
        } 
    }
    
    followPath(moveGap){
        if(!this.passedPoints[this.passedPoints.length-1]){
            var currentPoint = Array(2);
            var currentPointIndex;
            for(let i=0;i<this.points.length;i++){
                if(!this.passedPoints[i]){
                    currentPoint[0]=this.points[i][0];
                    currentPoint[1]=this.points[i][1];
                    currentPointIndex=i;
                    break;
                }
            }
            var xDone = false;
            var yDone = false;
            if(currentPoint[0]>this.positionX) this.positionX+=moveGap;
            else if(currentPoint[0]<this.positionX) this.positionX-=moveGap;
            else if(currentPoint[0]==this.positionX) xDone=true;

            if(currentPoint[1]>this.positionY) this.positionY+=moveGap;
            else if(currentPoint[1]<this.positionY) this.positionY-=moveGap;
            else if(currentPoint[1]==this.positionY) yDone=true;

            if(xDone && yDone) this.passedPoints[currentPointIndex]=true;

        }  
        
    }
    
    followPathAgain(moveGap){
        if(this.passedPoints[this.passedPoints.length-1]){
            for(let i=0;i<this.passedPoints.length;i++){
                this.passedPoints[i]=false;
            }
            this.positionX=this.genuinePositionX;
            this.positionY=this.genuinePositionY;
        }
        
        var currentPoint = Array(2);
        var currentPointIndex;
        for(let i=0;i<this.points.length;i++){
            if(!this.passedPoints[i]){
                currentPoint[0]=this.points[i][0];
                currentPoint[1]=this.points[i][1];
                currentPointIndex=i;
                break;
            }
        }
        var xDone = false;
        var yDone = false;
        if(currentPoint[0]>this.positionX) this.positionX+=moveGap;
        else if(currentPoint[0]<this.positionX) this.positionX-=moveGap;
        else if(currentPoint[0]==this.positionX) xDone=true;

        if(currentPoint[1]>this.positionY) this.positionY+=moveGap;
        else if(currentPoint[1]<this.positionY) this.positionY-=moveGap;
        else if(currentPoint[1]==this.positionY) yDone=true;

        if(xDone && yDone) this.passedPoints[currentPointIndex]=true;
        
    }
    
    followPathBack(moveGap){
        if(this.passedPoints[this.passedPoints.length-1]){
            for(let i=0;i<this.passedPoints.length;i++){
                this.passedPoints[i]=false;
            }
            var tempArray = new Array(this.points.length);
            for(let i=0;i<this.points.length;i++){             
                tempArray[i] = [this.points[i][0],this.points[i][1]]                
            } 
            for(let i=tempArray.length-1, j=0; i>=0;i--,j++){
                this.points[i] = [tempArray[j][0],tempArray[j][1]];
            }
            
        }
        
        var currentPoint = Array(2);
        var currentPointIndex;
        for(let i=0;i<this.points.length;i++){
            if(!this.passedPoints[i]){
                currentPoint[0]=this.points[i][0];
                currentPoint[1]=this.points[i][1];
                currentPointIndex=i;
                break;
            }
        }
        var xDone = false;
        var yDone = false;
        if(currentPoint[0]>this.positionX) this.positionX+=moveGap;
        else if(currentPoint[0]<this.positionX) this.positionX-=moveGap;
        else if(currentPoint[0]==this.positionX) xDone=true;

        if(currentPoint[1]>this.positionY) this.positionY+=moveGap;
        else if(currentPoint[1]<this.positionY) this.positionY-=moveGap;
        else if(currentPoint[1]==this.positionY) yDone=true;

        if(xDone && yDone) this.passedPoints[currentPointIndex]=true;
        
    }
       
        
        
}