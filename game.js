var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;

var started = false;


$(document).keypress(function() {
  if (started === false) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function() {
      nextSequence();
    }, 1000);}
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart")
    startOver();
  }
};

function nextSequence() {

  userClickedPattern = [];

    level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  makeSound(randomChosenColour);

};

function makeSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
};

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed")

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

};

function startOver() {

  gamePattern = [];
  level = 0;
  started = false;
}
