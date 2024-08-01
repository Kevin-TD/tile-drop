class RectangleValuesManager {
    constructor() {
        this.activeRV = new RectangleValue(canvas, 
                                           0.5, 0.1,
                                           0.1, 0.1, 
                                           new RGBA(0,0,0,0), 
                                           new RGBA(100,100,100))
        /**
         * 
        * @type {RectangleValue[]}
        */
        this.inactiveRVs = []
        
        /**
         * @type {RectangleValue}
         */
        this.previousActiveRV = undefined
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

    activeRVIsTouchingGround() {
        return this.activeRV.getY() + this.activeRV.getHeight() >= 1
    }

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

        this.previousActiveRV = this.activeRV
        this.inactiveRVs.push(this.activeRV)
        this.activeRV = new RectangleValue(canvas, 
            0.5, 0.1,
            0.1, 0.1, 
            new RGBA(0,0,0,0), 
            new RGBA(100,100,100),
            this.getRandomPowerOf2(1, Math.ceil(Math.log2(1 + PlayerScore)) / 2   ))
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

                PlayerScore += inactiveRV.getScore()
                
                // delete this.previousActiveRV 
                let index = this.inactiveRVs.indexOf(this.previousActiveRV)
                this.inactiveRVs.splice(index, 1)

                // check for merging again 
                this.previousActiveRV = inactiveRV
                this.checkAndDoMerge()
            }
        }


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

    draw() {
        this.activeRV.draw()

        for (let i = 0; i < this.inactiveRVs.length; i++) {
            this.inactiveRVs[i].draw()
        }
    }
}