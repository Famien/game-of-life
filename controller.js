// Object for manipulating the graphic board. Uses a game state object which is a 2d Array of 1s and 0s to create the board,
// where 1 is alive and 0 is dead.
//
//@param board_size int N used to determine size of the NxN board
var Controller = function (board_size) {
    // Create object we will return
    var that = Object.create(Controller.prototype);

    // the <table id='game-table'> container for the game
    var gameTable;

    // Row and width size n  where the board is nXn
    var BOARD_SIZE = board_size;

    // Functional for iterating a function over a range
    var from_to = function (from, to, f) {
        if (from > to) return;
        f(from); from_to(from+1, to, f);
    };

    /**
     * Uses the board size (NxN) to add N rows to the element with id 'game-table' in the DOM,
     * each with N td elements. The td elements are created with a click listener that turns them 'on'
     * or 'off' (alive or dead). The board is initialized with all cells 'off' or dead.
     */
    that.initializeBoard = function () {
        from_to(0, BOARD_SIZE -1, function(row_num){
            var tr = document.createElement('tr');
            tr.id = row_num;
            $(tr).on("click", "td", function (){
                if (this.className == "on") {
                    this.className = "off";
                } else {
                    this.className = "on";
                }
            });

            gameTable.appendChild(tr);

            from_to(0,BOARD_SIZE -1, function(column_num){
                var td = document.createElement('td');
                td.id = row_num + " " + column_num;
                td.className += 'off';

                tr.appendChild(td);
            })
        });
    };

    /**
     * Updates the display of the board given a new state.
     *
     * @param newBoardState an NxN Array which is used to represent the state of the board. The elements of
     *          the array must each be a 1 or a 0, indicating a live or dead cell respectively.
     */
    that.updateBoard = function (newBoardState) {
        from_to(0, BOARD_SIZE -1, function(row_num){
            from_to(0,BOARD_SIZE -1, function(column_num){
                var td = document.getElementById(row_num + " " +  column_num);

                td.className = newBoardState[row_num][column_num] == 1 ? 'on' : 'off';
            })
        });
    };

    /**
     * Returns the state of the board display, as NxN Array.
     *
     * @returns an NxN Array which is used to represent the state of the board. The elements of
     *          the array will be a 1 or a 0, indicating a live or dead cell respectively.
     */
    that.getCurrentState = function () {
        var currentState = [];

        from_to(0, BOARD_SIZE -1, function(row_num){
            var newRow = [];
            from_to(0,BOARD_SIZE -1, function(column_num){
                var td = document.getElementById(row_num + " " +  column_num);

                var cellValue = 1;
                if (td.getAttribute('class') == 'off') {
                    cellValue = 0;
                }
                newRow.push(cellValue);
            });
            currentState.push(newRow);
        });

        return currentState;
    };

    // Once the DOM is loaded binds the gameTable variable to the <table> element with id ='game-table'
    var onLoad = function() {
        gameTable = document.getElementById('game-table');
    };

    // Wait for the DOM to load
    if (document.readyState != 'loading') {
        onLoad();
    } else {
        document.addEventListener('DOMContentLoaded', onLoad)
    }
    Object.freeze(that);
    return that;
};