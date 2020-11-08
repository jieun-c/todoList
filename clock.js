const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1"),
      clockDay = clockContainer.querySelector("h3");

function getWeek(week){
    const weeks = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return weeks[week];
}

function getDay(){
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const date = today.getDate();
    const days = today.getDay();
    const day = getWeek(days);
    
    clockDay.innerHTML = `${year}.${month}.${date} ${day}`;
}

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    //객체 안에 텍스트를 넣기 위해 innerText를 사용
    //`` 백틱을 사용, `${hours}`
    clockTitle.innerText = 
        `${hours < 10 ? `0${hours}` : `${hours}`}:${minutes < 10 ? `0${minutes}`: `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`
}

function init(){
    getDay();
    getTime();
    setInterval(getTime, 1000);
}

init();