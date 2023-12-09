//Flow for Game Control
var GAMESTATEONE = "GAME_PROCESS_STATE_ONE";
var GAMESTATETWO = "GAME_PROCESS_STATE_TWO";
var GAMESTATETHREE = "GAME_PROCESS_STATE_THREE";
var GAMESTATEFOUR = "GAME_PROCESS_STATE_FOUR";
var GAMESTATEFIVE = "GAME_PROCESS_STATE_FIVE";
var GAMESTATESIX = "GAME_PROCESS_STATE_SIX";
var gameProcessState = GAMESTATEONE;

//Type of Game
var PLAYMODE = "";
var BEATthatScoreMode = "Beat that Score Game MODE";
var LOWESTComboNumberMode = "Lowest Combination Number Game MODE";
var VARIABLENumberofDiceMode = "Variable Number of Dice MODE";

//User Choice
var MAINUserChoice = "";

//Common use
var BREAKONELINES = "<br>";
var BREAKTWOLINES = BREAKONELINES + BREAKONELINES;
var BREAKTHREELINES = BREAKTWOLINES + BREAKONELINES;

//Display screen
var WELCOMEEMPTYStatmentMSGOne =
  "Hey~! It's alright... We don't bite 🙋‍♂️! <br>Please input your name to start game.";
var BEATthatScoreMSG =
  "Two players will roll two dice." +
  BREAKONELINES +
  "The score is the running sum of all numbers that player has generated so far.";
var LOWESTComboNumberMSG =
  "Player will need to choice the lowest combined number from dice rolls. " +
  BREAKONELINES +
  "For example, for dice rolls [6, 3] in Lowest Combined Number mode, player should generate the lowest combo of number 36.";
var VARIABLENumberofDiceMSG =
  "You are allow to choose the amount of dice to throw" +
  BREAKONELINES +
  "The score is the running sum of all numbers that player has generated so far.";
var GAMEMenuMSG =
  "There are 2 modes of game:" +
  BREAKTWOLINES +
  "#1 : Beat That Score" +
  BREAKONELINES +
  BEATthatScoreMSG +
  BREAKTWOLINES +
  "#2 : Lowest Combo" +
  BREAKONELINES +
  LOWESTComboNumberMSG +
  BREAKTWOLINES +
  "#3 : Variable Number of Dice" +
  BREAKONELINES +
  VARIABLENumberofDiceMSG;

//BEAT THAT: Gamemode 1 variable
var GAMEMODEBEATTHATUserdiceroll = [];
var GAMEMODEBEATTHATUserdicerollSum = 0;
var GAMEMODEBEATTHATUserOverallSUM = 0;
var GAMEMODEBEATTHATCommdiceroll = [];
var GAMEMODEBEATTHATCommdicerollSum = 0;
var GAMEMODEBEATTHATCommOverallSUM = 0;
var GAMEMODEBEATTHATCount = 1;
var GAMEMODEBEATTHATnoOfdiceroll = 2;
var GAMEMODEBEATTHATMODEONE = "Mode One";
var GAMEMODEBEATTHATMODETWO = "Mode Two";
var GAMEMODEBEATTHATMODETHREE = "Mode Three";
var GAMEMODEBEATTHATMODEFOUR = "Mode Four";
var GAMEMODEBEATTHATMODEFIVE = "Mode Five";
var GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODEONE;

//Lowest Combination: Gamemode 2 variable
var LOWESTCOMBOMODEUserdiceroll = [];
var LOWESTCOMBOMODEUserdicerollSum = 0;
var LOWESTCOMBOMODEUserOverallSUM = 0;
var LOWESTCOMBOMODECommdiceroll = [];
var LOWESTCOMBOMODECommdicerollSum = 0;
var LOWESTCOMBOMODECommOverallSUM = 0;
var LOWESTCOMBOMODECount = 1;
var LOWESTCOMBOMODEnoOfdiceroll = 2;
var LOWESTCOMBOMODEMODEONE = "Mode One";
var LOWESTCOMBOMODEMODETWO = "Mode Two";
var LOWESTCOMBOMODEMODETHREE = "Mode Three";
var LOWESTCOMBOMODEMODEFOUR = "Mode Four";
var LOWESTCOMBOMODEMODEFIVE = "Mode Five";
var LOWESTCOMBOMODE = LOWESTCOMBOMODEMODEONE;

//Variable dice game mode: Gamemode 3 variable
var GAMEMODEVARIABLENUMBEROFDICE = 0;
var GAMEMODEVARIABLENUMBEROFDICECount = 1;
var GAMEMODEVARIABLENUMBEROFDICEUserdiceroll = [];
var GAMEMODEVARIABLENUMBEROFDICECommdiceroll = [];
var GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM = 0;
var GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM = 0;
var GAMEMODEVARIABLENUMBEROFDICEMODEONE = "Mode One";
var GAMEMODEVARIABLENUMBEROFDICEMODETWO = "Mode Two";
var GAMEMODEVARIABLENUMBEROFDICEMODETHREE = "Mode Three";
var GAMEMODEVARIABLENUMBEROFDICEMODEFOUR = "Mode Four";
var GAMEMODEVARIABLENUMBEROFDICEMODEFIVE = "Mode Five";
var GAMEMODEVARIABLENUMBEROFDICEMODESIX = "Mode Six";
var GAMEMODEVARIABLENUMBEROFDICEMODESEVEN = "Mode Seven";
var GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODEONE;

var main = function (input) {
  let statement = "";
  switch (gameProcessState) {
    case GAMESTATEONE:
      statement = NAMEValidationCHECK(input);
      break;
    case GAMESTATETWO:
      statement = GAMESTATERequirement(input);
      break;
    case GAMESTATETHREE:
      switch (PLAYMODE) {
        case BEATthatScoreMode:
          statement = GAMEMODEBEATTHATMAINone(input);
          break;
        case LOWESTComboNumberMode:
          statement = GAMEMODELOWESTCOMBOMAIN(input);
          break;
        case VARIABLENumberofDiceMode:
          statement = GAMEMODEVARIABLENUMBEROFDICEMAIN(input);
          break;
        default:
          statement = null;
          break;
      }
  }
  return statement;
};

