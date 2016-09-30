(function() {
    document.addEventListener('DOMContentLoaded', function (){
        // N length and width of NxN board to initialize
        var BOARD_SIZE = 60;

        var controller = Controller(BOARD_SIZE);
        var states = States(BOARD_SIZE);

        // Pick Glider as starting state
        var startingState = states.getSingleGliderState();
        var boardStateInstance = BoardState(startingState);

        controller.initializeBoard(BOARD_SIZE);
        controller.updateBoard(startingState);


        // Update paused state to false
        var startGame = function() {
            paused = false;
        };

        // Update paused state to true
        var pauseGame = function() {
            paused = true;
        };

        // Advance the board one transition iteration
        var stepGame = function() {
            controller.updateBoard(boardStateInstance.transition());
        };

        var updateStateFromManual = function() {
            if($('#manual').is(":checked")) {
                var newState = controller.getCurrentState();

                boardStateInstance.setBoardState(newState);
                controller.updateBoard(newState);
            }
        };

        // These functions update the board to the given configuration
        var setStateSingleGlider = function() {
            var newState = states.getSingleGliderState();
            boardStateInstance.setBoardState(newState);
            controller.updateBoard(newState);
        };

        var setStateCoolGliderThing = function() {
            var newState = states.getCoolGliderThingState   ();
            boardStateInstance.setBoardState(newState);
            controller.updateBoard(newState);
        };

        var setStateRandom = function() {
            var newState = states.getRandomState();
            boardStateInstance.setBoardState(newState);
            controller.updateBoard(newState);
        };

        var setStateManual = function() {
            var newState = controller.getCurrentState();
            boardStateInstance.setBoardState(newState);
            controller.updateBoard(newState);
        };

        var setStatePulsar = function() {
            var newState = states.getPulsarState();
            boardStateInstance.setBoardState(newState);
            controller.updateBoard(newState);
        };

        // Attach configurations to button controls
        function setUpBoardAndControls() {
            var table = document.getElementById('game-table');
            table.addEventListener('click', updateStateFromManual, false);

            var startButton = document.getElementById('start-button');
            startButton.addEventListener('click', startGame, false);

            var pauseButton = document.getElementById('pause-button');
            pauseButton.addEventListener('click', pauseGame, false);

            var stepButton = document.getElementById('step-button');
            stepButton.addEventListener('click', stepGame, false);

            var gliderButton = document.getElementById('single-glider');
            gliderButton.addEventListener('click', setStateSingleGlider, false);

            var coolGliderThingButton = document.getElementById('cool-glider-thing');
            coolGliderThingButton.addEventListener('click', setStateCoolGliderThing, false);

            var pulsarButton = document.getElementById('pulsar');
            pulsarButton.addEventListener('click', setStatePulsar, false);

            var manualButton = document.getElementById('manual');
            manualButton.addEventListener('click', setStateManual, false);

            var randomButton = document.getElementById('random');
            randomButton.addEventListener('click', setStateRandom, false);
        }


        // Keep track of when the game is paused
        var paused = true;

        // Advance the game one transition
        var step = function step() {
            if (!paused) {
                controller.updateBoard(boardStateInstance.transition());
            }
                window.requestAnimationFrame(step)
        };

        // Set up game and start animation on button press
        setUpBoardAndControls();
        window.requestAnimationFrame(step);

    })
})();