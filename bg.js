const wrap = document.querySelector(".wrap");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    // const image = new Image();
    // image.src = `./images/bg${imgNumber + 1}.jpg`;    
    //image.className = "bg";
    //wrap.appendChild(image);
    
    wrap.style.background = `url(./images/bg${imgNumber + 1}.jpg) no-repeat center center`;    
}

function genRendom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}


function init(){
    const randomNumber = genRendom();
    paintImage(randomNumber)
}

init();