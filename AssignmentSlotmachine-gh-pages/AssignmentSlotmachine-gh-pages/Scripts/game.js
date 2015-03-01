
//<!---------------------   Name Of the Game : Slot Machine ---------------------------------------------------------->
//<!---------------------      Source File Name : game.js  -   ------------------------------------------------------>
//<!--------------------     Author's Name : Rishabh Shukla     -------------------------------------------------------->
//<!--------------------     Last Modified By : Rishabh Shukla  -------------------------------------------------------->
//<!--------------------  Date Last Modified : 2015/02/27 10:38PM ------------------------------- ---------------------->
//<!------------  Program Description : game.js file  ------------------------------------------------>
//<!------------   Author's Github Profile :http://rishabhshukla12.github.io/COMP397_slot_machine_Assignment2/  ------------>
//<!------------------------------------------------------------------------------------->

var canvas; // Reference to the HTML 5 Canvas element
var stage; // Reference to the Stage
//GUI
var game;
var background;
var spinButton;
var betOne;

var betMax;
var power;
var reset;
var lose;
var jackpotImg;
var isJackpot = false;
var tiles = [];
var turn = 0;
//reel array
var reels = ["ball1", "ball2", "ball3", "ball4", "ball5", "ball6", "ball7", "ball8"];
//stats
var spins = 0;
var win = 0;
var loss = 0;
var jackpotWins = 0;
var playerBet = 1;
var winnings = 0;
var credits = 1000;
var jackpot = 10000;
//texts
var betText;

var creditText;
var jackpotText;
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
    if (credits - playerBet <= 0) {
        spinButton.removeEventListener("click", SpinButton);
    }
    if (credits - playerBet >= 0) {
        spinButton.addEventListener("click", SpinButton);
    }
    if (credits == 0) {
        lose.visible = true;
    }
    if (credits >= 1) {
        lose.visible = false;
    }
    //JACKPOT MSG+++++++++++++++++++++++++++++++++
    if (isJackpot == true) {
        jackpotImg.visible = true;
    }
    if (isJackpot == false) {
        jackpotImg.visible = false;
    }
    //JACKPOT MSG+++++++++++++++++++++++++++++++++
    jackpotText.text = jackpot.toString();
 
    creditText.text = credits.toString();
    betText.text = playerBet.toString();
    stage.update();
}
function createUI() {
    //slot machine gui
    background = new createjs.Bitmap("assets/images/background.jpg");
    game.addChild(background);
    //spin button
    spinButton = new createjs.Bitmap("assets/images/SpinButton.png");
    spinButton.x = 302;
    spinButton.y = 318;
    game.addChild(spinButton);
  

    //bet one button gui
    betOne = new createjs.Bitmap("assets/images/BetOneButton.png");
    betOne.x = 174;
    betOne.y = 329;
    game.addChild(betOne);
    //bet max button gui
    betMax = new createjs.Bitmap("assets/images/BetMaxButton.png");
    betMax.x = 239;
    betMax.y = 325;
    game.addChild(betMax);
    //reset button
    reset = new createjs.Bitmap("assets/images/ResetButton.png");
    reset.x = 23;
    reset.y = 327;
    game.addChild(reset);
    //power button
    power = new createjs.Bitmap("assets/images/PowerButton.jpg");
    power.x = 100;
    power.y = 325;
    game.addChild(power);
    //bet counter text--left
    betText = new createjs.Text(playerBet.toString(), "Arial", "#ff0000");
    betText.x = 195;
    betText.y = 255;
    game.addChild(betText);
 

    //credits text--right
    creditText = new createjs.Text(credits.toString(), "Arial", "#ff0000");
    creditText.x = 77;
    creditText.y = 250;
    game.addChild(creditText);
    //Jackpot Text
    jackpotText = new createjs.Text(jackpot.toString(), "Arial", "#ff0000");
    jackpotText.x = 300;
    jackpotText.y = 255;
    jackpotText.scaleX = 1.5;
    jackpotText.scaleY = 1.5;
    game.addChild(jackpotText);
    //lose text
    lose = new createjs.Bitmap("assets/images/youlose.jpg");
    game.addChild(lose);
    lose.visible = false;
    //jackpot img
    jackpotImg = new createjs.Bitmap("assets/images/jackpot.jpg");
    game.addChild(jackpotImg);
    jackpotImg.visible = false;
    //button listeners
    betMax.addEventListener("click", BetMaxButton);
    betOne.addEventListener("click", BetOneButton);
   
    power.addEventListener("click", PowerButton);
    // spinButton.addEventListener("click", SpinButton);
    reset.addEventListener("click", ResetButton);
}
function ResetButton() {
    spins = 0;
    win = 0;
    loss = 0;
    jackpotWins = 0;
    jackpot = 10000;
    playerBet = 1;
    winnings = 0;
    credits = 1000;
    spinButton.addEventListener("click", SpinButton);
  
    betText.text = playerBet.toString();
    creditText.text = credits.toString();
}
function PowerButton() {
   
    createUI();
}
function BetOneButton() {
    playerBet = 1;
    console.log("Bet Changed to: " + playerBet);
}


