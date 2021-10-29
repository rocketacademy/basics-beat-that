var plays = 1; // Number of plays
var internal_counter = 0; // Rotate back and forth first and second condition
var player_dice = ""; // Variable used to store the 2 dice

var number_of_players = 0; // Used to get the number of players
var list_of_scores = [];
var winner = "";
var round = 0;

var game_mode = 0;
var no_of_dice = 0;
var check_done_input = false;

var game_mode_knockout = false;

var main = function (input) {
  var myOutputValue = "";

  // function is used to check that number_of_players entered is valid.
  if (check_done_input == false) {
    check_input = check_input_players(number_of_players, input);
    if (check_input[1] == false) {
      myOutputValue = check_input[0];
      return myOutputValue;
    }
    check_done_input = check_input[1];
    myOutputValue =
      "Please fill in a game mode. <br><br> '1' - Highest Number Wins <br> '2' - Lowest Number Wins <br>";
    number_of_players = check_input[2];
    return myOutputValue;
  }

  ////////////////////// Ask for game mode ///////////////////////
  if (!game_mode) {
    game_mode = Number(input);
    myOutputValue = `You've selected Game Mode: ${game_mode}.<br><br> Press 'Submit' to choose the number of dices. `;
    if (!input) {
      myOutputValue =
        "Please fill in a game mode. <br><br> '1' - Highest Number Wins <br> '2' - Lowest Number Wins <br>";
    } else if (game_mode != 1 && game_mode != 2) {
      myOutputValue =
        "Please fill in either '1' or '2'. <br><br>'1' - Highest Number Wins <br> '2' - Lowest Number Wins <br>";
      game_mode = 0;
    }
    console.log("The game mode is: " + game_mode);
    return myOutputValue;
  }

  ///////////////////////// Ask for Number of Dice //////////////////////
  if (!no_of_dice) {
    no_of_dice = Number(input);
    myOutputValue = `You've selected ${no_of_dice} dices.<br><br> Press 'Submit' to roll ${no_of_dice} dices.`;
    if (!input) {
      myOutputValue = "Please fill in number of dices. From 1 to infinity.";
    } else if (no_of_dice < 1) {
      myOutputValue = `Please input a positive value from 1 to infinity.`;
      no_of_dice = 0;
    }
    console.log("The number of dice is: " + no_of_dice);
    return myOutputValue;
  }

  ////////////////////////// Game Play //////////////////////////////////
  while (plays < number_of_players + 1) {
    if (internal_counter % 2 == 0) {
      var dice_holder = [];
      var dice_msg = "";
      // Fix the dice at 2 first
      player_dice = generate_no_of_dice(dice_holder, no_of_dice);
      console.log(`Player ${plays} rolled: ${player_dice}`);

      a = 0;
      while (a < no_of_dice) {
        dice_msg += `<br> Dice ${a + 1}: ${player_dice[a]}.`;
        a++;
      }

      myOutputValue = `Welcome Player ${plays}. ${dice_msg} <br><br> Dice will be automatically optimise for you to win. Click 'Submit' to continue to see your value`;

      internal_counter += 1;
      return myOutputValue;
    } else {
      internal_counter += 1;
      // Sort and obtain the final output value
      value = optimise_values_of_dice(player_dice, game_mode);
      // Update the scores in the array
      list_of_scores[plays - 1] += Number(value);
      console.log(list_of_scores);
      // Let users know what is their actual value after selection
      myOutputValue = `Player ${plays}<br> Your number is: ${value}.`;
      plays += 1;

      // Adds the next player statement only if there is a next player.
      if (plays <= number_of_players && game_mode_knockout == false) {
        myOutputValue += `<br> It is now Player ${plays}'s turn. <br><br> Click 'Submit' to roll 2 dices. ${winner}`;
      }
      // // game knockout mode later shift down below the else if//
      // if (plays <= number_of_players && game_mode_knockout == true) {
      //   b = 0;
      //   for (i = 0; i < list_of_scores.length; i++) {
      //     if (list_of_scores[i] != 0) {
      //       b++;
      //     }
      //   }
      //   if (b == 2 && game_mode == 1) {
      //     // If game_mode is 1 which gets high number, I want to obtain lower number to delete it off the array. Hence, flip the 2nd input.
      //     game_winner_knockout_index = winning_gamemode(
      //       list_of_scores,
      //       game_mode
      //     );
      //     game_loser_knockout_index = winning_gamemode(list_of_scores, 2);

      //     list_of_scores
      //   }
      // }

      //
      else if (plays == number_of_players + 1 && game_mode_knockout == false) {
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
  myOutputValue = `Round ${round} is completed! This is game mode ${game_mode}. <br><br> <b>Leaderboard</b> <br> ${score_msg} ${winner} <br><br> Click 'Submit' to continue onto next round`;
  console.log(myOutputValue);
  winner = "";

  return myOutputValue;
};

var check_input_players = function (number_of_players, input) {
  state = false;
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
        //Create the score_list based on the number of players. Fill it with '0's
        list_of_scores = new Array(number_of_players).fill(0);
        console.log(`Generated a list of scores: ${list_of_scores}`);
        state = true;
      }
    }
  }
  return [myOutputValue, state, number_of_players];
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

// Variable number of dice
var generate_no_of_dice = function (dice_holder, no_of_dice) {
  var k = 0;
  while (k < no_of_dice) {
    // Generate a random dice and push it into the array.
    dice_holder.push(diceRoll());
    k++;
  }
  return dice_holder;
};

// Obtain the correct value either highest or lowest
var optimise_values_of_dice = function (player_dice, game_mode) {
  // sort the values from smallest to largest
  var numArray = new Float64Array(player_dice);
  numArray = numArray.sort();
  // start a loop to combine the values
  var k = 0;
  temp_value = "";

  if (game_mode == 2) {
    // Append values from front to the back to obtain smallest value
    while (k < numArray.length) {
      temp_value += numArray[k].toString();
      k++;
    }
  } else if (game_mode == 1) {
    // Append values from the back to the front to obtain largest value
    while (k < numArray.length) {
      k++;
      temp_value += numArray[numArray.length - k].toString();
    }
  }

  return temp_value;
};

var knockout_mode = function (number_of_players, no_of_dice) {
  // Only 2 competing at one go
  knockout_scores = new Array(2).fill(0);

  while (plays < number_of_players + 1) {
    if (internal_counter % 2 == 0) {
      var dice_holder = [];
      var dice_msg = "";
      // Fix the dice at 2 first
      player_dice = generate_no_of_dice(dice_holder, no_of_dice);
      console.log(`Player ${plays} rolled: ${player_dice}`);

      a = 0;
      while (a < no_of_dice) {
        dice_msg += `<br> Dice ${a + 1}: ${player_dice[a]}.`;
        a++;
      }

      myOutputValue = `Welcome Player ${plays}. ${dice_msg} <br><br> Dice will be automatically optimise for you to win. Click 'Submit' to continue to see your value`;

      internal_counter += 1;
      return myOutputValue;
    }
  }
};
