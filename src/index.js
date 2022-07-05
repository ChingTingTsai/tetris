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

document.addEventListener("keyup", (event)=>{
    if(event.key == "ArrowUp"){
        world.rotateBrick()
    }
    else if(event.key == "ArrowLeft"){
        world.moveLeft()
    }
    else if(event.key == "ArrowRight"){
        world.moveRight()
    }
    else if(event.key == "ArrowDown"){
        world.moveDown()
    }
    world.draw()
})
// window.setInterval(()=>{
//     end = world.dropBrick()
    
//     if(end == true){
//         world.resetWorld()
//     }
//     world.draw()
    
// }, 500)

let interval;
let time = 500;
let iter = 0;
function run(){
    window.clearInterval(interval);

    end = world.dropBrick()
    
    if(end == true){
        world.resetWorld()
        time = 500
        iter = 0
    }
    world.draw()
    iter += 1
    
    if (time > 100 && iter % 100 == 0){
        console.log(time)
        time -= 20;
    }

    interval = window.setInterval(run, time)
}
run();
