function loadIndex(){
    const currentUser = localStorage.getItem(USER_LS);
    
    if(currentUser !== null){
        toDoForm.classList.add(SHOWING_CN);
        toDoList.classList.add(SHOWING_CN);
    }
}

function init(){
    loadIndex();
}

init();