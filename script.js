var uName = '';
var mode = '';
var first = true;
var win_count = 0;
var los_count = 0;
var tot_count = 0;
var mjp_res = 2;

var validator = function(input){
  if (input != 'scissors' && input != 'rock' && input != "paper"){
    return false;
  } else {
    return true;
  }
}

var m_validator = function(input){
  if (input != 'normal' && input != 'reverse' && input != "reverse mjp" && input != "mjp"){
    return false;
  } else {
    return true;
  }
}

var r_validator = function(input){
  if (input != 'reverse scissors' && input != 'reverse rock' && input != "reverse paper"){
    return false;
  } else {
    return true;
  }
}

var rand_srp = function(){
  let x = Math.random() * 3;
  let srp;
  if (x < 1){
    srp = 'scissors';
  } else if (x < 2){
    srp = 'rock';
  } else {
    srp = 'paper'
  }
  return srp;
}

var dpChoice = function(input1, input2){
  return uName+' has chosen: '+input1+'<br>'+'AI has chosen: '+input2+'<br>'
}

var res_det = function(input1, input2){
  var output;
  var res;
 
  if (input1 == input2){
    output = "This round is a draw.";
    res = 0;
  } else if((input1 == 'scissors' && input2 == 'paper') || (input1 == 'paper' && input2 == 'rock') || (input1 == 'rock' && input2 == 'scissors')) { 
    output = "Congratulations! You win.";
    res = 1;
  } else {
    output = "Sorry, you have lost..."
    res = -1;
  }
  return [output, res];
}

var rev_conv = function(input1){
  if (input1 == "reverse rock"){
    input1 = "rock";
  } else if(input1 == "reverse paper"){
    input1 = "paper";
  } else if (input1 == "reverse scissors"){
    input1= "scissors";
  }

  return input1;
}

var rev_det = function(input1, input2){
  var output;
  var res;
  

  
  if (input1 == input2){
    output = "This round is a draw.";
    res = 0;
  } else if((input1 == 'scissors' && input2 == 'paper') || (input1 == 'paper' && input2 == 'rock') || (input1 == 'rock' && input2 == 'scissors')) { 
    output = "Sorry, you have lost...";
    res = -1;
  } else {
    output = "Congratulations! You win.";
    res = 1;
  }
  return [output ,res];
}



