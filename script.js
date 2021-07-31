//Initializing Variables
var mode = "HOME_TURF";
var player1Array = [];
var player2Array = [];
var randomArray = [];
var myOutputValue = "";
var randomNumberOnly = 0;
var randomNumber1 = 0;
var randomNumber2 = 0;
var P1FinalNumber = 0;
var P2FinalNumber = 0;
var P1_Record = 0;
var P2_Record = 0;
var condition = "";
var LCN_Final_Number_1 = 0;
var LCN_Final_Number_2 = 0;
var LCN_Final = 0;
var P1_max = 0;
var P2_max = 0;
var Final_P1_VND = 0;
var Final_P2_VND = 0;

//Generate Random Number from 1 to 6
var rollDice = function () {
  return Math.floor(Math.random() * 6) + 1;
};

//Check Condition for which player wins + Generating Record (Normal)
var checkCondition = function (x, y) {
  if (x > y) {
    condition = "Player 1 Wins!";
    P1_Record += 1;
  } else if (y > x) {
    condition = "Player 2 Wins!";
    P2_Record += 1;
  } else {
    P1_Record = P1_Record;
    P2_Record = P2_Record;
  }
  return condition;
};

//Check Condition for which player wins + Generating Record (LCN)
var checkConditionLCN = function (x, y) {
  if (x > y) {
    condition = "Player 2 Wins!";
    P2_Record += 1;
  } else {
    condition = "Player 1 Wins!";
    P1_Record += 1;
  }
  return condition;
};

//Check Who is Leading
var checkLeading = function (x, y) {
  if (x == y) return "Draw!";
  else if (x > y) return " Player 1 is Leading";
  else return " Player 2 is Leading";
};

// Generating the first LCN
var checkLCN = function (x, y) {
  if (x < y) LCN_Final = x * 10 + y;
  else LCN_Final = y * 10 + x;

  return LCN_Final;
};

// Generating an array full of random numbers
var generateArray = function (x, y) {
  var counter = 0;
  while (counter < x) {
    randomNumberOnly = rollDice();
    y.push(randomNumberOnly);
    counter = counter + 1;
  }
  return y;
};

var findMaxCombination = function (x) {
  var counter = 0;
  var max = 0;
  var max2 = 0;
  while (counter < x[counter]) {
    if (x[counter] > max) {
      max2 = max;
      max = x[counter];
    }
    if (x[counter] < max && x[counter] > max2) {
      max2 = x[counter];
    }
    counter = counter + 1;
  }

  var FinalNumber = max * 10 + max2;
  return FinalNumber;
};

