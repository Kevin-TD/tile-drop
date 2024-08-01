class RectangleValue {
    /**
     * 
     * @param {CanvasRenderingContext2D} canvas 
     * @param {number} x value in [0, 1]
     * @param {number} y value in [0, 1]
     * @param {number} width value in [0, 1]
     * @param {number} height value in [0, 1]
     * @param {RGBA} outlineColor
     * @param {RGBA} fillColor
     * @param {number} score
     * @param {RGBA} textFillColor
     */
    constructor(canvas, x, y, width, height, outlineColor, fillColor, score = 2, textFillColor = new RGBA(255, 255, 255)) {
        /** @private */
        this.canvas = canvas

        /** @private */
        this.ctx = canvas.getContext('2d')

        /** @private */
        this.x = x 

        /** @private */
        this.y = y

        /** @private */
        this.width = width

        /** @private */
        this.height = height

        /** @private */
        this.outlineColor = outlineColor

        /** @private */
        this.fillColor = fillColor

        /** @private */
        this.score = score

        /** @private */
        this.textFillColor = textFillColor
    }

    /**
     * 
     * @param {number} changeAmount value in [0, 1]
     */
    changeXBy(changeAmount) {
        this.x += changeAmount
    }

    /**
     * 
     * @param {number} changeAmount value in [0, 1]
     */
    changeYBy(changeAmount) {
        this.y += changeAmount
    }

    /**
     * 
     * @param {number} x value in [0, 1]
     */
    setX(x) {
        this.x = x
    }

    /**
     * 
     * @param {number} y value in [0, 1]
     */
    setY(y) {
        this.y = y 
    }

    getX() {
        return this.x 
    }

    getY() {
        return this.y 
    }

    getWidth() {
        return this.width
    }

    getHeight() {
        return this.height
    }

    doubleScore() {
        this.score *= 2 
    }

    getScore() {
        return this.score
    }


    draw() {
        // rectangle inside 
        this.ctx.strokeStyle = this.outlineColor.toString()
        this.ctx.beginPath()
        this.ctx.fillStyle = this.fillColor.toString()
        this.ctx.fillRect(
            this.x * this.canvas.width, 
            this.y * this.canvas.height, 
            this.width * this.canvas.width, 
            this.height * this.canvas.height
        )
        this.ctx.closePath()

        // outline
        this.ctx.strokeRect(
            this.x * this.canvas.width, 
            this.y * this.canvas.height, 
            this.width * this.canvas.width, 
            this.height * this.canvas.height
        )

        // score 
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillStyle = this.textFillColor
        this.ctx.font = `${this.width * this.canvas.width / 2}px Arial`
        this.ctx.fillText(this.score, 
                          (this.x + this.width / 2) * this.canvas.width, 
                          (this.y + this.height / 2) * this.canvas.height)
    }
}