/* --- Beat That ---
-User Input: Click to roll dice, Choice of dice
Number of Players: Minimum two
Scoreboard: Score is running sum of all numbers that each player has generated so far.
Rules: Click to roll a number of dice, then choose the order of the dice for the desired number.
---Highest Number Mode---
Winning Condition: Player with the highest number is the winner of that round.
---Lowest Combined Number Mode---
Winning Condition: Player with the lowest number is the winner of that round.
---Knockout Mode---NOT DONE---
Rules: If there are more than 2 players, match 2 players at a time until there is one final winner.
---Options---
Auto-Combine Number Option: Auto-combines the highest (or lowest) combined number from the dice roll.
Number of Dice: Default is two Dice, otherwise it is possible to state other quantites of dice to use. */

// Main Menu constants
const BACK='back';
const MAIN='main';
const PLAY='play';
const OPTIONS='options';
const NAMES='names'
// Options Menu constants
const DICE='dice';
const AUTO='auto';
const FALSE='false';
const TRUE='true';
// Name Menu constants
const ADD='add';
const REMOVE='remove';
const VIEW='view';
// Menu selections
const menuSelection='---Beat That main menu---<br>Enter your selected option!<br>PLAY --- Start a new game!<br>OPTIONS --- Change your game mode!<br>NAMES --- Change the namelist of players!<br>BACK ---Return to Main Menu';
const nameHandlerSelection='Please choose the following options:<br>VIEW --- View all currently stored names<br>ADD ---Add a name to the list<br>REMOVE ---Remove a name from the list<br>BACK ---Return to Main Menu';
const optionsHandlerSelection='Please choose the following options:<br>DICE ---Allows the adjustment of the number of dice<br>AUTO ---Allows automatic obtaining of highest/lowest number<br>BACK --- Return to Main Menu';
const gameInputHandlerSelection='Please choose the following options:<br>HIGH ---Highest number wins!<br>LOW ---Lowest number wins!<br>';
// Game Menu constants
const HIGHEST='high';
const LOWEST='low';
const KNOCKOUT='ko';
const KNOCKLOW='kol';
const SET='set';
const CONT='cont';

// Directory settings
var mainMode=MAIN;  //edited from MAIN
var subMode=MAIN;  //edited from MAIN
// Permanent Settings - change in menus
var diceVar=FALSE;
var autoCombine=TRUE; //edited from FALSE
var nameArray=['asdf','qwer','zxcv']; //edited to include names
// Temp Game Options - cleared when exit to menu
var diceSet=FALSE;
var ROLL=FALSE;
var numDice=2;
var gameStage=0;
var scoreArray=[];
var diceArray=[];
var nameList=[];
var scoreList=[];
var outerCount=0;

var rollDice=function(){                           // Random Dice Roll function
  return Math.floor(Math.random()*6)+1;
};

var diceCount=function(userInput){      // Sets the number of dice for the game
  if (diceVar==FALSE){
    numDice=2;
    diceSet=TRUE;
    return mainGame(0);
  };
  if (userInput==HIGHEST || userInput==LOWEST || userInput==KNOCKOUT){
    return 'Please choose number of dice (greater than 2)';
  };
  numDice=userInput;
  diceSet=TRUE;
  return mainGame(0);
};

var autoCombiner=function(currentArray){
  var totalLength=currentArray.length;
  var placementCount=totalLength;
  var tempNumberHolder='';
  while (placementCount>1){
    var variableCount=0;
    while (variableCount<(Number(totalLength)-1)){
      if (subMode==HIGHEST ||subMode==KNOCKOUT){
        if (currentArray[variableCount]<currentArray[(Number(placementCount)-1)]){        
          tempNumberHolder=currentArray[variableCount];
          currentArray[variableCount]=currentArray[(Number(placementCount)-1)];
          currentArray[(Number(placementCount)-1)]=tempNumberHolder;

          tempNumberHolder=nameList[variableCount];
          nameList[variableCount]=nameList[(Number(placementCount)-1)];
          nameList[(Number(placementCount)-1)]=tempNumberHolder;
        };
      };
      if (subMode==LOWEST || subMode==KNOCKLOW){
        if (currentArray[variableCount]>currentArray[(Number(placementCount)-1)]){
          tempNumberHolder=currentArray[variableCount];
          currentArray[variableCount]=currentArray[(Number(placementCount)-1)];
          currentArray[(Number(placementCount)-1)]=tempNumberHolder;

          tempNumberHolder=nameList[variableCount];
          nameList[variableCount]=nameList[(Number(placementCount)-1)];
          nameList[(Number(placementCount)-1)]=tempNumberHolder;
        };
      };
      variableCount=variableCount+1;
    };
    placementCount=placementCount-1;
  };
  return currentArray;
};

