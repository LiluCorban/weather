// let url1="http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f";
// let url2 = "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f";
// let url3 = "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f";
let url1 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=fff102c84bba7f09078f849cf2a24c3a";
let url2 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=London&appid=fff102c84bba7f09078f849cf2a24c3a";
let url3 = "https://api.openweathermap.org/data/2.5/weather?units=metric&id=5128638&appid=fff102c84bba7f09078f849cf2a24c3a";
let url4 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Dnipro&appid=fff102c84bba7f09078f849cf2a24c3a";
let url5 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Toronto&appid=fff102c84bba7f09078f849cf2a24c3a";
let city = document.querySelector(".city");
let temp = document.querySelector(".temperature");
let description = document.querySelector(".weather-description");
let weatherImg = document.querySelector(".image-weather");
let feelsLike = document.querySelector(".feels-like");

let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");
let pressure = document.querySelector(".pressure");
let visibility = document.querySelector(".visibility");
let url = "";
let lat;
let lon;
let dayOfWeek = document.querySelectorAll(".day-of-week");
let dayWeekTemp = document.querySelectorAll(".week-temp");
let imgDayWeek = document.querySelectorAll(".day-image");

let selectCity = document.querySelector("select");
let celsiy = true;

let temperatureByCelsiy;
let temperatureByCelsiyFeel;
let temperatureByFarenget;
let temperatureByFarengetFell;



 //  часы
 let todayDate = document.querySelector(".date");
 let localTime = document.querySelector(".time");
     
 function zeroFormat(value)
 {
     if (value < 10)
     {
         value='0'+value;
     }
     return value;
 }
 const tick = () => {
   const now = new Date();
   const hours = zeroFormat(now.getHours());
   const min = zeroFormat(now.getMinutes());
   const sec = zeroFormat(now.getSeconds());

       localTime.textContent = `${hours}:${min}:${sec}`;
   
}

tick();

setInterval(tick, 1000);
 

let today1 = new Date();
let formDate = options = { day: "numeric", month: "long"};
let now = today1.toLocaleString('en-En',formDate);
todayDate.append(now);




selectCity.addEventListener("change",  function ()  {
    let data = selectCity.value;
    
    switch(data) {
        case "Kiev":
            url = url1;
            break;
        case "London":
            url = url2;
        break;
        case "New York":
            url = url3;
            break;
        case "Dnipro":
                url = url4;
                break;
        case "Toronto":
                url = url5;
                break;
       
    }
    fetch(url)  
.then(response => response.json())
.then(function(response){
    lat = response.coord.lat;
    lon = response.coord.lon;
    city.innerHTML = response.name;
    
    temperatureByCelsiy = Math.round(response.main.temp) + "&#176 C";
    temperatureByCelsiyFeel = Math.round(response.main.feels_like) + "&#176 C";
    temp.innerHTML = temperatureByCelsiy;
    feelsLike.innerHTML = temperatureByCelsiyFeel;
    temperatureByFarenget = Math.round(response.main.temp * (9/5) + 32) + "&#176 F";
    temperatureByFarengetFell = Math.round(response.main.feels_like * (9/5) + 32) + "&#176 F";
    description.innerHTML = response.weather[0].description;
   
    let weather = response.weather[0].main;
    switch(weather){
        case "Clear":
            weatherImg.innerHTML = `<img src="img/clear.png"/>`;
            break;
        case "Clouds":
            weatherImg.innerHTML = `<img src="img/clouds.png"/>`;
            break;
        case "Rain":
            weatherImg.innerHTML = `<img src="img/rain.jpg"/>`;
            break;
        case "Snow":
            weatherImg.innerHTML = `<img src="img/snow.jpg"/>`;
            break;

        case "Drizzle":
            weatherImg.innerHTML = `<img src="img/drizzle.jpg"/>`;
            break;
        case "Thunderstorm":
            weatherImg.innerHTML = `<img src="img/thunderstorm.jpg"/>`;
            break;
        case "Atmosphere":
            weatherImg.innerHTML = `<img src="img/atmospher.jpg"/>`;
            break;
    }
    humidity.innerHTML = response.main.humidity + " %";
    visibility.innerHTML = response.visibility + " meter";
    pressure.innerHTML = response.main.pressure + " pHa";
    windSpeed.innerHTML = response.wind.speed + " meter/sec";

    let urlAdd =   "https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=current,minutely,hourly&appid=bf35cac91880cb98375230fb443a116f&units=metric";
    
    // погода на неделю

            fetch(urlAdd)
                .then(response => response.json())
                .then(function(response) {
                    for (let i = 0; i <= dayOfWeek.length - 1; i++) {
                        
                        if(celsiy) dayWeekTemp[i].innerHTML = Math.round(response.daily[i].temp.day) + "&#176 C";
                        else dayWeekTemp[i].innerHTML = Math.round(response.daily[i].temp.day * (9/5) +32) + "&#176 F" ;                       
                        let moreWeather = response.daily[i].weather[0].main;
                        switch (moreWeather) {
                            case "Clear":
                                imgDayWeek[i].innerHTML = `<img src="img/clear.png"/>`;
                                break;
                            case "Clouds":
                                imgDayWeek[i].innerHTML = `<img src="img/clouds.png"/>`;
                                break;
                            case "Rain":
                                imgDayWeek[i].innerHTML = `<img src="img/rain.jpg"/>`;
                                break;
                            case "Snow":
                                imgDayWeek[i].innerHTML = `<img src="img/snow.jpg"/>`;
                                break;
                    
                            case "Drizzle":
                                imgDayWeek[i].innerHTML = `<img src="img/drizzle.jpg"/>`;
                                break;
                            case "Thunderstorm":
                                imgDayWeek[i].innerHTML = `<img src="img/thunderstorm.jpg"/>`;
                                break;
                            case "Atmosphere":
                                imgDayWeek[i].innerHTML = `<img src="img/atmospher.jpg"/>`;
                                break;
                        }
                    }
                })

  
})

});





// даты
const DayMilSec = 24 * 60 * 60 * 1000;
let today = new Date().getTime();

for (let i = 1; i < 8; i++) {
  let date = new Date(today + DayMilSec * i);
  dayOfWeek[i-1].innerHTML = getDay(date);
 
}

function getDay(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return date.getDate() + " " + days[date.getDay()];
}

// смена градусов
document.querySelector(".cels").addEventListener("click", function(){
    if (celsiy != true){
        celsiy = true;
        temp.innerHTML = temperatureByCelsiy;
        feelsLike.innerHTML = temperatureByCelsiyFeel;
    }
    else return;    
      
      
})
document.querySelector(".faren").addEventListener("click", function(){
    if(celsiy == true){
        celsiy = false;
        temp.innerHTML = temperatureByFarenget;
        feelsLike.innerHTML = temperatureByFarengetFell;
       
      
    }
    else return;
})




