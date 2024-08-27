'use strict';

//selecting Elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const totalScore0 = document.getElementById('score--0')
const totalScore1 = document.getElementById('score--1')
const currentScore0 = document.getElementById('current--0')
const currentScore1 = document.getElementById('current--1')
const dice = document.querySelector('.dice')
const rollDice = document.querySelector('.btn--roll')
const newGame = document.querySelector('.btn--new')
const holdDice = document.querySelector('.btn--hold')

const canvas = document.getElementById(confetti)
const jsConfetti = new JSConfetti()
//initial state of scores and dice

let scores , currentScore ,activePlayer , playing

const init = function(){
    scores = [0,0]
    currentScore = 0;
    // currentScoreP1 = 0;
    activePlayer = 0;
    playing = true;

    totalScore0.textContent = 0;
    totalScore1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    dice.classList.add('hidden');

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
    document.getElementById('won--0').classList.add('hidden')
    document.getElementById('won--1').classList.add('hidden')
}

init();



const playerSwitch = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1: 0

    // if(player0El.classList.contains('player--active')){
    //     player0El.classList.remove('player--active')
    //     player1El.classList.add('player--active')
    // }else{
    //     player0El.classList.add('player--active')
    //     player1El.classList.remove('player--active')
    // }
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

//rolling of the dice
rollDice.addEventListener('click',function(){

    if(playing){
    //generate random dice roll
    const randomDice = Math.trunc(Math.random() *6 ) + 1

    //display the dice
    dice.classList.remove('hidden')
    dice.src = `dice-${randomDice}.png`

    //if dice rolled to one change to next player
    if(randomDice !== 1){
        //add dice to current score
        currentScore = currentScore + randomDice; 
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // currentScore0.textContent = currentScore;  //CHANGE LATER
        
    }else{ //(randomDice === 1)
        //switch to next player
        playerSwitch();

    }
}
})



holdDice.addEventListener('click',function(){
    if(playing){
        scores[activePlayer] += currentScore;
        //score[1] = score[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if(scores[activePlayer]>=100){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            dice.classList.add('hidden')
            document.getElementById(`won--${activePlayer}`).classList.remove('hidden')
            jsConfetti.addConfetti({
                confettiRadius: 6
            })
        }else{
            //switching the player
            playerSwitch();
        }
    }
})

newGame.addEventListener('click', init)
    // totalScore0.textContent = 0;
    // totalScore1.textContent = 0;
    // currentScore0.textContent = 0;
    // currentScore1.textContent = 0;
    // playing = true;
    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
    // player0El.classList.add('player--active')
    // player1El.classList.remove('player--active')
    // dice.classList.add('hidden')

