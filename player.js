const minJumpV = 5
const maxJumpV = 22
const maxJumpTimer = 30
const jumpSpeedX = 8
const terminalV = 20
const gravity = 0.6

const runSpeed = 4

class playerState {
    constructor() {
        this.currentPos = createVector(width / 2, 760); // this is the top left corner of the hitbox
        this.currentSpeed = createVector(0, 0);
        this.isOnGround = false;

        this.currentLevelNo = 0;
        this.jumpStartingHeight = 0;
        this.facingRight = true;

    }

    getStateFromPlayer(player) {
        this.currentPos = player.currentPos.copy();
        this.currentSpeed = player.currentSpeed.copy();
        this.isOnGround = player.isOnGround;

        this.currentLevelNo = player.currentLevelNo;
        this.jumpStartingHeight = player.jumpStartingHeight;
        this.facingRight = player.facingRight;

    }

    loadStateToPlayer(player) {
        player.currentPos = this.currentPos.copy();
        player.currentSpeed = this.currentSpeed.copy();
        player.isOnGround = this.isOnGround

        player.currentLevelNo = this.currentLevelNo;
        player.jumpStartingHeight = this.jumpStartingHeight;
        player.facingRight = this.facingRight;

    }

}

class Player {
    constructor() {
        this.width = 50
        this.height = 65
        this.currentPosition = createVector(width / 2, 760)
        this.currentSpeed = createVector(0, 0)
        this.jumpHeld = false
        this.leftHeld = false 
        this.rightHeld = false 
        this.isRunning = false

        this.currentLevel = 0

        this.jumptime = 0
        this.isOnGround = true

        this.facingRight = true;
        this.currentRunIndex = 0
        this.runCycle = [run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image]

        this.state = new playerState()
        
    }  

    update() {
        this.show()
        this.applyGravity()
        this.updateRun()
        this.currentPosition.add(this.currentSpeed)
        this.tempCollision()
        this.updateJumpTimer()

        let currentLines = levels[this.currentLevel].lines  
        this.CheckCollisions(currentLines)

        
    }
    
    show() {
        push()
        translate(this.currentPosition.x, this.currentPosition.y)
        let imageToUse = this.getPlayerImageBasedOnState()
        if (!this.facingRight) {
            push()
            scale(-1, 1)
            if (imageToUse == jumpImage || imageToUse == fallImage) {
                image(imageToUse, -70, -28)
            }
            else {
                image(imageToUse, -70, -35);
            }
            pop()
        }

        if (this.facingRight) {
            if (imageToUse == jumpImage || imageToUse == fallImage) {
                image(imageToUse, -20, -28)
            }
            else {
                image(imageToUse, -20, -35);
            }

        }
        pop()
    }
    
    jump() {
        
        if (!this.isOnGround){
            return
        }

        let verticalJumpSpeed = map(this.jumptime, 0 ,maxJumpTimer, minJumpV, maxJumpV)
        if (this.leftHeld) {
            this.currentSpeed = createVector(-jumpSpeedX, -verticalJumpSpeed)
        } else if (this.rightHeld) {
            this.currentSpeed = createVector(jumpSpeedX, -verticalJumpSpeed)
        } else {
            this.currentSpeed.y = -verticalJumpSpeed
        }
        this.jumptime = 0
        
        
        
    }
    
    updateJumpTimer() {
        if (this.isOnGround && this.jumpHeld && this.jumptime < maxJumpTimer){
            this.jumptime++
        }
        
    }

    applyGravity() {
        this.currentSpeed.add(0, gravity)
    }

    isMovingDown() {
        return this.currentSpeed.y > 0
    }

    updateRun() {
        this.isRunning = false
        if (this.isOnGround) {
            if (this.leftHeld && !this.jumpHeld) {
                this.facingRight = false
                this.isRunning = true
                this.currentSpeed = createVector(-runSpeed, 0)
            }
        
            else if (this.rightHeld && !this.jumpHeld) {
                this.isRunning = true
                this.currentSpeed = createVector(runSpeed, 0)
            }

            else {
                this.currentSpeed = createVector(0, 0)
            }
            
        }
    }

