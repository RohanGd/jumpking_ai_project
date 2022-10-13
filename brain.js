let jumpChance = 0.5
let fullJumpChance = 0.2 


class AIAction {
    constructor(isJump, holdTime, xDirection) {
        this.isJump = isJump;
        this.holdTime = holdTime;//number between 0 and 1
        this.xDirection = xDirection;
    }
    clone() {
        return new AIAction(this.isJump, this.holdTime, this.xDirection);
    }

    mutate() {
        this.holdTime += random(-0.3,0.3);
        this.holdTime = constrain(this.holdTime,0.1,1);
    }
}


class Brain {
    constructor(size, randomMoves=true) {
        this.setOfMoves = []
        this.moveIndex = 0
        if (randomMoves) 
            this.randomize(size)
    }

    randomize(size) {
        for (let i=0; i<size; i++)
            this.setOfMoves[i] = this.getRandomAction()
    }

    getRandomAction() {
        let isJump = false

        if (random() > jumpChance)
            isJump = true

        let holdTime = random(0.1, 1);
        if(random()<fullJumpChance){
            holdTime = 1;
        }

        let directions = [-1, -1, -1, 0, 1, 1, 1]
        let xDirection = random(directions)

        return new AIAction(isJump, holdTime, xDirection)
    }

    getNextAction() {
        if(this.moveIndex >= this.setOfMoves.length){
            return null;
        }
        console.log(this.moveIndex)
        console.log(this.setOfMoves.length)
        this.moveIndex += 1;
        return this.setOfMoves[this.moveIndex - 1];
    }
}