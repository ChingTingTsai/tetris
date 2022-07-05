const {iBrick, zBrick, lBrick, tBrick} = require("./brick")
const BRICKWIDTH = 25
const initX = 200
function drawBrick(ctx, brick){
    // console.log("draw brick")
    const BRICKWIDTH = 25
    for(let x = 0; x < 4; x++){
        for(let y = 0; y < 4; y++){
            const tile = brick.getGridItem().getTile(x, y)
            if(tile.isFill()){
                ctx.fillStyle = tile.getColor()
                ctx.fillRect((brick.getX() + x) * BRICKWIDTH + initX, (brick.getY() + y) * BRICKWIDTH, (BRICKWIDTH-1), (BRICKWIDTH-1))
            }
        }
    }
    
}

class World{
    maxLeft = 0
    maxRight = 10
    maxHeight
    tileSize
    brick = null
    allBrick
    allTiles
    ctx
    nextBrick
    constructor(ctx){
        this.allBrick = []
        this.ctx = ctx
        this.maxHeight = 20
        this.allTiles = []
        this.tileSize = 25
        this.score = 0
        this.scoreScale = [40, 100, 300, 1200]
    }

    moveLeft(){
        this.brick.moveX(-1)
        if (this.touchLeft()){
            this.brick.moveX(1)
        }
        
    }


    moveRight(){
        this.brick.moveX(1)
        if (this.touchRight()){
            this.brick.moveX(-1)
        }
    }

    moveDown(){
        while (!this.touchBottom()){
            this.brick.moveY(1)
        }
        this.dropBrick()
        
    }

