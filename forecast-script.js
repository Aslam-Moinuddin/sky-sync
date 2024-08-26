const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidiyOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('#LocationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');


let cityInput = "India";
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "0";
    });
});
form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name !');
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekday[new Date(day, month, year).getDay()];
}
function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=fb062fb4abbc415b88794154231311&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutput.innerHTML = data.current.condition.text;
            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);
            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d} ${m} ${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;
            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./icons/" + iconId;
            cloudOutput.innerHTML = data.current.cloud + "%";
            humidiyOutput.innerHTML = data.current.humidity + "%";
            windOutput.innerHTML = data.current.wind_kph + "km/h";
            let timeOfDay = "day";
            const code = data.current.condition.code;
            if (!data.current.is_day) {
                timeOfDay = "night";
            }
            if (code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#69a1b7c0";
                if (timeOfDay == "night") {
                    btn.style.background = "#284c7e";
                }
            }
            else if (code == 1003) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/partlyCloudy.jpg)`;
                btn.style.background = "#9cc9d5";
                if (timeOfDay == "night") {
                    btn.style.background = "#345369";
                }
            }
            else if (code == 1030) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/mist.jpg)`;
                btn.style.background = "#ccb093";
                if (timeOfDay == "night") {
                    btn.style.background = "#0f3932";
                }
            }
            else if (
                code == 1006 ||
                code == 1009 ||
                code == 1069 ||
                code == 1135
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
                btn.style.background = "#547287";
                if (timeOfDay == "night") {
                    btn.style.background = "#ceaec7";
                }
            } else if (
                code == 1063 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1202 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/rain.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#2c5475";
                }
            }
            else if (
                code == 1066 ||
                code == 1213 ||
                code == 1219
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/snow.jpg)`;
                btn.style.background = "#23304f";
                if (timeOfDay == "night") {
                    btn.style.background = "#0f3741";
                }
            }
            else if (
                code == 1087 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/thunder.jpg)`;
                btn.style.background = "#ccd5f9";
                if (timeOfDay == "night") {
                    btn.style.background = "#bea9c9";
                }
            }
            else {
                app.style.backgroundImage = `url(./images/${timeOfDay}/else.jpg)`;
                btn.style.background = "#e94937";
                if (timeOfDay == "night") {
                    btn.style.background = "#e94937";
                }
            }
            app.style.opacity = "1";
        })
        .catch((error) => {
            alert('No City Exist');
            app.style.opacity = "1";
        });

}
fetchWeatherData();
app.style.opacity = "1";