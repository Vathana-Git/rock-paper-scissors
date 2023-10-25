function getComputerChoice() {
  let rnd = Math.floor(Math.random() * 3) + 1;
  if (rnd === 1) {
    return "Rock";
  } else if (rnd === 2) {
    return "Paper";
  } else if (rnd === 3) {
    return "Scissors";
  }
}

function getPlayerChoice() {
  let choice = "";
  while (true) {
    if (choice != "Rock" && choice != "Paper" && choice != "Scissors") {
      choice = prompt("Choose your play: ");
      choice = choice.toLowerCase()
      choice = choice.charAt(0).toUpperCase() + choice.slice(1);
    } else {   
      return choice;
    }
  }
}

function playRound(playerChoice, computerChoice) {

  // Return 1 if the player wins, -1 if the computer wins, or 0 if it's a tie

  playerChoice = playerChoice.toLowerCase();
  computerChoice = computerChoice.toLowerCase();

  if (playerChoice === computerChoice) {
    return 0;
  } else if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      return -1;
    } else {
      return 1;
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock") {
      return 1;
    } else {
      return -1;
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      return -1;
    } else {
      return 1;
    }
  }
}

function announcement(result, playerChoice, computerChoice) {

  playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
  computerChoice = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

  if (result === 0) {
    return "It's a tie!"
  } else if (result === 1) {
    return `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    return `You lose! ${computerChoice} beats ${playerChoice}.`;
  }
}

function game() {

  let score = 0;
  let result = "";
  let playerChoice, computerChoice;

  for (let i = 0; i < 5; i++) {
    playerChoice = getPlayerChoice();
    computerChoice = getComputerChoice();
    result = playRound(playerChoice, computerChoice);
    console.log(`Round ${Number(i) + 1}: ${announcement(result, playerChoice, computerChoice)}`)
    score = score + Number(result);
  }

  if (score === 0) {
    console.log("It's a draw!")
  } else if (score > 0) {
    console.log("Congratulations, you won!")
  } else {
    console.log("You lost. Better luck next time!")
  }
}

// 

function showGameDiv() {

  const welcomeContainer = document.querySelector(".welcome-container");
  welcomeContainer.style.height = "0";
  welcomeContainer.style.overflow = "hidden";
  welcomeContainer.style.transition = "opacity 1s ease-out";
  const gameContainer = document.querySelector(".game-container");
  gameContainer.style.height = "100%";
  gameContainer.style.overflow = "auto";
  gameContainer.style.transition = "opacity 1s ease-out";  

}

function createPlayEvents() {
  const rock = document.querySelector("#rock");
  rock.addEventListener("click", choosePlay);
  const paper = document.querySelector("#paper");
  paper.addEventListener("click", choosePlay);
  const scissors = document.querySelector("#scissors");
  scissors.addEventListener("click", choosePlay);
}

function removePlayEvents() {
  const rock = document.querySelector("#rock");
  rock.removeEventListener("click", choosePlay);
  const paper = document.querySelector("#paper");
  paper.removeEventListener("click", choosePlay);
  const scissors = document.querySelector("#scissors");
  scissors.removeEventListener("click", choosePlay);
}

function choosePlay(event) {

  let playerChoice = event.target.id;
  let computerChoice = getComputerChoice();

  let result = playRound(playerChoice, computerChoice);

  if (result === 1) {
    playerTotalScore++;
  } else if (result === -1) {
    computerTotalScore++;
  }

  const scores = document.querySelector(".scores");
  const resultDiv = document.querySelector(".result");
  const actionPrompt = document.querySelector(".action-prompt");  

  scores.textContent = playerTotalScore + " - " + computerTotalScore;  

  if (playerTotalScore === 5) {
    resultDiv.textContent = "Congratulations, you won!"
  } else if (computerTotalScore === 5) {
    resultDiv.textContent = "You lost. Better luck next time!"
  }

  if (playerTotalScore === 5 || computerTotalScore === 5) {
    let replayButton = document.createElement("button");
    replayButton.textContent = "Play Again";
    replayButton.addEventListener("click", () => {
      location.reload();
    });
    const actionContainer = document.querySelector(".action-container");
    actionContainer.appendChild(replayButton);
    actionPrompt.remove();
    removePlayEvents();
  } else {
    resultDiv.textContent = announcement(result, playerChoice, computerChoice)
    actionPrompt.textContent = "\nChoose your next play";
  }
}

const playButton = document.querySelector("#play-button");
playButton.addEventListener("click", showGameDiv);

let playerTotalScore = 0, computerTotalScore = 0;

createPlayEvents();