function NAMEValidationCHECK(NameValidation) {
  let NAMEValided = "";
  switch (NameValidation) {
    case "":
      NAMEValided = WELCOMEEMPTYStatmentMSGOne;
      break;
    default:
      Username = NameValidation;
      gameProcessState = GAMESTATETWO;
      NAMEValided =
        "Hi " +
        Username +
        ", nice to meet you 😘! " +
        BREAKTWOLINES +
        GAMEMenuMSG;
      break;
  }
  return NAMEValided;
}

function GAMESTATERequirement(MAINUserChoice) {
  let GameStatment;
  switch (MAINUserChoice) {
    case "1":
      GameStatment =
        "You have selected <b>Beat That Score Mode!</b>" +
        BREAKTWOLINES +
        "You will play against JASON's personal robot 🤖. " +
        BREAKTWOLINES +
        "#1. Each one of you will take a turn to roll the dice.🎲" +
        BREAKONELINES +
        "#2. Player will have the choice to accept the lowest combo generated automatically." +
        BREAKONELINES +
        "#3. The lowest combination number will win the round of game." +
        BREAKONELINES +
        "#4. Scores will continue until you exit this game mode (⊙_⊙;)" +
        BREAKONELINES +
        "#5. Once exit, score will automaticatically restart from 0️⃣." +
        BREAKTWOLINES +
        "Click the submit to start the game 🤭";
      gameProcessState = GAMESTATETHREE;
      PLAYMODE = BEATthatScoreMode;
      break;
    case "2":
      GameStatment =
        "You have selected <b>Lowest Combo mode!</b>" +
        BREAKTWOLINES +
        "You will play against JASON's personal robot 🤖. " +
        BREAKTWOLINES +
        "#1. Each one of you will take a turn to roll the dice. 🎲" +
        BREAKONELINES +
        "#2. Players are able to choose the lowest combination.🏆" +
        BREAKONELINES +
        "#3. Game will continue until you exit (⊙_⊙;)" +
        BREAKONELINES +
        "#4. Once exit, score will automaticatically restart from 0️⃣" +
        BREAKONELINES +
        "#5. There is no permanent winner, but a temporary leader." +
        BREAKTWOLINES +
        "Click the submit to start the game 🤭";
      gameProcessState = GAMESTATETHREE;
      PLAYMODE = LOWESTComboNumberMode;
      break;
    case "3":
      GameStatment =
        "You have selected <b>Variable Number of Dice Mode!</b>" +
        BREAKTWOLINES +
        "You will play against JASON's personal robot 🤖. " +
        BREAKTWOLINES +
        "#1. You have to ability to choose the number of dice" +
        BREAKONELINES +
        "#2. Each one of you will take a turn to roll the dice. 🎲" +
        BREAKONELINES +
        "#3. Players with the lowest sum will win the match!🏆" +
        BREAKONELINES +
        "#4. Game will continue until you exit (⊙_⊙;)" +
        BREAKONELINES +
        "#5. Once exit, score will automaticatically restart from 0️⃣" +
        BREAKONELINES +
        "#6. There is no permanent winner, but a temporary leader." +
        BREAKTWOLINES +
        "Click the submit to start the game 🤭";
      gameProcessState = GAMESTATETHREE;
      PLAYMODE = VARIABLENumberofDiceMode;
      break;
    default:
      GameStatment =
        "Hey " +
        Username +
        "." +
        BREAKONELINES +
        "You entered an invalid choice.🤔" +
        BREAKONELINES +
        GAMEMenuMSG;
  }
  return GameStatment;
}

function diceROLL() {
  return Math.floor(Math.random() * 6) + 1;
}

function GAMEMODEBEATTHATMAINone(GAMEMODESEConeCHOICE) {
  let GAMEMODESEConeMSG = "";
  let GAMEMODESEConeCHOICES = GAMEMODESEConeCHOICE.trim().toUpperCase();
  switch (GAMEMODESEConeCHOICES) {
    case "":
      switch (GAMEMODEBEATTHATMODE) {
        case GAMEMODEBEATTHATMODEONE:
          GAMEMODESEConeMSG = GAMEMODEBEATTHATSECTIONuserturn();
          break;
        case GAMEMODEBEATTHATMODETWO:
          GAMEMODESEConeMSG = GAMEMODEBEATTHATSECTIONCommturn();
          break;
        case GAMEMODEBEATTHATMODETHREE:
          GAMEMODESEConeMSG = GAMEMODEBEATTHATSECTIONscoring();
          break;
        case GAMEMODEBEATTHATMODEFOUR:
          GAMEMODESEConeMSG = GAMEMODEBEATTHATSECTIONPlayAgain();
          break;
        case GAMEMODEBEATTHATMODEFIVE:
          GAMEMODESEConeMSG = GAMEMODEBEATTHATMODEDECISION(null);
          break;
      }
      break;
    case "EXIT":
      GAMEMODESEConeMSG = GAMEMODEBEATTHATMODEDECISION("EXIT");
      break;
    case "QUIT":
      location.reload();
      break;
    default:
      GAMEMODESEConeMSG = ILLEGALKEYINTERRUPT();
      break;
  }
  return GAMEMODESEConeMSG;
}

