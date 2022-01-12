const body = document.querySelector("body");

const imgNumber = 3;

function paintImage(randomNumber){
    const image = new Image();
    image.src = `images/${randomNumber + 1}.jpg`;
    //+1 하는 이유: random 함수가 0을 줄 수 있어서
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    const number = Math.floor(Math.random() * imgNumber);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();