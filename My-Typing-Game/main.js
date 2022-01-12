const GAME_TIME = 5;
let words = [];
let score = 0;
let time = GAME_TIME;
let timeInterval;
let isPlaying = false;

const wordDispaly = document.querySelector('.word');
const wordInput = document.querySelector('.word-input');
const timeDisplay = document.querySelector('.time');
const scoreDisplay = document.querySelector('.score');
const btn = document.querySelector('.btn');

init();

function init() {
    wordInput.addEventListener('input', match);
    getWord();
}

function getWord() {
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            // handle success
            response.data.forEach(word => {
                if (word.length < 10) {
                    words.push(word);
                }
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

function run() {
    if (isPlaying) {
        return;
    }
    wordInput.value = '';
    isPlaying = true;
    btnChange('게임중...')
    score = 0;
    scoreDisplay.innerText = score;
    time = GAME_TIME;
    timeInterval = setInterval(countDown, 1000);
}

function match() {
    if (!isPlaying) {
        return;
    }
    if (wordDispaly.innerText.toUpperCase() === wordInput.value.toUpperCase()) {
        score++;
        time = GAME_TIME;
        wordInput.value = '';
        scoreDisplay.innerText = score;

        let random = Math.floor(Math.random() * words.length);
        wordDispaly.innerText = words[random];
    }
}

function countDown() {
    if (time > 0) {
        time--;
    } else {
        finish();
    }
    timeDisplay.innerText = time;
}

function finish() {
    isPlaying = false;
    clearInterval(timeInterval);
    btnChange('게임시작');
}

function btnChange(text) {
    btn.innerText = text;
    btn.classList.toggle('loading');
}