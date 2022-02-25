var myOutputValue = "";
var diceRoll = function (maxNum) {
  var randNum = Math.random();
  return Math.ceil(randNum * maxNum);
};
var playerRegister = []; // player0, player1, etc. store
var playerSwapChance = []; // empty for now, will fill in 2 chances for every player (initially 3)
var playerScoreDatabase = []; //index0 = Array of Player One's scores, for each round. This is an array storing each player's arrays, which stores each player's final score from each round (e.g. 4321)
var currentPlayerCurrentRoundScore = [0, 0, 0, 0, 0];
var playerEndGameScore = []; // final value.

var generatePlayerRegisterMsg = function (numPlayers) {
  //generates number of players, creates an array to store the number of times remaining that they can do the swap, and creates the playerScoreDatabase by storing empty arrays.
  for (i = 0; i < numPlayers; i += 1) {
    playerRegister[i] = ` Player${i + 1}`;
    playerSwapChance[i] = 2; ///initially this was 3 swap chances for 10 rounds, but i decided 10 rounds was wayyyy toooo lonnngggg for the game. so 2 swap chances for a 5 round game.
    playerScoreDatabase[i].push(1); //currentPlayerCurrentRoundScore is a blank array. this assigns each index value in the array, as an array (hopefully).
  }
  return `We now have ${numPlayers} players, and we know nothing about${playerRegister}.</br> 
  Please tell me their real names, starting with Player 1.`;
};

var gameRound = 0; //starts with Zero, will increment to 1 when names are provided. max game round is 5
var currentPlayer = 0; // game state, where 0 is player 1, 1 is player 2, etc. this influences what array value we will store.

var numPlayers = 0; //start with zero players, to trigger "Enter number of players sequence" to store numPlayers value.
var nameEntryCounter = 0; //iterate name entry until Name Entry Counter = numPlayers
var playerName = []; // store indicated name in array
var numDicesInGame = 0; //by default, number of rolled dices is 0 - upon which game cannot start. Forces player to indicate the number if dices we are playing with.

var currentPlayerRolls = []; //temp table to store current set of dice values for current player
var playerDiceRollsDatabase = []; //player will generate number dicerolls, which will be stored in individual arrays for each player. This array will store all the arrays. this will reset for each round.

var rollCurrentPlayerDiceMsg = function (numDicesInGame, currentPlayer) {
  //the person's player number is their index in the playerRegister.
  //currentPlayer for Player1 is 0, currentPlayer for Player2 is 1, and so on.
  //This generates a dice value array called currentPlayerRolls (local variable), and assigns its array value as the return value for the player number in the DiceRolls database. Don't know if this works, will have to test.
  currentPlayerRolls = [];
  var message = `We are going to roll ${numDicesInGame} dice, and we got..`;
  for (j = 0; j < numDicesInGame; j += 1) {
    currentPlayerRolls[j] = diceRoll(6);
    message += `</br> Dice ${j + 1}: You rolled a ${currentPlayerRolls[j]}!`;
  }
  playerDiceRollsDatabase[currentPlayer] = currentPlayerRolls;
  message += `</br></br> Those are some nice rolls: ${playerDiceRollsDatabase[currentPlayer]}. `;
  return message;
};

var ableToSwapMsg = function (playerSwapChance) {
  var message = `Would you like the swap the order of any dice to the front?</br>`;
  if (numDicesInGame > 2) {
    message += `You have ${playerSwapChance[currentPlayer]} chance left to swap! Type the dice number to swap (2-${numDicesInGame}) OR type 'no' to continue.`;
  } else {
    message += `You have ${playerSwapChance[currentPlayer]} chance left to swap! Type '2' to swap the dices OR type 'no' to continue.`;
  }
  return message;
};

