"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var minJumpV = 5;
var maxJumpV = 22;
var maxJumpTimer = 30;
var jumpSpeedX = 8;
var terminalV = 20;
var gravity = 0.6;
var runSpeed = 4;
var maxBlizzardForce = 0.3;
var blizzardMaxSpeedHoldTime = 150;
var blizzardAccelerationMagnitude = 0.003;
var blizzardImageSpeedMultiplier = 50;
var iceFrictionAcceleration = 0.2;
var playerIceRunAcceleration = 0.2;
var alreadyShowingSnow = false; //add in population

var testingSinglePlayer = false;

var playerState =
/*#__PURE__*/
function () {
  function playerState() {
    _classCallCheck(this, playerState);

    this.currentPos = createVector(width / 2, height - 200); // this is the top left corner of the hitbox

    this.currentSpeed = createVector(0, 0);
    this.isOnGround = false;
    this.blizzardForce = 0;
    this.blizzardForceAccelerationDirection = 1;
    this.maxBlizzardForceTimer = 0;
    this.snowImagePosition = 0;
    this.bestHeightReached = 0;
    this.bestLevelReached = 0;
    this.reachedHeightAtStepNo = 0;
    this.bestLevelReachedOnActionNo = 0;
    this.brainActionNumber = 0;
    this.currentLevelNo = 0;
    this.jumpStartingHeight = 0;
    this.facingRight = true;
    this.isWaitingToStartAction = false;
    this.actionStarted = false;
  }

  _createClass(playerState, [{
    key: "getStateFromPlayer",
    value: function getStateFromPlayer(player) {
      this.currentPos = player.currentPos.copy();
      this.currentSpeed = player.currentSpeed.copy();
      this.isOnGround = player.isOnGround;
      this.blizzardForce = player.blizzardForce;
      this.blizzardForceAccelerationDirection = player.blizzardForceAccelerationDirection;
      this.maxBlizzardForceTimer = player.maxBlizzardForceTimer;
      this.snowImagePosition = player.snowImagePosition;
      this.bestHeightReached = player.bestHeightReached;
      this.bestLevelReached = player.bestLevelReached;
      this.reachedHeightAtStepNo = player.reachedHeightAtStepNo;
      this.bestLevelReachedOnActionNo = player.bestLevelReachedOnActionNo;
      this.brainActionNumber = player.brain.currentInstructionNumber;
      this.currentLevelNo = player.currentLevelNo;
      this.jumpStartingHeight = player.jumpStartingHeight;
      this.facingRight = player.facingRight;
      this.isWaitingToStartAction = player.isWaitingToStartAction;
      this.actionStarted = player.actionStarted;
    }
  }, {
    key: "loadStateToPlayer",
    value: function loadStateToPlayer(player) {
      player.currentPos = this.currentPos.copy();
      player.currentSpeed = this.currentSpeed.copy();
      player.isOnGround = this.isOnGround;
      player.blizzardForce = this.blizzardForce;
      player.blizzardForceAccelerationDirection = this.blizzardForceAccelerationDirection;
      player.maxBlizzardForceTimer = this.maxBlizzardForceTimer;
      player.snowImagePosition = this.snowImagePosition;
      player.bestHeightReached = this.bestHeightReached;
      player.bestLevelReached = this.bestLevelReached;
      player.reachedHeightAtStepNo = this.reachedHeightAtStepNo;
      player.bestLevelReachedOnActionNo = this.bestLevelReachedOnActionNo;
      player.brain.currentInstructionNumber = this.brainActionNumber;
      player.currentLevelNo = this.currentLevelNo;
      player.jumpStartingHeight = this.jumpStartingHeight;
      player.facingRight = this.facingRight;
    }
  }, {
    key: "clone",
    value: function clone() {
      var clone = new PlayerState();
      clone.currentPos = this.currentPos.copy();
      clone.currentSpeed = this.currentSpeed.copy();
      clone.isOnGround = this.isOnGround;
      clone.blizzardForce = this.blizzardForce;
      clone.blizzardForceAccelerationDirection = this.blizzardForceAccelerationDirection;
      clone.maxBlizzardForceTimer = this.maxBlizzardForceTimer;
      clone.snowImagePosition = this.snowImagePosition;
      clone.bestHeightReached = this.bestHeightReached;
      clone.bestLevelReached = this.bestLevelReached;
      clone.reachedHeightAtStepNo = this.reachedHeightAtStepNo;
      clone.bestLevelReachedOnActionNo = this.bestLevelReachedOnActionNo;
      clone.brainActionNumber = this.brainActionNumber;
      clone.currentLevelNo = this.currentLevelNo;
      clone.jumpStartingHeight = this.jumpStartingHeight;
      clone.facingRight = this.facingRight;
      return clone;
    }
  }]);

  return playerState;
}();

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this.width = 50;
    this.height = 65;
    this.currentPosition = createVector(width / 2, height - 200); // this.currentPosition = createVector(0,0)

    this.currentSpeed = createVector(0, 0);
    this.jumpHeld = false;
    this.leftHeld = false;
    this.rightHeld = false;
    this.isRunning = false;
    this.currentLevel = 0;
    this.jumptime = 0;
    this.isOnGround = true;
    this.facingRight = true;
    this.currentRunIndex = 0;
    this.runCycle = [run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run1Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run3Image, run2Image, run2Image, run2Image, run2Image, run2Image, run2Image];
    this.jumpStartingHeight = 0;
    this.sliddingRight = false;
    this.isSlidding = false;
    this.hasBumped = false;
    this.playersDead = false;
    this.hasFallen = false;
    this.blizzardForce = 0;
    this.blizzardForceAccelerationDirection = 1;
    this.maxBlizzardForceTimer = 0;
    this.snowImagePosition = 0; // ai stuff

    this.fitness = 0;
    this.aiActionTimer = 0;
    this.aiActionMaxTime = 0;
    this.isWaitingToStartAction = false;
    this.actionStarted = false;
    this.brain = new Brain(noOfMoves);
    this.currentAction = null;
    this.playersDead = false;
    this.previousSpeed = createVector(0, 0);
    this.bestHeightReached = 0;
    this.bestLevelReached = 0;
    this.reachedHeightAtStepNo = 0;
    this.bestLevelReachedOnActionNo = 0;
    this.hasFinishedInstructions = false;
    this.fellToPreviousLevel = false;
    this.fellOnActionNo = 0;
    this.playerStateAtStartOfBestLevel = new playerState();
    this.getNewPlayerStateAtEndOfUpdate = false;
    this.parentReachedBestLevelAtActionNo = 0;
    this.numberOfCoinsPickedUp = 0;
    this.coinsPickedUpIndexes = [];
    this.maxCollisionChecks = 20;
    this.currentNumberOfCollisionChecks = 0;
    this.progressionCoinPickedUp = false;
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      this.show();
      if (this.playersDead) //|| this.hasFinishedInstructions)
        return;

      if (!testingSinglePlayer && !this.hasFinishedInstructions) {
        this.UpdateAIAction();
      }

      var currentLines = levels[this.currentLevel].lines;
      this.UpdatePlayerSlide(currentLines); // add

      this.applyGravity();
      this.ApplyBlizzardForce();
      this.updateRun(currentLines);
      this.currentPosition.add(this.currentSpeed);
      this.previousSpeed = this.currentSpeed.copy(); //added

      this.currentNumberOfCollisionChecks = 0;
      this.CheckCollisions(currentLines);
      this.updateJumpTimer();
      this.CheckforLevelChange();
    }
  }, {
    key: "show",
    value: function show() {
      if (this.playersDead) return;
      push();
      translate(this.currentPosition.x, this.currentPosition.y);
      var imageToUse = this.getPlayerImageBasedOnState();

      if (!this.facingRight) {
        push();
        scale(-1, 1);

        if (this.hasBumped) {
          image(imageToUse, -70, -30);
        } else if (imageToUse == jumpImage || imageToUse == fallImage) {
          image(imageToUse, -70, -28);
        } else {
          image(imageToUse, -70, -35);
        }

        pop();
      }

      if (this.facingRight) {
        if (this.hasBumped) {
          image(imageToUse, -20, -30);
        } else if (imageToUse == jumpImage || imageToUse == fallImage) {
          image(imageToUse, -20, -28);
        } else {
          image(imageToUse, -20, -35);
        }
      }

      pop();

      if (levels[this.currentLevel].isBlizzardLevel && (!alreadyShowingSnow || testingSinglePlayer)) {
        var snowDrawPosition = this.snowImagePosition;

        while (snowDrawPosition <= 0) {
          snowDrawPosition += width;
        }

        snowDrawPosition = snowDrawPosition % width; // let snowYPosition = (frameCount/2) % height;

        image(snowImage, snowDrawPosition, 0);
        image(snowImage, snowDrawPosition - width, 0); // image(snowImage, snowDrawPosition, snowYPosition- height);
        // image(snowImage, snowDrawPosition - width, snowYPosition- height);

        alreadyShowingSnow = true;
      }
    }
  }, {
    key: "jump",
    value: function jump() {
      if (!this.isOnGround) {
        return;
      }

      var verticalJumpSpeed = map(this.jumptime, 0, maxJumpTimer, minJumpV, maxJumpV);

      if (this.leftHeld) {
        this.currentSpeed = createVector(-jumpSpeedX, -verticalJumpSpeed);
      } else if (this.rightHeld) {
        this.currentSpeed = createVector(jumpSpeedX, -verticalJumpSpeed);
      } else {
        this.currentSpeed.y = -verticalJumpSpeed;
      }

      this.jumptime = 0;
      this.jumpStartingHeight = height - this.currentPosition.y + height * this.currentLevel;
    }
  }, {
    key: "updateJumpTimer",
    value: function updateJumpTimer() {
      if (this.isOnGround && this.jumpHeld && this.jumptime < maxJumpTimer) {
        this.jumptime++;
      }
    }
  }, {
    key: "ApplyBlizzardForce",
    value: function ApplyBlizzardForce() {
      // if(!levels[this.currentLevel].isBlizzardLevel)
      //     return;
      if (abs(this.blizzardForce) >= maxBlizzardForce) {
        this.maxBlizzardForceTimer += 1;

        if (this.maxBlizzardForceTimer > blizzardMaxSpeedHoldTime) {
          this.blizzardForceAccelerationDirection *= -1;
          this.maxBlizzardForceTimer = 0;
        }
      }

      this.blizzardForce += this.blizzardForceAccelerationDirection * blizzardAccelerationMagnitude; // if the blizzard is faster than max blizzard force

      if (abs(this.blizzardForce) > maxBlizzardForce) {
        this.blizzardForce = maxBlizzardForce * this.blizzardForceAccelerationDirection;
      }

      this.snowImagePosition += this.blizzardForce * blizzardImageSpeedMultiplier;

      if (!this.isOnGround && levels[this.currentLevel].isBlizzardLevel) {
        this.currentSpeed.x += this.blizzardForce;
      }
    }
  }, {
    key: "applyGravity",
    value: function applyGravity() {
      if (!this.isOnGround) {
        if (this.isSlidding) {
          this.currentSpeed.y = min(this.currentSpeed.y + gravity * 0.5, terminalV * 0.5);

          if (this.sliddingRight) {
            this.currentSpeed.x = min(this.currentSpeed.x + gravity * 0.5, terminalV * 0.5);
          } else {
            this.currentSpeed.x = max(this.currentSpeed.x - gravity * 0.5, -terminalV * 0.5);
          }
        } else {
          this.currentSpeed.y = min(this.currentSpeed.y + gravity, terminalV);
        }
      }
    }
  }, {
    key: "isMovingDown",
    value: function isMovingDown() {
      return this.currentSpeed.y > 0;
    }
  }, {
    key: "isMovingUp",
    value: function isMovingUp() {
      return this.currentSpeed.y < 0;
    }
  }, {
    key: "isMovingRight",
    value: function isMovingRight() {
      return this.currentSpeed.x > 0;
    }
  }, {
    key: "isMovingLeft",
    value: function isMovingLeft() {
      return this.currentSpeed.x < 0;
    }
  }, {
    key: "updateRun",
    value: function updateRun(currentLines) {
      this.isRunning = false;
      var runAllowed = !levels[this.currentLevel].isBlizzardLevel || this.currentLevel === 31 || this.currentLevel == 25;

      if (this.isOnGround) {
        if (!this.IsPlayerOnGround(currentLines)) {
          this.isOnGround = false;
          return;
        }

        if (!this.jumpHeld) {
          if (this.rightHeld && runAllowed) {
            this.hasFallen = false;
            this.isRunning = true;
            this.facingRight = true;

            if (!levels[this.currentLevel].isIceLevel) {
              this.currentSpeed = createVector(runSpeed, 0);
            } else {
              this.currentSpeed.x += playerIceRunAcceleration;
              this.currentSpeed.x = min(runSpeed, this.currentSpeed.x);
            }
          } else if (this.leftHeld && runAllowed) {
            this.hasFallen = false;
            this.isRunning = true;
            this.facingRight = false;

            if (!levels[this.currentLevel].isIceLevel) {
              this.currentSpeed = createVector(-runSpeed, 0);
            } else {
              this.currentSpeed.x -= playerIceRunAcceleration;
              this.currentSpeed.x = max(0 - runSpeed, this.currentSpeed.x);
            }
          } else {
            if (!levels[this.currentLevel].isIceLevel) {
              this.currentSpeed = createVector(0, 0);
            } else {
              this.currentSpeed.y = 0;

              if (this.isMovingRight()) {
                this.currentSpeed.x -= iceFrictionAcceleration;
              } else {
                this.currentSpeed.x += iceFrictionAcceleration;
              }

              if (abs(this.currentSpeed.x) <= iceFrictionAcceleration) {
                this.currentSpeed.x = 0;
              }
            }
          }
        } else {
          if (!levels[this.currentLevel].isIceLevel) {
            this.currentSpeed = createVector(0, 0);
          } else {
            this.currentSpeed.y = 0;

            if (this.isMovingRight()) {
              this.currentSpeed.x -= iceFrictionAcceleration;
            } else {
              this.currentSpeed.x += iceFrictionAcceleration;
            }

            if (abs(this.currentSpeed.x) <= iceFrictionAcceleration) {
              this.currentSpeed.x = 0;
            }
          }
        }
      }
    }
  }, {
    key: "getPlayerImageBasedOnState",
    value: function getPlayerImageBasedOnState() {
      if (this.jumpHeld && this.isOnGround) return squatImage;
      if (this.currentSpeed.y < 0) return jumpImage;
      if (this.hasBumped) return oofImage;

      if (this.isRunning) {
        if (this.leftHeld) {
          this.facingRight = false;
          push();
          scale(-1, 1);
          this.currentRunIndex = (this.currentRunIndex + 1) % this.runCycle.length;
          pop();
          return this.runCycle[this.currentRunIndex];
        } else if (this.rightHeld) {
          this.facingRight = true;
          this.currentRunIndex = (this.currentRunIndex + 1) % this.runCycle.length;
          return this.runCycle[this.currentRunIndex];
        }
      }

      return idleImage;
    }
  }, {
    key: "IsPlayerOnGround",
    value: function IsPlayerOnGround(currentLines) {
      this.currentPosition.y += 1;

      for (var i = 0; i < currentLines.length; i++) {
        if (currentLines[i].isHorizontal && this.IsCollidingWithLine(currentLines[i])) {
          this.currentPosition.y -= 1;
          return true;
        }
      }

      this.currentPosition.y -= 1;
      return false;
    }
  }, {
    key: "IsPlayerOnDiagonal",
    value: function IsPlayerOnDiagonal(currentLines) {
      this.currentPosition.y += 5;

      for (var i = 0; i < currentLines.length; i++) {
        if (currentLines[i].isDiagonal && this.IsCollidingWithLine(currentLines[i])) {
          this.currentPosition.y -= 5;
          return true;
        }
      }

      this.currentPosition.y -= 5;
      return false;
    }
  }, {
    key: "UpdatePlayerSlide",
    value: function UpdatePlayerSlide(currentLines) {
      if (this.isSlidding) {
        if (!this.IsPlayerOnDiagonal(currentLines)) {
          // print("NOT SLIDDING")
          this.isSlidding = false;
        }
      }
    }
  }, {
    key: "playerLanded",
    value: function playerLanded() {
      // if moving down then weve landed
      this.isOnGround = true; // if were on an ice level then we slide instead

      if (levels[this.currentLevel].isIceLevel) {
        this.currentSpeed.y = 0;

        if (this.isMovingRight()) {
          this.currentSpeed.x -= iceFrictionAcceleration;
        } else {
          this.currentSpeed.x += iceFrictionAcceleration;
        }
      } else {
        this.currentSpeed = createVector(0, 0);
      }

      this.isSlidding = false;
      this.hasBumped = false;

      if (this.jumpStartingHeight - height / 2 > height - this.currentPosition.y + height * this.currentLevel) {
        this.hasFallen = true;
      }
    }
  }, {
    key: "bonk",
    value: function bonk() {
      this.currentSpeed.y *= 0;
      this.hasBumped = true;
    }
  }, {
    key: "IsCollidingWithLine",
    value: function IsCollidingWithLine(l) {
      if (l.isHorizontal) {
        var isRectWithinLineX = l.x1 < this.currentPosition.x && this.currentPosition.x < l.x2 || l.x1 < this.currentPosition.x + this.width && this.currentPosition.x + this.width < l.x2 || this.currentPosition.x < l.x1 && l.x1 < this.currentPosition.x + this.width || this.currentPosition.x < l.x2 && l.x2 < this.currentPosition.x + this.width;
        var isRectWithinLineY = this.currentPosition.y < l.y1 && l.y1 < this.currentPosition.y + this.height; // if (isRectWithinLineX && isRectWithinLineY) {
        //     print(this.currentPosition.x, l.x1, l.x2)
        //     print(isRectWithinLineX, isRectWithinLineY)
        // }

        return isRectWithinLineX && isRectWithinLineY;
      } else if (l.isVertical) {
        isRectWithinLineY = l.y1 < this.currentPosition.y && this.currentPosition.y < l.y2 || l.y1 < this.currentPosition.y + this.height && this.currentPosition.y + this.height < l.y2 || this.currentPosition.y < l.y1 && l.y1 < this.currentPosition.y + this.height || this.currentPosition.y < l.y2 && l.y2 < this.currentPosition.y + this.height;
        isRectWithinLineX = this.currentPosition.x < l.x1 && l.x1 < this.currentPosition.x + this.width; // if (isRectWithinLineX && isRectWithinLineY) {
        //     print(this.currentPosition.x, l.x1, l.x2)
        //     print(isRectWithinLineX, isRectWithinLineY)
        // }

        return isRectWithinLineX && isRectWithinLineY;
      } else {
        // ok so we need to check each side of the
        // wait i just realized there is no way that only the l or r side is touching the digonal
        //wait there might be hold on
        // ok jsut check all of them
        var tl = this.currentPosition.copy();
        var tr = tl.copy();
        tr.x += this.width;
        var bl = tl.copy();
        bl.y += this.height - 1;
        var br = bl.copy();
        br.x += this.width;
        var leftCollision = AreLinesColliding(tl.x, tl.y, bl.x, bl.y, l.x1, l.y1, l.x2, l.y2);
        var rightCollision = AreLinesColliding(tr.x, tr.y, br.x, br.y, l.x1, l.y1, l.x2, l.y2);
        var topCollision = AreLinesColliding(tl.x, tl.y, tr.x, tr.y, l.x1, l.y1, l.x2, l.y2);
        var bottomCollision = AreLinesColliding(bl.x, bl.y, br.x, br.y, l.x1, l.y1, l.x2, l.y2);

        if (leftCollision[0] || rightCollision[0] || topCollision[0] || bottomCollision[0]) {
          var collisionInfo = new DiagonalCollisionInfo();
          collisionInfo.leftSideOfPlayerCollided = leftCollision[0];
          collisionInfo.rightSideOfPlayerCollided = rightCollision[0];
          collisionInfo.topSideOfPlayerCollided = topCollision[0];
          collisionInfo.bottomSideOfPlayerCollided = bottomCollision[0];
          if (leftCollision[0]) collisionInfo.collisionPoints.push(createVector(leftCollision[1], leftCollision[2]));
          if (rightCollision[0]) collisionInfo.collisionPoints.push(createVector(rightCollision[1], rightCollision[2]));
          if (topCollision[0]) collisionInfo.collisionPoints.push(createVector(topCollision[1], topCollision[2]));
          if (bottomCollision[0]) collisionInfo.collisionPoints.push(createVector(bottomCollision[1], bottomCollision[2]));
          l.diagonalCollisionInfo = collisionInfo;
          return true;
        } else {
          return false;
        }
      }
    }
  }, {
    key: "GetPriorityCollision",
    value: function GetPriorityCollision(collidedLines) {
      // FIRST EDGE CASES BECAUse I SUCK AT CODING
      //ok so this is gonna need some explaining, i know there is probably a better fix but i think this will work
      //ok so if we are going up and then we hit a verticle and a horizontal and if the midpoint of the vert is lower then
      // we need to do the verticle one first because that should be blocking the horizontal one
      if (collidedLines.length === 2) {
        var vert = null;
        var horiz = null;
        var diag = null;
        if (collidedLines[0].isVertical) vert = collidedLines[0];
        if (collidedLines[0].isHorizontal) horiz = collidedLines[0];
        if (collidedLines[0].isDiagonal) diag = collidedLines[0];
        if (collidedLines[1].isVertical) vert = collidedLines[1];
        if (collidedLines[1].isHorizontal) horiz = collidedLines[1];
        if (collidedLines[1].isDiagonal) diag = collidedLines[1];

        if (vert != null && horiz != null) {
          if (this.isMovingUp()) {
            if (vert.midPoint.y > horiz.midPoint.y) {
              return vert;
            } else {// return horiz;
            }
          } else {// if(vert.midPoint.y < horiz.midPoint.y ){
              //     return vert;
              // }else{
              //     // return horiz;
              // }
            }
        }

        if (horiz != null && diag != null) {
          // if (this.isMovingDown()) {
          //if the digonal one is below the horizontal then always prefer the horiz
          if (diag.midPoint.y > horiz.midPoint.y) {
            return horiz;
          }
        }
      } // check the inverse of the velocity to see if the corrections fit in the range


      var maxAllowedXCorrection = 0 - this.currentSpeed.x;
      var maxAllowedYCorrection = 0 - this.currentSpeed.y; //if multiple collisions detected use the one that requires the least correction

      var minCorrection = 10000;
      var maxCorrection = 0;
      var chosenLine = null;
      if (collidedLines.length === 0) return null;
      chosenLine = collidedLines[0];

      if (collidedLines.length > 1) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = collidedLines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var isBetween = function isBetween(a, b1, b2) {
              return b1 <= a && a <= b2 || b2 <= a && a <= b1;
            };

            var l = _step.value;
            var directedCorrection = createVector(0, 0);
            var correction = 10000;

            if (l.isHorizontal) {
              if (this.isMovingDown()) {
                directedCorrection.y = l.y1 - (this.currentPosition.y + this.height);
                correction = abs(directedCorrection);
                correction = abs(this.currentPosition.y - (l.y1 - this.height));
              } else {
                // if moving up then we've hit a roof and we bounce off
                directedCorrection.y = l.y1 - this.currentPosition.y;
                correction = abs(this.currentPosition.y - l.y1);
              }
            } else if (l.isVertical) {
              if (this.isMovingRight()) {
                directedCorrection.x = l.x1 - (this.currentPosition.x + this.width);
                correction = abs(this.currentPosition.x - (l.x1 - this.width));
              } else {
                directedCorrection.x = l.x1 - this.currentPosition.x;
                correction = abs(this.currentPosition.x - l.x1);
              }
            } else {
              //this bitch diagonal
              // so we're moving the point to the diagonal linees
              // if we get the midpoint of the 2 intersection points then we gucci
              // if there is only 1 intersection point then just treat it as a wall/ roof
              if (l.diagonalCollisionInfo.collisionPoints.length === 2) {
                var midpoint = l.diagonalCollisionInfo.collisionPoints[0].copy();
                midpoint.add(l.diagonalCollisionInfo.collisionPoints[1].copy());
                midpoint.mult(0.5);
                var left = l.diagonalCollisionInfo.leftSideOfPlayerCollided;
                var right = l.diagonalCollisionInfo.rightSideOfPlayerCollided;
                var top = l.diagonalCollisionInfo.topSideOfPlayerCollided;
                var bottom = l.diagonalCollisionInfo.bottomSideOfPlayerCollided;
                var playerCornerPos = null;

                if (top && left) {
                  playerCornerPos = this.currentPosition.copy();
                }

                if (top && right) {
                  playerCornerPos = this.currentPosition.copy();
                  playerCornerPos.x += this.width;
                }

                if (bottom && left) {
                  playerCornerPos = this.currentPosition.copy();
                  playerCornerPos.y += this.height;
                }

                if (bottom && right) {
                  playerCornerPos = this.currentPosition.copy();
                  playerCornerPos.y += this.height;
                  playerCornerPos.x += this.width;
                }

                if (playerCornerPos === null) {
                  print("fuck");
                  print(left, right, top, bottom);
                  playerCornerPos = this.currentPosition.copy();

                  if (this.isMovingDown()) {
                    playerCornerPos.y += this.height;
                  }

                  if (this.isMovingRight()) {
                    playerCornerPos.x += this.width;
                  }
                }

                directedCorrection.x = midpoint.x - playerCornerPos.x;
                directedCorrection.y = midpoint.y - playerCornerPos.y;
                correction = dist(playerCornerPos.x, playerCornerPos.y, midpoint.x, midpoint.y);
              } else {
                var _left = l.diagonalCollisionInfo.leftSideOfPlayerCollided;
                var _right = l.diagonalCollisionInfo.rightSideOfPlayerCollided;
                var _top = l.diagonalCollisionInfo.topSideOfPlayerCollided;
                var _bottom = l.diagonalCollisionInfo.bottomSideOfPlayerCollided;
                var _playerCornerPos = null;

                if (_top) {
                  // bounce off the point as if it were horizontal
                  var closestPointY = max(l.y1, l.y2);
                  directedCorrection.y = closestPointY - this.currentPosition.y;
                  correction = abs(this.currentPosition.y - closestPointY);
                }

                if (_bottom) {
                  //treat like floor
                  var _closestPointY = min(l.y1, l.y2);

                  directedCorrection.y = _closestPointY - (this.currentPosition.y + this.height);
                  correction = abs(this.currentPosition.y + this.height - _closestPointY);
                }

                if (_left) {
                  // treat like a left wall
                  var closestPointX = max(l.x1, l.x2);
                  directedCorrection.x = closestPointX - this.currentPosition.x;
                  correction = abs(this.currentPosition.x - closestPointX);
                }

                if (_right) {
                  // treat like a left wall
                  var _closestPointX = min(l.x1, l.x2);

                  directedCorrection.x = _closestPointX - (this.currentPosition.x + this.width);
                  correction = abs(this.currentPosition.x + this.width - _closestPointX);
                }
              }
            }

            if (isBetween(directedCorrection.x, 0, maxAllowedXCorrection) && isBetween(directedCorrection.y, 0, maxAllowedYCorrection)) {
              // correction = abs(directedCorrection)
              if (correction < minCorrection) {
                minCorrection = correction;
                chosenLine = l;
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return chosenLine;
    }
  }, {
    key: "CheckCollisions",
    value: function CheckCollisions(currentLines) {
      var collidedLines = [];

      for (var i = 0; i < currentLines.length; i++) {
        if (this.IsCollidingWithLine(currentLines[i])) {
          collidedLines.push(currentLines[i]);
        }
      }

      var chosenLine = this.GetPriorityCollision(collidedLines);
      var potentialLanding = false;
      if (chosenLine == null) return;

      if (chosenLine.isHorizontal) {
        if (this.isMovingDown()) {
          // so the player has potentially landed
          //correct the position first then player has landed
          this.currentPosition.y = chosenLine.y1 - this.height;

          if (collidedLines.length > 1) {
            potentialLanding = true;

            if (levels[this.currentLevel].isIceLevel) {
              this.currentSpeed.y = 0;

              if (this.isMovingRight()) {
                this.currentSpeed.x -= iceFrictionAcceleration;
              } else {
                this.currentSpeed.x += iceFrictionAcceleration;
              }
            } else {
              this.currentSpeed = createVector(0, 0);
            } // print("potentail landing on nooooooo")

          } else {
            this.playerLanded();
          }
        } else {
          // if moving up then we've hit a roof and we bounce off
          this.currentSpeed.y = 0 - this.currentSpeed.y / 2; // ok we gonna need to snap this shit

          this.currentPosition.y = chosenLine.y1; // if (!mutePlayers || testingSinglePlayer) {
          //     bumpSound.playMode('sustain');
          //     bumpSound.play();
          // }
        }
      } else if (chosenLine.isVertical) {
        if (this.isMovingRight()) {
          this.currentPosition.x = chosenLine.x1 - this.width;
        } else if (this.isMovingLeft()) {
          this.currentPosition.x = chosenLine.x1;
        } else {
          //ok so fuck
          //this.bad = true
          // this means we've hit a wall but we arent moving left or right
          // meaning we prioritised the floor first which stopped our velocity
          // so we need a variable to store the speed we had before any transions were made
          if (this.previousSpeed.x > 0) {
            this.currentPosition.x = chosenLine.x1 - this.width;
          } else {
            this.currentPosition.x = chosenLine.x1;
          }
        }

        this.currentSpeed.x = 0 - this.currentSpeed.x / 2;

        if (!this.isOnGround) {
          this.hasBumped = true; // if (!mutePlayers|| testingSinglePlayer) {
          //     bumpSound.playMode('sustain');
          //     bumpSound.play();
          // }
        }
      } else {
        this.isSlidding = true;
        this.hasBumped = true;

        if (chosenLine.diagonalCollisionInfo.collisionPoints.length === 2) {
          var midpoint = chosenLine.diagonalCollisionInfo.collisionPoints[0].copy();
          midpoint.add(chosenLine.diagonalCollisionInfo.collisionPoints[1].copy());
          midpoint.mult(0.5);
          var left = chosenLine.diagonalCollisionInfo.leftSideOfPlayerCollided;
          var right = chosenLine.diagonalCollisionInfo.rightSideOfPlayerCollided;
          var top = chosenLine.diagonalCollisionInfo.topSideOfPlayerCollided;
          var bottom = chosenLine.diagonalCollisionInfo.bottomSideOfPlayerCollided;
          var playerCornerPos = null;

          if (top && left) {
            // print("t and l")
            playerCornerPos = this.currentPosition.copy();
          }

          if (top && right) {
            // print("t and r")
            playerCornerPos = this.currentPosition.copy();
            playerCornerPos.x += this.width;
          }

          if (bottom && left) {
            // print("b and l")
            playerCornerPos = this.currentPosition.copy();
            playerCornerPos.y += this.height;
            this.sliddingRight = true;
          }

          if (bottom && right) {
            // print("b and r")
            playerCornerPos = this.currentPosition.copy();
            playerCornerPos.y += this.height;
            playerCornerPos.x += this.width;
            this.sliddingRight = false;
          }

          var correctionX = 0;
          var correctionY = 0;

          if (playerCornerPos === null) {
            print("fuck");
            print(left, right, top, bottom);
            playerCornerPos = this.currentPosition.copy();

            if (this.isMovingDown()) {
              playerCornerPos.y += this.height;
            }

            if (this.isMovingRight()) {
              playerCornerPos.x += this.width;
            }
          }

          correctionX = midpoint.x - playerCornerPos.x;
          correctionY = midpoint.y - playerCornerPos.y;
          this.currentPosition.x += correctionX;
          this.currentPosition.y += correctionY; // this.currentPosition.x += correctionX>0 ? 1:-1;
          // this.currentPosition.y += correctionY>0 ? 1:-1;
          //get the current speed based on the dot product of the current veloctiy with the line

          var lineVector = createVector(chosenLine.x2 - chosenLine.x1, chosenLine.y2 - chosenLine.y1);
          lineVector.normalize(); // print(lineVector);

          var speedMagnitude = p5.Vector.dot(this.currentSpeed, lineVector); // print(this.currentSpeed)

          this.currentSpeed = p5.Vector.mult(lineVector, speedMagnitude); // print(speedMagnitude,lineVector,this.currentSpeed)
          // this.currentSpeed.x = 0.5*gravity;
          // this.currentSpeed.y = 0.5*gravity;

          if (top) {
            this.currentSpeed = createVector(0, 0);
            this.isSlidding = false;
          }
        } else {
          var _left2 = chosenLine.diagonalCollisionInfo.leftSideOfPlayerCollided;
          var _right2 = chosenLine.diagonalCollisionInfo.rightSideOfPlayerCollided;
          var _top2 = chosenLine.diagonalCollisionInfo.topSideOfPlayerCollided;
          var _bottom2 = chosenLine.diagonalCollisionInfo.bottomSideOfPlayerCollided;
          var _playerCornerPos2 = null;

          if (_top2) {
            // bounce off the point as if it were horizontal
            // print("top only");
            var closestPointY = max(chosenLine.y1, chosenLine.y2);
            this.currentPosition.y = closestPointY + 1;
            this.currentSpeed.y = 0 - this.currentSpeed.y / 2;
          }

          if (_bottom2) {
            //treat like floor
            // print("bottome only");
            var _closestPointY2 = min(chosenLine.y1, chosenLine.y2); // this.isOnGround = true


            this.currentSpeed = createVector(0, 0); // ok we gonna need to snap this shit

            this.currentPosition.y = _closestPointY2 - this.height - 1;
          }

          if (_left2) {
            // treat like a left wall
            // print('left only')
            this.currentPosition.x = max(chosenLine.x1, chosenLine.x2) + 1;
            if (this.isMovingLeft()) this.currentSpeed.x = 0 - this.currentSpeed.x / 2;
            if (!this.isOnGround) this.hasBumped = true;
          }

          if (_right2) {
            // treat like a right wall
            // print("right only")
            this.currentPosition.x = min(chosenLine.x1, chosenLine.x2) - this.width - 1;
            if (this.isMovingRight()) this.currentSpeed.x = 0 - this.currentSpeed.x / 2;
            if (!this.isOnGround) this.hasBumped = true;
          }
        }
      }

      if (collidedLines.length > 1) {
        // print(chosenLine)
        this.currentNumberOfCollisionChecks += 1;

        if (this.currentNumberOfCollisionChecks > this.maxCollisionChecks) {
          this.hasFinishedInstructions = true;
          this.playersDead = true;
        } else {
          this.CheckCollisions(currentLines);
        } //ok so this is gonna need some splaining.
        // so if we've "landed" but it wasnt the last correction then we need to check again if the dude has landed
        // just incase the corrections have moved him off the surface


        if (potentialLanding) {
          if (this.IsPlayerOnGround(currentLines)) {
            this.playerLanded();
          }
        }
      }
    }
  }, {
    key: "CheckforLevelChange",
    value: function CheckforLevelChange() {
      if (this.currentPosition.y <= -this.height) {
        this.GoToNextLevel();
      }

      if (this.currentPosition.y > height && this.currentLevel > 0) {
        this.GoToPreviousLevel();
      }
    }
  }, {
    key: "GoToNextLevel",
    value: function GoToNextLevel() {
      this.currentLevel += 1;
      this.currentPosition.y += height;
    }
  }, {
    key: "GoToPreviousLevel",
    value: function GoToPreviousLevel() {
      this.currentLevel -= 1;
      this.currentPosition.y -= height;
    }
  }, {
    key: "clone",
    value: function clone() {
      var cloon = new Player();
      cloon.PlayerStateAtStartOfBestLevel = this.PlayerStateAtStartOfBestLevel;
      return cloon;
    }
  }, {
    key: "CheckForCoinCollision",
    value: function CheckForCoinCollision() {
      if (this.currentLevelNo < this.bestLevelReached) {
        return;
      }

      var currentLevel = levels[this.currentLevelNo];

      for (var i = 0; i < currentLevel.coins.length; i++) {
        if (!this.coinsPickedUpIndexes.includes(i)) {
          if (currentLevel.coins[i].collidesWithPlayer(this)) {
            if (currentLevel.coins[i].type == "reward") {
              if (this.isOnGround) {
                this.coinsPickedUpIndexes.push(i);
                this.numberOfCoinsPickedUp += 1;
                print("reward coin");
              }
            } else {
              this.coinsPickedUpIndexes.push(i);
              this.numberOfCoinsPickedUp += 0; // dont increase coins picked up

              this.progressionCoinPickedUp = true;
              print("progress coin");
            }
          }
        }
      }
    }
  }, {
    key: "getFitnessScore",
    value: function getFitnessScore() {
      var coinValue = 500000;
      var heightThisLevel = this.bestHeightReached - height * this.bestLevelReached;
      this.fitness = heightThisLevel + coinValue * this.numberOfCoinsPickedUp;
    }
  }, {
    key: "StartCurrentAction",
    value: function StartCurrentAction() {
      this.aiActionMaxTime = floor(this.currentAction.holdTime * 30);
      this.aiActionTimer = 0;

      if (this.currentAction.isJump) {
        this.jumpHeld = true;
      }

      if (this.currentAction.xDirection === -1) {
        this.leftHeld = true;
        this.rightHeld = false;
      } else if (this.currentAction.xDirection === 1) {
        this.leftHeld = false;
        this.rightHeld = true;
      }
    }
  }, {
    key: "EndCurrentAction",
    value: function EndCurrentAction() {
      if (this.currentAction.isJump) {
        this.jumpHeld = false;
        this.Jump();
      }

      this.leftHeld = false;
      this.rightHeld = false;
      this.isWaitingToStartAction = false;
    }
  }, {
    key: "UpdateAIAction",
    value: function UpdateAIAction() {
      // ran every frame
      if (this.isWaitingToStartAction && this.isOnGround) {
        this.isWaitingToStartAction = false;
      } //if the action hasnt started yet then start it
      //also if the ai is not on the ground and the action has already started then end the action


      if (this.isOnGround && !this.actionStarted) {
        this.currentAction = this.brain.getNextAction();

        if (this.currentAction === null) {
          this.hasFinishedInstructions = true;
          return;
        }

        this.StartCurrentAction();
        this.actionStarted = true;
      } else if (this.actionStarted) {
        //if the action has been held for long enough then we end the current action
        this.aiActionTimer += 1;

        if (this.aiActionTimer >= this.aiActionMaxTime) {
          this.EndCurrentAction();
          this.actionStarted = false;
        }
      }
    }
  }]);

  return Player;
}();

function AreLinesColliding(x1, y1, x2, y2, x3, y3, x4, y4) {
  var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    var intersectionX = x1 + uA * (x2 - x1);
    var intersectionY = y1 + uA * (y2 - y1);
    return [true, intersectionX, intersectionY];
  }

  return [false, 0, 0];
}