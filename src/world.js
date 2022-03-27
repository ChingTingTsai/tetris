const {iBrick, zBrick, lBrick, tBrick} = require("./brick")
const BRICKWIDTH = 25
function drawBrick(ctx, brick){
    // console.log("draw brick")
    const BRICKWIDTH = 25
    for(let x = 0; x < 4; x++){
        for(let y = 0; y < 4; y++){
            const tile = brick.getGridItem().getTile(x, y)
            if(tile.isFill()){
                ctx.fillStyle = "#000000"
            }
            else{
                ctx.fillStyle = "#ffffff"
            }
            ctx.fillRect((brick.getX() + x) * BRICKWIDTH, (brick.getY() + y) * BRICKWIDTH, BRICKWIDTH, BRICKWIDTH)
        }
    }
    
}

class World{
    maxLeft = 0
    maxRight = 15
    maxHeight
    brick
    allBrick
    allTiles
    ctx
    constructor(ctx){
        this.allBrick = []
        this.ctx = ctx
        this.maxHeight = 15
        this.allTiles = []
    }

    moveLeft(){
        if (!this.touchLeft()){
            this.brick.moveX(-1)
        }
        
    }


    moveRight(){
        if (!this.touchRight()){
            this.brick.moveX(1)
        }
    }

    touchLeft(){
        for (const left of this.brick.getLeftCoord()){
            const coordX = this.brick.getX() + left[0]
            const coordY = this.brick.getY() + left[1]
            if(coordX < this.maxLeft){
                return true
            }
            for(const tile of this.allTiles){
                // coordX <= tile.getX()+1 
                if ((coordX == tile.getX() && coordY == tile.getY())){
                    return true
                }
            }
        }
        return false
    }

    touchRight(){
        for (const right of this.brick.getRightCoord()){
            const coordX = this.brick.getX() + right[0]
            const coordY = this.brick.getY() + right[1]
            // coordX >= this.maxRight
            if(coordX >= this.maxRight){
                // console.log("maxRight")
                return true
            }
            for(const tile of this.allTiles){
                // coordX >= tile.getX()
                if (coordX == tile.getX() && coordY == tile.getY()){
                    // console.log("touch right tile")
                    return true
                }
            }
        }
        return false
    }


    resetWorld(){
        this.allBrick = []
        this.allTiles = []
    }

    updateWorld(){
        
    }

    generateBrick(){
        const allBricks = [iBrick, zBrick, lBrick, tBrick]
        const index = Math.floor(Math.random() * 4)
        const selectedBrick = allBricks[index]
        this.brick = new selectedBrick()
        this.allBrick.push(this.brick)
    }

    rotateBrick(){
        this.brick.setNumRotate(this.brick.getNumRotate() + 1)
    }

    draw(){
        this.ctx.clearRect(0,0,800,700);
        drawBrick(this.ctx, this.brick)
        this.drawAllBrick()
    }

    dropBrick(){
        if(this.touchBottom()){
            let tiles = this.brick.getGridItem().getArray()
            // console.log("tile: ", tiles)
            for(let i = 0; i < 4; i++){
                for(let j = 0; j < 4; j++){
                    if(tiles[i][j].isFill()){
                        // console.log("tile:", i, j)
                        let t = tiles[i][j]
                        t.setX((this.brick.getX() + i))
                        t.setY((this.brick.getY() + j))
                    
                        this.allTiles.push(t)
                    }
                }
            }
            this.checkLine()
            this.generateBrick()
        }
        this.brick.moveY(1)
    }

    checkLine(){
        
    }

    touchBottom(){
        // console.log("t", this.brick.getY())
        for(const tile of this.brick.getBottomCoord()){
            const bottom = this.brick.getY() + tile[1]
            if(bottom > 15){
                console.log("over 15")
                return true
            }
        }
        if (this.touchHistoryTiles()){
            return true
        }
        
        return false
    }

    touchHistoryTiles(){
        for(const tile of this.allTiles){
            const tileX = tile.getX()
            const tileY = tile.getY()
            for (const bottomTile of this.brick.getBottomCoord()){
                const coordX = (this.brick.getX() + bottomTile[0])
                const coordY = (this.brick.getY() + bottomTile[1])
                if(tileX == coordX && coordY == tileY){
                    console.log("touch history tile - tileX:", tileX, "coordX:", coordX, "tileY:", tileY, "coordY:", coordY )
                    return true
                }
            }
        }
        return false
    }


    drawAllBrick(){
        for(const tile of this.allTiles){
            if(tile.isFill()){
                this.ctx.fillStyle = "#000000"
            }
            else{
                this.ctx.fillStyle = "#ffffff"
            }
            this.ctx.fillRect(tile.getX() * BRICKWIDTH, tile.getY() * BRICKWIDTH, BRICKWIDTH, BRICKWIDTH)
        }
    }

    
}

module.exports = World