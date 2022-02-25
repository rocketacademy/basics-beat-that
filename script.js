//Game Rules:
//This game has a few modes:
//Variables that players can adjust: Number of dice, number of players, win condition, playmode
//Mode 1A: Highest number concatenated
//Mode 1B: Highest number added together
//Mode 1C: Highest number multipled
//Mode 2A: Lowest number concatenated
//Mode 2B: Lowest number added together
//Mode 2C: Lowest number multipled

//Game Settings input by Player
var numberOfPlayers = ``;
var numberOfDice = ``;
var numberOfRounds = ``;
var numString = [`zero`, `one`, `two`, `three`, `four`, `five`];

//Playing Process
var playersNames = [];
var playersDiceRolls = [];
var playersSubmissions = [];

// Win-Loss Records
var winLossRecords = [];
var checkTiedRolls = [];
var checkTiedWins = [];
var tiedWinnersTemp = [];

//Initial Game State
var gameState = `summonTheGamemaster`;
console.log(`gameState`, gameState);
var roundsPlayed = 0;

// Main Function
var main = function (input) {
  input = input.toLowerCase();

  if (numString.includes(input) == true) {
    input = numString.indexOf(input);
  }

  //Game settings code begins here

  if (
    gameState == `summonTheGamemaster` &&
    input != `open the chamber of secrets`
  ) {
    return `The Gamemaster is quite a particular character. Say the words he wants or he will not entertain you.`;
  }

  if (
    gameState == `summonTheGamemaster` &&
    input == `open the chamber of secrets`
  ) {
    gameState = `gameSettingsNumPlayers`;
    console.log(`gameState`, gameState);
    return `Ah...well hello there. I see you have stumbed upon this little corner of the internet.<br>
    <br>
Perhaps you'd like to play a game? I promise it'll be fun... for me at least.<br>
<br>
To play this game we will need at least 2 players. Me..? Ah well I won't be playing the game, I'll be having fun by overseeing everything and making sure all goes in order.<br>
<br>
So why don't you grab a friend or 2 that you'd like to sacrific.. I mean play this game with and we can begin. Does that sound good?<br>
<br>
Why don't you start with letting me know how many of you will be playing the game.<br>
<br>
Key in any number from 2 to 5. Ah Why 5? Well that blasted plague is still going on isn't it? I wouldn't want to be the one starting the next mutant virus. <b>Now now, how many players from 2 to 5</b>?
`;
  }

  if (
    gameState == `gameSettingsNumPlayers` &&
    input != 2 &&
    input != `two` &&
    input != 3 &&
    input != `three` &&
    input != 4 &&
    input != `four` &&
    input != 5 &&
    input != `five`
  ) {
    console.log(`gameState`, gameState);
    return `I didn't get that. Do you not want to play the game?<br>
    <br>
    I can accommodate 2 to 5 players at a time.
    Be clear now -- How many will be playing?`;
  }

  if (
    gameState == `gameSettingsNumPlayers` &&
    (input == 2 ||
      input == `two` ||
      input == 3 ||
      input == `three` ||
      input == 4 ||
      input == `four` ||
      input == 5 ||
      input == `five`)
  ) {
    console.log(`gameState`, gameState);
    numberOfPlayers = input;
    gameState = `gameSettingsNames`;
    console.log(`gameState`, gameState);

    for (
      winLossRecordCounter = 0;
      winLossRecordCounter < numberOfPlayers;
      winLossRecordCounter += 1
    ) {
      winLossRecords.push(0);
      console.log(`winLossRecords`, winLossRecords);
    }

    return `Alright, so we will have ${input} players. Now, tell me your names but one at a time. Who do we have first?`;
  }

  if (gameState == `gameSettingsNames` && input == ``) {
    return `I didn't get that. What's your name again?`;
  }

  if (gameState == `gameSettingsNames` && input != ``) {
    while (playersNames.length < numberOfPlayers) {
      playersNames.push(input);
      console.log(`gameState1`, gameState);
      console.log(`playersNames`, playersNames);

      if (playersNames.length == numberOfPlayers) {
        gameState = `gameSettingsNumDice`;
        return `Hello ${input}. You are the final player joining us. Okay now that we have all players names, we can move on.<br><br>How many dice would you like to play with? Choose a number from 2 - 5.`;
      }
      return `Hello ${input}. is there another player's name?`;
    }
  }

  if (
    gameState == `gameSettingsNumDice` &&
    input != 2 &&
    input != `two` &&
    input != 3 &&
    input != `three` &&
    input != 4 &&
    input != `four` &&
    input != 5 &&
    input != `five`
  ) {
    console.log(`gameState`, gameState);
    return `Sigh. Are my instructions difficult? Come on now, how many dice do you wish to roll for each player? Choose a number from 2 - 5.`;
  }

  if (
    gameState == `gameSettingsNumDice` &&
    (input == 2 ||
      input == `two` ||
      input == 3 ||
      input == `three` ||
      input == 4 ||
      input == `four` ||
      input == 5 ||
      input == `five`)
  ) {
    numberOfDice = input;
    gameState = `setNumberOfRounds`;
    console.log(`gameState`, gameState);
    console.log(`numberOfDice`, numberOfDice);

    return `Okay, so we will be using ${input} dice for each round.<br><br>
    Now one last thing to figure out -- How many rounds will you be playing? Choose from 2 to 5 rounds. I will entertain you but I haven't got all day!`;
  }

  if (
    gameState == `setNumberOfRounds` &&
    input != 2 &&
    input != `two` &&
    input != 3 &&
    input != `three` &&
    input != 4 &&
    input != `four` &&
    input != 5 &&
    input != `five`
  ) {
    console.log(`gameState`, gameState);
    return `Listen, we're nearly there. All you have to do is just decide how many rounds you're going to subject yourself to. Just decide. Anything between <b>2 to 5.</b>`;
  }

  if (
    gameState == `setNumberOfRounds` &&
    (input == 2 ||
      input == `two` ||
      input == 3 ||
      input == `three` ||
      input == 4 ||
      input == `four` ||
      input == 5 ||
      input == `five`)
  ) {
    numberOfRounds = input;
    gameState = `readyToPlay`;
    console.log(`gameState`, gameState);
    console.log(`numberOfRounds`, numberOfRounds);

    return `Wow. I never thought we'd get here but looks like we finally got all we need to begin the game.<br>
    <br>
    Looks like you'll be playing ${input} rounds under my watchful eye.<br>
    <br>
    Now, <i>take a deep breath</i> and <b>speak to me</b> when you're ready for fate to deal everyone's hands and I'll reveal the secrets of the chamber to you.`;
  }

  //Gameplay code begins here

  if (gameState == `readyToPlay`) {
    console.log(`gameState`, gameState);
    console.log(`roundsPlayed`, roundsPlayed);

    while (roundsPlayed < numberOfRounds) {
      {
        playersSubmissions = [];
        console.log(`current round`, roundsPlayed + 1);
        for (
          var totalPlayersRollCount = 0;
          totalPlayersRollCount < numberOfPlayers;
          totalPlayersRollCount += 1
        ) {
          playersDiceRolls = [];
          for (
            var diceRollCount = 0;
            diceRollCount < numberOfDice;
            diceRollCount += 1
          ) {
            var diceRoll = function () {
              return Math.ceil(Math.random() * 6);
            };
            playersDiceRolls.push(diceRoll());
            console.log(`playersDiceRolls`, playersDiceRolls);
          }

          finalValue = playersDiceRolls.join(``);
          console.log(`finalValue`, finalValue);
          playersSubmissions.push(finalValue);
          console.log(`playersSubmissions`, playersSubmissions);
        }
      }
      //Determine winner and add to win-loss records before restarting for the next round
      var maxArrayValue = playersSubmissions[0];
      console.log(`initial test high score`, maxArrayValue);
      for (
        maxArrayValueCount = 1;
        maxArrayValueCount < playersSubmissions.length;
        maxArrayValueCount += 1
      ) {
        if (playersSubmissions[maxArrayValueCount] > maxArrayValue) {
          maxArrayValue = playersSubmissions[maxArrayValueCount];
        }
      }

      //check for ties
      for (
        arrayCheckCount = 0;
        arrayCheckCount < playersSubmissions.length;
        arrayCheckCount += 1
      ) {
        var valueBeingChecked = playersSubmissions[arrayCheckCount];
        if (valueBeingChecked === maxArrayValue) {
          checkTiedRolls.push(arrayCheckCount);
        }
      }

      if (checkTiedRolls.length > 1) {
        while (checkTiedRolls.length != 0) {
          var winnerIndex = checkTiedRolls.pop();
          winLossRecords[winnerIndex] += 1;
        }
      }

      if ((checkTiedWins.length = 1)) {
        var winnerIndex = playersSubmissions.indexOf(maxArrayValue);
        console.log(`winnerIndex`, winnerIndex);
        winLossRecords[winnerIndex] += 1;
        console.log(`winner of game`, winner);
      }

      console.log(`final high score`, maxArrayValue);
      console.log(`winLossRecords`, winLossRecords);
      roundsPlayed += 1;
      console.log(`roundsPlayed`, roundsPlayed);
    }

    //Return overall winner of the game when all the rounds have elapsed.
    if ((roundsPlayed = numberOfRounds)) {
      console.log(`winLossrecords`, winLossRecords);
      var maxArrayValue = winLossRecords[0];
      console.log(`maxArrayValue`, maxArrayValue);
      for (
        maxArrayValueCount = 1;
        maxArrayValueCount < winLossRecords.length;
        maxArrayValueCount += 1
      ) {
        if (winLossRecords[maxArrayValueCount] > maxArrayValue) {
          maxArrayValue = winLossRecords[maxArrayValueCount];
        }
        console.log(`maxArrayValue`, maxArrayValue);
      }

      //check for ties
      for (
        arrayCheckCount = 0;
        arrayCheckCount < winLossRecords.length;
        arrayCheckCount += 1
      ) {
        var valueBeingChecked = winLossRecords[arrayCheckCount];
        if (valueBeingChecked === maxArrayValue) {
          checkTiedWins.push(arrayCheckCount);
        }
      }

      if (checkTiedWins.length > 1) {
        while (checkTiedWins.length != 0) {
          var winnerIndex = checkTiedWins.pop();
          tiedWinnersTemp.push(playersNames[winnerIndex]);
        }
        return `At the end of ${roundsPlayed} exciting rounds, we have a tie!<br>
<br>
<b>Congratulations ${tiedWinnersTemp.join()}</b>, luck was in your favour tonight and you each won ${maxArrayValue} rounds!<br>
<br>
If you wish to continue playing, just click the Start Over button above.<br>
<br>
If you've had enough, then I wish you farewell and hope we meet again soon.`;
      }

      if ((checkTiedWins.length = 1)) {
        var winnerIndex = winLossRecords.indexOf(maxArrayValue);
        console.log(`winnerIndex`, winnerIndex);
        var winner = playersNames[winnerIndex];
        console.log(`winner of game`, winner);
        return `At the end of ${roundsPlayed} exciting rounds, we finally have a winner!<br>
<br>
<b>Congratulations ${winner}</b>, luck was in your favour tonight and you won a total of ${maxArrayValue} rounds!<br>
<br>
If you wish to continue playing, just click the Start Over button above.<br>
<br>
If you've had enough, then I wish you farewell and hope we meet again soon.`;
      }
    }
  }
};
