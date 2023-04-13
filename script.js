/*
Gameplay: 2 player, users roll dice to get 2 numbers, select order of number to make it the biggest combination, compare player 1 choice with player 2 choice, biggest number wins

- A Math function to generate numbers
- An array to store player's choice
- An array to compare player 1 and 2 choice

*/

let playerDice = [];
let playerChoice;
let currentPlayer = 1;
let allPlayersChoices = [];
let currentGameState = "Game State Dice Roll";

//Generate numbers for players
let rollDice = function () {
    let randomDecimal = Math.random() * 6;
    let randomInteger = Math.floor(randomDecimal);
    let singleDigit = randomInteger + 1;
    return singleDigit;
};

//Play a turn for player
let rollDicePlayer = function () {
    let counter = 0;
    while (counter < 2) {
        playerDice.push(rollDice());
        counter = counter + 1;
    }
    return `Player ${currentPlayer}'s turn. <br> Your numbers are ${playerDice[0]} and ${playerDice[1]}. Please type '1' or '2' to select the respective number as the first digit.`;
};

let chooseDiceChoice = function (input) {
    // Choose order of numbers
    input = Number(input);
    if (input !== 1 && input !== 2) {
        return `Please only type '1' or '2'.Your numbers are ${playerDice[0]} and ${playerDice[1]}.`;
    } else if (input == 1) {
        playerChoice = Number(String(playerDice[0]) + String(playerDice[1]));
    } else {
        playerChoice = Number(String(playerDice[1]) + String(playerDice[0]));
    }
    //Store player's selection in array to compare later on
    allPlayersChoices.push(playerChoice);

    //clear current player's selection in the array
    playerDice = [];
    return `Player ${currentPlayer} chose ${playerChoice}.`;
};

let main = function (input) {
    if (currentGameState == "Game State Dice Roll") {
        outputMessage = rollDicePlayer();
        currentGameState = "Choose Order";
        return outputMessage;
    }
    if (currentGameState == "Choose Order") {
        outputMessage = chooseDiceChoice(input);

        if (currentPlayer == 1) {
            currentPlayer = 2;
            currentGameState = "Game State Dice Roll";
            return outputMessage + ` Click submit to start Player 2's turn.`;
        }
        if (currentPlayer == 2) {
            currentGameState = "Compare Dice Roll";
            return outputMessage + ` Let's submit and compare the scores.`;
        }
    }
    if (currentGameState == "Compare Dice Roll") {
        currentGameState = "Game State Dice Roll";
        currentPlayer = 1;
        if (allPlayersChoices[0] > allPlayersChoices[1]) {
            outputMessage = `Player 1's choice is ${allPlayersChoices[0]}.<br> Player 2's choice is ${allPlayersChoices[1]}. <br> Player 1 wins! <br> Click Submit to start a new round.`;
        }
        if (allPlayersChoices[0] < allPlayersChoices[1]) {
            outputMessage = `Player 1's choice is ${allPlayersChoices[0]}.<br> Player 2's choice is ${allPlayersChoices[1]}. <br>Player 2 wins! <br> Click Submit to start a new round.`;
        }
        allPlayersChoices = [];
        return outputMessage;
    }
};