var main = function (input) {
  if (!uName){
    if(!input){
      return 'Please use non-blank as input.';
    }
    uName = input;
    return 'Please select game mode:'+'<br>'+'normal/reverse/mjp/reverse mjp';
  }
  if (!mode){
    if (m_validator(input) == true){
      mode = input;
      
    } else {
      return 'Invalid game mode. Please select:'+'<br>'+'normal/reverse/mjp/reverse mjp';

    }
  }
  if (mode == 'normal'){
    if (first == true){
      first = false;
      return 'Please input: '+'<br>'+'scissors/rock/paper'+'<br>'+'to start your first game';
    }
    var vd = validator(input);
    if (vd == false){
      return 'Invalid input. Please input: '+'<br>'+'scissors/rock/paper';
    } else {
      var i2 = rand_srp();
      var ret = dpChoice(input, i2);
      var [ret1, res]= res_det(input, i2);
      ret += ret1+'<br>';
      tot_count +=1;
      if (res ==1){
        win_count+=1;
      } else if (res == -1){
        los_count +=1;
      }
      return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.'
    }
    
  } else if (mode == 'reverse'){
    if (first == true){
      first = false;
      return 'Please input: '+'<br>'+'reverse scissors/reverse rock/reverse paper'+'<br>'+'to start your first game';
    }
    var vd = r_validator(input);
    if (vd == false){
      return 'Invalid input. Please input: '+'<br>'+'reverse scissors/reverse rock/reverse paper';
    } else {
      input = rev_conv(input);
      var i2 = rand_srp();
      var ret = dpChoice(input, i2);
      var [ret1, res]= rev_det(input, i2);
      ret += ret1+'<br>';
      tot_count +=1;
      if (res ==1){
        win_count+=1;
      } else if (res == -1){
        los_count +=1;
      }
      return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
    }
  } else if (mode == 'mjp'){
    if (first == true){
      first = false;
      return 'This is a Korean game known as: Muk-jji-ppa.'+'<br>'+'Please input: '+'<br>'+'scissors/rock/paper'+'<br>'+'to start your first game';
    }
    var vd = validator(input);
    if (vd == false){
      return 'Invalid input. Please input: '+'<br>'+'scissors/rock/paper';
    }
    var i2 = rand_srp();
    var ret = 'MUK 묵! ✊ JJI 찌! ✌ PPA 빠! ✋'+'<br>';
    
    ret += dpChoice(input, i2);
   
    
    var [_, temp_res] = res_det(input, i2);

    if (temp_res ==0 && mjp_res == 2){
    
      mjp_res = temp_res;
      ret += 'The round ends in a draw'+'<br>';
      tot_count +=1;
      return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
    } else if (temp_res == 1){
      mjp_res = temp_res;
      ret += uName+': MUK 묵! ✊ JJI 찌! ✌ PPA 빠! ✋'+'<br>';
      ret+= "Please input scissors/rock/paper again."
      return ret;
    } else if (temp_res == -1){
      mjp_res = temp_res;
      ret +='AI : MUK 묵! ✊ JJI 찌! ✌ PPA 빠! ✋'+'<br>';
      ret+= "Please input scissors/rock/paper again."
      return ret;
    } else if ( temp_res == 0){
      if (mjp_res == 1){
        ret+='Congratulations! You have won this round!'+'<br>';
        tot_count +=1;
        win_count +=1;
        mjp_res =2;
        return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
      } else if (mjp_res ==-1){
        ret+='Sorry, you have lost...'+'<br>';
        tot_count +=1;
        los_count +=1;
        mjp_res= 2;
        return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
      }
    }
  } else if (mode == 'reverse mjp'){
    if (first == true){
      first = false;
      return 'This is a Korean game known as: Muk-jji-ppa in revserse mode.'+'<br>'+'Please input: '+'<br>'+'reverse scissors/reverse rock/reverse paper'+'<br>'+'to start your first game';
    }
    var vd = r_validator(input);
    if (vd == false){
      return 'Invalid input. Please input: '+'<br>'+'reverse scissors/reverse rock/reverse paper';
    }
    input = rev_conv(input);
    var i2 = rand_srp();
    var ret = 'MUK 묵! ✊ JJI 찌! ✌ PPA 빠! ✋'+'<br>';
    
    ret += dpChoice(input, i2);
   
    
    var [_, temp_res] = rev_det(input, i2);

    if (temp_res ==0 && mjp_res == 2){
    
      mjp_res = temp_res;
      ret += 'The round ends in a draw'+'<br>';
      tot_count +=1;
      return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
    } else if (temp_res == 1){
      mjp_res = temp_res;
      ret += uName+': MUK 묵! ✊ JJI 찌! ✌ PPA 빠! ✋'+'<br>';
      ret+= "Please input reverse scissors/reverse rock/reverse paper again."
      return ret;
    } else if (temp_res == -1){
      mjp_res = temp_res;
      ret +='AI : MUK 묵! ✊ JJI 찌! ✌ PPA 빠! ✋'+'<br>';
      ret+= "Please input reverse scissors/reverse rock/reverse paper again."
      return ret;
    } else if ( temp_res == 0){
      if (mjp_res == 1){
        ret+='Congratulations! You have won this round!'+'<br>';
        tot_count +=1;
        win_count +=1;
        mjp_res =2;
        return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
      } else if (mjp_res ==-1){
        ret+='Sorry, you have lost...'+'<br>';
        tot_count +=1;
        los_count +=1;
        mjp_res= 2;
        return ret+uName+', you have won '+win_count+'/'+tot_count+' games, and lost '+los_count+' games.';
      }
    }
  }
};

