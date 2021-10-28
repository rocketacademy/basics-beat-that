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
let dice1_1 = 0
let dice1_2 = 0
let dice2_1 = 0
let dice2_2 = 0
let playersNumbers = []
console.log("aaaaaa")

let play2DiceTogether = function(input) {
  console.log("bbbbb")
  console.log('start with', mode)
    if (mode === "roll dice"){
    dice1_1 = rollDice()
    dice1_2 = rollDice()
    console.log(`mode is`, mode)
    mode = "p1 order dice"
    console.log(`###############`)
    return `Welcome ` +  (orderDiceMsg(1,dice1_1,dice1_2))
  }
  console.log("out of the roll dice mode")
  console.log(`mode is`, mode)
  console.log(`input`, input)
  console.log("$$$$$$$$$$$$$$$$$")
  if (mode === "p1 order dice" && input === '1'){
    mode = "make p1 dice 1 big"
    console.log(`p1 input`, input)
    console.log(`mode is `, mode)
    let makeNum = compoundNum(input, dice1_1,dice1_2)
    // makeTens = dice1_1 * 10
    // console.log(`The dice1 value in tens is,`, makeTens)
    // makeNum = makeTens + dice1_2
    playersNumbers.push(makeNum)
    console.log(`Submitted score for plyaer 1 to compare`, playersNumbers)
    mode = "player 2 turn"
    console.log(mode,`@@@@@@@@@@@@@`)
    return createTotalMsg(1,1,makeNum) + `It is now Player 2's turn.` 
  } 
  if (mode === "p1 order dice" && input === '2'){
      mode = "make p1 dice 2 big"
      console.log(`p1 input`, input)
      console.log(`mode is `, mode)
      let makeNum = compoundNum(input, dice1_1,dice1_2)
      // makeTens = dice1_2 * 10
      // console.log(`The dice2 value in tens is,`, makeTens)
      // makeNum = makeTens + dice1_1
      playersNumbers.push(makeNum)
      console.log(`Submitted score for plyaer 1 to compare`, playersNumbers)
      mode = "player 2 turn"
      console.log(mode,`%%%%%%%%%%%%%`)
      return createTotalMsg(1,2,makeNum) + `It is now Player 2's turn.` 
    }
  
  if (mode === "player 2 turn"){
    dice2_1 = rollDice()
    dice2_2 = rollDice()
    mode = "player 2 decide"
    return  orderDiceMsg(2,dice2_1,dice2_2)
  }
  if (mode === "player 2 decide" && input === '1') {
    mode = "make p2 dice 1 big"
    console.log(`p2 input`, input)
    console.log(`mode is `, mode)
    let makeNum = compoundNum(input, dice2_1,dice2_2)
    // makeTens = dice2_1 * 10
    // console.log(`The dice1 value in tens is,`, makeTens)
    // makeNum = makeTens + dice2_2
    playersNumbers.push(makeNum)
    mode = "results"
    return createTotalMsg(2,1,makeNum)
  }
  if (mode === "player 2 decide" && input === '2') {
    mode = "make p2 dice 2 big"
    console.log(`p2 input`, input)
    let makeNum = compoundNum(input, dice2_1,dice2_2)
    // makeTens = dice2_2 * 10
    // console.log(`The dice2 value in tens is,`, makeTens)
    // makeNum = makeTens + dice2_1
    playersNumbers.push(makeNum)
    mode = "results"
    return createTotalMsg(2,2,makeNum)
  }
  let p1total = playersNumbers[0]
  let p2total = playersNumbers[1]
  if (mode === "results" && (p1total > p2total)){
    mode = "roll dice"
    outcome = createdMsg(1,2,p1total,p2total)
    msg = outcome + `Player 1 wins`
  }else if (mode === "results" && (p1total < p2total)){
    mode = "roll dice"        
    outcome = createdMsg(1,2,p1total,p2total)
    msg = outcome + `Player 2 wins`
  }else{                
            mode = "roll dice"
            msg =  `It is a draw!`
        }     
    playersNumbers = []
    return msg 
  }

let compoundNum = function(input,dice1, dice2){
    if (input == 1) {
      let compound = `${dice1}${dice2}`
      compoundNumber = Number(compound)
    }
    if (input == 2) {
      compound = `${dice2}${dice1}`
      compoundNumber = Number(compound)
    }
    return compoundNumber
}

let orderDiceMsg = function(playerIndex,dice1, dice2) {
  return `Player ${playerIndex}. <br><br> 
           You rolled ${dice1} for Dice 1 and  ${dice2} for Dice 2. <br><br>
           Choose the order of the dice.`
}

let createTotalMsg = function(playerIndex, diceIndex,makeNum) {
  return `Player ${playerIndex}, you chose Dice ${diceIndex} first. <br><br>
          Your number is ${makeNum}.<br><br>`
}


let createdMsg = function(p1, p2, p1total, p2total){
  return `Player ${p1} created ${p1total} <br><br>
          Player ${p2} created ${p2total} <br><br>`
}
