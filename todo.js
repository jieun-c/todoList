const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];
let idNumbers = 1;
let currentText = "";

function saveToDos(){
    //JS에서 local storage에 있는 모든 데이터를 string으로 저장하려함.
    //JSON 사용으로 JS OBJ을 String으로 바꿔줌
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    
    const cleanToDos = toDos.filter(function(toDo){
        // toDo.id : 현재 모든 배열값, li.id 누른 배열값
        // 누른 배열 값만 제외하고 배열에 저장
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function isChecked(event){
    const chkBtn = event.target;
    const li = chkBtn.parentNode.parentNode;
    
    
    toDos.forEach(function(ele){
        if(chkBtn.checked){
            toDos[getChildNumber(li)].status = "finished";
            li.classList.add("toDoDone");
        }else{
            toDos[getChildNumber(li)].status = "ready";
            li.classList.remove("toDoDone");
        }
    });
    
    saveToDos();
}

function getChildNumber(node) {
  return [].indexOf.call(node.parentNode.children, node);
}

function paintToDo(text){
    const li = document.createElement("li");
    const label = document.createElement("label");
    const check = document.createElement("input");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    
    check.setAttribute("type", "checkbox");
    delBtn.innerText = "❌";
    
    delBtn.addEventListener("click",deleteToDo);
    
    span.innerText = text;
    li.appendChild(label);
    li.appendChild(delBtn);
    label.appendChild(check);
    label.appendChild(span);
    li.id = idNumbers;
    toDoList.appendChild(li);

    check.addEventListener("click", isChecked);
    
    currentText = text;
    toDos.push(handleObj());
    saveToDos();
}

function handleObj(){
    const toDoObj = {
        id: idNumbers,
        text: currentText,
        status: "ready"
    };
    idNumbers += 1;
    return toDoObj;
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();