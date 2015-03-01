// CreateJS Boilerplate for COMP397


class Button {
    //PRIVATE INSTANCE VARIABLES
    private _image: createjs.Bitmap;
    private _x: number;
    private _y: number;

    constructor(path: string, x: number, y: number) {
        this._x = x;
        this._y = y;
        this._image = new createjs.Bitmap(path);
        this._image.x = this._x;
        this._image.y = this._y;

        this._image.addEventListener("mouseover", this._buttonOver);
        this._image.addEventListener("mouseout", this._buttonOut);
    }

    // PUBLIC PROPERTIES
    public setX(x: number): void {
        this._x = x;
    }

    public getX(): number {
        return this._x;
    }

    public setY(y: number): void {
        this._y = y;
    }

    public getY(): number {
        return this._y;
    }

    public getImage(): createjs.Bitmap {
        return this._image;
    }


    // PRIVATE EVENT HANDLERS
    private _buttonOut(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 1; // 100% Alpha 

    }

    private _buttonOver(event: createjs.MouseEvent): void {
        event.currentTarget.alpha = 0.5;

    }
}




// VARIABLES ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var canvas; // Reference to the HTML 5 Canvas element
var stage: createjs.Stage; // Reference to the Stage
var tiles: createjs.Bitmap[] = [];
var reelContainers: createjs.Container[] = [];

// GAME CONSTANTS
var NUM_REELS: number = 3;


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
var game: createjs.Container; // Main Game Container Object
var background: createjs.Bitmap;
var spinButton: Button;
var betMaxButton: Button;
var betOneButton: Button;
var resetButton: Button;
var powerButton: Button;


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
    }
    else {
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
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "toffee4";
                toffee4++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "candy";
                candy++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "lolli";
                lolli++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "stick";
                stick++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "toffee";
                toffee++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "toffee1";
                toffee1++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "toffee2";
                toffee2++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "toffee3";
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
        }
        else if (lolli == 3) {
            winnings = playerBet * 20;
        }
        else if (stick == 3) {
            winnings = playerBet * 30;
        }
        else if (toffee == 3) {
            winnings = playerBet * 40;
        }
        else if (toffee1 == 3) {
            winnings = playerBet * 50;
        }
        else if (toffee2 == 3) {
            winnings = playerBet * 75;
        }
        else if (toffee3 == 3) {
            winnings = playerBet * 100;
        }
        else if (candy == 2) {
            winnings = playerBet * 2;
        }
        else if (lolli == 2) {
            winnings = playerBet * 2;
        }
        else if (stick == 2) {
            winnings = playerBet * 3;
        }
        else if (toffee == 2) {
            winnings = playerBet * 4;
        }
        else if (toffee1 == 2) {
            winnings = playerBet * 5;
        }
        else if (toffee2 == 2) {
            winnings = playerBet * 10;
        }
        else if (toffee3 == 2) {
            winnings = playerBet * 20;
        }
        else {
            winnings = playerBet * 1;
        }

        if (toffee3 == 1) {
            winnings = playerBet * 5;
        }
        winNumber++;
        //showWinMessage();
    }
    else {
        lossNumber++;
        //showLossMessage();
    }

}


// MAIN CODE  
function spinButtonClicked(event: createjs.MouseEvent) {

    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];

    
    // Iterate over the number of reels
    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index].removeAllChildren();
        tiles[index] = new createjs.Bitmap("assets/images/" + spinResult[index] + ".png");
        reelContainers[index].addChild(tiles[index]);
    }
}

function betMaxClicked(event: createjs.MouseEvent) {

    
    
}

function betOneClicked(event: createjs.MouseEvent) {



}

function powerClicked(event: createjs.MouseEvent) {



}

function resetClicked(event: createjs.MouseEvent) {



}

function createUI() {

    background = new createjs.Bitmap("assets/images/background.png");
    game.addChild(background); // Add the background to the game container

    for (var index = 0; index < NUM_REELS; index++) {
        reelContainers[index] = new createjs.Container();
        game.addChild(reelContainers[index]);
    }
    reelContainers[0].x = 59;
    reelContainers[0].y = 150;
    reelContainers[1].x = 164;
    reelContainers[1].y = 150;
    reelContainers[2].x = 269;
    reelContainers[2].y = 150;



    // Spin Button
    spinButton = new Button("assets/images/spinButton.png", 300,330);
    game.addChild(spinButton.getImage());


    // Spin Button Event Listeners
    spinButton.getImage().addEventListener("click", spinButtonClicked);

    // Bet Max Button
    betMaxButton = new Button("assets/images/betMaxButton.png", 237, 339);
    game.addChild(betMaxButton.getImage());
    betMaxButton.getImage().addEventListener("click", spinButtonClicked);


    // Bet One Button
    betOneButton = new Button("assets/images/betOneButton.png", 171, 339);
    game.addChild(betOneButton.getImage());
    betOneButton.getImage().addEventListener("click", spinButtonClicked);


    // Reset Button
    resetButton = new Button("assets/images/resetButton.png", 27, 342);
    game.addChild(resetButton.getImage());
    resetButton.getImage().addEventListener("click", spinButtonClicked);

    // Power Button
    powerButton = new Button("assets/images/powerButton.png", 108, 339);
    game.addChild(powerButton.getImage());
    powerButton.getImage().addEventListener("click", spinButtonClicked);

}


function main() {
    game = new createjs.Container(); // Instantiates the Game Container

    createUI();

    stage.addChild(game); // Adds the Game Container to the Stage


}