function GAMEMODEBEATTHATMODEDECISION(GAMEMODEBEATTHATDECISIONMODE) {
  MODEDecisionMSG = "";
  if (GAMEMODEBEATTHATDECISIONMODE == "EXIT") {
    GAMEMODEBEATTHATUserdiceroll = [];
    GAMEMODEBEATTHATUserdicerollSum = 0;
    GAMEMODEBEATTHATUserOverallSUM = 0;
    GAMEMODEBEATTHATCommdiceroll = [];
    GAMEMODEBEATTHATCommdicerollSum = 0;
    GAMEMODEBEATTHATCommOverallSUM = 0;
    GAMEMODEBEATTHATCount = 1;
    GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODEONE;
    PLAYMODE = "";
    gameProcessState = GAMESTATETWO;
    MODEDecisionMSG = GAMEMenuMSG;
    //location.reload();
  } else {
    GAMEMODEBEATTHATCount++;
    GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODEONE;
    MODEDecisionMSG = GAMEMODEBEATTHATSECTIONuserturn();
  }
  return MODEDecisionMSG;
}

function ILLEGALKEYINTERRUPT() {
  return (
    "Hey " +
    Username +
    ", did you enter an unacceptable key? 😒<br> Click submit button to continue where you left off."
  );
}

function GAMEMODEBEATTHATSECTIONuserturn() {
  let GAMEMODEBEATTHATSECTIONoneMSG = "";
  let GAMEMODEBEATTHATSECTIONoneUsertmp = GAMEMODEBEATTHATSECTIONoneRoll();
  GAMEMODEBEATTHATUserdicerollSum = GlobalShareSUMUPArray(
    GAMEMODEBEATTHATSECTIONoneUsertmp
  );
  GAMEMODEBEATTHATUserdiceroll.push(GAMEMODEBEATTHATUserdicerollSum);
  GAMEMODEBEATTHATUserOverallSUM = GlobalShareSUMUPArray(
    GAMEMODEBEATTHATUserdiceroll
  );
  ////////////////////////////////////////////////////////
  // console.log("GAMEMODEBEATTHATSECTIONoneUsertmp");
  // console.log(GAMEMODEBEATTHATSECTIONoneUsertmp);
  // console.log("GAMEMODEBEATTHATUserdicerollSum");
  // console.log(GAMEMODEBEATTHATUserdicerollSum);
  console.log("GAMEMODEBEATTHATUserdiceroll");
  console.log(GAMEMODEBEATTHATUserdiceroll);
  console.log("GAMEMODEBEATTHATUserOverallSUM");
  console.log(GAMEMODEBEATTHATUserOverallSUM);
  ////////////////////////////////////////////////////////
  GAMEMODEBEATTHATSECTIONoneMSG =
    "<b><u>" +
    BEATthatScoreMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEBEATTHATCount +
    "</b></u>" +
    BREAKTWOLINES +
    Username +
    " had roll: " +
    BREAKTWOLINES +
    GAMEMODEBEATTHATSECTIONoneUsertmp[0] +
    " for the first dices 🎲 and " +
    BREAKONELINES +
    GAMEMODEBEATTHATSECTIONoneUsertmp[1] +
    " for the second dice 🎲" +
    "." +
    BREAKTWOLINES +
    "Total sum of: " +
    GAMEMODEBEATTHATUserdicerollSum;
  //GAMEMODEBEATTHATSECTIONoneUsertmp = [];
  GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODETWO;
  return GAMEMODEBEATTHATSECTIONoneMSG;
}

function GAMEMODEBEATTHATSECTIONCommturn() {
  let GAMEMODEBEATTHATSECTIONoneMSG = "";
  let GAMEMODEBEATTHATSECTIONoneCommtmp = GAMEMODEBEATTHATSECTIONoneRoll();
  GAMEMODEBEATTHATCommdicerollSum = GlobalShareSUMUPArray(
    GAMEMODEBEATTHATSECTIONoneCommtmp
  );
  GAMEMODEBEATTHATCommdiceroll.push(GAMEMODEBEATTHATCommdicerollSum);
  GAMEMODEBEATTHATCommOverallSUM = GlobalShareSUMUPArray(
    GAMEMODEBEATTHATCommdiceroll
  );
  ////////////////////////////////////////////////////////
  // console.log("GAMEMODEBEATTHATSECTIONoneCommtmp");
  // console.log(GAMEMODEBEATTHATSECTIONoneCommtmp);
  // console.log("GAMEMODEBEATTHATCommdicerollSum");
  // console.log(GAMEMODEBEATTHATCommdiceroll);
  console.log("GAMEMODEBEATTHATCommdiceroll");
  console.log(GAMEMODEBEATTHATCommdiceroll);
  console.log("GAMEMODEBEATTHATCommOverallSUM");
  console.log(GAMEMODEBEATTHATCommOverallSUM);
  ////////////////////////////////////////////////////////
  GAMEMODEBEATTHATSECTIONoneMSG =
    "<b><u>" +
    BEATthatScoreMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEBEATTHATCount +
    "</b></u>" +
    BREAKTWOLINES +
    "JASON's robo" +
    " had roll: " +
    BREAKTWOLINES +
    GAMEMODEBEATTHATSECTIONoneCommtmp[0] +
    " for the first dices 🎲 and " +
    BREAKONELINES +
    GAMEMODEBEATTHATSECTIONoneCommtmp[1] +
    " for the second dice 🎲 " +
    "." +
    BREAKTWOLINES +
    "Total sum of: " +
    GAMEMODEBEATTHATCommdicerollSum;
  GAMEMODEBEATTHATSECTIONoneCommtmp = [];
  GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODETHREE;
  return GAMEMODEBEATTHATSECTIONoneMSG;
}

