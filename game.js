var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).on("keydown", function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  console.log(userClickedPattern);
  checkAnswer(userClickedPattern.length - 1);
});


function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);

  var rand = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[rand];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  console.log(gamePattern);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout( () => {$("#" + currentColor).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(()=>{nextSequence()}, 1000);
      userClickedPattern = [];
      console.log("success");
    }
  }else{
    playSound("wrong");
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout( () => {$("body").removeClass("game-over")}, 200);
    $("#level-title").text("Game Over, Press Any Key To Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
}
