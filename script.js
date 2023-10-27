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

function getAnnouncementText(result, playerChoice, computerChoice) {

  playerChoice = playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1);
  computerChoice = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);

  if (result === 0) {
    return `It's a tie! You both chose ${playerChoice}`;
  } else if (result === 1) {
    return `You win! ${playerChoice} beats ${computerChoice}.`;
  } else {
    return `You lose! ${computerChoice} beats ${playerChoice}.`;
  }
}

function playRound(event) {
  
  let playerChoice = event.target.id;
  let computerChoice = getComputerChoice().toLowerCase();
  let roundResult;

  if (playerChoice === computerChoice) {
    roundResult = 0;
  } else if (playerChoice === "rock") {
    if (computerChoice === "paper") {
      roundResult = -1;
    } else {
      roundResult = 1;
    }
  } else if (playerChoice === "paper") {
    if (computerChoice === "rock") {
      roundResult = 1;
    } else {
      roundResult = -1;
    }
  } else if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      roundResult = -1;
    } else {
      roundResult = 1;
    }
  }

  if (roundResult === 1) {
    playerTotalScore++;
  } else if (roundResult === -1) {
    computerTotalScore++;
  }

  const scoresDiv = document.querySelector(".scores");
  const resultDiv = document.querySelector(".result");
  const actionPrompt = document.querySelector(".action-prompt");  

  scoresDiv.textContent = playerTotalScore + " - " + computerTotalScore;  

  resultDiv.textContent = getAnnouncementText(roundResult, playerChoice, computerChoice)

  if (playerTotalScore === 5 || computerTotalScore === 5) {
    
    endGame();  
  
    if (playerTotalScore === 5) {
      actionPrompt.textContent = "Congratulations, you won the game!"
    } else if (computerTotalScore === 5) {
      actionPrompt.textContent = "You lost the game. Better luck next time!"
    }

  } else {

    actionPrompt.textContent = "\nChoose your next play";

  }

}

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
  rock.addEventListener("click", playRound);
  const paper = document.querySelector("#paper");
  paper.addEventListener("click", playRound);
  const scissors = document.querySelector("#scissors");
  scissors.addEventListener("click", playRound);
}

function removePlayEvents() {
  const rock = document.querySelector("#rock");
  rock.removeEventListener("click", playRound);
  const paper = document.querySelector("#paper");
  paper.removeEventListener("click", playRound);
  const scissors = document.querySelector("#scissors");
  scissors.removeEventListener("click", playRound);
}

function endGame() {

  removePlayEvents();

  let replayButton = document.createElement("button");
  replayButton.textContent = "Play Again";
  replayButton.addEventListener("click", restartGame);

  const actionContainer = document.querySelector(".action-container");
  actionContainer.appendChild(replayButton);

}

function restartGame(event) {

  const scoresDiv = document.querySelector(".scores");
  const resultDiv = document.querySelector(".result");
  const actionPrompt = document.querySelector(".action-prompt");  

  playerTotalScore = computerTotalScore = 0;
  scoresDiv.textContent = playerTotalScore + " - " + computerTotalScore;
  resultDiv.textContent = "";
  actionPrompt.textContent = "Choose your play"

  event.target.remove();

  createPlayEvents();  

}

let playerTotalScore = 0, computerTotalScore = 0;

document.querySelector("#play-button").addEventListener("click", showGameDiv);

createPlayEvents();