    getPlayerImageBasedOnState() {
        if (this.jumpHeld && this.isOnGround) return squatImage
        if (this.currentSpeed.y < 0) return jumpImage
        if (this.isRunning) {

            if (this.leftHeld) {
                this.facingRight = false
                push()
                scale(-1, 1)
                this.currentRunIndex = (this.currentRunIndex + 1) % this.runCycle.length
                pop()
                return this.runCycle[this.currentRunIndex]
            }


            else if (this.rightHeld) {
                this.facingRight = true
                this.currentRunIndex = (this.currentRunIndex + 1) % this.runCycle.length
                return this.runCycle[this.currentRunIndex]

            }
            
        }   
        return idleImage
    }


    tempCollision() {
        if (this.isMovingDown())
        if (this.currentPosition.y > 760) {
            this.currentPosition.y = 760
            this.currentSpeed.y = 0
            this.isOnGround = true
        }
    }

    isCollidingwithLine(l) {
        if (l.isVertical) {
            let isRectWithinLineY = (l.y1 < this.currentPosition.y && this.currentPosition.y < l.y2) || (l.y1 < this.currentPosition.y + this.height && this.currentPosition.y + this.height < l.y2) || (this.currentPosition.y < l.y1 && l.y1 < this.currentPosition.y + this.height) || (this.currentPosition.y < l.y2 && l.y2 < this.currentPosition.y + this.height)
            let isRectWithinLineX = this.currentPosition.x < l.x1 && l.x1 < this.currentPosition.x + this.width
            
            return isRectWithinLineX && isRectWithinLineY
        }
        else if (l.isHorizontal) {
            let isRectWithinLineX = (l.x1 < this.currentPosition.x && this.currentPosition.x < l.x2) || (l.x1 < this.currentPosition.x + this.width && this.currentPosition.x + this.width < l.x2) || (this.currentPosition.x < l.x1 && l.x1 < this.currentPosition.x + this.width) || (this.currentPosition.x < l.x2 && l.x2 < this.currentPosition.x + this.width)
            let isRectWithinLineY = this.currentPosition.y < l.y1 && l.y1 < this.currentPosition.y + this.height

            return isRectWithinLineX && isRectWithinLineY        
        }  

        else{

        }
    }

    CheckCollisions(currentLines){
        let collidedLines = []
        for (let line of currentLines)
            if (this.isCollidingwithLine(line))
                collidedLines.push(line)
                // console.log(line)
        
        if (collidedLines.length === 0) return
        let collidedwith = collidedLines[0]
        // console.dir(collidedwith)
        if (collidedwith.isVertical) {
            if (this.isOnGround) {
                // this.currentSpeed *= -0.75
                this.currentPosition.x = collidedwith.x1
            }
        }
    }


}

function line_line_collision(Ax1, Ay1, Ax2, Ay2, Bx1, By1, Bx2, By2) {
                            // a    b   c   d    p    q     r   s
    // Assume a vector r = a + (lambda)*b 
    // where a is a vector at initial position of line
    // b is direction vector but not of unit length but of complete vector length
    // now given two vectors 
    // r1 = a1 + lambda b1
    // r2 = a2 + gamma b2
    // if they intersect they have a common point
    // on solving the two vector equations using matrices
    // we will get a lambda and gamma
    // since b1,b2 are not direction vectors but the the whole line vector lambda and gamma both must be in the range[0,1]
    // otherwise it means that the intersection point of two vectors is outside the line segment
    var det, lambda, gamma
    det = ( Ax2 - Ax1 ) * ( By2 - By1 ) - ( Bx2 - Bx1 ) * ( Ay2 - Ay1 ) // calculating determinant of matrix
    if (det === 0) // it means the lines are parallel
        return [false, 0 ,0]
    else {
        lambda = ( ( By2 - By1 ) * ( Bx2 - Ax1 ) + (Bx1 - Bx2) * (By2 - Ay1) ) / det 
        gamma = ( (Ay1 - Ay2) * (Bx2 - Ax1) + (Ax2 - Ax1) * (By2 - Ay1)) / det 
    }
    
    if (( 0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)){
        var Xintersect = Ax1 + lambda*(Ax2-Ax1)
        var Yintersect = Ay1 + lambda*(Ay2-Ay1)
        return [true, Xintersect, Yintersect]
    }
    return [false, 0 ,0]

    


}