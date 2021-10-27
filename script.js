var main = function (input) {
  // let myOutputValue = rollDice();
  // let myOutputValue = makeBigNum(num1, num2) 

  let myOutputValue = play2DiceTogether(input)
  return myOutputValue;
};


let rollDice = function() {
  randomNum = (Math.random() * 6) + 1
  randomDice = Math.floor(randomNum)
  console.log(`rollDice = ` , randomDice)
  return randomDice
}

let makeBigNum = function(num1, num2){
  if (num1 > num2) {
    makeTens = num1 * 10
    console.log(`The number1 value in tens is,`, makeTens)
    makeNum = makeTens + num2
  } else {
    makeTens = num2 * 10
    console.log(`The number2 value in tens is,`, makeTens)
    makeNum = makeTens + num1
  }
  return makeNum
}


mode = "roll dice"
let dice1_1 = rollDice()
let dice1_2 = rollDice()
let dice2_1 = rollDice()
let dice2_2 = rollDice()
let playersNumbers = []

let play2DiceTogether = function(input) {
  console.log('start with', mode)
  if (mode === "roll dice"){
    console.log(`mode is`, mode)
    mode = "p1 order dice"
    console.log(`###############`)
    return `Welcome Player 1. <br>
    You rolled ${dice1_1} for Dice 1 and  ${dice1_2} for Dice 2. <br>
    Choose the order of the dice.`

  }
  console.log("out of the roll dice mode")
  console.log(`mode is`, mode)
  console.log(`input`, input)
  console.log("$$$$$$$$$$$$$$$$$")
  if (mode === "p1 order dice" && input === '1'){
    mode = "make p1 dice 1 big"
    console.log(`p1 input`, input)
    console.log(`mode is `, mode)
    makeTens = dice1_1 * 10
    console.log(`The dice1 value in tens is,`, makeTens)
    makeNum = makeTens + dice1_2
    playersNumbers.push(makeNum)
    console.log(`Submitted score for plyaer 1 to compare`, playersNumbers)
    mode = "player 2 turn"
    
    console.log(mode,`@@@@@@@@@@@@@`)
    return `Player 1, you chose Dice 1 first. <br>
    Your number is ${makeNum}.<br>
    It is now Player 2's turn.` 
  } 
  if (mode === "p1 order dice" && input === '2'){
      mode = "make p1 dice 2 big"
      console.log(`p1 input`, input)
      makeTens = dice1_2 * 10
      console.log(`The dice2 value in tens is,`, makeTens)
      makeNum = makeTens + dice1_1
      playersNumbers.push(makeNum)
      console.log(`Submitted score for plyaer 1 to compare`, playersNumbers)
      mode = "player 2 turn"
      console.log(mode,`%%%%%%%%%%%%%`)
      return `Player 1, you chose Dice 2 first. <br>
      Your number is ${makeNum}.<br>
      It is now Player 2's turn.` 
    }
  
  if (mode === "player 2 turn"){
    mode = "player 2 decide"
    return  `You rolled ${dice2_1} for Dice 1 and ${dice2_2} for Dice 2. <br>
    Choose the order of the dice.`
  }
  if (mode === "player 2 decide" && input === '1') {
    mode = "make p2 dice 1 big"
    console.log(`p2 input`, input)
    console.log(`mode is `, mode)
    makeTens = dice2_1 * 10
    console.log(`The dice1 value in tens is,`, makeTens)
    makeNum = makeTens + dice2_2
    playersNumbers.push(makeNum)
    mode = "results"
    return `Player 2, you chose Dice 1 first. <br>
    Your number is ${makeNum}.<br>`
  }
  if (mode === "player 2 decide" && input === '2') {
    mode = "make p2 dice 2 big"
    console.log(`p2 input`, input)
    makeTens = dice2_2 * 10
    console.log(`The dice2 value in tens is,`, makeTens)
    makeNum = makeTens + dice2_1
    playersNumbers.push(makeNum)
    mode = "results"
    return `Player 2, you chose Dice 1 first. <br>
    Your number is ${makeNum}.<br>`
  }
  if (mode === "results" && (playersNumbers[0]> playersNumbers[1])){
    return `Player1 created ${playersNumbers[0]} <br>
            Player2 created ${playersNumbers[1]} <br>
            Player1 wins`
  }else if (mode === "results" && (playersNumbers[0] < playersNumbers[1])){
            return `Player1 created ${playersNumbers[0]} <br>
                    Player2 created ${playersNumbers[1]} <br>
                    Player2 wins`
                  }else{`It is a draw!`
                }
}

