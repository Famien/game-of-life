// Auxiliary class for generating different starting states
//
//@param board_size int N used to determine size of the NxN board
var States = function(board_size) {
    var that = Object.create(States.prototype);

    /**
     * Takes a string of 1's and 0's and returns a 2d array of 1's and 0's representing that string
     *
     * @param pattern must be a string of length board_size X (board_size + 1) where the end of each row
     *          is denoted by a 'b'
     * @returns 2d array of size board_size X board_size of 1's and 0's
     */
    that.getStateFromString = function(pattern) {
        var gameState = [];
        for (var i = 0; i < board_size; i++) {
            var new_row = [];
            for (j = 0; j < board_size; j++){
                new_row.push(0);
            }
            gameState.push(new_row);
        }

        var row = 0;
        var column = 0;
        for (var i = 0; i < pattern.length; i++) {
            if (pattern.charAt(i) == "0") {
                gameState[row][column] = 0
            } else if (pattern.charAt(i) == "1") {
                gameState[row][column] = 1
            }

            if (pattern.charAt(i) == "b") {
                column = 0;
                row++;
            } else {
                column++;
            }
        }

        return gameState;

    };

    /**
     * Returns a board state of random live and dead cells. BoardSize must be at least 15
     *
     * @returns 2d array of size board_size X board_size of 1's and 0's
     */
    that.getRandomState = function() {
        var gameState = [];
        for (var i = 0; i < board_size; i++) {
            var new_row = [];
            for (j = 0; j < board_size; j++){
                if (Math.random() >= .8) {
                    new_row.push(1);
                } else {
                    new_row.push(0);
                }
            }
            gameState.push(new_row);
        }

        return gameState;
    };


    /**
     * Returns a board state of random live and dead cells. BoardSize must be at least 15
     *
     * @returns 2d array of size board_size X board_size of 1's and 0's representing the glider pattern
     */
    that.getSingleGliderState = function() {
        var pattern =
            "000000000000000b"+
            "000000000000000b"+
            "000000000000000b"+
            "000000000000000b"+
            "000000001000000b"+
            "000000101000000b"+
            "000000011000000b"+
            "000000000000000b"+
            "000000000000000b"+
            "000000000000000b"+
            "000000000000000b";

        return that.getStateFromString(pattern);
    };

    /**
     * Returns a board state of random live and dead cells. BoardSize must be at least 15
     *
     * @returns 2d array of size board_size X board_size of 1's and 0's representing a particular pattern
     */
    that.getCoolGliderThingState = function() {
        var pattern =
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000001000000b"+
            "000000000000000000000101000000b"+
            "000000000000000000000011001000b"+
            "000000000000000000000000101000b"+
            "000000000000000000000000011000b"+
            "000000000000000000000000000000b"+
            "000000000000000000000000000000b";

        return that.getStateFromString(pattern);
    };


    /**
     * Returns a board state of random live and dead cells. BoardSize must be at least 15
     *
     * @returns 2d array of size board_size X board_size of 1's and 0's representing a particular pattern
     */
    that.getPulsarState = function() {
        var pattern = "000000000000000b"+
                      "000000000000000b"+
                      "000011100011100b"+
                      "000000000000000b"+
                      "001000010100001b"+
                      "001000010100001b"+
                      "001000010100001b"+
                      "000011100011100b"+
                      "000000000000000b"+
                      "000011100011100b"+
                      "001000010100001b"+
                      "001000010100001b"+
                      "001000010100001b"+
                      "000000000000000b"+
                      "000011100011100b";

        return that.getStateFromString(pattern);
    };

    Object.freeze(that);
    return that;
};