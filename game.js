var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];
var level = 0;


// key Event Handler
$(document).keydown(function () {
  if (level == 0)
  {
    nextSequence();
  }
});


// document touch Event Handler
$(document).touchstart(function () {
  if (level == 0)
  {
    nextSequence();
  }
});


// Button Click Event Handler
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});


function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function nextSequence() {
  level++;
  $("h1").text("Level " + level);

  // Random Number
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // animation
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(button) {
  switch (button) {
    case "red":
      let red = new Audio("./sounds/red.mp3");
      red.play();
      break;
    case "blue":
      let blue = new Audio("./sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      let green = new Audio("./sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      let yellow = new Audio("./sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      break;
  }
}

function checkAnswer() 
{
  let currentLevel = userClickedPattern.length-1;
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel])
    {
      let audio = new Audio("./sounds/wrong.mp3");
      audio.play();

      $("body").addClass("game-over");
      setTimeout(function () {
      $("body").removeClass("game-over");
      }, 200);
            
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
      return;
    }

  // Go to the Next Level after completing the sequence.
  if (userClickedPattern.length == level) 
    {
      setTimeout(nextSequence, 1000);
      userClickedPattern = []; 
    }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}

// To prevent double tap zoom in
let lastTouchEnd = 0;

document.addEventListener('touchend', function (event) {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // block zoom if it's a double tap
  }
  lastTouchEnd = now; 
});


