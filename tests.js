(function() {
    mocha.setup("bdd");
    var assert = chai.assert;

    var from_to = function (from, to, f) {
        if (from > to) return;
        f(from);
        from_to(from + 1, to, f);
    };

    // Various 3x3 patterns for testing
    var pattern1 =
        "000b"+
        "000b"+
        "000b";

    var pattern2 =
        "000b"+
        "010b"+
        "000b";

    var pattern3 =
        "010b"+
        "110b"+
        "000b";

    var pattern3transition =
        "110b"+
        "110b"+
        "000b";

    var pattern4 =
        "010b"+
        "010b"+
        "010b";

    var pattern4transition =
        "000b"+
        "111b"+
        "000b";

    describe("boardState", function() {
        describe("transition", function() {
            var boardSize = 3;
            var states = States(boardSize);
            var state1 = states.getStateFromString(pattern1);
            var boardState = BoardState(state1);

            it("should go from empty board to empty board", function() {
                var transition1 = boardState.transition();
                assert(_.isEqual(transition1, state1));
            });

            it("should go from single live cell to empty board", function() {
                var state2 = states.getStateFromString(pattern2);
                boardState.setBoardState(state2);
                var transition2 = boardState.transition();
                assert(_.isEqual(transition2, state1));

                var transition3 = boardState.transition();
                assert(_.isEqual(transition3, state1));
            });

            it("go from 'l' state to 'square' state and stay there", function() {
                var state3 = states.getStateFromString(pattern3);
                var state3transition = states.getStateFromString(pattern3transition);
                boardState.setBoardState(state3);
                var transition4 = boardState.transition();
                assert(_.isEqual(transition4, state3transition));

                var transition5 = boardState.transition();
                assert(_.isEqual(transition5, state3transition));
            });

            it("should oscillate between horizontal and vertical 'three bar'", function() {
                // Board should correctly exhibit oscillatory pattern when appropriate
                var state4 = states.getStateFromString(pattern4);
                var state4transition = states.getStateFromString(pattern4transition);
                boardState.setBoardState(state4);
                var transition6  = boardState.transition();
                assert(_.isEqual(transition6, state4transition));

                var transition7 = boardState.transition();
                assert(_.isEqual(transition7, state4));
            });
        });

        describe("getCurrentState", function() {
            it("should return correct state", function() {
                var boardSize = 9;
                var states = States(boardSize);

                var state1 = states.getStateFromString(pattern1);
                var boardState = BoardState(state1);

                assert(_.isEqual(boardState.getCurrentState(), state1));

                var state2 = states.getStateFromString(pattern2);
                boardState.setBoardState(state2);

                assert(_.isEqual(boardState.getCurrentState(), state2));
            });
        });

        describe("setState", function() {
           it("should correctly set the board state", function() {
               var boardSize = 9;
               var states = States(boardSize);

               // Set board state using various patterns.
               var state1 = states.getStateFromString(pattern2);
               var boardState = BoardState(state1);

               assert(_.isEqual(boardState.getCurrentState(), state1));

               var state2 = states.getStateFromString(pattern4);
               boardState.setBoardState(state2);

               assert(_.isEqual(boardState.getCurrentState(), state2));

               var state3 = states.getStateFromString(pattern1);
               boardState.setBoardState(state3);

               assert(_.isEqual(boardState.getCurrentState(), state3));
           })
        });
    });

    describe("controller", function() {
        var boardSize = 3;
        var controller = Controller(boardSize);
        var states = States(boardSize);
        var state1 = states.getStateFromString(pattern1);
        var boardState = BoardState(state1);

        describe("initializeBoard", function() {
            it("correctly intialize board on DOM", function() {
                controller.initializeBoard();

                var gameTable = $('#game-table');

                assert.equal(gameTable.children().length == boardSize, true);
            });
        });

        describe("updateBoard", function() {
            it("should correctly update to new state", function() {
                // Make sure board is in initial state
                assert.equal(_.isEqual(controller.getCurrentState(), state1), true);

                var state2 = states.getStateFromString(pattern2);
                controller.updateBoard(state2);
                assert.equal(_.isEqual(controller.getCurrentState(), state2), true);

                var state3 = states.getStateFromString(pattern3);
                controller.updateBoard(state3);
                assert.equal(_.isEqual(controller.getCurrentState(), state3), true);
            })
        });

        describe("getCurrentState", function() {
            it("should correctly return current state", function() {
                controller.updateBoard(state1);
                assert.equal(_.isEqual(controller.getCurrentState(), state1), true);

                var state2 = states.getStateFromString(pattern3);
                controller.updateBoard(state2);
                assert.equal(_.isEqual(controller.getCurrentState(), state2), true);

                var state3 = states.getStateFromString(pattern4);
                controller.updateBoard(state3);
                assert.equal(_.isEqual(controller.getCurrentState(), state3), true);
            })
        });

        describe("states", function() {
            var boardSize = 50;
            var states = States(boardSize);
            describe("getStateFromString", function() {
                it("should return array that represents input string", function() {
                    var boardSize2 = 3;
                    var states2 = States(boardSize2);

                    assert.equal(_.isEqual(states2.getStateFromString(pattern1),
                        [[0,0,0],
                         [0,0,0],
                         [0,0,0]]), true);
                });
            });

            describe("getRandomState", function() {
                it("should return array of appropriate length", function() {
                    assert.equal(states.getRandomState().length, boardSize);
                });
            });

            describe("getSingleGliderState", function() {
                it("should return array of appropriate length", function() {
                    assert.equal(states.getSingleGliderState().length, boardSize);
                });
            });

            describe("getCoolGliderThingState", function() {
                it("should return array of appropriate length", function() {
                    assert.equal(states.getCoolGliderThingState().length, boardSize);
                });
            });

            describe("getPulsarState", function() {
                it("should return array of appropriate length", function() {
                    assert.equal(states.getPulsarState().length, boardSize);
                });
            });
        });
    });

    mocha.run();
})();
