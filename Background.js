class Background {
    /**
     * 
     * @param {CanvasRenderingContext2D} canvas 
     * @param {RGB} outlineColor 
     * @param {RGB} fillColor 
     */
    constructor(canvas, outlineColor, fillColor) {
        /** @private */
        this.canvas = canvas

        /** @private */
        this.ctx = canvas.getContext('2d')

        /** @private */
        this.outlineColor = outlineColor

        /** @private */
        this.fillColor = fillColor
    }

    draw() {
        this.ctx.strokeStyle = this.outlineColor.toString()
        this.ctx.beginPath()
        this.ctx.fillStyle = this.fillColor.toString()
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.closePath()
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height)
    }
}