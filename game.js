let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["green", "red", "yellow", "blue"];
let level = 0;

const sounds = {
  red: new Audio("./sounds/red.mp3"),
  blue: new Audio("./sounds/blue.mp3"),
  green: new Audio("./sounds/green.mp3"),
  yellow: new Audio("./sounds/yellow.mp3"),
};

// Unlocked browser sound
$(document).one("touchstart", function () {
  let sound = sounds.red;
  sound.play().then(function () {
    sound.pause();
  });
});

// Screen touch and key Event Handler
$(document).on("touchstart keydown", function () {
  if (level == 0) {
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

  playSound(randomChosenColor);

  // animation
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
}

function playSound(button) {
  sounds[button].currentTime = 0;
  sounds[button].play();
}

function checkAnswer() {
  let currentLevel = userClickedPattern.length - 1;
  if (userClickedPattern[currentLevel] != gamePattern[currentLevel]) {
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
  if (userClickedPattern.length == level) {
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

document.addEventListener("touchend", function (event) {
  const now = new Date().getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault(); // block zoom if it's a double tap
  }
  lastTouchEnd = now;
});