var main = function (input) {
  if (mode == "HOME_TURF") {
    mode = "MENU_SELECTION";
    return "Please Select a mode from these available game modes = <br> 1. Normal <br> 2. Lowest Combined Number <br> 3. Variable Number of Dice (VND) ";
  }

  if (mode == "MENU_SELECTION") {
    if (input == 1) {
      mode = "NORMAL_GAME";
      return "Click Submit to Enter the Normal Game!";
    } else if (input == 2) {
      mode = "LCN_GAME";
      return "Click Submit to Enter the LCN Game";
    } else if (input == 3) {
      mode = "VND_GAME";
      return "Welcome the the VND Game. Please Enter the Number of Dice You Wish to Roll";
    }
  }

  // VND Game Bundle
  if (mode == "VND_GAME") {
    player1Array = generateArray(input, player1Array);
    player2Array = generateArray(input, player2Array);
    P1_Max_Combination = findMaxCombination(player1Array);
    P2_Max_Combination = findMaxCombination(player2Array);
    vndCondition = checkCondition(P1_Max_Combination, P2_Max_Combination);
    whoLeads = checkLeading(P1_Record, P2_Record);

    mode = "VND_GAME";

    return (
      "You have chosen to roll the dice " +
      input +
      " times <br> Player 1 Result = " +
      player1Array +
      " <br> Player 2 Result = " +
      player2Array +
      " <br> <br> Player 1 Optimal Value = " +
      P1_Max_Combination +
      "<br> Player 2 Optimal Value = " +
      P2_Max_Combination +
      "<br> <br> " +
      vndCondition +
      "<br> Record (Player 1 : Player 2) = " +
      P1_Record +
      ":" +
      P2_Record +
      whoLeads +
      "<br>Please Click Submit to Play Another Round <br> <br> Refresh to Play Another Mode"
    );
  }

  // LCN Game Bundle
  // Player 1 Bundle (LCN)
  if (mode == "LCN_GAME") {
    randomNumber1 = rollDice();
    randomNumber2 = rollDice();
    LCN_Final_Number_1 = checkLCN(randomNumber1, randomNumber2);

    mode = "LCN_Player_2";

    return (
      "Welcome Player 1 <br> You rolled " +
      randomNumber1 +
      " for Dice 1 and " +
      randomNumber2 +
      " for Dice 2 <br> Player 1 LCN is " +
      LCN_Final_Number_1 +
      "<br> It is Player 2's Turn, Please click Submit"
    );
  }

  // Player 2 Bundle (LCN)
  if (mode == "LCN_Player_2") {
    randomNumber1 = rollDice();
    randomNumber2 = rollDice();
    LCN_Final_Number_2 = checkLCN(randomNumber1, randomNumber2);
    conditionPlease = checkConditionLCN(LCN_Final_Number_1, LCN_Final_Number_2);
    whoLeads = checkLeading(P1_Record, P2_Record);

    mode = "LCN_GAME";

    return (
      "Welcome Player 2 <br> You rolled " +
      randomNumber1 +
      " for Dice 1 and " +
      randomNumber2 +
      " for Dice 2 <br> Player 2 LCN is " +
      LCN_Final_Number_2 +
      "<br> Player 1 Generates " +
      LCN_Final_Number_1 +
      " Player 2 Generates " +
      LCN_Final_Number_2 +
      "<br>" +
      conditionPlease +
      "<br> Record (Player 1 : Player 2) = " +
      P1_Record +
      ":" +
      P2_Record +
      whoLeads +
      "<br>Please Click Submit to Play Another Round <br> <br> Refresh to Play Another Mode"
    );
  }

  // Normal Game Bundle
  // Player 1 Bundle (NORMAL)
  if (mode == "NORMAL_GAME") {
    randomNumber1 = rollDice();
    randomNumber2 = rollDice();

    mode = "P1_COMBINING_NUMBERS";

    return (
      "Welcome Player 1 <br> You rolled " +
      randomNumber1 +
      " for Dice 1 and " +
      randomNumber2 +
      " for Dice 2 <br> choose the order of the dice"
    );
  }

  if (mode == "P1_COMBINING_NUMBERS") {
    if (input == 1) {
      P1FinalNumber = randomNumber1 * 10 + randomNumber2;
      myOutputValue =
        "Player 1, you chose Dice 1 first. <br> Your Number is " +
        P1FinalNumber +
        "<br> It is now Player 2's turn. Please click Submit";
    } else if (input == 2) {
      P1FinalNumber = randomNumber2 * 10 + randomNumber1;
      myOutputValue =
        "Player 1, you chose Dice 2 first. <br> Your Number is " +
        P1FinalNumber +
        "<br> It is now Player 2's turn. Please click Submit";
    }
    mode = "PLAYER_2_TURN";
    return myOutputValue;
  }

  // Player 2 Bundle (NORMAL)
  if (mode == "PLAYER_2_TURN") {
    randomNumber1 = rollDice();
    randomNumber2 = rollDice();

    mode = "P2_COMBINING_NUMBERS";

    return (
      "Welcome Player 2 <br> You rolled " +
      randomNumber1 +
      " for Dice 1 and " +
      randomNumber2 +
      " for Dice 2 <br> choose the order of the dice"
    );
  }

  if (mode == "P2_COMBINING_NUMBERS") {
    conditionPlease = checkCondition(P1FinalNumber, P2FinalNumber);
    whoLeads = checkLeading(P1_Record, P2_Record);
    if (input == 1) {
      P2FinalNumber = randomNumber1 * 10 + randomNumber2;
      myOutputValue =
        "Player 2, you chose Dice 1 first. <br> Your Number is " +
        P2FinalNumber +
        "<br> Player 1 generates " +
        P1FinalNumber +
        " and Player 2 generates " +
        P2FinalNumber +
        "<br>" +
        conditionPlease +
        "<br> Record (Player 1 : Player 2) = " +
        P1_Record +
        ":" +
        P2_Record +
        whoLeads +
        "<br>Please Click Submit to Play Another Round";
    } else if (input == 2) {
      P2FinalNumber = randomNumber2 * 10 + randomNumber1;
      myOutputValue =
        "Player 2, you chose Dice 2 first. <br> Your Number is " +
        P2FinalNumber +
        "<br> Player 1 generates " +
        P1FinalNumber +
        " and Player 2 generates " +
        P2FinalNumber +
        "<br>" +
        conditionPlease +
        "<br> Record (Player 1 : Player 2) = " +
        P1_Record +
        ":" +
        P2_Record +
        whoLeads +
        "<br>Please Click Submit to Play Another Round <br> <br> Refresh to Play Another Mode";
    }
    mode = "NORMAL_GAME";
    return myOutputValue;
  }
};