function GAMEMODEBEATTHATSECTIONscoring() {
  let GAMEMODEBEATTHATSECTIONscoringMSG;
  if (GAMEMODEBEATTHATUserOverallSUM > GAMEMODEBEATTHATCommOverallSUM) {
    GAMEMODEBEATTHATSECTIONscoringMSG =
      "<b><u>" +
      BEATthatScoreMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEBEATTHATCount +
      "</b></u>" +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      GAMEMODEBEATTHATUserOverallSUM +
      BREAKTWOLINES +
      "JASON's bot had an overall score of " +
      GAMEMODEBEATTHATCommOverallSUM +
      BREAKTWOLINES +
      "You had beat JASON's bot!😲" +
      BREAKTWOLINES +
      "<b>Winner: " +
      Username +
      "</b>";
  } else if (GAMEMODEBEATTHATUserOverallSUM < GAMEMODEBEATTHATCommOverallSUM) {
    GAMEMODEBEATTHATSECTIONscoringMSG =
      "<b><u>" +
      BEATthatScoreMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEBEATTHATCount +
      "</b></u>" +
      BREAKTWOLINES +
      "JASON's bot an overall score of " +
      GAMEMODEBEATTHATCommOverallSUM +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      GAMEMODEBEATTHATUserOverallSUM +
      BREAKTWOLINES +
      "Come on, let's go another round!😁" +
      BREAKTWOLINES +
      "<b>Winner: JASON's Bots 🤖 </b>";
  } else {
    GAMEMODEBEATTHATSECTIONscoringMSG =
      "<b><u>" +
      BEATthatScoreMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEBEATTHATCount +
      "</b></u>" +
      BREAKTWOLINES +
      "JASON's bot an overall score of " +
      GAMEMODEBEATTHATCommOverallSUM +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      GAMEMODEBEATTHATUserOverallSUM +
      BREAKTWOLINES +
      "Come on, let's go another round!😁" +
      BREAKTWOLINES +
      "<b>Winner: Draw Match 🤭</b>";
  }
  GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODEFOUR;
  return GAMEMODEBEATTHATSECTIONscoringMSG;
}

function GAMEMODEBEATTHATSECTIONPlayAgain() {
  let PLayAgainMSG;
  PLayAgainMSG =
    "<b><u>" +
    BEATthatScoreMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEBEATTHATCount +
    "</b>" +
    " had ended" +
    BREAKTWOLINES +
    "#1: Click submit button for the next round to continue playing. " +
    BREAKTWOLINES +
    '#2: Enter "EXIT" in the textbox. To exit "Beat that Mode" ' +
    BREAKTWOLINES +
    '#3: Enter "QUIT" into the textbox. To quit game mode';
  GAMEMODEBEATTHATMODE = GAMEMODEBEATTHATMODEFIVE;
  return PLayAgainMSG;
}

function GAMEMODEBEATTHATSECTIONoneRoll() {
  let GAMEMODEBEATTHATdicerolltemp = [];
  for (var i = 1; i <= GAMEMODEBEATTHATnoOfdiceroll; i++) {
    GAMEMODEBEATTHATdicerolltemp.push(diceROLL());
  }
  return GAMEMODEBEATTHATdicerolltemp;
}

function GlobalShareSUMUPArray(TotalNum) {
  let tempsum = 0;
  for (var i = 0; i < TotalNum.length; i++) {
    tempsum += TotalNum[i];
  }
  return tempsum;
}

function GAMEMODELOWESTCOMBOMAIN(GAMEMODELOWESTCOMBOChoice) {
  let GAMEMODELOWESTCOMBOMAINMSG = "";
  let GAMEMODELOWESTCOMBOMAINCHOICES =
    GAMEMODELOWESTCOMBOChoice.trim().toUpperCase();
  switch (GAMEMODELOWESTCOMBOMAINCHOICES) {
    case "":
      switch (LOWESTCOMBOMODE) {
        case LOWESTCOMBOMODEMODEONE:
          GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEuserturn(false);
          break;
        case LOWESTCOMBOMODEMODETWO:
          GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEcommturn();
          break;
        case LOWESTCOMBOMODEMODETHREE:
          GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEDeclareWinner();
          break;
        case LOWESTCOMBOMODEMODEFOUR:
          GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEPlayAgain();
          break;
        case LOWESTCOMBOMODEMODEFIVE:
          GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEPlayerDecision(null);
          break;
      }
      break;
    case "1":
      GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEuserDecONE();
      break;
    case "2":
      GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEuserDecTWo();
      break;
    case "3":
      GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEuserturn(true);
      break;
    case "EXIT":
      GAMEMODELOWESTCOMBOMAINMSG = LOWESTCOMBOMODEPlayerDecision("EXIT");
      break;
    default:
      GAMEMODELOWESTCOMBOMAINMSG = ILLEGALKEYINTERRUPT();
      break;
  }
  return GAMEMODELOWESTCOMBOMAINMSG;
}

