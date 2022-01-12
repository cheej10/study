const todoForm = document.querySelector(".js-todo");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todolist");

const ToDos_LS = "currentToDos";
let todoArray = [];

function deleteToDos(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanToDos = todoArray.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    todoArray = cleanToDos;
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(ToDos_LS, JSON.stringify(todoArray));
    //string으로 LS에 저장
}

function paintToDos(text){
    const li = document.createElement("li");
    li.id = todoArray.length + 1;
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click",deleteToDos);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    const todoObj = {
        text: text,
        id: todoArray.length + 1
    }
    todoArray.push(todoObj);
    saveToDos();
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintToDos(currentValue);
    todoInput.value = "";   //입력칸 초기화
}
function loadToDos(){
    const toDos = localStorage.getItem(ToDos_LS);
    if(toDos !== null){
        const parsedToDos = JSON.parse(toDos);
        //LS에 저장된 toDos(string) -> 객체로 다시 변환
        parsedToDos.forEach(function(ToDo){
            paintToDos(ToDo.text);
        })
    }
}

function init(){
    loadToDos();
    todoForm.addEventListener("submit",handleSubmit);
}

init();