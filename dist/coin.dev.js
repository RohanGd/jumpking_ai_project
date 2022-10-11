"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Coin =
/*#__PURE__*/
function () {
  function Coin(x, y) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "reward";

    _classCallCheck(this, Coin);

    this.levelNo = 0;
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.type = type;
  }

  _createClass(Coin, [{
    key: "show",
    value: function show() {
      push();

      if (this.type == "reward") {
        fill(255, 150, 0);
      } else {
        fill(0, 200, 0, 100);
      }

      noStroke();
      ellipse(this.x, this.y, this.radius * 2);
      pop();
    }
  }, {
    key: "collidesWithPlayer",
    value: function collidesWithPlayer(player) {
      playerMidpoint = player.currentPosition.copy();
      playerMidpoint.x += player.width / 2;
      playerMidpoint.y += player.height / 2;

      if (dist(playerMidPoint.x, playerMidPoint.y, this.x, this.y) < this.radius + playerToCheck.width / 2) {
        return true;
      }

      return false;
    }
  }]);

  return Coin;
}();