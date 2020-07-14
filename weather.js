const weather = document.querySelector(".js-weather");
const COORDS = 'coords';
const API_KEY = '17d26f913cb69dcd677dd587567a2007';

function getWeather(lat,lng){
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
      return response.json();
    })
    .then(function(json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText =`${temp} @ ${place}`
    });


    
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude,longitude);

}
function handleGeoError(){
    console.log("error")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS)

    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        console.log(parsedCoords);
    
    }
}

function init(){
    loadCoords();
};

init();
