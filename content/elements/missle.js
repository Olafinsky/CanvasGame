//

class Missle{
    build(posessor,aim,refreshesAim,explosionMode,explosionWaste,behaviourMode,textures){
        if(posessor!=false) this.posessor = posessor;
        this.startingAim = aim;
        this.refreshesAim = refreshesAim;
        this.explosionMode = explosionMode; //aim- harms only aim; sbp (surrounding but posessor)- harms all but posessor; ts (toally surrounding)- harms all units including posessor
        if(explosionWaste!=false) this.explosionWaste = explosionWaste; //power waste per unit
        this.posx = posessor.posx;
        this.posy = posessor.posy;
        this.behaviourMode = new Array(behaviourMode[0],behaviourMode[1],behaviourMode[2]); // 0: T(Time), D(Distance), TD(Time and Distance); Time value; Distance value
        this.state = "none";
        this.proceedFlyingIndex = 0;
        this.proceedExplodingIndex = 0;
        this.textures = new Array(textures.length);
        this.currentAimX = this.startingAim.posx;
        this.currentAimY = this.startingAim.posy;
        for(let i=0;i<textures.length;i++){
            this.textures[i] = new Array(textures[i].length)
            for(let j=0;j<textures[i].length;j++){
                this.textures[i][j] = textures[i][j];
            }
        }
        this.graphicState = 0; // [X][]
        this.graphicIndex = 0; // [][X]
    }
    
    proceed(aim){
        if(this.state=="none"){
            this.state="flying";
        }
        
        if(this.state=="flying"){
            if(this.proceedFlyingIndex%refreshesAim==0){
                this.currentAimX = aim.posx;
                this.currentAimY = aim.posy;
            }
            
            if(this.behaviourMode[0]=="D" || this.behaviourMode[0]=="TD"){
                if((this.posx - this.currentAimX <= this.behaviourMode[2] || this.posx -  this.currentAimX >= -(this.behaviourMode[2])) && (this.posy - this.currentAimY <= this.behaviourMode[2] || this.posy -  this.currentAimY >= -(this.behaviourMode[2]))){
                    
                }
            }
        }
    }
    
}

