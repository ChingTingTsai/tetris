const Tile = require("./tile")
class grid{
    gridArray = []; 
    constructor(){
        for(let i = 0; i < 4; i++){
            let row = [];
            for(let j = 0; j < 4; j++){
                row.push(new Tile());
            };
            this.gridArray.push(row);
        }
    }
    getArray(){
        return this.gridArray;
    }

    colorGrid(i, j){
        this.gridArray[i][j].setColor(1);
    }

    getTile(x, y){
        return this.gridArray[x][y]
    }

    resetColor(){
        for(let i = 0; i < 4; i++){
            for(let j = 0; j < 4; j++){
                this.gridArray[i][j].setColor(0)
            }
        }
    }

    
}
module.exports = grid;

// const Tile = require("./tile");

// class Grid{
//     tiles = [] // Tile[]
//     width = 4;
//     height = 4;

//     constructor(){
//         this._initTiles();
//     }

//     _initTiles(){
//         this.tiles = [];
//         for(let y=0;y<this.height;y++){
//             for(let x=0;x<this.width;x++){
//                 const tile = new Tile(x, y);
//                 this.tiles.push(tile);
//             }
//         }
//     }

//     clear() {
//         this._initTiles();
//     }

//     setTileFill(x, y, fill){
//         const index = y * this.width + x;
//         const tile = this.tiles[index];
//         tile.setFill(fill);
//     }

//     getTiles() {
//         return this.tiles;
//     }

//     getWidth() {
//         return this.width;
//     }

//     getHeight() {
//         return this.width;
//     }

// }

// module.exports = Grid;