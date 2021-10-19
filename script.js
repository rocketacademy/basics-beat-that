class App {
  state = GameState.Start;
  previousState = -1;
  #players = [];
  #currentTurnIndex = 0;
  #currentRolls = [];

  startGame() {
    this.#players = [new Player("Player 1"), new Player("Player 2")];

    this.newRound();
  }

  newRound() {
    this.#currentTurnIndex = this.#currentTurnIndex % this.#players.length;
    this.#currentRolls = [this.rollDice(), this.rollDice()];

    this.clearOutput();
    this.print(`Welcome ${this.#players[this.#currentTurnIndex].getName()}.`);
    this.print(`You have rolled ${this.#currentRolls[0]} and ${this.#currentRolls[1]}.`);
    this.print(`Choose the order of the dice by entering the number you rolled.`);

    this.previousState = GameState.NewRound;
    this.state = GameState.Playing;
  }

  processInput() {
    for (const [index, roll] of this.#currentRolls.entries()) {
      if (roll == this.getInput()) {
        const currentPlayer = this.#players[this.#currentTurnIndex];
        const points = Number(`${this.#currentRolls[index]}${this.#currentRolls[(index + 1) % this.#players.length]}`);
        currentPlayer.addScore(points);

        this.print("");
        this.print(`${currentPlayer.getName()}, your number is ${points} and your score is ${currentPlayer.getScore()}.`);

        if (this.#currentTurnIndex < this.#players.length - 1) {
          this.print(`It is now ${this.#players[this.#currentTurnIndex + 1].getName()}'s turn.`);
          this.print("");
        } else {
          this.print("Game over! Press submit to view scores!");
        }

        this.#currentTurnIndex += 1;
        this.previousState = GameState.Playing;
        this.state = GameState.NewRound;
        this.clearInput();

        if (this.#currentTurnIndex - 1 === this.#players.length - 1) {
          this.state = GameState.End;
        }

        break;
      }
    }
  }

  endGame() {
    this.clearOutput();
    // console.log("END GAME!");
    for (const [index, player] of this.#players.entries()) {
      this.print(`${player.getName()} has ${player.getScore()} points.`);
    }
  }

  reset() {
    this.state = GameState.Start;
    this.#players = [];
  }

  getInput() {
    const inputElement = document.querySelector("#input-beat-that");
    return inputElement.value;
  }

  clearInput() {
    const inputElement = document.querySelector("#input-beat-that");
    inputElement.value = "";
  }

  clearOutput() {
    const outputElement = document.querySelector("#output-div");
    outputElement.innerHTML = "";
  }

  print(text) {
    const outputElement = document.querySelector("#output-div");
    outputElement.innerHTML += text + "<br>";
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}
class Player {
  #name = "Player Unknown";
  #score = 0;

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  addScore(score) {
    this.#score += score;
  }

  getScore() {
    return this.#score;
  }
}

const GameState = Object.freeze({
  Start: 0,
  NewRound: 1,
  Playing: 2,
  End: 3
});

const button = document.querySelector("#submit-button");
const instructionsText = document.querySelector("#instructions");
const app = new App();

button.addEventListener("click", main);
instructionsText.innerHTML = "Welcome to Beat That!" +
  "<br>" + "Click on the submit button to start the game!";

function main() {
  // console.log(app.state);
  if (app.state === GameState.Start) {
    instructionsText.innerHTML = "Welcome to Beat That!";
    app.startGame();
  } else if (app.state === GameState.NewRound) {
    app.newRound();
  } else if (app.state === GameState.Playing) {
    app.processInput();
  } else if (app.state === GameState.End) {
    app.endGame();
  };
}