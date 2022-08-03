var playerno = 0
var noofplayers = 0
var hasanswered = false
var playerinfo = {Player: 0, Playerscore: 0} //object prototype
var list = [] //Object list (for both playerno and playerscore)
var list2 = [] //Number list (for playerscore only)
var list3 = [] //player list
var found = false
var sanitycheck = false
var bypass = false
var egg = false
var eggval = 0

function main(input){

        if(bypass==true){
            if(input.length==0 || isNaN(input)){
                return "Enter your crowd of players."
            }
            noofplayers = Number(input)
                bypass = false
                egg = true
                eggval = Number(input)
        }
        if(noofplayers == 0){
            if(sanitycheck == true){
                if(input == "yes"){
                    bypass = true
                    return "Very well, good luck and have fun.<br>Input your number of players."
                }
                sanitycheck = false
            }
            if(input.length==0 || isNaN(input) ){           //catch errors
                return "Please input Number of Players"
            }
            if(input>50){
                sanitycheck = true
                return "you will spend a LONG time inputting values, the program can handle it, can you?"   //sanity check
            }
            
            noofplayers = Number(input)
        }

        if(playerno <= noofplayers && hasanswered == false){
            if(input.length>0){                              //catch errors
                return "Press submit to roll the dice."
            }
            welcomemsg1.innerHTML = "Game has started. Have fun!"
            welcomemsg2.innerHTML = `Players left: ${noofplayers-playerno}`
            if(noofplayers-playerno>100){
                welcomemsg1.innerHTML = "You won't finish this, refresh the page."
            }
            playerno++
            outputval = `Welcome Player ${playerno}<br>`
            dice1=rolldice()
            dice2=rolldice()
            outputval = outputval + `Your dice rolls are ${dice1} for dice 1 & ${dice2} for dice 2<br>
            Choose the order of the dice by entering "1" or "2".`
        }
        hasanswered = true
        if(input == 1){
            diceresult = String(dice1) + String(dice2)
            outputval = `Player ${playerno} chose dice ${input} to be first<br>Your number is ${diceresult}.`
            hasanswered = false

//Creating Objects and assigning values to them and store them in array: "list"
            Objectmake = input //creating seperate variable to not confuse with actual input
            Player = playerno
            Objectmake = Object.create(playerinfo)
            Objectmake.Player = Number(Player)
            Objectmake.Playerscore = Number(diceresult)
            list.push(Objectmake)
            list2.push(Objectmake.Playerscore)
            
        } else if(input == 2){
            diceresult = String(dice2) + String(dice1)
            outputval = `Player ${playerno} chose dice ${input} to be first<br>Your number is ${diceresult}.`
            hasanswered = false

//Creating Objects and assigning values to them and store them in array: "list"
            Objectmake = input //creating seperate variable to not confuse with actual input
            Player = playerno
            Objectmake = Object.create(playerinfo)
            Objectmake.Player = Number(Player)
            Objectmake.Playerscore = Number(diceresult)
            list.push(Objectmake)
            list2.push(Objectmake.Playerscore)

         } 
        if (playerno==noofplayers+1){
            welcomemsg1.innerHTML="Game has ended, Here are the rankings!"
            welcomemsg2.innerHTML="Refresh the page to play again!"
            list2.sort(function(a,b){       //sort array from highest to lowest ex[4,3,2,1]
                if(a > b) return -1;
                if(a < b) return 1;
                 0;
            })
                for(i=0;i<noofplayers;i++){              //create array "list3" to store leaderboard positions
                    highestnum = list2[i]                                              //obtain Number 
                    indexx = 0

                    //loop thru the whole list2 to check how many players have the same Number as obtained in highestnum at line:80
                    //without while loop to check will have repeat players appear on leaderboard if multiple identical numbers are recorded
                    while(indexx<list2.length){     
                        if(list[indexx].Playerscore == highestnum){ 

                            //finding the index of the player with that score       
                            searchIndex = list.findIndex((P) => P.Playerscore == highestnum)

                            //pushing that player into array list3
                            list3.push(list[searchIndex].Player)

                            //deleting the index of that specific player with that score to prevent duplicates
                            delete(list[searchIndex].Playerscore)             

                        }
                        indexx++
                    }
                }
                outputval = "Rankings:<br>"
                if(egg == true && eggval >= 100){
                    welcomemsg1.innerHTML="Jesus."
                    welcomemsg2.innerHTML="You're bored."
                }

                for(i=0;i<noofplayers;i++){       
                    outputval = outputval + `${(i+1)}. Player ${list3[i]} with the number ${list2[i]}<br>`
                }
        } 
    return outputval
}

//generate random number from 1-6
function rolldice(){
    randomfloat = Math.random()*6
    randomint = Math.floor(randomfloat) +1
    return randomint
}
