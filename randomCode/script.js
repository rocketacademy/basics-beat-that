// var numberOfPlayers = 0;
// var numberOfDice = 0;
// var playerNames = ["-----", "-----"];
// var tempNumbers = [];
// var playerNumbers = [];
// var playerTotal = [0,0];
// var mode = 0;
// var increment = 0;

// function checkInput(playerInput) {
//   var output = "";
//   for (var element of playerInput) {
//     if (arr1.includes(element)) {
//       output = `true`;
//     } else {
//       console.log(element);
//       output = `false`;
//     }
//   }
//   return output;
// }

//########## THIS WORKS ##########
// var arr1 = ["2", "4", "5"];
// var diceRoll = 3;

// function checkInput(playerInput) {
//   if (playerInput.length !== diceRoll) {
//     return `that's not the correct length.`;
//   }
//   if (playerInput.length == diceRoll) {
//     for (var i = 0; i < diceRoll; i++) {
//       console.log(playerInput[i]);
//       if (!arr1.includes(playerInput[i])) {
//         return false;
//       }
//     }
//     return true;
//   }
// }

// var main = function (input) {
//   return checkInput(input);
// };
//########## THIS WORKS ##########

//########## THIS IS THE ONE!!!!! ##########
// var arr1 = [4, 5, 2];

// var numberOfDice = 3;

// function checkInput(playerInput) {
//   var doubleCheck = [];
//   if (playerInput.length !== numberOfDice) {
//     return `that's not the correct length.`;
//   }
//   if (playerInput.length == numberOfDice) {
//     for (var h = 0; h < numberOfDice; h++) {
//       if (!arr1.includes(Number(playerInput[h]))) {
//         return false;
//       }
//     }
//     for (var i = 0; i < numberOfDice; i++) {
//       if (arr1.includes(Number(playerInput[i]))) {
//         doubleCheck.push(Number(playerInput[i]));
//       }
//     }
//     for (var j = 0; j < doubleCheck.length; j++) {
//       if (!doubleCheck.includes(arr1[j])) {
//         console.log(playerInput);
//         console.log(doubleCheck);
//         return false;
//       }
//     }
//     return true;
//   }
// }

// var main = function (input) {
//   return checkInput(input);
// };
//########## THIS IS THE ONE!!!!! ##########

// ----Array Push Testing-----
// var numeroUno = [1, 2, 3];
// var numeroDos = [4, 5];

// var main = function (input) {
//   numeroUno.push(numeroDos);
//   numeroDos = [];
//   return `this is numeroUno: ${numeroUno}<br>
//           this is numeroDos: ${numeroDos}`;
// };
// ----Array Push Testing-----

// var main = function (input) {
//   var array1 = ["", 3, 3];
//   var array2 = [2, 4];
//   for (elements of array1){
//   if()
//   }
//   return array1.includes(123);
// };

// var main = function (input) {
//   var meh = 10;
//   var bah = [4, 2];
//   return meh + bah[0];
// };

// var main = function (input) {
//   var things = [3, 5, 7, 9];
//   var otherThings = [3, 5, 2, 9];
//   for (var numbers of things) {
//     for (var items of otherThings)
//       if (numbers == items) {
//         console.log(numbers);
//         console.log(items);
//         return true;
//       } else {
//         return false;
//       }
//   }
// };

// var main = function (input) {
//   var things = [45];
//   var stuff = [56];
//   things = Number(things[0]) + Number(stuff[0]);
//   return things;
// };

//####Adding one array to another####
// var main = function (input) {
//   var top = [10, 11, 12, 13];
//   var bottom = [1, 2, 3, 4];
//   for (var i = 0; i < top.length; i++) {
//     top[i] = top[i] + bottom[i];
//   }
//   return top;
// };
//####Adding one array to another####

//####Greatest Number####
// var main = function (input) {
//   var top = [18, 25, 12, 25];
//   biggest = 0;
//   for (var numbers of top) {
//     console.log(biggest);
//     if (numbers > biggest) {
//       biggest = numbers;
//     }
//   }
//   return biggest;
// };
//####Greatest Number####

//#####OMG I THINK I DID SOMETHING AMAZING#####
// function diceRoll() {
//   return Math.floor(Math.random() * 6) + 1;
// }

// var main = function (input) {
//   var tempNumbers = [];
//   var numberOfDice = 3;
//   var comGreatest = 0;

//   for (var i = 0; i < numberOfDice; i++) {
//     tempNumbers.push(diceRoll());
//     tempNumbers.sort();
//   }
//   for (var j = tempNumbers.length - 1; j >= 0; j--) {
//     console.log(`j is ${j}`);
//     comGreatest = comGreatest + Math.pow(10, j) * tempNumbers[j];
//   }

//   console.log(`tempNumbers are ${tempNumbers}`);
//   console.log(comGreatest);
//   return comGreatest;
// };
//#####OMG I THINK I DID SOMETHING AMAZING#####

// mode 0 = usernames
// mode 1 = number of dice
// mode 2 = player 1 and 2 rolls and selections

// var tempNumbers = [5, 9, 1];

// var main = function (input) {
//   var numCheck = tempNumbers;
//   var comGreatest = 0;
//   numCheck.sort();
//   for (var i = 0; i < numCheck.length; i++) {
//     console.log(`i is ${i}`);
//     comGreatest = comGreatest + Math.pow(10, i) * tempNumbers[i];
//   }
//   console.log(comGreatest);
//   return comGreatest;
// };

// var main = function (input) {
//   var arr = [3, 2];
//   var inputCheck = [];
//   for (let i = 0; i < input.length; i++) {
//     inputCheck.push(input[i]);
//     inputCheck.sort();
//   }
//   return inputCheck;
// };

// var tempNumbers = [5, 1, 4];
// var comGreatest = 0;
// var numberOfDice = 3;

// var main = function (input) {
//   console.log(input.length);
//   if (input.length != numberOfDice) {
//     return `incorrect length.`;
//   }
//   if (input.length == numberOfDice) {
//     var numCheck = tempNumbers;
//     numCheck.sort();
//     for (var i = numCheck.length - 1; i >= 0; i--) {
//       console.log(`i is ${i}`);
//       comGreatest = comGreatest + Math.pow(10, i) * tempNumbers[i];
//     }
//     console.log(comGreatest);
//     return comGreatest;
//   }
// };

// var gameMode = `normal`;

// function norRev(checkMode) {
//   gameMode = `*Game is in Normal Mode`;
//   if (checkMode == `gameMode=Reverse`) {
//     gameMode = `*Game is in Reverse Mode`;
//   }
//   return gameMode;
// }

// var main = function (input) {
//   var int = 2;
//   var car = ["toyota", "honda", "mistsu", "prius", "audi"];
//   return car[int];
// };

// var tempNumbers = [3, 9, 7];

//-----Greatest Number-----
// function greatestNumber() {
//   var comGreatest = 0;
//   var numCheck = tempNumbers;
//   numCheck.sort();
//   for (var i = numCheck.length - 1; i >= 0; i--) {
//     comGreatest = comGreatest + Math.pow(10, i) * numCheck[i];
//   }
//   return comGreatest;
// }

var main = function (input) {
  return input.toLowerCase().trim();
};
