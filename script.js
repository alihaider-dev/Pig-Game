'use strict';

/**Selecting Element */
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

/**Game Start Conditions */

let scores, currentScore, activePlayer, playing;

const init = function () {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();


const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

/**Rolling Dice Functionality */
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check the dice value if its not 1
    if (dice !== 1) {
      //Add Dice value to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // Switch to Next Player
      switchPlayer();
    }
  }
});

/**HOLD Button Functionality */
btnHold.addEventListener('click', function () {
  if (playing) {
    //Add current score on Active player's Score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //Check if player's scores is less than 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      // Hide dice
      diceEl.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      //Switch to the next Player
      switchPlayer();
    }
  }
});

//Resesting The game logics ang functionality
btnNewGame.addEventListener('click', init);