var swapDicePositionMsg = function (declaredDice) {
  //swaps desired dice roll
  var dicePosition = Number(declaredDice) - 1; //Dice 1 will be Index0 in the array, and so forth.
  var reInsert = currentPlayerRolls[dicePosition]; // save the value of the dice we are about to splice out
  console.log("reInsert", reInsert);
  const oldPlayerScore = currentPlayerRolls.join("");
  console.log("oldPlayerRolls", oldPlayerScore);
  var removedValue = currentPlayerRolls.splice(dicePosition, 1); //splice out the desired dice
  console.log(currentPlayerRolls, "spliced out");
  var rearrangedValue = currentPlayerRolls.splice(0, 0, reInsert); //splice in the desired dice
  console.log(currentPlayerRolls, "spliced in");
  const newPlayerScore = currentPlayerRolls.join("");
  swapState = 0;
  playerSwapChance[currentPlayer] -= 1;
  console.log(
    "oldPlayerScore",
    oldPlayerScore,
    "newPlayerScore",
    newPlayerScore
  );
  return `Congratulations, you have swapped your dice order from ${oldPlayerScore} to ${newPlayerScore}. Hopefully that helps you get the highest total game score!</br>`;
};
var swapState = 0; //game state when swap state =1, prevents the game from proceeding, unless they enter a valid swap input.

var updateCurrentRoundScoreMsg = function () {
  console.log("currentPlayer", currentPlayer, playerName[currentPlayer]);
  console.log("whole database", playerScoreDatabase);
  // var tempPlayerScores = playerScoreDatabase[currentPlayer]; //local variable, to retrieve array value for player's scores for each round
  // console.log("tempPlayerScores", tempPlayerScores);
  var tempRoundScore = currentPlayerRolls.join(""); //local variable to calculate the combined value of current dice rolls.
  var currentPlayerScores = playerScoreDatabase[currentPlayer];
  console.log(
    "current player all rounds score",
    currentPlayerScores[gameRound - 1]
  );
  currentPlayerScores[gameRound - 1].push(Number(tempRoundScore)); //stores current round score in the array
  // playerScoreDatabase[currentPlayer] = tempPlayerScores; //refresh data base with player's scores for all rounds.
  console.log(
    "tempPlayerScores[gameRound]",
    playerScoreDatabase[currentPlayer][gameRound - 1],
    "playerScoreDatabase[currentPlayer]",
    playerScoreDatabase[currentPlayer]
  );
  currentPlayerRolls = []; //empties out all the dice values as we have saved it.
  return `Your score this round is ${
    playerScoreDatabase[currentPlayer][gameRound - 1]
  }, and your scores so far are ${playerScoreDatabase[currentPlayer]}.</br>`;
};

var nextPlayerMsg = function () {
  //if this is not the last player in the round
  currentPlayer += 1;
  console.log("currentPlayer", currentPlayer);
  return `</br>Alright, ${playerName[currentPlayer - 1]}'s turn is over. It's ${
    playerName[currentPlayer]
  }'s turn now. </br> 
  Time to roll the dice! Just click the button.`;
};

var readyPlayer1Msg = function () {
  //if this is the last player in this round, which is not the final round.
  gameRound += 1;
  currentPlayer = 0;
  return `</br>Alright, ${
    playerName[numPlayers - 1]
  }'s turn is over. It's time to start Round ${gameRound}! <br>
          ${
            playerName[currentPlayer]
          }, it's your turn again. Click to roll your dice.`;
};

