const canvas = document.getElementById('drawingCanvas')
const ctx = canvas.getContext('2d')
const timer = (ms) => new Promise(res => setTimeout(res, ms))
const FPS = 60
let frameCount = 0
let PlayerScore = 0 


let background = new Background(canvas, 
                                new RGBA(0, 0, 0, 0), 
                                new RGBA(100, 100, 255))


let rectangleValuesManager = new RectangleValuesManager()

onkeydown = (e) => {
    if (e.key == "ArrowRight") {
        rectangleValuesManager.moveActiveRVRight()
    }

    if (e.key == "ArrowLeft") {
        rectangleValuesManager.moveActiveRVLeft()
    }
}


async function update() {
    background.draw()
    rectangleValuesManager.draw()


    if (!rectangleValuesManager.activeRVIsTouchingGround() && 
        !rectangleValuesManager.activeRVIsTouchingAnInactiveRV()
        
        ) {
        rectangleValuesManager.changeActiveRVYBy(0.5 / FPS)
    } else {
        rectangleValuesManager.generateNewActiveRV()
        rectangleValuesManager.checkAndDoMerge()
    }
    

    // draw score 
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "white"
    ctx.font = `${canvas.width / 10}px Arial`
    ctx.fillText(PlayerScore, 
                        (0.5) * canvas.width, 
                        (0.05) * canvas.height)
}

async function gameLoop() {
    while(true) {
        await update()
        frameCount++
        await timer(1000/FPS)
    }
}

gameLoop()