function LOWESTCOMBOMODEuserturn(USERRequestRoll) {
  let LOWESTCOMBOMODEuserMSG = "";
  if (USERRequestRoll == false) {
    LOWESTCOMBOMODERoll();
    ////////////////////////////////////////////////////////
    // console.log("LOWESTCOMBOSECTIONoneUsertmp");
    // console.log(LOWESTCOMBOSECTIONoneUsertmp);
    // console.log("LOWESTCOMBOUserdicerollSum");
    // console.log(LOWESTCOMBOUserdicerollSum);
    console.log("LOWESTCOMBOMODEUserdiceroll 1");
    console.log(LOWESTCOMBOMODEUserdiceroll[0]);
    console.log("LOWESTCOMBOMODEUserdiceroll 2");
    console.log(LOWESTCOMBOMODEUserdiceroll[1]);
    ////////////////////////////////////////////////////////
    LOWESTCOMBOMODEuserMSG =
      "<b><u>Round " +
      LOWESTCOMBOMODECount +
      "</b></u>" +
      BREAKTWOLINES +
      Username +
      " had roll: " +
      BREAKTWOLINES +
      LOWESTCOMBOMODEUserdiceroll[0] +
      " for the first dices 🎲 and " +
      BREAKONELINES +
      LOWESTCOMBOMODEUserdiceroll[1] +
      " for the second dice 🎲" +
      "." +
      BREAKTWOLINES +
      '#1 : Type "1" into the textbox to choose&ensp;' +
      LOWESTCOMBOMODEUserdiceroll[0] +
      "   ,  " +
      LOWESTCOMBOMODEUserdiceroll[1] +
      "&ensp;➡&ensp;" +
      LOWESTCOMBOMODEUserdiceroll[0] +
      LOWESTCOMBOMODEUserdiceroll[1] +
      BREAKONELINES +
      '#2 : Type "2" into the textbox to choose&ensp;' +
      LOWESTCOMBOMODEUserdiceroll[1] +
      "   ,  " +
      LOWESTCOMBOMODEUserdiceroll[0] +
      "&ensp;➡&ensp;" +
      LOWESTCOMBOMODEUserdiceroll[1] +
      LOWESTCOMBOMODEUserdiceroll[0] +
      BREAKTWOLINES +
      '#3 : OR.....  If you wish to roll again, enter "3" in the textbox🤗' +
      BREAKTHREELINES +
      "Be reminded that the lowest combination wins~ 🤭";
  } else if (USERRequestRoll == true) {
    LOWESTCOMBOMODEUserdiceroll = [];
    LOWESTCOMBOMODERoll();
    ////////////////////////////////////////////////////////
    // console.log("LOWESTCOMBOSECTIONoneUsertmp");
    // console.log(LOWESTCOMBOSECTIONoneUsertmp);
    // console.log("LOWESTCOMBOUserdicerollSum");
    // console.log(LOWESTCOMBOUserdicerollSum);
    console.log("LOWESTCOMBOMODEUserdiceroll 1");
    console.log(LOWESTCOMBOMODEUserdiceroll[0]);
    console.log("LOWESTCOMBOMODEUserdiceroll 2");
    console.log(LOWESTCOMBOMODEUserdiceroll[1]);
    ////////////////////////////////////////////////////////
    LOWESTCOMBOMODEuserMSG =
      "<b><u>Round " +
      LOWESTCOMBOMODECount +
      "</b></u>" +
      BREAKTWOLINES +
      Username +
      " had roll: " +
      BREAKTWOLINES +
      LOWESTCOMBOMODEUserdiceroll[0] +
      " for the first dices 🎲 and " +
      BREAKONELINES +
      LOWESTCOMBOMODEUserdiceroll[1] +
      " for the second dice 🎲" +
      "." +
      BREAKTWOLINES +
      '#1 : Type "1" into the textbox to choose&ensp;' +
      LOWESTCOMBOMODEUserdiceroll[0] +
      "   ,  " +
      LOWESTCOMBOMODEUserdiceroll[1] +
      "&ensp;➡&ensp;" +
      LOWESTCOMBOMODEUserdiceroll[0] +
      LOWESTCOMBOMODEUserdiceroll[1] +
      BREAKONELINES +
      '#2 : Type "2" into the textbox to choose&ensp;' +
      LOWESTCOMBOMODEUserdiceroll[1] +
      "   ,  " +
      LOWESTCOMBOMODEUserdiceroll[0] +
      "&ensp;➡&ensp;" +
      LOWESTCOMBOMODEUserdiceroll[1] +
      LOWESTCOMBOMODEUserdiceroll[0] +
      BREAKTHREELINES +
      "Be remindered that the lowest combination wins~ 🤭" +
      BREAKTWOLINES +
      'OR.....  If you wish to roll again, enter "Roll again" in the textbox🤗';
  }
  return LOWESTCOMBOMODEuserMSG;
}

function LOWESTCOMBOMODEuserDecONE() {
  let LOWESTCOMBOMODEuserDecONEMSG;
  LOWESTCOMBOMODEUserdicerollSum = parseInt(
    LOWESTCOMBOMODEUserdiceroll[0] + LOWESTCOMBOMODEUserdiceroll[1]
  );
  LOWESTCOMBOMODEuserDecONEMSG =
    "<b><u>Round " +
    LOWESTCOMBOMODECount +
    "</b></u>" +
    BREAKTWOLINES +
    Username +
    ": You had choosen combination of&ensp;" +
    +LOWESTCOMBOMODEUserdiceroll[0] +
    "   ,  " +
    LOWESTCOMBOMODEUserdiceroll[1] +
    BREAKTWOLINES +
    "&ensp;➡&ensp;" +
    LOWESTCOMBOMODEUserdicerollSum +
    BREAKTWOLINES +
    "There is no returning now ¯\\_(ツ)_/¯" +
    BREAKONELINES +
    "Click the submit to start the game 🤭";
  LOWESTCOMBOMODE = LOWESTCOMBOMODEMODETWO;
  return LOWESTCOMBOMODEuserDecONEMSG;
}

function LOWESTCOMBOMODEuserDecTWo() {
  let LOWESTCOMBOMODEuserDecTWOMSG;
  LOWESTCOMBOMODEUserdicerollSum = parseInt(
    LOWESTCOMBOMODEUserdiceroll[1] + LOWESTCOMBOMODEUserdiceroll[0]
  );
  LOWESTCOMBOMODEuserDecTWOMSG =
    "<b><u>Round " +
    LOWESTCOMBOMODECount +
    "</b></u>" +
    BREAKTWOLINES +
    Username +
    ": You had choosen combination of&ensp;" +
    +LOWESTCOMBOMODEUserdiceroll[1] +
    "   ,  " +
    LOWESTCOMBOMODEUserdiceroll[0] +
    BREAKTWOLINES +
    "&ensp;➡&ensp;" +
    LOWESTCOMBOMODEUserdicerollSum +
    BREAKTWOLINES +
    "There is no returning now ¯\\_(ツ)_/¯" +
    BREAKONELINES +
    "Click the submit to start the game 🤭";
  LOWESTCOMBOMODE = LOWESTCOMBOMODEMODETWO;
  return LOWESTCOMBOMODEuserDecTWOMSG;
}

