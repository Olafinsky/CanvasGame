var BORDERS = {
    left : 0,
    right : 0,
    top : 0,
    bottom : 0,
    set : false,
    assignAllManually : function(l,r,t,b){
        this.left=l;
        this.right=r;
        this.top=t;
        this.bottom=b;
        this.set=true;
    },
    assignVerticalAuto : function(){
        this.left=0;
        this.right=window.innerWidth;
    },
    assignHorizontalAuto : function(){
        this.bottom=0;
        this.top=window.innerHeight;
    },
    assingAllAuto : function(){
        this.left=0;
        this.right=window.innerWidth;
        this.bottom=0;
        this.bottom=0;
        this.top=window.innerHeight;
    }
    
    
}