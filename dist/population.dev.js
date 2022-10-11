"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Population =
/*#__PURE__*/
function () {
  function Population(size) {
    _classCallCheck(this, Population);

    this.popSize = size;
    this.players = [];

    for (var i = 0; i < size; i++) {
      this.players.push(new Player());
    }

    this.bestPlayerIndex = 0;
    this.bestPLayerReached = 0;
    this.bestPlayerHeight = 0;
    this.bestLevelReached = 0;
    this.bestHeight = 0;
    this.isNewLevel = false;
    this.cloneofBestAncestor = 0;
  }

  _createClass(Population, [{
    key: "Update",
    value: function Update() {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].update();
      }
    }
  }, {
    key: "SetBestPlayer",
    value: function SetBestPlayer() {
      this.bestPlayerIndex = 0;
      this.isNewLevel = false;

      for (var i = 0; i < this.players.length; i++) {
        if (this.players[i] > this.players[this.bestPlayerIndex]) this.bestPlayerIndex = i;
      } // if (this.players[this.bestPlayerIndex].bestLevelReached > this.bestLevelReached)

    }
  }, {
    key: "Show",
    value: function Show() {
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].show();
      }
    }
  }, {
    key: "MovePlayers",
    value: function MovePlayers() {}
  }]);

  return Population;
}();