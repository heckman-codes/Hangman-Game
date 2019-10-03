var guessesRemaining = 5;

//How many wins the player has
var wins = 0;
var winsText = document.getElementById("wins-text");

//How many losses the player has
var losses = 0;
// var lossesText = document.getElementById("losses-text").innerHTML;

// Letters chosen should be pushed to this array and emptied when you win or lose
var lettersGuessed = [];
var wordToGuess = [];

//This contains possible words to guess
var categories = ["apple", "watermelon", "pear", "persimmon", "pineapple", "rambutan", "jackfruit", "durian", "peach", "banana", "apricot", "orange", "tangerine", "coconut", "kumquat", "honeydew", "blueberry", "mango", "soursop", "lemon", "raspberry", "strawberry", "blackberry", "cranberry", "peach", "nectarine", "cherry", "date", "lychee", "grape", "guava", "kiwi", "lime", "passionfruit", "pomegranate", "mangosteen", "starfruit", "boysenberry", "lingonberry", "cherimoya", "cantaloupe", "longan", "papaya"];

//This variable is random word from the categories array
var chosenWord = categories[Math.floor(Math.random() * categories.length)];
console.log(chosenWord + " is the chosen word");
var messageBoxText = document.getElementById("message-text");

//This objects contains all the messages that can occur during this game
var messages = {
    begin: "Choose a letter to begin!",
    win: "You win this round!",
    lose: "You didn't guess the word! Play Again?",
    correct: "That letter was correct! Pick another one.",
    incorrect: "That was incorrect, try another letter",
    guessed: "You already guessed that letter, try a different letter",
};

var wordHolder = document.getElementById("word-to-guess-text").innerHTML;
var lettersGuessedText = document.getElementById("guessed-letters-text");
var livesLeftText = document.getElementById("lives-left");
livesLeftText.innerHTML = "You have " + guessesRemaining + " lives remaining";
console.log(livesLeftText.innerHTML);
livesLeftText.innerHTML = "You have " + guessesRemaining + " lives remaining";

//This create the spaces for the letter you need to guess at the length of the chosenWord
for (let i = 0; i < chosenWord.length; i++) {
    wordToGuess.push("_");
    document.getElementById("word-to-guess-text").innerHTML = wordToGuess.join(" ");
};

//This function checks if you pushed a-z and converts it to lowercase 
document.onkeyup = function (event) {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        userGuess(event.key.toLowerCase());
    }
};

// This function takes whatever letter you pushed and checks if matches any of the the selected word letters
function userGuess(letter) {
    //If you run out of guesses or win, you can't push any more buttons
    if ((guessesRemaining == 0) || (wordToGuess.indexOf("_") === -1)) {
        return;
    } else if (lettersGuessed.indexOf(letter) === -1) {
        lettersGuessed.push(letter);
        lettersGuessed.join(" ");
        checkGuess(letter);
        console.log("you have " + guessesRemaining + " guesses remaining");
    } else {
        messageBoxText.innerHTML = messages.guessed;
    };
    updateDisplay();
    checkForWin();
};

//This checks to see if the letter you choose is correct and stores correct guesses in the wordToGuess display
function checkGuess(letter) {
    var letterPostions = [];  //Stores letter Positions
    for (var g = 0; g < chosenWord.length; g++) {
        if (chosenWord[g] === letter) {
            letterPostions.push(g);
            wordToGuess[g] = letter;
            wordToGuess.join(" ");
        }
    };
    // This determines if the letter you chose was correct or not
    if (letterPostions.length <= 0) {
        guessesRemaining--;
        messageBoxText.innerHTML = messages.incorrect;
    } else {
        for (var g = 0; g < letterPostions.length; g++) {
            wordToGuess[chosenWord[g]] = letter;
        }
        messageBoxText.innerHTML = messages.correct;
    }
    console.log(letterPostions);
    updateDisplay();
};

// This hides the reset button
document.getElementById("reset-button").style.visibility = "hidden";

//This updates the diplay to show current wins, guesses remaining, letters guessed
function updateDisplay() {
    document.getElementById("word-to-guess-text").innerText = wordToGuess.join(" ");
    winsText.innerHTML = "Wins: " + wins;
    wordHolder = wordToGuess.join(" ");
    livesLeftText.innerHTML = "You have " + guessesRemaining + " lives remaining";
    lettersGuessedText.innerHTML = lettersGuessed.join(" ");

    // Diplsays the lose message if you run out of guesses
    if (guessesRemaining <= 0) {
        lettersGuessedText.innerHTML = "The word was: " + chosenWord;
        messageBoxText.innerHTML = messages.lose;
    };

};

// This checks to see if you won but measuring unsolved letters, guesses remaining, and displays win or lose button, shows the reset button either way.
function checkForWin() {
    if (wordToGuess.indexOf("_") === -1) {
        wins++;
        console.log(wins);
        messageBoxText.innerHTML = messages.win;
        document.getElementById("reset-button").style.visibility = "visible";
    } else if (guessesRemaining < 1) {
        messageBoxText.innerHTML = messages.lose;
        document.getElementById("reset-button").style.visibility = "visible";
        console.log(messages.lose);
    };
    updateDisplay();
};

//This button resets the guesses remaining and chooses a new word, updates the displays, and then hides the button again.
function resetButton() {
    guessesRemaining = 5;
    chosenWord = categories[Math.floor(Math.random() * categories.length)];
    console.log(chosenWord + " is the chosen word");
    messageBoxText.innerHTML = messages.begin;
    wordToGuess = [];
    lettersGuessed = [];
    for (var i = 0; i < chosenWord.length; i++) {
        wordToGuess.push("_");
        document.getElementById("word-to-guess-text").innerHTML = wordToGuess.join(" ");
    }
    document.getElementById("reset-button").style.visibility = "hidden";
    updateDisplay();
};