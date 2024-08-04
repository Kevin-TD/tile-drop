function getColorFromColorScoreMap(score) {
    return COLOR_SCORE_MAP[score] || new RGBA(0, 0, 0, 0)
}

class RectangleValuesManager {
    constructor(canvas) {
        /**@private */
        this.activeRV = new RectangleValue(canvas, 
                                           NEW_RECTANGLE_START_X, NEW_RECTANGLE_START_Y,
                                           NEW_RECTANGLE_WIDTH, NEW_RECTANGLE_HEIGHT, 
                                           NEW_RECTANGLE_OUTLINE_COLOR, 
                                           getColorFromColorScoreMap(2))
        /**
        * @private
        * @type {RectangleValue[]}
        */
        this.inactiveRVs = []
        
        /**
         * @private
         * @type {RectangleValue}
         */
        this.previousActiveRV = undefined
        
        /**@private */
        this.PlayerScore = 0
        
        /**@private */
        this.canvas = canvas 

        /**@private */
        this.ctx = canvas.getContext('2d')
    }

    moveActiveRVLeft() {
        if (this.gameIsOver()) {
            return 
        }

        this.activeRV.changeXBy(-this.activeRV.getWidth())

        if (this.activeRVIsTouchingAnInactiveRV() || 
            this.activeRV.getX() < 0 
        ) {
            this.activeRV.changeXBy(this.activeRV.getWidth())
        }
    }

    moveActiveRVRight() {
        if (this.gameIsOver()) {
            return 
        }
        
        this.activeRV.changeXBy(this.activeRV.getWidth())

        if (this.activeRVIsTouchingAnInactiveRV() ||
            this.activeRV.getX() + this.activeRV.getWidth() > 1 
        
            ) {
            this.activeRV.changeXBy(-this.activeRV.getWidth())
        }
    }

    restartGame() {
        this.activeRV = new RectangleValue(canvas, 
            NEW_RECTANGLE_START_X, NEW_RECTANGLE_START_Y,
            NEW_RECTANGLE_WIDTH, NEW_RECTANGLE_HEIGHT, 
            NEW_RECTANGLE_OUTLINE_COLOR, 
            getColorFromColorScoreMap(2))
        this.inactiveRVs = []
        this.previousActiveRV = undefined
        this.PlayerScore = 0 
    }

    /** @private */
    activeRVIsTouchingGround() {
        return this.activeRV.getY() + this.activeRV.getHeight() >= 1
    }

    /** @private */
    activeRVIsTouchingAnInactiveRV() {
        for (let i = 0; i < this.inactiveRVs.length; i++) {
            let inactiveRV = this.inactiveRVs[i]

            if (
                this.activeRV.getX() == inactiveRV.getX() && 
                this.activeRV.getY() + this.activeRV.getHeight() >= inactiveRV.getY()
            ) {
                return true
            }
        }

        return false 
    }

    activeRVIsNotTouchingAnything() {
        return !this.activeRVIsTouchingGround() && !this.activeRVIsTouchingAnInactiveRV() 
    }

    changeActiveRVYBy(changeAmount) {
        this.activeRV.changeYBy(changeAmount)
    }

    /**
     * @private
     */
    getRandomPowerOf2(minExponent, maxExponent) {
        let exponent = Math.floor(Math.random() * (maxExponent - minExponent + 1)) + minExponent;
        return Math.pow(2, exponent);
      }

    generateNewActiveRV() {
        if (this.gameIsOver()) {
            return
        }

        let newScore = this.getRandomPowerOf2(1, Math.ceil(Math.log2(1 + this.PlayerScore)) / 2) 

        this.previousActiveRV = this.activeRV
        this.inactiveRVs.push(this.activeRV)
        this.activeRV = new RectangleValue(canvas, 
            NEW_RECTANGLE_START_X, NEW_RECTANGLE_START_Y,
            NEW_RECTANGLE_WIDTH, NEW_RECTANGLE_HEIGHT, 
            NEW_RECTANGLE_OUTLINE_COLOR, 
            getColorFromColorScoreMap(newScore),
            newScore)
    }


    // merges all possible inactive pieces together. 
    // call this method after calling generateNewActiveRV (because 
    // this.previousActiveRV must be defined)
    checkAndDoMerge() {          
        // check if previous active merged with any pieces 
        for (let i = 0; i < this.inactiveRVs.length; i++) {
            let inactiveRV = this.inactiveRVs[i]
            
            // skip checking a block with itself
            if (this.previousActiveRV == inactiveRV) {
                continue
            }

            if (this.previousActiveRV.getScore() != inactiveRV.getScore()) {
                continue
            } 
            
            if (
                // active on top of block  (2 merge)
                (
                    this.previousActiveRV.getX() == inactiveRV.getX() && 
                    this.previousActiveRV.getY() + this.previousActiveRV.getHeight() >= inactiveRV.getY() 
                ) || 
                
                // active right of block (2 merge)    O*
                (
                    this.previousActiveRV.getX() == inactiveRV.getX() + inactiveRV.getWidth() && 
                    this.previousActiveRV.getY() == inactiveRV.getY()
                ) || 

                // active left of block (2 merge)     *O
                (
                    this.previousActiveRV.getX() + this.previousActiveRV.getWidth() == inactiveRV.getX() && 
                    this.previousActiveRV.getY() == inactiveRV.getY()
                )
            ) {
                inactiveRV.doubleScore()
                inactiveRV.setFillColor(
                    getColorFromColorScoreMap(inactiveRV.getScore())
                )

                this.PlayerScore += inactiveRV.getScore()
                
                // delete this.previousActiveRV 
                let index = this.inactiveRVs.indexOf(this.previousActiveRV)
                this.inactiveRVs.splice(index, 1)

                // check for merging again 
                this.previousActiveRV = inactiveRV
                this.checkAndDoMerge()
            }
        }


    }

    getPlayerScore() {
        return this.PlayerScore
    }

    gameIsOver() {
        for (let i = 0; i < this.inactiveRVs.length; i++) {
            let inactiveRV = this.inactiveRVs[i]

            if (inactiveRV.getX() == this.activeRV.getX() && 
                inactiveRV.getY() == this.activeRV.getY()) {
                    return true
                }
        }
        return false 
    }

    drawTiles() {
        this.activeRV.draw()

        for (let i = 0; i < this.inactiveRVs.length; i++) {
            this.inactiveRVs[i].draw()
        }
    }

    drawScore() {
        this.ctx.textAlign = SCORE_TEXT_ALIGN
        this.ctx.textBaseline = SCORE_TEXT_BASELINE
        this.ctx.fillStyle = SCORE_TEXT_FILL_STYLE
        this.ctx.font = `${this.canvas.width / 10}px Arial`
        this.ctx.fillText(rectangleValuesManager.getPlayerScore(), 
                            SCORE_X_POSITION * this.canvas.width, 
                            SCORE_Y_POSITION * this.canvas.height)
    }
}