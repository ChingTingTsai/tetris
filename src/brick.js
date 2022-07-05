const grid = require("./grid")

colorLst = ["#0341AE","#72CB3B","#FFD500","#FF971C","#FF3213","#800080"]
let prevColor = 0;
class brick{
    gridItem;
    numRotate;
    startX
    startY
    bottomCoord
    worldWidth = 7
    color
    width = 4
    height = 4
    emptyFirstRow = 0
    emptyFirstCol = 0

    constructor(){
        this.gridItem = new grid();
        this.numRotate = Math.floor(Math.random()* 4);
        this.startX = Math.floor(Math.random()* this.worldWidth)
        this.startY = 0
        this.bottomCoord = []
        this.color = this.setBrickColor()
    }

    setBrickColor(){
        let randNum = Math.floor(Math.random()* 6)
        while(randNum == prevColor){
            randNum = Math.floor(Math.random()* 6)
        }
        prevColor = randNum
        return colorLst[randNum]
    }

    getX(){
        return this.startX
    }

    getY(){
        return this.startY
    }

    moveX(x){
        this.startX += x
    }

    moveY(y){
        this.startY += y
    }

    clearGrid(){
        this.gridItem.resetColor()
    }

    getGridItem(){
        return this.gridItem;
    }

    setNumRotate(num){
        this.numRotate = num
    }

    getNumRotate(){
        return this.numRotate
    }

    getBottomCoord(){
        return this.bottomCoord
    }
    
    getWidthHeight(){
        return [this.width,this.height]
    }

    getEmptyRowCol(){
        return [this.emptyFirstRow, this.emptyFirstCol]
    }
}
// (x,y)
class iBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(2, 1, this.color);
            this.gridItem.colorGrid(3, 1, this.color);
            this.emptyFirstRow = 1
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
            this.gridItem.colorGrid(1, 3, this.color);
            this.emptyFirstCol = 1
        }
        return this.gridItem
    }
    
    getBottomCoord(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.bottomCoord = [[0, 2], [1, 2], [2, 2], [3,2]]
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.bottomCoord = [[1, 4]]
        }
        return this.bottomCoord
    }

    getLeftCoord(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.leftCoord = [[-1, 1]]
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.leftCoord = [[0, 0], [0, 1], [0,2], [0,3]]
        }
        return this.leftCoord
    }

    getRightCoord(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.rightCoord = [[4, 1]]
            
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.rightCoord = [[2, 0], [2, 1], [2, 2], [2, 3]]
        }
        return this.rightCoord
    }

    getWidthHeight(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.width = 4
            this.height = 1
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.width = 1
            this.height = 4
        }
        return [this.width,this.height]
    }
}

class zBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            
            this.gridItem.colorGrid(0, 0, this.color);
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(2, 0, this.color);
        }
        return this.gridItem
    }

    getBottomCoord(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.bottomCoord = [[0,2], [1,3]]
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.bottomCoord = [[0, 2], [1, 2], [2, 1]]
        }
        return this.bottomCoord
    }

    getLeftCoord(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.leftCoord = [[-1, 0], [-1, 1], [1, 2]]
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.leftCoord = [[0, 0], [-1, 1]]
        }
        return this.leftCoord
    }

    getRightCoord(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.rightCoord = [[1, 0], [2, 1], [2, 2]]
            
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.rightCoord = [[3, 0], [2, 1]]
        }
        return this.rightCoord
    }

    getWidthHeight(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.width = 2
            this.height = 3
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.width = 3
            this.height = 2
        }
        return [this.width,this.height]
    }
}

class lBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0){
            this.gridItem.colorGrid(0, 0, this.color);
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(2, 0, this.color);
            this.gridItem.colorGrid(2, 1, this.color);
        }
        else if(this.numRotate % 4 == 1){
            this.gridItem.colorGrid(2, 0, this.color);
            this.gridItem.colorGrid(2, 1, this.color);
            this.gridItem.colorGrid(2, 2, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
            this.emptyFirstCol = 1
        }
        else if(this.numRotate % 4 == 2){
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(0, 2, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
            this.gridItem.colorGrid(2, 2, this.color);
            this.emptyFirstRow = 1
        }
        else if(this.numRotate % 4 == 3){
            this.gridItem.colorGrid(0, 0, this.color);
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(0, 2, this.color);
        }
        return this.gridItem
    }

    getBottomCoord(){
        if(this.numRotate % 4 == 0){
            this.bottomCoord = [[0,1], [1,1], [2,2]]
        }
        else if(this.numRotate % 4 == 1){
            this.bottomCoord = [[1, 3], [2,3]]
        }
        else if(this.numRotate % 4 == 2){
            this.bottomCoord = [[0,3], [1,3], [2,3]]
        }
        else if(this.numRotate % 4 == 3){
            this.bottomCoord = [[0,3], [1, 1]]
        }
        return this.bottomCoord
    }

    getLeftCoord(){
        if(this.numRotate % 4 == 0){
            this.leftCoord = [[-1, 0], [1, -1]]
        }
        else if(this.numRotate % 4 == 1){
            this.leftCoord = [[0, 2], [1, 0], [1, 1]]
        }
        else if(this.numRotate % 4 == 2){
            this.leftCoord = [[-1, 1], [-1, 2]]
        }
        else if(this.numRotate % 4 == 3){
            this.leftCoord = [[-1, 0], [-1, 1], [-1, 2]]
        }
        return this.leftCoord
    }

    getRightCoord(){
        if(this.numRotate % 4 == 0){
            this.rightCoord = [[3, 0], [3, 1]]
        }
        else if(this.numRotate % 4 == 1){
            this.rightCoord = [[3, 0], [3, 1], [3, 2]]
        }
        else if(this.numRotate % 4 == 2){
            this.rightCoord = [[1, 1], [3, 2]]
        }
        else if(this.numRotate % 4 == 3){
            this.rightCoord = [[2, 0], [1, 1], [1, 2]]
        }
        return this.rightCoord
    }

    getWidthHeight(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.width = 3
            this.height = 2
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.width = 2
            this.height = 3
        }
        
        return [this.width,this.height]
    }
}

class tBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0){
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
        }
        else if(this.numRotate % 4 == 1){
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(2, 1, this.color);
        }
        else if(this.numRotate % 4 == 2){
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
            this.gridItem.colorGrid(1, 0, this.color);
            this.gridItem.colorGrid(2, 1, this.color);
            this.emptyFirstCol = 1
        }
        else if(this.numRotate % 4 == 3){
            this.gridItem.colorGrid(0, 1, this.color);
            this.gridItem.colorGrid(1, 1, this.color);
            this.gridItem.colorGrid(2, 1, this.color);
            this.gridItem.colorGrid(1, 2, this.color);
            this.emptyFirstRow = 1
        }
        return this.gridItem
    }

    getBottomCoord(){
        if(this.numRotate % 4 == 0){
            this.bottomCoord = [[0, 2], [1, 3]]
        }
        else if(this.numRotate % 4 == 1){
            this.bottomCoord = [[0,2], [1, 2], [2, 2]]
        }
        else if(this.numRotate % 4 == 2){
            this.bottomCoord = [[1, 3], [2, 2]]
        }
        else if(this.numRotate % 4 == 3){
            this.bottomCoord = [[0, 2], [1,3], [2, 2]]
        }
        return this.bottomCoord
    }
    
    getLeftCoord(){
        if(this.numRotate % 4 == 0){
            this.leftCoord = [[0, 0], [-1, 1], [0, 2]]
        }
        else if(this.numRotate % 4 == 1){
            this.leftCoord = [[0, 0], [-1, 1]]
        }
        else if(this.numRotate % 4 == 2){
            this.leftCoord = [[0, 0], [0, 1], [0, 2]]
        }
        else if(this.numRotate % 4 == 3){
            this.leftCoord = [[0, 2], [-1, 1]]
        }
        return this.leftCoord
    }

    getRightCoord(){
        if(this.numRotate % 4 == 0){
            this.rightCoord = [[2, 0], [2, 1], [2, 2]]
        }
        else if(this.numRotate % 4 == 1){
            this.rightCoord = [[2, 0], [3, 1]]
        }
        else if(this.numRotate % 4 == 2){
            this.rightCoord = [[2, 0], [3, 1], [2, 2]]
        }
        else if(this.numRotate % 4 == 3){
            this.rightCoord = [[2, 2], [3, 1]]
        }
        return this.rightCoord
    }

    getWidthHeight(){
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            this.width = 2
            this.height = 3
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.width = 3
            this.height = 2
        }
        
        return [this.width,this.height]
    }
}