    touchLeft(){
        for (const left of this.brick.getLeftCoord()){
            const coordX = this.brick.getX() + left[0]
            const coordY = this.brick.getY() + left[1]
            if(coordX < this.maxLeft - 1){
                console.log("less 0")
                return true
            }
            for(const tile of this.allTiles){
                // coordX <= tile.getX()+1 
                // if (tile.getX() <= this.brick.getX() && (coordX < tile.getX() && coordY == tile.getY())){
                // if (tile.getX() <= coordX + 1 && (coordX < tile.getX() && coordY == tile.getY())){
                if (tile.getX() == coordX + 1 && (coordY == tile.getY())){
                    console.log("touch left tile")
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
            if(coordX > this.maxRight){
                console.log("maxRight")
                return true
            }
            for(const tile of this.allTiles){
                // coordX >= tile.getX()
                // if (tile.getX() > this.brick.getX() && coordX > tile.getX() && coordY == tile.getY()){
                if (coordX-1 == tile.getX() && coordY == tile.getY()){
                    console.log("touch right tile")
                    return true
                }
            }
        }
        return false
    }

    touchBottom(){
        // console.log("t", this.brick.getY())
        for(const tile of this.brick.getBottomCoord()){
            const bottom = this.brick.getY() + tile[1]
            if(bottom > this.maxHeight){
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

    resetWorld(){
        this.allBrick = []
        this.allTiles = []
        this.score = 0
        this.brick = null
        this.nextBrick = null
        this.generateBrick()
        this.draw()
    }


    generateBrick(){
        const allBricks = [iBrick, zBrick, lBrick, tBrick]
        const index = Math.floor(Math.random() * 4)
        const selectedBrick = allBricks[index]
        if(this.brick == null){
            this.brick = new selectedBrick()
        }
        else{
            this.brick = this.nextBrick
        }
        this.nextBrick = new selectedBrick()
        this.allBrick.push(this.brick)
    }

    rotateBrick(){
        this.brick.setNumRotate(this.brick.getNumRotate() + 1)
        if(this.touchRight() || this.touchLeft() || this.touchBottom()){
            console.log(this.touchRight(), " ", this.touchLeft(), " ", this.touchBottom())
            this.brick.setNumRotate(this.brick.getNumRotate() - 1)
        }
        
    }

    draw(){
        
        this.ctx.clearRect(0,0,800,700);
        const coordXNextBrick = (this.maxRight+1) * this.tileSize + initX
        const coordYNextBrick = this.tileSize

        this.ctx.fillStyle = "#1A1647";
        this.ctx.fillRect(initX, 0, this.maxRight * this.tileSize, (this.maxHeight + 1)* this.tileSize);
        this.ctx.fillRect(coordXNextBrick, coordYNextBrick, 5 * this.tileSize, 5 * this.tileSize);

        drawBrick(this.ctx, this.brick)
        this.drawAllBrick()
        this.drawNextBrick(coordXNextBrick, coordYNextBrick, 5 * this.tileSize)
        
        this.ctx.strokeStyle = "#534CA0"
        this.ctx.lineWidth = 5
        this.ctx.strokeRect(initX, 0, this.maxRight * this.tileSize, (this.maxHeight + 1)* this.tileSize)
        this.ctx.strokeRect(coordXNextBrick, coordYNextBrick, 5 * this.tileSize, 5 * this.tileSize)
        this.ctx.font = "45px Comic Sans MS"
        this.ctx.fillStyle = "#EFEEFA"
        this.ctx.textAlign="center"
        this.ctx.fillText("Score", coordXNextBrick+2.5*this.tileSize, coordYNextBrick + 8 * this.tileSize)
        this.ctx.font = "50px Comic Sans MS"
        this.ctx.fillText(this.score, coordXNextBrick+2.5*this.tileSize, coordYNextBrick + 10.5 * this.tileSize)
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
            for(const tile of this.allTiles){
                if(tile.getY() == 0){
                    return true
                }
            }
            this.generateBrick()
            
        }
        else{
            this.brick.moveY(1)
        }
        return false
        
    }

    checkLine(){
        let deleteLine = []
        
        for (let i=0; i <= this.maxHeight; i++){
            let count = 0;
            for(const tile of this.allTiles){
                if (tile.getY() == i){
                    count++;
                }
            }
            if(count == this.maxRight){
                deleteLine.push(i)
            }
        }
        if (deleteLine.length > 0){
            this.score += this.scoreScale[deleteLine.length - 1]
            this.removeLine(deleteLine)
        }
        
    }

    removeLine(deleteLine){
        let newAllTiles = []
        
        for(const tile of this.allTiles){
            if(deleteLine.includes(tile.getY()) == false){
                newAllTiles.push(tile)
            }
        }
        
        for(const line of deleteLine){
            for(const tile of newAllTiles){
                if (tile.getY() <= line){
                    tile.setY(tile.getY() + 1)
                }
            }
        }
        // console.log(newAllTiles)
        this.allTiles = []
        for(const tile of newAllTiles){
            this.allTiles.push(tile)
        }
    }

    drawAllBrick(){
        for(const tile of this.allTiles){
            if(tile.isFill()){
                this.ctx.fillStyle = tile.getColor()
            }
            else{
                this.ctx.fillStyle = "#ffffff"
            }
            this.ctx.fillRect(tile.getX() * BRICKWIDTH + initX, tile.getY() * BRICKWIDTH, (BRICKWIDTH-1), (BRICKWIDTH-1))
        }
    }

    drawNextBrick(coordXNextBrick, coordYNextBrick, length){
        for(let x = 0; x < 4; x++){
            for(let y = 0; y < 4; y++){
                const tile = this.nextBrick.getGridItem().getTile(x, y)
                const emptyRowCol = this.nextBrick.getEmptyRowCol()
                const numBlockWidthHeight = this.nextBrick.getWidthHeight()
                const coordX = coordXNextBrick + (length - numBlockWidthHeight[0] * BRICKWIDTH) / 2
                const coordY = coordYNextBrick + (length - numBlockWidthHeight[1] * BRICKWIDTH) / 2
                if(tile.isFill()){
                    this.ctx.fillStyle = tile.getColor()
                    this.ctx.fillRect(coordX + (x - emptyRowCol[1]) * BRICKWIDTH, coordY + (y- emptyRowCol[0]) * BRICKWIDTH, (BRICKWIDTH-1), (BRICKWIDTH-1))
                }
            }
        }
    }


    // touchBottom(){
    //     // console.log("t", this.brick.getY())
    //     for(const tile of this.brick.getBottomCoord()){
    //         const bottom = this.brick.getY() + tile[1]
    //         if(bottom > 15){
    //             console.log("over 15")
    //             return true
    //         }
    //     }
    //     if (this.touchHistoryTiles()){
    //         return true
    //     }
        
    //     return false
    // }

    // touchHistoryTiles(){
    //     for(const tile of this.allTiles){
    //         const tileX = tile.getX()
    //         const tileY = tile.getY()
    //         for (const bottomTile of this.brick.getBottomCoord()){
    //             const coordX = (this.brick.getX() + bottomTile[0])
    //             const coordY = (this.brick.getY() + bottomTile[1])
    //             if(tileX == coordX && coordY == tileY){
    //                 console.log("touch history tile - tileX:", tileX, "coordX:", coordX, "tileY:", tileY, "coordY:", coordY )
    //                 return true
    //             }
    //         }
    //     }
    //     return false
    // }

     // moveLeft(){
    //     if (!this.touchLeft()){
    //         this.brick.moveX(-1)
    //     }
        
    // }


    // moveRight(){
    //     if (!this.touchRight()){
    //         this.brick.moveX(1)
    //     }
    // }

    // touchLeft(){
    //     for (const left of this.brick.getLeftCoord()){
    //         const coordX = this.brick.getX() + left[0]
    //         const coordY = this.brick.getY() + left[1]
    //         if(coordX < this.maxLeft){
    //             return true
    //         }
    //         for(const tile of this.allTiles){
    //             // coordX <= tile.getX()+1 
    //             if ((coordX == tile.getX() && coordY == tile.getY())){
    //                 return true
    //             }
    //         }
    //     }
    //     return false
    // }

    // touchRight(){
    //     for (const right of this.brick.getRightCoord()){
    //         const coordX = this.brick.getX() + right[0]
    //         const coordY = this.brick.getY() + right[1]
    //         // coordX >= this.maxRight
    //         if(coordX >= this.maxRight){
    //             // console.log("maxRight")
    //             return true
    //         }
    //         for(const tile of this.allTiles){
    //             // coordX >= tile.getX()
    //             if (coordX == tile.getX() && coordY == tile.getY()){
    //                 // console.log("touch right tile")
    //                 return true
    //             }
    //         }
    //     }
    //     return false
    // }


}

module.exports = World