const grid = require("./grid")
class brick{
    gridItem;
    numRotate;
    startX
    startY
    bottomCoord
    
    constructor(){
        this.gridItem = new grid();
        this.numRotate = 0;
        this.startX = 0
        this.startY = 0
        this.bottomCoord = []
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
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(2, 1);
            this.gridItem.colorGrid(3, 1);
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(1, 2);
            this.gridItem.colorGrid(1, 3);
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
}

class zBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0 || this.numRotate % 4 == 2){
            
            this.gridItem.colorGrid(0, 0);
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(1, 2);
        }
        else if(this.numRotate % 4 == 1 || this.numRotate % 4 == 3){
            
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(2, 0);
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
}

class lBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0){
            this.gridItem.colorGrid(0, 0);
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(2, 0);
            this.gridItem.colorGrid(2, 1);
        }
        else if(this.numRotate % 4 == 1){
            this.gridItem.colorGrid(2, 0);
            this.gridItem.colorGrid(2, 1);
            this.gridItem.colorGrid(2, 2);
            this.gridItem.colorGrid(1, 2);
        }
        else if(this.numRotate % 4 == 2){
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(0, 2);
            this.gridItem.colorGrid(1, 2);
            this.gridItem.colorGrid(2, 2);
        }
        else if(this.numRotate % 4 == 3){
            this.gridItem.colorGrid(0, 0);
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(0, 2);
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
}

class tBrick extends brick{
    constructor(){
        super();
        this.getGridItem()
    }
    getGridItem(){
        this.clearGrid()
        if(this.numRotate % 4 == 0){
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(1, 2);
        }
        else if(this.numRotate % 4 == 1){
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(2, 1);
        }
        else if(this.numRotate % 4 == 2){
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(1, 2);
            this.gridItem.colorGrid(1, 0);
            this.gridItem.colorGrid(2, 1);
        }
        else if(this.numRotate % 4 == 3){
            this.gridItem.colorGrid(0, 1);
            this.gridItem.colorGrid(1, 1);
            this.gridItem.colorGrid(2, 1);
            this.gridItem.colorGrid(1, 2);
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
