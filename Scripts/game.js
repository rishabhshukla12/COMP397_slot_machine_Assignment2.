// CreateJS Boilerplate for COMP397
var Button = (function () {
    function Button(path, x, y) {
        this._x = x;
        this._y = y;
        this._image = new createjs.Bitmap(path);
        this._image.x = this._x;
        this._image.y = this._y;

        this._image.addEventListener("mouseover", this._buttonOver);
        this._image.addEventListener("mouseout", this._buttonOut);
    }
    // PUBLIC PROPERTIES
    Button.prototype.setX = function (x) {
        this._x = x;
    };

    Button.prototype.getX = function () {
        return this._x;
    };

    Button.prototype.setY = function (y) {
        this._y = y;
    };

    Button.prototype.getY = function () {
        return this._y;
    };

    Button.prototype.getImage = function () {
        return this._image;
    };

    // PRIVATE EVENT HANDLERS
    Button.prototype._buttonOut = function (event) {
        event.currentTarget.alpha = 1; // 100% Alpha
    };

    Button.prototype._buttonOver = function (event) {
        event.currentTarget.alpha = 0.5;
    };
    return Button;
})();

// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas;
var stage;
var tiles = [];
var reelContainers = [];

// GAME CONSTANTS
var NUM_REELS = 3;

// GAME VARIABLES
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;

/* Tally Variables */
var candy = 0;
var lolli = 0;
var stick = 0;
var toffee = 0;
var toffee1 = 0;
var toffee2 = 0;
var toffee3 = 0;
var toffee4 = 0;

// GAME OBJECTS
var game;
var background;
var spinButton;
var betMaxButton;
var betOneButton;
var resetButton;
var powerButton;

// FUNCTIONS ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas); // Parent Object
    stage.enableMouseOver(20); // Turn on Mouse Over events

    createjs.Ticker.setFPS(60); // Set the frame rate to 60 fps
    createjs.Ticker.addEventListener("tick", gameLoop);

    main();
}

// GAMELOOP
function gameLoop() {
    stage.update();
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    candy = 0;
    lolli = 0;
    stick = 0;
    toffee = 0;
    toffee1 = 0;
    toffee2 = 0;
    toffee3 = 0;
    toffee4 = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds) {
        return value;
    } else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):
                betLine[spin] = "ball1";
                toffee4++;
                break;
            case checkRange(outCome[spin], 28, 37):
                betLine[spin] = "ball2";
                candy++;
                break;
            case checkRange(outCome[spin], 38, 46):
                betLine[spin] = "ball3";
                lolli++;
                break;
            case checkRange(outCome[spin], 47, 54):
                betLine[spin] = "ball1";
                stick++;
                break;
            case checkRange(outCome[spin], 55, 59):
                betLine[spin] = "ball5";
                toffee++;
                break;
            case checkRange(outCome[spin], 60, 62):
                betLine[spin] = "ball6";
                toffee1++;
                break;
            case checkRange(outCome[spin], 63, 64):
                betLine[spin] = "ball7";
                toffee2++;
                break;
            case checkRange(outCome[spin], 65, 65):
                betLine[spin] = "ball8";
                toffee3++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings() {
    if (toffee4 == 0) {
        if (candy == 3) {
            winnings = playerBet * 10;
        } else if (lolli == 3) {
            winnings = playerBet * 20;
        } else if (stick == 3) {
            winnings = playerBet * 30;
        } else if (toffee == 3) {
            winnings = playerBet * 40;
        } else if (toffee1 == 3) {
            winnings = playerBet * 50;
        } else if (toffee2 == 3) {
            winnings = playerBet * 75;
        } else if (toffee3 == 3) {
            winnings = playerBet * 100;
        } else if (candy == 2) {
            winnings = playerBet * 2;
        } else if (lolli == 2) {
            winnings = playerBet * 2;
        } else if (stick == 2) {
            winnings = playerBet * 3;
        } else if (toffee == 2) {
            winnings = playerBet * 4;
        } else if (toffee1 == 2) {
            winnings = playerBet * 5;
        } else if (toffee2 == 2) {
            winnings = playerBet * 10;
        } else if (toffee3 == 2) {
            winnings = playerBet * 20;
        } else {
            winnings = playerBet * 1;
        }

        if (toffee3 == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        //showWinMessage();
    } else {
        lossNumber++;
        //showLossMessage();
    }
}

// MAIN CODE
function spinButtonClicked(event) {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".jpg");
        reelContainers[index].addChild(tiles[index]);
    }
}

function betMaxClicked(event) {
}

function betOneClicked(event) {
}

function powerClicked(event) {
}

function resetClicked(event) {
}

function createUI() {
    background = new createjs.Bitmap("assets/images/background.jpg");
    game.addChild(background); // Add the background to the game container

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 45;
    reelContainers[0].y = 95;
    reelContainers[1].x = 164;
    reelContainers[1].y = 95;
    reelContainers[2].x = 275;
    reelContainers[2].y = 95;

    // Spin Button
    spinButton = new Button("assets/images/spinButton.png", 302, 318);
    game.addChild(spinButton.getImage());

    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/betMaxButton.png", 239, 325);
    game.addChild(betMaxButton.getImage());
    betMaxButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet One Button
    betOneButton = new Button("assets/images/betOneButton.png", 174, 329);
    game.addChild(betOneButton.getImage());
    betOneButton.getImage().addEventListener("click", spinButtonClicked);

    // Reset Button
    resetButton = new Button("assets/images/resetButton.png", 23, 327);
    game.addChild(resetButton.getImage());
    resetButton.getImage().addEventListener("click", spinButtonClicked);

    // Power Button
    powerButton = new Button("assets/images/powerButton.jpg", 100, 325);
    game.addChild(powerButton.getImage());
    powerButton.getImage().addEventListener("click", spinButtonClicked);
}

function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage
}
//# sourceMappingURL=game.js.map