var endGameMsg = function () {
  //if this is the last player in the final round.. time to calculate winner and deliver winning message.
  for (m = 0; m < numPlayers; m += 1) {
    var currentPlayerAllRoundsScore = playerScoreDatabase[m]; //this retrieves each player's array of game round scores, which is hopefully [1234, 2341, 6123, 3216 ...]
    console.log(
      "array of players score for each round (initially)",
      currentPlayerAllRoundsScore,
      "iteration",
      m
    );
    var currentPlayerRunningTally = 0; //starts/resets current player's endGame score calculations at 0
    for (n = 0; n < 5; n += 1) {
      currentPlayerRunningTally += currentPlayerAllRoundsScore[n]; //adds each round's 4 digit score to a running tally
      console.log(
        "current round",
        n,
        "running tally",
        currentPlayerRunningTally
      );
      playerEndGameScore[m] = currentPlayerRunningTally; // updates the current player's endgame score with current running tally, until we include addition of round 10 score and calculate for a different player.
      console.log("currentPlayer", m, "playerEndGameScore", playerEndGameScore);
    }
    // inner loop ends when playerEndGameScore is calculated incrementally for the current player.
  } // outer loop ends when each player has gotten their turn at calculating playerEndGameScore.
  // now we need to get the highest score.
  var score = playerEndGameScore; //define normal variable as array, for use in next line
  var maxScore = Math.max(...score); // use spread operator to get max value in the array called score
  var playerIndex = playerEndGameScore.indexOf(maxScore); // find which playerNumber it is...
  var winnerPlayerName = playerName[playerIndex]; //return name of winning player.
  var winMessage = `</br>The highest score in this game comes from.. ${winnerPlayerName}, with a score of ${maxScore}! Massive congrats ${winnerPlayerName}!!</br></br>The full list of scores are below:</br>`;
  for (n = 0; n < numPlayers; n += 1) {
    winMessage += `${playerName[n]} got a total score of ${playerEndGameScore[n]}, which was the sum of his scores from all 10 rounds (${playerScoreDatabase[n]})</br>`;
  }
  winMessage += `</br>Thanks for playing! This game has now ended. To start a new game, please tell me the number of players playing the next game.`;
  gameRound = 0;
  numPlayers = 0;
  numDicesInGame = 0;
  swapState = 0;
  playerRegister = [];
  playerSwapChance = [];
  playerScoreDatabase = [];
  currentPlayerCurrentRoundScore = [];
  playerEndGameScore = [];
  currentPlayer = 0;
  nameEntryCounter = 0;
  playerName = [];
  currentPlayerRolls = [];
  playerDiceRollsDatabase = [];
  return winMessage;
};

