HORIZONTAL = 0;
VERTICAL   = 1;
BOARD_SIZE = 5;

EMPTY_VAL = '0';
BOAT_VAL  = 'B';
HIT_VAL   = 'X';

BOAT_SIZES = [2];

function Boat( owner, startCoord, orientation, length ) {
    
    this.owner = owner;
    this.startCoord = startCoord;
    this.orientation = orientation;
    this.length = length;
    this.boat = {};

    this.startX = function() {
        return startCoord[0];
    }

    this.startY = function() {
        return startCoord[1];
    }

    this.coordinates = function() {
        var coords = [];
        for(var i=0; i < length; i++) {
            if (orientation == HORIZONTAL) {
                coords.push([this.startX()+i, this.startY()]);
            } else {
                coords.push([this.startX(), this.startY()+i]);
            }
        }
        return coords;
	}
    
    /* Given a coordinate, return true if the coordinate overlaps the boat's position, false otherwise */
    this.isAt = function(coord) {
        var coords = this.coordinates();
        for(var i=0; i < coords.length; i++) {
            if (coord.toString() == coords[i].toString()) {
                return true;
            }
        }
        return false;
    }
    
    /* Given a coordinate, mark that spot as hit */
    this.takeHit = function(coord) {
        var tmp = coord.toString();
        if(this.boat.hasOwnProperty(tmp)) {
            this.boat[tmp] = true;
        }

    }
    
    /* Given a coordinate, return whether or not the boat has been hit there */
    this.isHitAt = function(coord) { 
        return this.boat[coord.toString()];
    }
    
    /* If all pieces of a boat have been hit, return true */
    this.isSunk = function() {
        for(var prop in this.boat) {
            if(this.boat.hasOwnProperty(prop)) {
                if(this.boat[prop] == false) {
                    return false;
                }
            }
        }
        return true;
    }
    
    /* Return the status of the boat */
    this.showDamage = function() {

        var status = [];
        for(var prop in this.boat) {
            if(this.boat.hasOwnProperty(prop)) {
                status.push(this.boat[prop]);
            }
        }
        
        return status;
    }
    
    
    /* Initialize the status of the boat */
    var coords = this.coordinates();
    
    /* Use the stringified version of the coordinates to represent the boat's status at that position */
    for(var i=0; i<coords.length; i++) {
        var str = coords[i].toString();
        this.boat[str] = false;
    }
    
}

function Board(size) {
    
    this.size = size;
    this.grid = [];
    
    /*
        Possible grid states:
        - null  - empty grid spot
        - false
        - boat
            - been hit in this spot
            - hasn't been hit in this spot
    */
    
    /* Given a grid size, initialize an empty grid */
    this.init = function() {
        for(var i=0; i<size; i++) {
            this.grid[i] = [];
            for(var j=0; j<size; j++) {
                this.grid[i][j] = 0;
            }
        }
    };
    
    /* Returns a string representing the grid */
    /* If mine is true, display the locations of your boats so you know where they are */
    this.display = function(mine) {
        var grid = "";
        var row = "";
        for(var i=0; i<this.size; i++) {
            for(var j=0; j<this.size; j++) {
                var gridSpot = this.grid[i][j];
                if(typeof gridSpot == 'number') {
                    row += gridSpot;
                } else {
                    var boat = gridSpot;
                    /* It's a boat, let's see if we've already hit it */
                    if(boat.isHitAt([i,j])) {
                        row += HIT_VAL;
                    } else {
                        if(mine) {
                            row += BOAT_VAL;
                        } else {
                            row += EMPTY_VAL;                            
                        }

                    }
                }
            }
            row += "\n";
            grid += row;
            row = '';
        }
        
        return grid;
    };
    
    /* Places a boat on the map */
    this.placeBoat = function(boat) {
        var coords = boat.coordinates();
        
        for(var i=0; i<coords.length; i++) {
            this.grid[coords[i][0]][coords[i][1]] = boat;
        }
    }
    
    /* Given a coordinate, check to see if that coordinate contains a boat */
    this.hasBoat = function(coord) {
        if(typeof this.grid[coord[0]][coord[1]] == 'object') {
            return this.grid[coord[0]][coord[1]];
        }
        
        return false;
    };
    
    this.markAsMiss = function(coord) {
        this.grid[coord[0]][coord[1]] = 1;
    }
    
    this.init();
}

function Player() {
    this.name = "Default";
    this.board = new Board(BOARD_SIZE);
    this.boats = [];
    
    /* Function that takes a set of coordinates as an argument and returns a string with a status message */
    this.takeShotAt = function(coord) {
        var status  = "";
        var boat = this.board.hasBoat(coord);
        if(boat) {
            boat.takeHit(coord);
            if(boat.isSunk()) {
                status = "You sunk the boat!";
            } else {
                status = "Hit!";
            }
        } else {
            this.board.markAsMiss(coord);
            status = "Miss!";
        }
        
        return status;
    }
    
    /* Return's a string representing the game board */
    /* If mine is true, this will display the location of all the player's boats */
    this.printBoard = function(mine) { 
        return this.board.display(mine);
    }
    
    /* Setup player - ask for name, prompt for inserting boats */
    this.setup = function() {
        // prompt for name
        
        // prompt for boats
    }
    
    /* Does the player have any boats remaining? */
    this.isStillAlive = function() {
        for(var i=0; i<this.boats.length; i++) {
            if(typeof this.boats[i] == "object" && !this.boats[i].isSunk()) {
                return true;
            }
        }
        return false;
    }
    
}

function Game() {
    this.player1 = new Player();
    this.player2 = new Player();
    this.gameOver = false;

    
    this.takeTurn = function(currentPlayer, otherPlayer) {
        Domsole.write(currentPlayer.name + "'s turn:\n");
        Domsole.write(otherPlayer.printBoard());
        Domsole.prompt("Where would you like to take a shot? Valid input is: x, y", function (text) { 
            var coord = text.split(",");
            coord[0] = parseInt(coord[0]);
            coord[1] = parseInt(coord[1]);
            
            Domsole.write(otherPlayer.takeShotAt(coord));
            
            Domsole.write(otherPlayer.printBoard());
            
            /* Is the game over now? */
            if(!otherPlayer.isStillAlive()) {
                Domsole.write(currentPlayer.name + " wins!");
            } else {
                this.takeTurn(otherPlayer, currentPlayer);
            }
                     
        });
    }
    
    
    
    this.init = function() {
        Domsole.write("Welcome to JavaScript Battleship!\n\n");
        
        this.player1.setup();
        this.player2.setup();
        
        var currentPlayer = this.player1;
        var otherPlayer   = this.player2;
        
        this.takeTurn(this.player1, this.player2);        
    }
    
    
    
    /*
        - Welcome message
        - Ask player 1 to enter name
        - Ask player 1 to start placing boats
        
        - Ask player 2 to enter name
        - Ask player 2 to start placing boats        
        
        - Start turn loop
        - ask player 1 take turn
        - check if game over
        - ask player 2 take turn
        - check if game over

        - if game over, announce winner
    */
    
    
    
}

$(document).ready(function () { 
    var game = new Game();
    game.init();

    /*
    var player = new Player();
    var boat = new Boat(null, [1,1], HORIZONTAL, 3);
    player.board.placeBoat(boat);

    //player.takeShotAt([1,1]);
    //player.takeShotAt([3,2]);
    
    console.log(player.printBoard(true));
    
    */

})


//boat.showDamage();
//boat.takeHit([2,1]);
//boat.showDamage();


/* var board = new Board(5);
board.initGrid();



board.placeBoat(boat);
board.printGrid();
*/