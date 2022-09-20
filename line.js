class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2 
        this.isHorizontal = y1 === y2
        this.isVertical = x1 === x2 
        this.isdiagonal = !(this.isHorizontal || this.isVertical)
        
        this.ensurePointsInOrder()
    }

    ensurePointsInOrder() {
        if (this.isHorizontal || this.isVertical) {
            if (this.x1 > this.x2 || this.y1 > this.y2) {
                let temp = this.x1 
                this.x1 = this.x2
                this.x2 = temp 

                temp = this.y1
                this.y1 = this.y2
                this.y2 = temp 
            }
        }
    }

    show() {
        push()
        stroke(0,127,127)
        strokeWeight(3)
        line (this.x1, this.y1, this.x2 ,this.y2)
        pop ()
    }
}