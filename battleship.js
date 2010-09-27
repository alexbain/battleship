HORIZONTAL = 0;
VERTICAL   = 1;

function Boat( owner, startCoord, orientation, length ) {
    
    this.owner = owner;
    this.startCoord = startCoord;
    this.orientation = orientation;
    this.length = length;
    this.boat = [];

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
        
    }
    
    /* If all pieces of a boat have been hit, return true */
    this.isSunk = function() {
        
    }
    
}

function Board(owner, size) {
    
    this.grid = new Array(size);
    
    console.log(this.grid);
    
}

var board = new Board('', 5);
var boat = new Boat(null, [1,1], HORIZONTAL, 3);
