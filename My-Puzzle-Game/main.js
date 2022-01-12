const container = document.querySelector('.img-container')
const playTime = document.querySelector('.play-time')
const startBtn = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')

let tiles = [];

let isPlaying = false;
let time = 0;
let timeInterval;
let dragged = {
    el: null,
    className: null,
    index: null
};

function checkStatus() {
    let currentList = [...container.children];
    let unMatchedList = currentList.filter((child, index) =>
        Number(child.getAttribute('data-index')) !== index
    );
    if (unMatchedList.length === 0) {
        isPlaying = false;
        clearInterval(timeInterval);
        time = 0;
        gameText.style.display = 'block';
        startBtn.innerText = 'start';
        startBtn.classList.toggle('playing');
    }
}

function setGame() {
    isPlaying = true
    gameText.style.display = 'none';
    container.innerHTML = '';
    tiles = createImgTile()
    tiles.forEach((tile) => container.appendChild(tile))
    setTimeout(() => {
        shuffle(tiles)
        tiles.forEach((tile) => container.appendChild(tile))
        timeInterval = setInterval(() => {
            time++;
            playTime.innerText = time
        }, 1000);
    }, 4000)
}

function shuffle(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        let randomIndex = Math.floor(Math.random() * tiles.length);
        [tiles[i], tiles[randomIndex]] = [tiles[randomIndex], tiles[i]]
    }
}

function createImgTile() {
    let tmp = [];
    Array(16).fill().forEach((v, i) => {
        const li = document.createElement('li')
        li.setAttribute('data-index', i)
        li.setAttribute('draggable', true)
        li.classList.add(`list${i}`)
        tmp.push(li)
    })
    return tmp;
}

// event
container.addEventListener('dragstart', e => {
    dragged.el = e.target;
    dragged.index = [...container.children].indexOf(e.target);
})

container.addEventListener('dragover', e => {
    e.preventDefault();
})

container.addEventListener('drop', e => {
    if (e.target.className !== dragged.className) {
        let tmp = [...container.children];
        let dropIndex = tmp.indexOf(e.target);
        [tmp[dragged.index], tmp[dropIndex]] = [tmp[dropIndex], tmp[dragged.index]];
        tmp.forEach((tile) => container.appendChild(tile))
    }
    checkStatus()
})

startBtn.addEventListener('click', () => {
    if (isPlaying) return;
    setGame()
    startBtn.innerText = '...ing'
    startBtn.classList.toggle('playing')
})
