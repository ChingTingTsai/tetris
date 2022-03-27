const World = require("./world")

function setUpCanvas(){
    const myCanvas = document.getElementById("canvas");
    const ctx = myCanvas.getContext("2d")
    return ctx
}

const ctx = setUpCanvas()
const world = new World(ctx)
world.generateBrick()
world.draw()
// while (true){
document.addEventListener("keyup", (event)=>{
    if(event.key == "ArrowUp"){
        // console.log("up")
        world.rotateBrick()
        
    }
    else if(event.key == "ArrowLeft"){
        // console.log("left")
        world.moveLeft()
    }
    else if(event.key == "ArrowRight"){
        // console.log("right")
        world.moveRight()
    }
    world.draw()
})
window.setInterval(()=>{
    world.dropBrick()
    world.draw()
}, 800)

// }



// const lb = new tBrick();
// document.addEventListener("keyup", (event)=>{
//     if(event.key == "ArrowUp"){
//         rotateBrick(lb)
//     }
// })
// window.setInterval(()=>{
//     drawBrick(ctx, lb);
// }, 500)



// const { ABrick, LBrick, ZBrick, IBrick, OBrick } = require("./brick");

// function drawBrick(ctx, brick){
//     const BRICK_WIDTH = 50;

//     for(let y=0;y<brick.getGridHeight();y++){
//         for(let x=0;x<brick.getGridWidth();x++){
//             const tile = brick.getGridTile(x, y);
//             if(tile.isFill()){
//                 ctx.fillStyle = "#000000"
//             }else{
//                 ctx.fillStyle = "#FFFFFF"
//             }

//             ctx.fillRect(x * BRICK_WIDTH, y * BRICK_WIDTH, BRICK_WIDTH, BRICK_WIDTH);
//         }
//     }
// }

// function bootstrap(){
//     const canvas = document.getElementById("canvas");
//     const ctx = canvas.getContext("2d");
//     const brick = new ABrick();
    
//     document.addEventListener("keyup", (event)=>{
//         if(event.key == "ArrowUp"){
            
//             brick.setRotateState((brick.getRotateState() + 1) % 4);
//             drawBrick(ctx, brick);
//         }
//     })
// }

// bootstrap();