const canvas = document.getElementById('drawingCanvas')
const ctx = canvas.getContext('2d')
const timer = (ms) => new Promise(res => setTimeout(res, ms))
let frameCount = 0


let background = new Background(canvas, BACKGROUND_OUTLINE_COLOR, BACKGROUND_FILL_COLOR)
let rectangleValuesManager = new RectangleValuesManager(canvas)

onkeydown = (e) => {
    if (e.key == "ArrowRight") {
        rectangleValuesManager.moveActiveRVRight()
    }

    if (e.key == "ArrowLeft") {
        rectangleValuesManager.moveActiveRVLeft()
    }

    if (e.key == "Enter") {
        if (rectangleValuesManager.gameIsOver()) {
            rectangleValuesManager.restartGame()
        }
    }
}


async function update() {
    background.draw()
    rectangleValuesManager.drawTiles()

    
    if (rectangleValuesManager.activeRVIsNotTouchingAnything()) {
        rectangleValuesManager.changeActiveRVYBy(GRAVITY)
    } else {
        rectangleValuesManager.generateNewActiveRV()
        rectangleValuesManager.checkAndDoMerge()
    }
    

    rectangleValuesManager.drawScore()
}

async function gameLoop() {
    while(true) {
        await update()
        frameCount++
        await timer(1000/FPS)
    }
}

gameLoop()