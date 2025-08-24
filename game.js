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

// Start Game Event Handler
$(".btn-start").on("pointerdown", function () {
  $(this).css("display", "none");
  nextSequence();
});

// Click and touch Event Handler
$(".btn").on("pointerdown", function () {
  if (level > 0) {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
  }
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

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
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

    $("h1").text("Game Over! Click Start Game to restart.");
    startOver();
    $(".btn-start").css("display", "block");
    return;
  }

  // Go to the Next Level after completing the sequence.
  if (userClickedPattern.length == level) {
    setTimeout(nextSequence, 1000);
    userClickedPattern = [];
  }
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
