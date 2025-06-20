import { ScreenElement, Vector, Color, Rectangle } from "excalibur"

export class OxygenBar extends ScreenElement {
    constructor(x, y, width, height, maxValue) {
        super({ pos: new Vector(x, y), anchor: Vector.Zero })
        this.barWidth = width
        this.barHeight = height
        this.maxValue = maxValue
        this.value = maxValue

        //Make the graphics
        this.background = new Rectangle({
            width: this.barWidth,
            height: this.barHeight,
            color: Color.White
        })
        this.redBar = new Rectangle({
            width: this.barWidth,
            height: this.barHeight,
            color: Color.Red
        })

        this.graphics.add(this.background)
        this.graphics.add(this.redBar)
    }

    setValue(newValue) {
        //Adjust the oxygen value
        this.value = Math.max(0, Math.min(this.maxValue, newValue))
        this.redBar.width = this.barWidth * (this.value / this.maxValue)
    }
}