function LOWESTCOMBOMODEcommturn() {
  let LOWESTCOMBOMODEcommMSG = "";
  LOWESTCOMBOMODECommRoll();
  LOWESTCOMBOMODECommdicerollSum = parseInt(
    LOWESTCOMBOMODECommdiceroll[0] + LOWESTCOMBOMODECommdiceroll[1]
  );
  ////////////////////////////////////////////////////////
  // console.log("LOWESTCOMBOSECTIONoneUsertmp");
  // console.log(LOWESTCOMBOSECTIONoneUsertmp);
  // console.log("LOWESTCOMBOUserdicerollSum");
  // console.log(LOWESTCOMBOUserdicerollSum);
  console.log("LOWESTCOMBOMODECommdiceroll 1");
  console.log(LOWESTCOMBOMODECommdiceroll[0]);
  console.log("LOWESTCOMBOMODECommdiceroll 2");
  console.log(LOWESTCOMBOMODECommdiceroll[1]);
  ////////////////////////////////////////////////////////
  LOWESTCOMBOMODEcommMSG =
    "<b><u>Round " +
    LOWESTCOMBOMODECount +
    "</b></u>" +
    BREAKTWOLINES +
    "JASON's personal robot🤖" +
    " had roll: " +
    BREAKTWOLINES +
    LOWESTCOMBOMODECommdiceroll[0] +
    " for the first dices 🎲 and " +
    BREAKONELINES +
    LOWESTCOMBOMODECommdiceroll[1] +
    " for the second dice 🎲" +
    BREAKTWOLINES +
    "With a combination of " +
    LOWESTCOMBOMODECommdicerollSum;
  //LOWESTCOMBOSECTIONoneUsertmp = [];
  LOWESTCOMBOMODE = LOWESTCOMBOMODEMODETHREE;
  return LOWESTCOMBOMODEcommMSG;
}

function LOWESTCOMBOMODEDeclareWinner() {
  let LOWESTCOMBOMODEDeclareWinnerMSG;
  if (LOWESTCOMBOMODEUserdicerollSum < LOWESTCOMBOMODECommdicerollSum) {
    LOWESTCOMBOMODEDeclareWinnerMSG =
      "<b><u>Round " +
      LOWESTCOMBOMODECount +
      "</b></u>" +
      BREAKTWOLINES +
      Username +
      " had an overall sum of " +
      LOWESTCOMBOMODEUserdicerollSum +
      BREAKTWOLINES +
      "JASON's bot had an overall score of " +
      LOWESTCOMBOMODECommdicerollSum +
      BREAKTWOLINES +
      "You had beat JASON's bot!😲" +
      BREAKTWOLINES +
      "<b>Winner: " +
      Username +
      "</b>";
  } else {
    LOWESTCOMBOMODEDeclareWinnerMSG =
      "<b><u>Round " +
      LOWESTCOMBOMODECount +
      "</b></u>" +
      BREAKTWOLINES +
      "JASON's bot an overall score of " +
      LOWESTCOMBOMODECommdicerollSum +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      LOWESTCOMBOMODEUserdicerollSum +
      BREAKTWOLINES +
      "Come on, let's go another round!😁" +
      BREAKTWOLINES +
      "<b>Winner: JASON's Bots 🤖 </b>";
  }
  LOWESTCOMBOMODE = LOWESTCOMBOMODEMODEFOUR;
  return LOWESTCOMBOMODEDeclareWinnerMSG;
}

function LOWESTCOMBOMODEPlayAgain() {
  let LOWESTCOMBOMODEPlayAgainMSG =
    "<b>Round " +
    LOWESTCOMBOMODECount +
    "</b>" +
    " had ended" +
    BREAKTWOLINES +
    "#1: Click submit button for the next round to continue playing. " +
    BREAKTWOLINES +
    '#2: Enter "EXIT" in the textbox. To exit "Beat that Mode" ' +
    BREAKTWOLINES +
    '#3: Enter "QUIT" into the textbox. To quit game mode';
  LOWESTCOMBOMODE = LOWESTCOMBOMODEMODEFIVE;
  return LOWESTCOMBOMODEPlayAgainMSG;
}

function LOWESTCOMBOMODEPlayerDecision(PLayerDecisionMade) {
  let LOWESTCOMBOMODEPlayerDecisionMSG;
  if (PLayerDecisionMade == "EXIT") {
    LOWESTCOMBOMODEUserdiceroll = [];
    LOWESTCOMBOMODEUserdicerollSum = 0;
    LOWESTCOMBOMODEUserOverallSUM = 0;
    LOWESTCOMBOMODECommdiceroll = [];
    LOWESTCOMBOMODECommdicerollSum = 0;
    LOWESTCOMBOMODECommOverallSUM = 0;
    LOWESTCOMBOMODECount = 1;
    LOWESTCOMBOMODE = LOWESTCOMBOMODEMODEONE;
    PLAYMODE = "";
    gameProcessState = GAMESTATETWO;
    LOWESTCOMBOMODEPlayerDecisionMSG = GAMEMenuMSG;
  } else {
    LOWESTCOMBOMODECount++;
    LOWESTCOMBOMODEUserdiceroll = [];
    LOWESTCOMBOMODECommdiceroll = [];
    LOWESTCOMBOMODE = LOWESTCOMBOMODEMODEONE;
    LOWESTCOMBOMODEPlayerDecisionMSG = LOWESTCOMBOMODEuserturn(false);
  }
  return LOWESTCOMBOMODEPlayerDecisionMSG;
}

function LOWESTCOMBOMODERoll() {
  for (var i = 1; i <= LOWESTCOMBOMODEnoOfdiceroll; i++) {
    LOWESTCOMBOMODEUserdiceroll.push(diceROLL().toString());
  }
  return null;
}

