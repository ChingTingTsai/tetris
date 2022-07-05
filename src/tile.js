class Tile{
    color;
    x
    y
    constructor(){
        this.color = 0;
    }

    setX(x){
        this.x = x
    }

    setY(y){
        this.y = y
    }

    getX(){
        return this.x
    }

    getY(){
        return this.y
    }

    setColor(c){
        if (c == 0){
            this.color = 0
        }
        else{
            this.color = c;
        }
    }

    getColor(){
        return this.color;
    }

    isFill(){
        if(this.color == 0){
            return false
        }
        else{
            return true
        }
    }
}

module.exports = Tile;

// class Tile{
//     gridX
//     gridY
//     fill = false;
//     constructor(gridX, gridY){
//         this.gridX = gridX;
//         this.gridY = gridY;
//     }

//     isFill(){
//         return this.fill;
//     }
    
//     getGridX() {
//         return this.gridX;
//     }

//     getGridY() {
//         return this.gridY;
//     }

//     setFill(fill) {
//         this.fill = fill;
//     }

// }

// module.exports = Tile;
