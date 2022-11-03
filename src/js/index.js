'use strict';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Estado da Aplicação
const lowerLimit = 20;
const upperLimit = 1;
let playerScore = 20;
let highscore = 0;

// Determina se o jogo já é impossível de ganhar. O jogador deve reiniciar o jogo.
let isLost = false; 
let isWin = false;

// DOM
let winnerNumber = Math.trunc(Math.random()*lowerLimit)+upperLimit;

// Reset do jogo após uma vitória ou uma derrota
document.querySelector('.btn--again').addEventListener('click', 
    function (){

        // Resetando o estado do jogo
        isLost = false;
        isWin = false;
        playerScore = 20;
        winnerNumber = Math.trunc(Math.random()*lowerLimit)+upperLimit;

        // Resetando o jogo
        document.querySelector('.score').textContent = playerScore;
        document.querySelector('.label--numberInfo').textContent = 'Adivinha meu número!';
        document.querySelector('body').style.backgroundColor = 'var(--bg-normal)';
        document.querySelector('.gameScreen__number').textContent = '?';
        document.querySelector('.guessNumber').value = '';
        document.querySelector('.gameScreen__current').style.width = '130px';
    }
);


// Lógica do jogo
document.querySelector('.btn--check').addEventListener('click', 
    function (){
        //Verifica se o jogo ainda continua.
        if(!isLost && !isWin){
            const guessValue = Number(document.querySelector('.guessNumber').value);
        
            //Verifica para valores inválidos
            if (guessValue < 1 || guessValue > 20 ){
                document.querySelector('.label--numberInfo').textContent = 'Valor Inválido.';

            }else if(guessValue){
                //Se o valor for válido ...
                document.querySelector('.gameScreen__number').textContent = guessValue;
                
                // Usuário acertou o número, jogo termina, deve ser reiniciado
                if (guessValue === winnerNumber) {
                    const score = Number(document.querySelector('.score').textContent);

                    document.querySelector('.label--numberInfo').textContent = 'Incrível !!';
                    document.querySelector('body').style.backgroundColor = 'var(--bg-victory)';
                    document.querySelector('.gameScreen__current').style.width = '300px';

                    isWin = true;

                    if (score > highscore){
                        highscore = score;
                        document.querySelector('.highscore').textContent = score;
                    }
                }else{
                    // Se o usuário errar o número diminui o score por um.
                    if(guessValue > winnerNumber) {document.querySelector('.label--numberInfo').textContent = 'Um pouco alto demais...';}
                    else {document.querySelector('.label--numberInfo').textContent = 'Valor Muito Baixo !';}
                    playerScore--;

                    if (playerScore >= 1){
                        document.querySelector('.score').textContent = playerScore;

                    }else{
                        // Se o score chegar a 0 o jogo terminou.
                        document.querySelector('.label--numberInfo').textContent = 'You Lost :(';
                        document.querySelector('body').style.backgroundColor = 'var(--bg-lost)';
                        document.querySelector('.score').textContent = 0;
                        isLost = true;
                    }
                }            
            }
        }     
    }
);