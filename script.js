/*
Gameplay: 2 player, users roll dice to get 2 numbers, select order of number to make it the biggest combination, compare player 1 choice with player 2 choice, biggest number wins

- A Math function to generate numbers
- An array to store player's choice
- An array to compare player 1 and 2 choice

*/

let playerOneDice = [];
let playerOneChoice;
let currentGameState = "Game State Dice Roll";

let rollDice = function () {
    // Generate a decimal from 0 through 3, inclusive of 0 and exclusive of 3.
    let randomDecimal = Math.random() * 6;
    let randomInteger = Math.floor(randomDecimal);
    let singleDigit = randomInteger + 1;
    return singleDigit;
};

let rollDicePlayerOne = function () {
    let counter = 0;
    while (counter < 2) {
        playerOneDice.push(rollDice());
        counter = counter + 1;
        console.log(`Displaying player one choices`, playerOneDice);
    }
    return `Your numbers are ${playerOneDice[0]} and ${playerOneDice[1]}. Please type '1' or '2' to select the respective number as the first digit.`;
};

let main = function (input) {
    if (currentGameState == "Game State Dice Roll") {
        outputMessage = rollDicePlayerOne();
        currentGameState = "Choose Order";
        return outputMessage;
    }

    if (currentGameState == "Choose Order") {
        input = Number(input);
        if (input !== 1 && input !== 2) {
            return `Please only type '1' or '2'.Your numbers are ${playerOneDice[0]} and ${playerOneDice[1]}.`;
        } else if (input == 1) {
            console.log(`ChoosingChoiceOne`);
            let playerOneChoice = Number(String(playerOneDice[0]) + String(playerOneDice[1]));
            return `Your number is ${playerOneChoice}.`;
        } else {
            let playerOneChoice = Number(String(playerOneDice[1]) + String(playerOneDice[0]));
            return `Your number is ${playerOneChoice}.`;
        }
    }
};
