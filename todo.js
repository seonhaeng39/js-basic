const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList")

const TODOS_LS = "toDos"
let toDos = [];


function deleteToDo(event){
    //클릭한 요소 선택, 선택한 버튼의 부모li선택
    const btn = event.target;
    const li = btn.parentNode;
    //html에서 지움
    toDoList.removeChild(li);

    // 삭제하는 내용과 id가 다른 것들을 남겨서 목록으로 만듦
    const cleanToDos = toDos.filter(function(toDo){
        //parseInt --> 텍스트를 숫자로 변환
        return toDo.id !== parseInt(li.id);
    });

    //삭제 후 새로 만든 리스트 대입해주고
    toDos = cleanToDos;

    //목록 저장하기
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    //목록 추가할 li와 지우기버튼 엘리먼트 생성
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    //텍스트받아서 목록안에 넣을 span생성
    const span = document.createElement("span");

    const newId = toDos.length + 1;


    delBtn.innerText = '❌';
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;

    //li안에 텍스트와 지우기버튼 추가
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    //목록에 li요소 추가
    toDoList.appendChild(li);

    //toDos array에 목록 추가하기
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;

    paintToDo(currentValue);
    toDoInput.value = '';
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        })
        
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();