//game states start with choosing number of players
game_state = 'choose_player_number'

//list of variables
var playerdice = [] //array that store the optimum value of each player
var playerlist = [] //array that store the name of each player
var myOutputValue = ''  //to display message
var dice_number_contents = '' //special content variable to display dice numbers for each dice
var number_of_dice = '' //total number of dice used
var current_player = 0 //var to indicate which player is playing
var total_player = '' //total number of players
var dice_summarized_content ='' // content variable to display summarized results of rolling dice
var leaderboard = '0' //leaderboard content variable

var main = function(input){
  //game start and players choose number of players
  if(game_state == 'choose_player_number'){
    current_player = 0
    add_player(input)
    game_state = 'choose_dice_number' //change state
  return myOutputValue
  }

  //game start and players choose number of dice
  if(game_state == 'choose_dice_number'){
    number_of_dice = input
    console.log(`number_of_dice = ${number_of_dice}`)
    myOutputValue = `${number_of_dice} dice will be used in this game <br> Let's start with Player 1!`
    game_state = 'rolling_dice' //change state
  return myOutputValue
  }

  if(game_state == 'rolling_dice'){
    if(current_player < (total_player-1)){
      generate_dice_results(current_player, number_of_dice)
      myOutputValue = `Hi Player ${Number(current_player + 1)}! <br> ${dice_summarized_content} <br> It is Player ${Number(current_player + 2)}'s turn now!`
      current_player = current_player + 1
      console.log(`current_player ${current_player} vs total_player ${total_player}`)
    return myOutputValue
    } 
    
    if(current_player == (total_player-1)){
      generate_dice_results(current_player, number_of_dice)

      var highest_score = findmax(playerdice)
      leaderboard = leaderboard_generator(playerlist,playerdice)
      myOutputValue = `Hi Player ${Number(current_player + 1)}! ${dice_summarized_content} <br> Game over~~ <br>
      Highest score is ${highest_score} <br> 
      <br>
      Leaderboard <br>
      ${leaderboard} <br> <br> 
      
      Input the player number to play again!`
      game_state = 'choose_player_number'
      
      console.log(dice_summarized_content)
    return myOutputValue
    }
  return myOutputValue
  }
}

//helper function to create new arrays to store values for each player 
function add_player(input) {
  total_player = input //getting new players
  var player_index = 0 //create index for the loop
  while(player_index < total_player){ //loop to add players to player list array
    playerlist[player_index] = `Player ${(player_index+1)}` 
    player_index = player_index + 1
  }
  console.log(`total_player = ${total_player}`)
  console.log(playerlist)
  myOutputValue = `${total_player} players will participate in this game <br> Input the number of dice`
}

//rollig dice functions
var rolling_dice = function(){
  var dice_roll = Math.ceil(Math.random()*6) //generate random int between 1-6
return dice_roll
}

//generate dice results, output the optimum combination, and craft content which will be part of the message display
var generate_dice_results = function(current_player, total_dice){
  var dice_index = 1 //create index for the loop
  var dice_array = [[]] //create local variable to run the loop; no global variable is necessary since the optimum dice numbers are calculated on this function
  
  //loop to get the number of dice rolls based on the total dice numbers that were selected before
  while((dice_index-1) < total_dice){
    dice_roll = rolling_dice()
    dice_array[dice_index] = dice_roll //add dice roll result ot dice array
    dice_number_contents += `You rolled ${dice_roll} for Dice ${dice_index} <br>` //content generation for results of the roll
    dice_index = dice_index +1 

    //special condition when the loop stop, which is to get the optimum numbers
    if((dice_index-1) == (total_dice)){
      var optimum_results = descending_sorting_function(dice_array).join('') //get optimum number
      dice_summarized_content = `<br>${dice_number_contents} <br> Your optimum dice results is ${optimum_results}` //content generation for optimum number
      playerdice[current_player]= parseInt(optimum_results) //add the dice results to player dice array
      dice_number_contents = '' //reset content variable, prepare to move on to next player 
    return dice_summarized_content //only return content and it will be populated in main function
    }
  }
return dice_summarized_content
}

//helper function for sorting purposes
var descending_sorting_function = function(array){
  var sorted_array = array.slice().sort(function(a, b) {
  return b - a;
  });
return sorted_array
}

//function to find the maximum value in an array
var findmax = function(input) {
  var i = 0
  var max = 0;
  for (i = 0; i < input.length; i++) {
    if (input[i] > max) {
      max = input[i];
    }
  }
  return max;
}

//leaderboard generator to sort both create 2 extra arrays that sort both player list and player dice based on their optimum numbers of dice roll
var leaderboard_generator = function(player_list, playerdice){
  var sorted_playerdice = descending_sorting_function(playerdice)
  var sorted_playerlist = []
  leaderboard = '' //empty content variable
  index = 0
  while(index < sorted_playerdice.length){
    
    sorted_playerlist[index] = player_list[playerdice.indexOf(sorted_playerdice[index])]
    leaderboard += `Pos ${(index+1)}. ${player_list[playerdice.indexOf(sorted_playerdice[index])]}: ${sorted_playerdice[index]} points <br>`
    index = index +1
  } 
return leaderboard
}