var mainGame=function(userInput){         // Game mechanics
  var numRounds=nameArray.length;
  while (outerCount<numRounds){         // One round per person
    var CurrentName=nameArray[outerCount];
    if (gameStage==0){
      gameStage=1;
      ROLL=TRUE;
      return CurrentName + ', click to roll!';
    };
    if (gameStage==1){
      ROLL=FALSE;
      var innerCount=0;
      var output='';
      while (innerCount<numDice){
        diceArray[innerCount]=rollDice(); //call diceRoll function
        output=output + diceArray[innerCount] + ',';
        innerCount=innerCount+1;
      };
      gameStage=2;
    };
    if (gameStage==2){
      if (autoCombine==TRUE){
        diceArray=autoCombiner(diceArray);

        var innerCount=0;
        var tempNumberHolder='';
        while (innerCount<numDice){
          tempNumberHolder=tempNumberHolder+diceArray[innerCount];
          innerCount=innerCount+1;
        };
        console.log(nameArray[outerCount]+tempNumberHolder);
        if (scoreArray[outerCount]==null){
          scoreArray[outerCount]=tempNumberHolder;
        } else {scoreArray[outerCount]=(Number(scoreArray[outerCount])+Number(tempNumberHolder));};
        gameStage=0;
        outerCount=outerCount+1;
        return CurrentName+' total score is '+scoreArray[outerCount-1];
      };
      if (userInput==0){
        return 'Generated numbers are '+diceArray+'<br>Please enter the sequence of dice desired<br>e.g. (1,3,2)';
      };
      if (autoCombine==FALSE){
        var tempArray=userInput.split(',');
        innerCount=0;
        var temp2Array=[];
        while (innerCount<tempArray.length){
          var loopNum=Number(tempArray[innerCount])-1;
          temp2Array.push(diceArray[loopNum]);
          innerCount=innerCount+1;
        };
        innerCount=0;
        var tempNumberHolder='';
        while (innerCount<numDice){
          tempNumberHolder=tempNumberHolder+temp2Array[innerCount];
          innerCount=innerCount+1;
        }
        if (scoreArray[outerCount]==null){
          scoreArray[outerCount]=tempNumberHolder;
        } else {scoreArray[outerCount]=(Number(scoreArray[outerCount])+Number(tempNumberHolder));};
        gameStage=0;
        outerCount=outerCount+1;
        return CurrentName+' total score is '+scoreArray[outerCount-1];
    };
    };
  };
  if (scoreList.Length==0){
    return 'Click to start game!';
  }
  nameList=nameArray;
  scoreList=autoCombiner(scoreArray);
  return 'The best to worst scores are '+nameList+' with respective scores of '+scoreList+'<br>Enter CONT for another round or BACK to exit to main menu';
};

var gameInputHandler=function(userInput){ // Process inputs: 0 = Roll Dice, any other inputs is integer
  var outputMenu=gameInputHandlerSelection;
  if (subMode==MAIN){
    if (nameArray.length<2){
      mainMode=MAIN;
      return 'Please add more players before starting!<br>Add players in NAMES sub-menu.<br>'+menuSelection;
    };
    if (userInput==HIGHEST){
      subMode=HIGHEST;
      return diceCount(userInput);
    };
    if (userInput==LOWEST){
      subMode=LOWEST;
      return diceCount(userInput);
    };
    if(userInput==KNOCKOUT||subMode==KNOCKLOW){
      if(nameArray<3){
        return 'Please add at least 3 players for this game mode!<br>'+gameInputHandlerSelection;
      };
      if (userInput==KNOCKLOW){
        subMode==KNOCKLOW;
      } else {subMode==KNOCKOUT;
      };
      return diceCount(userInput);
    };
    if (nameArray>2){
      outputMenu=gameInputHandlerSelection+'KO ---Knockout Mode!';
    };
    return outputMenu;
  };
  if (userInput==CONT){
    outerCount=0;
    nameArray=nameList;
    return mainGame(userInput);
  }
  if (subMode==HIGHEST || subMode==LOWEST ||subMode==KNOCKOUT||subMode==KNOCKLOW){
    if (ROLL==TRUE){
      userInput=0;
      return mainGame(userInput);
    };
    if (diceSet==FALSE){
      return diceCount(userInput);
    };
    return mainGame(userInput);
  };
};