function BetMaxButton() {
    playerBet = 50;
    console.log("Bet Changed to: " + playerBet);
}
function SpinButton() {
    //Getting Random Elements from each slot
    var outCome = Math.floor((Math.random() * 65) + 1);
    var results = [0, 0, 0];
    credits -= playerBet;
    jackpot += playerBet;
    isJackpot = false;
    //cant go below 0
    if (credits <= 0)
        credits = 0;
    for (var spin = 0; spin < 3; spin++) {
        var outCome = Math.floor((Math.random() * 65) + 1);
        if (outCome >= 1 && outCome <= 27)
            results[spin] = 7; 
        if (outCome >= 28 && outCome <= 37)
            results[spin] = 0; 
        if (outCome >= 38 && outCome <= 46)
            results[spin] = 1; 
        if (outCome >= 47 && outCome <= 54)
            results[spin] = 2; 
        if (outCome >= 55 && outCome <= 59)
            results[spin] = 3; 
        if (outCome >= 60 && outCome <= 62)
            results[spin] = 4; 
        if (outCome >= 63 && outCome <= 64)
            results[spin] = 5; 
        if (outCome == 65)
            results[spin] = 6; 
    }
    for (var tile = 0; tile < 3; tile++) {
        if (turn > 0) {
            game.removeChild(tiles[tile]);
            turn++;
        }
        tiles[tile] = new createjs.Bitmap("assets/images/" + reels[results[tile]] + ".jpg");
        
        game.addChild(tiles[tile]);
    }

    tiles[0].x = 45;
    tiles[0].y = 95;
    tiles[1].x = 164;
    tiles[1].y = 95;
    tiles[2].x = 275;
    tiles[2].y = 95;
    //printing results to console.
    console.log("Reel One: " + reels[results[0]]);
    console.log("Reel Two: " + reels[results[1]]);
    console.log("Reel Three: " + reels[results[2]]);
    payoutCheck(reels[results[0]], reels[results[1]], reels[results[2]]);
}
//checks payout and displays stats
function payoutCheck(spotOne, spotTwo, spotThree) {
    var allSlots = [spotOne, spotTwo, spotThree];
    var sonic = 0;
    var tails = 0;
    var yellowGuy = 0;
    var robotnic = 0;
    var bars = 0;
    var knuckles = 0;
    var rings = 0;
    var blanks = 0;
    for (var i = 0; i < reels.length; i++) {
        for (var r = 0; r < allSlots.length; r++) {
            switch (reels[i]) {
                case reels[0]:
                    if (reels[0] == allSlots[r]) {
                        sonic++;
                    }
                    break;
                case reels[1]:
                    if (reels[1] == allSlots[r]) {
                        tails++;
                    }
                    break;
                case reels[2]:
                    if (reels[2] == allSlots[r]) {
                        yellowGuy++;
                    }
                    break;
                case reels[3]:
                    if (reels[3] == allSlots[r]) {
                        robotnic++;
                    }
                    break;
                case reels[4]:
                    if (reels[4] == allSlots[r]) {
                        bars++;
                    }
                    break;
                case reels[5]:
                    if (reels[5] == allSlots[r]) {
                        knuckles++;
                    }
                    break;
                case reels[6]:
                    if (reels[6] == allSlots[r]) {
                        rings++;
                    }
                    break;
                case reels[7]:
                    if (reels[7] == allSlots[r]) {
                        blanks++;
                    }
                    break;
            }
        }
    }
    console.log("");
    //winnings calculations
    if (blanks == 0) {
        if (sonic == 3) {
            winnings = playerBet * 10;
            credits += winnings;
          
        }
        else if (tails == 3) {
            winnings = playerBet * 20;
            credits += winnings;
          
        }
        else if (yellowGuy == 3) {
            winnings = playerBet * 30;
            credits += winnings;
            
        }
        else if (robotnic == 3) {
            winnings = playerBet * 40;
            credits += winnings;
       
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
            credits += winnings;
          
        }
        else if (knuckles == 3) {
            winnings = playerBet * 75;
            credits += winnings;
            
        }
        else if (rings == 3) {
            winnings = playerBet * 100;
            credits += winnings;
            jackpotWins++;
            isJackpot = true;
            
        }
        else if (sonic == 2) {
            winnings = playerBet * 2;
            credits += winnings;
           
        }
        else if (tails == 2) {
            winnings = playerBet * 2;
            credits += winnings;
            
        }
        else if (yellowGuy == 2) {
            winnings = playerBet * 3;
            credits += winnings;
            console.log("Win on yellowguy: " + winnings);
        }
        else if (robotnic == 2) {
            winnings = playerBet * 4;
            credits += winnings;
           
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
            credits += winnings;
           
        }
        else if (knuckles == 2) {
            winnings = playerBet * 10;
            credits += winnings;
            
        }
        else if (rings == 2) {
            winnings = playerBet * 20;
            credits += winnings;
            
        }
        else {
            winnings = playerBet * 1;
            credits += winnings;
        }
        win++;
    }
    else {
        loss++;
        console.log("Spin Again");
        winnings = 0;
    }
    //console stats
    console.log("");
    spins++;
    console.log("Number is spins " + spins);
    console.log("Number is wins " + win);
    console.log("Number is losses " + loss);
    console.log("Number of Jackpots " + jackpotWins);
    console.log("Current Jackpot: " + jackpot);
    console.log("jackPot Percentage " + Math.floor(jackpotWins / spins * 100) + " %");
    console.log("Win percentage : " + Math.floor(win / spins * 100) + " %");
    console.log("");
}
function main() {
    // instantiate my game container
    game = new createjs.Container();
    // Create Slotmachine User Interface
    createUI();
    stage.addChild(game);
}
