class Level {
    constructor() {
        this.lines = []
        this.levelImage = null
        this.levIndex = 0
        this.isBlizzardLevel = false;
        this.isIceLevel = false;
        this.coins = [];
        this.hasProgressionCoins = false;
    }

    show() {
        push()
        image(this.levelImage,0,0)
        pop()
    }

    showLevLines() {
        for(let l of this.lines)
            l.show()
    }

}