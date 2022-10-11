let jumpChance = 0
let fullJumpChance = 0 


class AIAction {
    constructor(isJump, holdTime, xDirection) {
        this.isJump = isJump;
        this.holdTime = holdTime;//number between 0 and 1
        this.xDirection = xDirection;
    }
}


class Brain {
    constructor(size, randomMoves=true) {
        this.size = size
        this.setOfMoves = []
        this.moveIndex = 0
        if (randomMoves == true) 
            this.randomize(size)
    }

    randomize() {
        for (let i=0; i<this.ResizeObserverSize; i++)
            this.setOfMoves = this.getRandomAction()
    }

    getRandomAction() {
        let isJump = false

        if (random() > jumpChance)
            isJump = true

        let holdTime = random(0.1, 1);
        if(random()<chanceOfFullJump){
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
        this.moveIndex += 1;
        return this.setOfMoves[this.currentInstructionNumber - 1];
    }
}