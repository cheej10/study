const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greet = document.querySelector(".js-greet");

const User_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text){
    localStorage.setItem(User_LS, text);
}

function handleSubmit(event){
    event.preventDefault(); //이벤트 기본동작 막기
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}

function askName(){
    form.classList.add(SHOWING_CN); //폼 보여주기
    form.addEventListener("submit", handleSubmit);
}

function paintName(text){
    form.classList.remove(SHOWING_CN); //폼 숨기기
    greet.classList.add(SHOWING_CN); //greet 보여주기
    greet.innerHTML = `반갑습니다, ${text}님!`;
}

function loadName(){
    const currentUser = localStorage.getItem(User_LS);
    if(currentUser === null){ //유저 없으면
        askName();
    } else {    //유저 있으면
        paintName(currentUser);
    }
}

function init(){
    loadName();
}

init();