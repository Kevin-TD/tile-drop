class RGBA {
    /**
     * 
     * @param @private {Number} r 
     * @param @private {Number} g 
     * @param @private {Number} b 
     * @param @private {number} a
     */
    constructor(r, g, b, a = 255) {
        /** @private */
        this.r = r 

        /** @private */
        this.g = g 

        /** @private */
        this.b = b

        /** @private */
        this.a = a
    }

    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}