module.exports = {iBrick, zBrick, lBrick, tBrick}

// const Grid = require("./grid");

// class Brick{
//     grid = new Grid();
//     rotateState = 0; // 代表方块旋转的状态, 只有四种: 0, 1, 2, 3
//     constructor(){
        
//     }

//     getGridWidth() {
//         return this.grid.width;
//     }

//     getGridHeight() {
//         return this.grid.height;
//     }

//     getGridTiles(){
//         return this.grid.getTiles();
//     }

//     getGridTile(x, y) {
//         const tiles = this.grid.getTiles();
//         return tiles[y * this.grid.width + x];
//     }

//     setRotateState() {

//     }

//     getRotateState() {
//         return this.rotateState;
//     }
// }

// class ABrick extends Brick{
//     constructor(){
//         super();
//     }
//     setRotateState(state){
//         this.grid.clear();
//         this.rotateState = state;
//         if(state == 0){
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(2, 1, true);
//         }else if(state == 1){
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(1, 2, true);
//             this.grid.setTileFill(2, 1, true);
//         }else if(state == 2){
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(2, 1, true);
//             this.grid.setTileFill(1, 2, true);
//         }else if(state == 3){
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(1, 2, true);
//             this.grid.setTileFill(0, 1, true);
//         }
//     }
// }

// class LBrick extends Brick{
//     constructor(){
//         super();
//     }

//     setRotateState(state){
//         this.grid.clear();
//         this.rotateState = state;
//         if(state == 0){
//             this.grid.setTileFill(0, 0, true);
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(0, 2, true);
//             this.grid.setTileFill(1, 2, true);
//         }else if(state == 1){
//             this.grid.setTileFill(0, 0, true);
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(2, 0, true);
//             this.grid.setTileFill(0, 1, true);
//         }else if(state == 2){
//             this.grid.setTileFill(0, 0, true);
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(1, 2, true);
//         }else if(state == 3){
//             this.grid.setTileFill(2, 0, true);
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(2, 1, true);
//         }
//     }
// }

// class ZBrick extends Brick{
//     constructor(){
//         super();
//     }

//     setRotateState(state){
//         this.grid.clear();
//         this.rotateState = state;
//         if(state == 0 || state == 2){
//             this.grid.setTileFill(0, 0, true);
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(1, 2, true);    
//         }else if(state == 1 || state == 3){
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(2, 0, true);
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(1, 1, true);
//         }

//     }

// }

// class IBrick extends Brick{
//     constructor(){
//         super();
//     }
//     setRotateState(state) {
//         this.grid.clear();
//         this.rotateState = state;
//         if(state == 0 || state == 2){
//             this.grid.setTileFill(1, 0, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(1, 2, true);
//             this.grid.setTileFill(1, 3, true);    
//         }else if(state == 1 || state == 3){
//             this.grid.setTileFill(0, 1, true);
//             this.grid.setTileFill(1, 1, true);
//             this.grid.setTileFill(2, 1, true);
//             this.grid.setTileFill(3, 1, true);    
//         }
//     }
// }


// class OBrick extends Brick{
//     constructor(){
//         super();
//     }
//     setRotateState(state) {
//         this.grid.clear();
//         this.rotateState = state;
//         this.grid.setTileFill(0, 0, true);
//         this.grid.setTileFill(0, 1, true);
//         this.grid.setTileFill(1, 0, true);
//         this.grid.setTileFill(1, 1, true);    
//     }
// }
// module.exports = { ABrick, LBrick, ZBrick, IBrick, OBrick }