var main = function (input) {
  input = input.trim();
  myOutputValue = ""; //resets my output value
  if (swapState == 1) {
    //user has chance to swap, and needs to choose
    console.log("pre-swap current player", currentPlayer);
    console.log(isNaN(Number(input)));
    if (input == "") {
      return `Please type either 'no' or choose to swap a dice (ordered by ${playerDiceRollsDatabase[currentPlayer]}) to the front.`;
    }
    if (isNaN(Number(input))) {
      //if user didn't key in a number...
      input = input.toLowerCase();
      console.log("input", input);
      if (input != "no") {
        //when user doesn't type no but doesn't choose a dice number to swap
        console.log("NAN Input");
        return `Please type either 'no' or choose to swap a dice (ordered by ${playerDiceRollsDatabase[currentPlayer]}) to the front.`;
      }
      console.log(
        "PROBLEM START",
        "currentPlayer",
        currentPlayer,
        "input",
        input,
        "gameRound",
        gameRound,
        "swapState",
        swapState
      );
      if (input == "no") {
        swapState = 0; //remove gameState blocker for swapping dice.
        console.log("INSIDELOOP");
        if (currentPlayer < numPlayers - 1) {
          //nt last player
          myOutputValue += updateCurrentRoundScoreMsg();
          myOutputValue += nextPlayerMsg();
          console.log("TOM");
          return myOutputValue;
        }
        if (currentPlayer == numPlayers - 1 && gameRound != 5) {
          //lastplayer, not last round
          myOutputValue += updateCurrentRoundScoreMsg();
          myOutputValue += readyPlayer1Msg();
          console.log("KIDS");
          return myOutputValue;
        }
        if (gameRound == 5 && currentPlayer == numPlayers - 1) {
          myOutputValue += updateCurrentRoundScoreMsg();
          myOutputValue = endGameMsg();
          console.log("THANOS");
          return myOutputValue;
        }
      }
    }
    if (input <= numDicesInGame && input != 1 && input != "") {
      myOutputValue = swapDicePositionMsg(input);
      myOutputValue += updateCurrentRoundScoreMsg();
      if (currentPlayer < numPlayers - 1) {
        myOutputValue += nextPlayerMsg();
        console.log("TOMMY");
        return myOutputValue;
      }
      if (currentPlayer == numPlayers - 1 && gameRound != 5) {
        myOutputValue += readyPlayer1Msg();
        console.log("JERRRRRYCANNN");
        return myOutputValue;
      }
      if (gameRound == 5 && currentPlayer == numPlayers - 1) {
        myOutputValue += endGameMsg(gameRound);
        console.log("DRSTRANGE");
        return myOutputValue;
      }
      if (input == "") {
        return `Please type either 'no' or choose to swap a dice (ordered by ${playerDiceRollsDatabase[currentPlayer]}) to the front.`;
      }
    }
  }

  if (
    (gameRound == 0 && numPlayers == 0 && isNaN(input) == true) ||
    (gameRound == 0 && numPlayers == 0 && (input > 5 || input < 2))
  ) {
    return "Please enter the number of players playing this game (2-5 players).";
  }
  if (gameRound == 0 && numPlayers == 0) {
    numPlayers = input;
    console.log("numPlayers", numPlayers);
    myOutputValue = generatePlayerRegisterMsg(numPlayers);
    console.log(
      "playerRegister",
      playerRegister,
      "playerSwapChance",
      playerSwapChance,
      "playerScoreDatabase",
      playerScoreDatabase,
      "myOutputValue",
      myOutputValue
    );
    return myOutputValue;
  }
  if (gameRound == 0 && numPlayers > 0 && nameEntryCounter < numPlayers) {
    if (isNaN(input) == false) {
      return "Please enter a name that's not a number.";
    }
    playerName[nameEntryCounter] = input;
    nameEntryCounter += 1;
    console.log("playerName", playerName, "nameEntryCounter", nameEntryCounter);
    if (nameEntryCounter == numPlayers) {
      myOutputValue = `Thank you for entering ${
        playerName[nameEntryCounter - 1]
      }'s name.</br> Please tell me how many dice we will be rolling in this game? Will it be 2, 3 or 4 dice?`;
      gameRound += 1; //Round 1 starts, but we have no dice!
      return myOutputValue;
    } else {
      myOutputValue = `Please enter Player${nameEntryCounter + 1}'s name.`;
      return myOutputValue;
    }
  }
  if (numDicesInGame == 0) {
    //if we don't have dice... yet!
    if (isNaN(input) || input < 2 || input > 4) {
      console.log("input", input);
      return `Please enter the number of dice (2-4) you would like to play with in this game.`;
    } else {
      numDicesInGame = parseInt(input);
      myOutputValue = `Alright we are ready to play the game. We have ${numPlayers} players, whose names are`;
      for (k = 0; k < numPlayers; k += 1) {
        myOutputValue += ` ${playerName[k]},`;
      } //instructions
      myOutputValue += ` and we are playing with ${numDicesInGame} dice. We will be using the dice to form a ${numDicesInGame} digit number in succession.</br></br> 
      Tutorial: Say you opted to use 4 dice. If you rolled '1','3,'3','5'; the score for that round will be '1335'. You will have the chance to swap one of the dice to the front on each round. </br> If you choose to do so.. let's say you choose Dice '4', the new number will be '5133' which gives you a higher score.</br></br>
    You will play 5 rounds and have a maximum of 2 chances to swap dice. The player with the highest total score wins.</br></br>
    Ready to play? Let's start round ${gameRound} and roll the dice for ${playerName[currentPlayer]}!! Just click the button.`;
      return myOutputValue;
    }
  }
  //Round 1, with dice. gameRound =1, currentPlayer =0 (means player1), time to roll.
  if (swapState == 0 && gameRound <= 5 && currentPlayer < numPlayers) {
    myOutputValue = rollCurrentPlayerDiceMsg(numDicesInGame, currentPlayer);
    if (playerSwapChance[currentPlayer] != 0) {
      myOutputValue += ableToSwapMsg(playerSwapChance);
      swapState = 1;
      return myOutputValue;
    } else {
      if (currentPlayer < numPlayers - 1) {
        //if this is not the last player
        myOutputValue += `Unfortunately you have used up all your dice swap chances.`;
        var message = updateCurrentRoundScoreMsg();
        myOutputValue += message;
        currentPlayer += 1;
        myOutputValue += `</br></br> Thank you, ${playerName[currentPlayer]} next! Click to start your roll.`;
        return myOutputValue;
      }
      if (currentPlayer == numPlayers - 1 && gameRound != 5) {
        //if this is the last player in this round, and it is not the last round of the game
        myOutputValue += `Unfortunately you have used up all your dice swap chances.`;
        var message = updateCurrentRoundScoreMsg();
        myOutputValue += message;
        gameRound += 1; //next round
        currentPlayer = 0; //go back to player 1.
        myOutputValue += `Unfortunately you have used up all your dice swap chances. </br> Round ${gameRound} is starting now, and ${playerName[currentPlayer]} you are up again! Click to start your roll.`;
      }
    }
  }
};