function LOWESTCOMBOMODECommRoll() {
  for (var i = 1; i <= LOWESTCOMBOMODEnoOfdiceroll; i++) {
    LOWESTCOMBOMODECommdiceroll.push(diceROLL().toString());
  }
  LOWESTCOMBOMODECommdiceroll.sort(function (a, b) {
    return a - b;
  });
  return null;
}

function GAMEMODEVARIABLENUMBEROFDICEMAIN(GAMEMODEVARIABLENUMBEROFDICECHOICE) {
  let GAMEMODEVARIABLENUMBEROFDICEMSG = "";
  let GAMEMODEVARIABLENUMBEROFDICECHOICES =
    GAMEMODEVARIABLENUMBEROFDICECHOICE.trim().toUpperCase();
  switch (GAMEMODEVARIABLENUMBEROFDICECHOICES) {
    case "":
      switch (GAMEMODEVARIABLENUMBEROFDICEMODE) {
        case GAMEMODEVARIABLENUMBEROFDICEMODEONE:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEMODEone();
          break;
        case GAMEMODEVARIABLENUMBEROFDICEMODETWO:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEMODETWOValidation(null);
          break;
        case GAMEMODEVARIABLENUMBEROFDICEMODETHREE:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEMODEUserThrowDice();
          break;
        case GAMEMODEVARIABLENUMBEROFDICEMODEFOUR:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEMODECommThrowDice();
          break;
        case GAMEMODEVARIABLENUMBEROFDICEMODEFIVE:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEMODEScoring();
          break;
        case GAMEMODEVARIABLENUMBEROFDICEMODESIX:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEMODEPlayAgain();
          break;
        case GAMEMODEVARIABLENUMBEROFDICEMODESEVEN:
          GAMEMODEVARIABLENUMBEROFDICEMSG =
            GAMEMODEVARIABLENUMBEROFDICEDECISION(null);
          break;
      }
      break;
    case "EXIT":
      GAMEMODEVARIABLENUMBEROFDICEMSG =
        GAMEMODEVARIABLENUMBEROFDICEDECISION("EXIT");
      break;
    case "QUIT":
      location.reload();
      break;
    default:
      if (
        GAMEMODEVARIABLENUMBEROFDICEMODE == GAMEMODEVARIABLENUMBEROFDICEMODETWO
      ) {
        GAMEMODEVARIABLENUMBEROFDICEMSG =
          GAMEMODEVARIABLENUMBEROFDICEMODETWOValidation(
            GAMEMODEVARIABLENUMBEROFDICECHOICES
          );
      }
      break;
  }
  return GAMEMODEVARIABLENUMBEROFDICEMSG;
}

function GAMEMODEVARIABLENUMBEROFDICEMODEone() {
  let GAMEMODEVARIABLENUMBEROFDICEMODEoneMSG;
  GAMEMODEVARIABLENUMBEROFDICEMODEoneMSG =
    GAMEMODEVARIABLENUMBEROFDICEMODEoneMSG =
      "<b><u>" +
      VARIABLENumberofDiceMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEVARIABLENUMBEROFDICECount +
      "</b>" +
      BREAKTWOLINES +
      "Hi " +
      Username +
      ", please enter the number of dice!";
  GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODETWO;
  return GAMEMODEVARIABLENUMBEROFDICEMODEoneMSG;
}

function GAMEMODEVARIABLESelectNUMBEROFDICE() {
  let GAMEMODEVARIABLESelectNUMBEROFDICE;
  GAMEMODEVARIABLESelectNUMBEROFDICE =
    "<b><u>" +
    VARIABLENumberofDiceMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEVARIABLENUMBEROFDICECount +
    "</b>" +
    BREAKTWOLINES +
    "You have entered " +
    GAMEMODEVARIABLENUMBEROFDICE +
    " amount of dice." +
    BREAKTWOLINES +
    "Click the submit button to continue 🤭";
  GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODETHREE;
  return GAMEMODEVARIABLESelectNUMBEROFDICE;
}

function GAMEMODEVARIABLENUMBEROFDICEMODEThrowDiceUser() {
  for (let i = 1; i <= GAMEMODEVARIABLENUMBEROFDICE; i++) {
    GAMEMODEVARIABLENUMBEROFDICEUserdiceroll.push(diceROLL());
  }
}

function GAMEMODEVARIABLENUMBEROFDICEMODEThrowDiceComm() {
  for (let i = 1; i <= GAMEMODEVARIABLENUMBEROFDICE; i++) {
    GAMEMODEVARIABLENUMBEROFDICECommdiceroll.push(diceROLL());
  }
}
function GAMEMODEVARIABLENUMBEROFDICEMODEUserThrowDice() {
  let GAMEMODEVARIABLENUMBEROFDICEMODEUserThrowDiceMSG;
  GAMEMODEVARIABLENUMBEROFDICEMODEThrowDiceUser();
  GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM = GlobalShareSUMUPArray(
    GAMEMODEVARIABLENUMBEROFDICEUserdiceroll
  );
  GAMEMODEVARIABLENUMBEROFDICEMODEUserThrowDiceMSG =
    "<b><u>" +
    VARIABLENumberofDiceMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEVARIABLENUMBEROFDICECount +
    "</b>" +
    BREAKTWOLINES +
    "You had rolled: " +
    GAMEMODEVARIABLENUMBEROFDICEUserdiceroll +
    ". With a total sum of " +
    GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM;
  GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODEFOUR;
  return GAMEMODEVARIABLENUMBEROFDICEMODEUserThrowDiceMSG;
}

