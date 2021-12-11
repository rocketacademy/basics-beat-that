var Dice1;
var Dice2;
var orderMode="";
var playerMode=1;
var player1Score=0;
var player2Score=0;
var outputmsg1= "Player 1, you chose Dice 1 first.<br>" + "Your number is ";
var outputmsg2= "Player 1, you chose Dice 2 first.<br>" + "Your number is ";
var outputmsg3= "Player 2, you chose Dice 1 first.<br>" + "Your number is ";
var outputmsg4= "Player 2, you chose Dice 2 first.<br>" + "Your number is ";
var outputmsg5= "<br> It is now Player 1's turn. <br>";
var outputmsg6= "<br> It is now Player 2's turn. <br>";
var outputmsg7="The current leaderboard is Player 1 wins with score ";
var outputmsg8="The current leaderboard is Player 2 wins with score " ;
var outputmsg9="The current leaderboard is both players tie with score ";
var outputmsg10=".<br> The Player 1's score is ";
var outputmsg11=".<br> The Player 2's score is "

var main = function (input) {
  
  if (orderMode=="")
  { Dice1=rollDice();
    Dice2=rollDice();
    orderMode="Choose Mode";
    return "Welcome Player "+ playerMode +". You rolled " + Dice1 +" for Dice 1 and " + Dice2 + " for Dice 2. <br> Choose the order of the dice, eg input 1 for Dice 1, input 2 for Dice 2.";
  }
  else if (orderMode =="Choose Mode")
  {   var combinedNum;
    if (input==1 && playerMode==1)
      { combinedNum=Dice1.toString()+Dice2.toString();
        combinedNum=Math.floor(combinedNum);
        player1Score=player1Score+combinedNum;
        orderMode="";
        playerMode=2;
        if (player1Score>player2Score)
        {  return outputmsg1 + combinedNum + outputmsg6
        + outputmsg7 +player1Score + outputmsg11 + player2Score +"."; 
        }
        else if (player2Score>player1Score)
        {  return outputmsg1 + combinedNum + outputmsg6
        + outputmsg8 +player2Score + outputmsg10 + player1Score +".";}
        else
        {  return outputmsg1 + combinedNum + outputmsg6
        + outputmsg9 +player2Score +".";
        } //tie
      }
    else if (input==2 && playerMode==1)
    {   combinedNum=Dice2.toString()+Dice1.toString();
        combinedNum=Math.floor(combinedNum);
        player1Score=player1Score+combinedNum;
        orderMode="";
        playerMode=2;
        if (player1Score>player2Score)
        {  return outputmsg2 + combinedNum + outputmsg6
        + outputmsg7 +player1Score +outputmsg11+ player2Score +"."; 
        }
        else if (player2Score>player1Score)
        {  return outputmsg2 + combinedNum + outputmsg6
        + outputmsg8 +player2Score +outputmsg10+ player1Score +".";}
        else
        {  return outputmsg2 + combinedNum + outputmsg6
        + outputmsg9 +player2Score +".";
        } //tie
    }

    if (input==1 && playerMode==2)
      { combinedNum=Dice1.toString()+Dice2.toString();
        combinedNum=Math.floor(combinedNum);
        player2Score=player2Score+combinedNum;
        orderMode="";
        playerMode=1;
         if (player1Score>player2Score)
        {  return outputmsg3 + combinedNum + outputmsg5
        + outputmsg7 +player1Score +outputmsg11 + player2Score +"."; 
        }
        else if (player2Score>player1Score)
        {  return outputmsg3 + combinedNum + outputmsg5
        + outputmsg8 +player2Score +outputmsg10 + player1Score +".";}
        else
        {  return outputmsg3 + combinedNum + outputmsg5
        + outputmsg9 +player2Score +".";
        } //tie
      }
    else if (input==2 && playerMode==2)
    {   combinedNum=Dice2.toString()+Dice1.toString();
        combinedNum=Math.floor(combinedNum);
        player2Score=player2Score+combinedNum;
        orderMode="";
        playerMode=1;
         if (player1Score>player2Score)
        {  return outputmsg4 + combinedNum + outputmsg5
        + outputmsg7 +player1Score +outputmsg11 + player2Score +"."; 
        }
        else if (player2Score>player1Score)
        {  return outputmsg4 + combinedNum + outputmsg5
        + outputmsg8 +player2Score +outputmsg10 + player1Score +".";}
        else
        {  return outputmsg4 + combinedNum + outputmsg5
        + outputmsg9 +player2Score +".";
        } //tie
    }
        return "Player"+ playerMode +", Please input 1 for Dice 1, input 2 for Dice 2.";
  }

};

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  return randomInteger+1;
}
