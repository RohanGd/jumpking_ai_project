class Level {
    constructor() {
        this.lines = []
        this.levelImage = null
        this.levIndex = 0
        this.blizzard = false 
        this.ice = false 
    }

    show() {
        push()
        image(this.levelImage,0,0)
        pop()
    }

}