var nameHandler=function(userInput){      // Adds and Removes Names
  if (subMode==MAIN){
    userInput=userInput.toLowerCase();
    if (userInput==ADD){
      subMode=ADD;
      return 'Please enter a name';
    };
    if (userInput==REMOVE){
      subMode=REMOVE;
      return 'Please enter a name for deletion<br>'+nameArray;
    };
    if (userInput==VIEW){
      return 'The current list of users are: '+nameArray;
    }
    return nameHandlerSelection;
  };
  if (subMode==ADD){
    if (userInput!=''){
      nameArray.push(userInput);
      subMode=MAIN;
      return 'Current list of names are:<br>'+nameArray+'<br>'+nameHandlerSelection;
    };
    return 'Please enter a name';    
  };
  if (subMode==REMOVE){
    var outerCount=0;
    var arrayLength=nameArray.length;
    while (outerCount<arrayLength){
      if (nameArray[outerCount]==userInput){
        nameArray.splice(outerCount,1);
        subMode=MAIN;
        return 'New list of names are: '+nameArray+'<br>'+nameHandlerSelection;
      };
      outerCount=outerCount+1;
    };
    if (arrayLength==0){
      subMode=MAIN;
      return 'There are no names to delete!';
    }
    return 'Please enter a name for deletion<br>'+nameArray;
  };
  return nameHandlerSelection;
};

var optionsHandler=function(userInput){   // Handles dice variation and autocombination
  if(userInput==DICE){
    if (diceVar==FALSE){
      diceVar=TRUE;
    } else {diceVar=FALSE;
    };
    return 'Dice Variation is now '+diceVar+'!<br>'+optionsHandlerSelection;
  };
  if(userInput==AUTO){
    if (autoCombine==FALSE){
      autoCombine=TRUE;
    } else {autoCombine=FALSE;
    };
    return 'Autocombination is now '+autoCombine+'!<br>'+optionsHandlerSelection;
  };
  return 'Dice Variation: '+diceVar+'<br>Autocombine: '+autoCombine+'<br>'+optionsHandlerSelection;
};

var mainMenuSelection=function(input){    // Directs input for mainMenu
  if (input==NAMES){
    mainMode=NAMES;
    return nameHandler(input);
  };
  if(input==OPTIONS){
    mainMode=OPTIONS;
    return optionsHandler(input);
  };
  if(input==PLAY){
    mainMode=PLAY;
    return gameInputHandler(input);
  };
  return menuSelection;
};

var main = function (input) {             // Directs input based on mainMode
  if (input.toLowerCase()==BACK){       // Pushes back to main menu and resets everything
    mainMode=MAIN;
    subMode=MAIN;
    diceSet=FALSE;
    gameStage=0;
    outerCount=0;
    numDice=2;
    scoreArray=[];
    diceArray=[];
    nameList=[];
    scoreList=[];
    return menuSelection;
  }; 
  if(mainMode==NAMES){                  // Case sensitive only for Names
    return nameHandler(input);
  };
  var input=input.toLowerCase();        // All functions after this are not case senstive
  if (mainMode==MAIN){
    return mainMenuSelection(input);
  };
  if (mainMode==OPTIONS){
    return optionsHandler(input);
  };
  if (mainMode==PLAY){
    return gameInputHandler(input);
  }
  //Select gameStage - highest, lowest, knockout if >2
  return menuSelection;
};