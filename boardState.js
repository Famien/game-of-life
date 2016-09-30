// Data Type for representing and transition between game states
// @param initialState an NxN Array which is used to initialized the state of the board. The elements of
//          the array should each be a 1 or a 0, indicating a live or dead cell respectively.
var BoardState = function (initialState) {

    var currentState = initialState;

    // Infer height, width n, of game from
    var boardSize = initialState.length;

    var that = Object.create(BoardState.prototype);

    // Functional for iterating a function over a range
    var from_to = function (from, to, f) {
        if (from > to) return;
        f(from); from_to(from+1, to, f);
    };

    // Checks the current state to see if a particular cell is alive
    var isLiveCell = function(row_num, column_num) {
        if (currentState[row_num][column_num] == 1) return true;

        return false;
    };

    // Returns a list of neighbors of a given cell that are within the range of the board (currentState)
    var getValidNeighbors = function(row_num, column_num) {
        var neighbors = [];
        if(row_num - 1 >= 0) {
            neighbors.push([row_num -1, column_num]);

            if(column_num  -1 >= 0) neighbors.push([row_num -1, column_num -1]);

            if(column_num + 1 < boardSize) neighbors.push([row_num -1, column_num +1])
        }

        if(row_num + 1 < boardSize) {
            neighbors.push([row_num + 1, column_num]);

            if(column_num  -1 >= 0) neighbors.push([row_num+1, column_num-1]);

            if(column_num + 1 < boardSize) neighbors.push([row_num+1, column_num+1]);
        }
        if(column_num  -1 >= 0) neighbors.push([row_num, column_num-1]);

        if(column_num + 1 < boardSize) neighbors.push([row_num, column_num+1]);

        return neighbors;
    };

    // Returns the number of live neighbors of a cell in the currentState
    var countLiveNeighbors = function (row_num, column_num) {
        return getValidNeighbors(row_num, column_num).filter(function (neighbor) {
            return isLiveCell(neighbor[0], neighbor[1])
        }).length;
    };

    // Returns true if the given cell contains a 1 in the currentState, or false otherwise
    var getCellState = function (row_num, column_num, state) {
        var liveNeighbors = countLiveNeighbors(row_num, column_num);

        if (state == 1) {
            if (liveNeighbors < 2) return 0;
            if (liveNeighbors > 3) return 0;

            // 2-3 neighbors -> cell lives
            return 1;
        } else {
            if (liveNeighbors == 3) return 1;// Three neighbors -> cell comes alive

            return 0;
        }
    };

    /**
     *  Updates the currentState of the board according to 1 step of applying the rules of the Game.
     *  Returns this updated state.
     *
     * @returns a new 2d array of size initialState.length after 1 transition according to the rules.
     */
    that.transition = function() {
        var newState = [];
        from_to(0, boardSize -1, function(row_num){
            var newRow = [];
            from_to(0,boardSize -1, function(column_num){
                var cellState = getCellState(row_num, column_num, currentState[row_num][column_num]);
                newRow.push(cellState);
            });

            newState.push(newRow)
        });

        currentState = newState;

        return currentState;
    }

    /**
     * Updates the currentState of the board to be the inputed state
     *
     * @param game_state an NxN Array which is used to represent the state of the board. The elements of
     *          the array should each be a 1 or a 0, indicating a live or dead cell respectively.
     */
    that.setBoardState = function(game_state) {
        currentState = game_state;
        boardSize = currentState.length;
    };

    /**
     * Gets the currentState of the board
     *
     * @returns NxN Array which represents the state board. The elements of the array are a 1 or a 0,
     *          indicating a live or dead cell respectively.
     */
    that.getCurrentState = function() {
        return currentState;
    };

    Object.freeze(that);

    return that;
};