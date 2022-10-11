class Population {
    constructor(size) {
        this.popSize = size
        this.players = []
        for (let i = 0; i < size; i++) {
            this.players.push(new Player())
        }

        this.bestPlayerIndex = 0 
        this.bestPLayerReached = 0
        this.bestPlayerHeight = 0
        this.bestLevelReached = 0
        this.bestHeight = 0
        this.isNewLevel = false    
        this.cloneofBestAncestor = 0
        this.showingLevelNo = 0
    }

    Update() {
        for (let i=0; i<this.players.length;i++)
            this.players[i].update()
    }

    SetBestPlayer() {

        this.bestPlayerIndex = 0;
        this.newLevelReached = false;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].bestHeightReached > this.players[this.bestPlayerIndex].bestHeightReached) {
                this.bestPlayerIndex = i;
            }
        }

        if (this.players[this.bestPlayerIndex].bestLevelReached > this.currentBestLevelReached) {
            this.currentBestLevelReached = this.players[this.bestPlayerIndex].bestLevelReached;
            this.newLevelReached = true;
            this.reachedBestLevelAtActionNo = this.players[this.bestPlayerIndex].bestLevelReachedOnActionNo;
            print("NEW LEVEL, action number", this.reachedBestLevelAtActionNo)
        }
        this.bestHeight = this.players[this.bestPlayerIndex].bestHeightReached;
    }

    
    SetCurrentHighestPlayer() {
        this.currentHighestPlayerIndex = 0;
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].GetGlobalHeight() > this.players[this.currentHighestPlayerIndex].GetGlobalHeight()) {
                this.currentHighestPlayerIndex = i;
            }
        }
    }

    Show() {
        for (let i = 0; i < this.players.length; i++)
            this.players[i].show()
    }

    MovePlayers() {

    }
    
}