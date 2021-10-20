var plays = 1; // Number of plays
var internal_counter = 0; // Rotate back and forth first and second condition
var player_dice = ""; // Variable used to store the 2 dice

var number_of_players = 0; // Used to get the number of players
var list_of_scores = [];
var winner = "";
var round = 0;

game_mode = 0;

var main = function (input) {
  var myOutputValue = "";
  //// Key in the number of players as long as below 2. Cannot proceed /////
  if (number_of_players < 2) {
    console.log(!input);
    if (!input) {
      myOutputValue =
        "Please fill number of players. Minimum 2! Don't leave it blank!";
    } else if (Number.isNaN(Number(input))) {
      myOutputValue =
        "Please fill number of players. Minimum 2! Don't fill in letters!";
    } else {
      number_of_players = Number(input);
      if (number_of_players < 2) {
        myOutputValue = `The number of players is: ${number_of_players}. It is insufficient. Minimum 2!`;
      } else {
        myOutputValue = `The number of players is: ${number_of_players}. <br> Let's begin.<br><br> Please fill in a game mode. <br><br> '1' - Highest Number Wins <br> '2' - Lowest Number Wins <br> `;
        //Create the score_list
        list_of_scores = new Array(number_of_players).fill(0);
        console.log(`Generated a list of scores: ${list_of_scores}`);
      }
    }
    return myOutputValue;
  }
  ////////////////////// Ask for game mode ///////////////////////
  if (!game_mode) {
    game_mode = Number(input);
    myOutputValue = `You've selected Game Mode: ${game_mode}.<br><br> Press 'Submit' to roll 2 dices. `;
    if (!input) {
      myOutputValue =
        "Please fill in a game mode. <br><br> '1' - Highest Number Wins <br> '2' - Lowest Number Wins <br>";
    } else if (game_mode != 1 && game_mode != 2) {
      myOutputValue =
        "Please fill in either '1' or '2'. <br><br>'1' - Highest Number Wins <br> '2' - Lowest Number Wins <br>";
      game_mode = 0;
    }
    return myOutputValue;
  }
  console.log("The game mode is: " + game_mode);

  ////////////////////////// Game Play //////////////////////////////////
  while (plays < number_of_players + 1) {
    if (internal_counter % 2 == 0) {
      var dice_holder = [];
      var dice1 = diceRoll();
      var dice2 = diceRoll();
      // Append into the list
      dice_holder.push(dice1, dice2);
      player_dice = dice_holder;
      console.log(`Player ${plays} rolled: ${player_dice}`);

      myOutputValue = `Welcome Player ${plays}. <br> You rolled:<br> Dice 1: ${dice1}. <br> Dice 2: ${dice2}. <br> Choose the order of the dice. <br><br> Choose '1' for dice 1 first<br> Choose '2' for dice 2 first. <br><br> Otherwise, it'll be automatically optimise for you to win.`;

      internal_counter += 1;
      return myOutputValue;
    } else {
      // check the largest number or smallest number within the 2 dices. Depending on the game_mode
      index_of_dice_win = Number(winning_gamemode(player_dice, game_mode));
      console.log(player_dice[index_of_dice_win]);

      var player_select = index_of_dice_win + 1;
      // The 5 lines below maybe redundant.
      if (player_select != 1 && player_select != 2) {
        myOutputValue = `Please select '1' or '2' to choose dices 1 or 2 respectively.<br><br> You rolled:<br> Dice 1: ${player_dice[0]}.<br> Dice 2: ${player_dice[1]}.`;
        return myOutputValue;
      } // redundant
      internal_counter += 1;

      // Allows manual overwrite instead of automatically select
      if (Number(input) == 1 || Number(input) == 2) {
        player_select = Number(input);
      }
      // var player_select = Number(input);
      if (player_select == 1) {
        // if player selected first dice, extract out first dice from array.
        first_digit = player_dice[player_select - 1];
        second_digit = player_dice[player_select];
      } else {
        // if player selected second dice, extract out second dice from array
        first_digit = player_dice[player_select - 1];
        second_digit = player_dice[player_select - 2];
      }
      value = first_digit.toString() + second_digit.toString();
      list_of_scores[plays - 1] += Number(value);
      console.log(list_of_scores);
      // Let users know what is their actual value after selection
      myOutputValue = `Player ${plays}, Dice ${player_select} was selected. <br> Your number is: ${value}.`;
      plays += 1;

      // Adds the next player statement only if there is a next player.
      if (plays <= number_of_players) {
        myOutputValue += `<br> It is now Player ${plays}'s turn. <br><br> Click 'Submit' to roll 2 dices. ${winner}`;
      } else if (plays == number_of_players + 1) {
        location_of_index = winning_gamemode(list_of_scores, game_mode);

        winner = `<br> The winner is Player ${
          location_of_index + 1
        }! Congratulations!`;
        // check if the top score is repeated
        var check_tie = max_value_repetition(list_of_scores);
        if (check_tie == true) {
          winner = `<br> There is a tie!`;
        }
        myOutputValue += winner;
      }

      return myOutputValue;
    }
  }
  // Reset the game
  internal_counter = 0;
  plays = 1;

  round += 1;
  score_msg = generate_final_scorecard(list_of_scores);
  myOutputValue = `Round ${round} is completed! This is game mode ${game_mode}. <br><br> The total score thus far is: <br> ${score_msg} ${winner} <br><br> Click 'Submit' to continue onto next round`;

  winner = "";

  return myOutputValue;
};

var diceRoll = function () {
  randomDecimal = Math.random() * 6;
  randomInteger = Math.floor(randomDecimal);
  dice = randomInteger + 1;
  return dice;
};

var generate_final_scorecard = function (list_of_scores) {
  j = 0;
  var msg = "";

  while (j < list_of_scores.length) {
    player_no = j + 1;
    score = list_of_scores[j];

    msg += `Player ${player_no}: ${score}<br> `;
    j++;
  }
  return msg;
};

var max_value_repetition = function (list_of_scores) {
  j = 0;
  count = 0;
  var msg = "";

  largest_value = Math.max(...list_of_scores);

  while (j < list_of_scores.length) {
    if (list_of_scores[j] == largest_value) {
      // if identify more than 1 max value
      count++;
    }
    j++;
  }
  // It is a tie
  if (count > 1) {
    return true;
  }
  return false;
};

var winning_gamemode = function (list_of_scores, game_mode) {
  winning_condn = 0;

  if (game_mode == 1) {
    winning_condn = list_of_scores.indexOf(Math.max(...list_of_scores));
  }

  if (game_mode == 2) {
    winning_condn = list_of_scores.indexOf(Math.min(...list_of_scores));
  }
  // winning condition returns the index of the lower or higher number within array.
  return winning_condn;
};