function GAMEMODEVARIABLENUMBEROFDICEMODECommThrowDice() {
  let GGAMEMODEVARIABLENUMBEROFDICEMODECommThrowMSG;
  GAMEMODEVARIABLENUMBEROFDICEMODEThrowDiceComm();
  GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM = GlobalShareSUMUPArray(
    GAMEMODEVARIABLENUMBEROFDICECommdiceroll
  );
  GGAMEMODEVARIABLENUMBEROFDICEMODECommThrowMSG =
    "<b><u>" +
    VARIABLENumberofDiceMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEVARIABLENUMBEROFDICECount +
    "</b>" +
    BREAKTWOLINES +
    "Bot's had rolled: " +
    GAMEMODEVARIABLENUMBEROFDICECommdiceroll +
    ". With a total sum of " +
    GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM;
  GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODEFIVE;
  return GGAMEMODEVARIABLENUMBEROFDICEMODECommThrowMSG;
}

function GAMEMODEVARIABLENUMBEROFDICEMODETWOValidation(NUMBEROFDICEMODE) {
  let GAMEMODEVARIABLENUMBEROFDICEMODETWOValidationMSG;
  GAMEMODEVARIABLENUMBEROFDICE = parseInt(NUMBEROFDICEMODE);
  if (Number.isInteger(GAMEMODEVARIABLENUMBEROFDICE) == true) {
    GAMEMODEVARIABLENUMBEROFDICEMODETWOValidationMSG =
      GAMEMODEVARIABLESelectNUMBEROFDICE();
  } else {
    GAMEMODEVARIABLENUMBEROFDICEMODETWOValidationMSG =
      ILLEGALKEYINTERRUPT() +
      BREAKTWOLINES +
      GAMEMODEVARIABLENUMBEROFDICEMODEone();
  }
  return GAMEMODEVARIABLENUMBEROFDICEMODETWOValidationMSG;
}

function GAMEMODEVARIABLENUMBEROFDICEMODEScoring() {
  let GAMEMODEVARIABLENUMBEROFDICEMODEScoringMSG;
  if (
    GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM >
    GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM
  ) {
    GAMEMODEVARIABLENUMBEROFDICEMODEScoringMSG =
      "<b><u>" +
      VARIABLENumberofDiceMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEVARIABLENUMBEROFDICECount +
      "</b></u>" +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM +
      BREAKTWOLINES +
      "JASON's bot had an overall score of " +
      GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM +
      BREAKTWOLINES +
      "You had beat JASON's bot!😲" +
      BREAKTWOLINES +
      "<b>Winner: " +
      Username +
      "</b>";
  } else if (
    GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM <
    GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM
  ) {
    GAMEMODEVARIABLENUMBEROFDICEMODEScoringMSG =
      "<b><u>" +
      VARIABLENumberofDiceMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEVARIABLENUMBEROFDICECount +
      "</b></u>" +
      BREAKTWOLINES +
      "JASON's bot an overall score of " +
      GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM +
      BREAKTWOLINES +
      "Come on, let's go another round!😁" +
      BREAKTWOLINES +
      "<b>Winner: JASON's Bots 🤖 </b>";
  } else {
    GAMEMODEVARIABLENUMBEROFDICEMODEScoringMSG =
      "<b><u>" +
      VARIABLENumberofDiceMode +
      "</u>" +
      BREAKTWOLINES +
      ": Round " +
      GAMEMODEVARIABLENUMBEROFDICECount +
      "</b></u>" +
      BREAKTWOLINES +
      "JASON's bot an overall score of " +
      GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM +
      BREAKTWOLINES +
      Username +
      " had an overall score of " +
      GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM +
      BREAKTWOLINES +
      "Come on, let's go another round!😁" +
      BREAKTWOLINES +
      "<b>Winner: Draw Match 🤭</b>";
  }
  GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODESIX;
  return GAMEMODEVARIABLENUMBEROFDICEMODEScoringMSG;
}

function GAMEMODEVARIABLENUMBEROFDICEMODEPlayAgain() {
  let PLayAgainMSG;
  PLayAgainMSG =
    "<b><u>" +
    VARIABLENumberofDiceMode +
    "</u>" +
    BREAKTWOLINES +
    ": Round " +
    GAMEMODEVARIABLENUMBEROFDICECount +
    "</b>" +
    BREAKONELINES +
    " had ended" +
    BREAKTWOLINES +
    "#1: Click submit button for the next round to continue playing. " +
    BREAKTWOLINES +
    '#2: Enter "EXIT" in the textbox. To exit "Beat that Mode" ' +
    BREAKTWOLINES +
    '#3: Enter "QUIT" into the textbox. To quit game mode';
  GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODESEVEN;
  return PLayAgainMSG;
}

function GAMEMODEVARIABLENUMBEROFDICEDECISION(
  VARIABLENUMBEROFDICEUserDECISION
) {
  {
    let MODEDecisionMSG;
    if (VARIABLENUMBEROFDICEUserDECISION == "EXIT") {
      GAMEMODEVARIABLENUMBEROFDICE = 0;
      GAMEMODEVARIABLENUMBEROFDICECount = 1;
      GAMEMODEVARIABLENUMBEROFDICEUserdiceroll = [];
      GAMEMODEVARIABLENUMBEROFDICECommdiceroll = [];
      GAMEMODEVARIABLENUMBEROFDICEUserdicerollSUM = 0;
      GAMEMODEVARIABLENUMBEROFDICECommdicerollSUM = 0;
      GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEBEATTHATMODEONE;
      PLAYMODE = "";
      gameProcessState = GAMESTATETWO;
      MODEDecisionMSG = GAMEMenuMSG;
    } else {
      GAMEMODEVARIABLENUMBEROFDICECount++;
      GAMEMODEVARIABLENUMBEROFDICEUserdiceroll = [];
      GAMEMODEVARIABLENUMBEROFDICECommdiceroll = [];
      GAMEMODEVARIABLENUMBEROFDICEMODE = GAMEMODEVARIABLENUMBEROFDICEMODEONE;
      MODEDecisionMSG = GAMEMODEVARIABLENUMBEROFDICEMODEone();
    }
    return MODEDecisionMSG;
  }
}
