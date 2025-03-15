// script.js
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY = '07e0e3da82bb8a4e32784a06b8de9424';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);

getWeatherData()

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            showWeatherData(data);
            timezone.innerHTML=data.name;
        })
    })
}

function showWeatherData(data) {
    let humidity = data.main.humidity;
    let pressure = data.main.pressure; // in hPa
    let tempKelvin = data.main.temp; // Temperature in Kelvin
    let feelsLikeKelvin = data.main.feels_like; // Feels like temperature in Kelvin

    // Convert Kelvin to Celsius
    let tempCelsius = (tempKelvin - 273.15).toFixed(2); // Convert to Celsius and round to 2 decimal places
    let feelsLikeCelsius = (feelsLikeKelvin - 273.15).toFixed(2); // Convert to Celsius and round to 2 decimal places

    let weather=data.weather[0].description;
    // Display the weather data
    currentWeatherItemsEl.innerHTML = `
        <div class="weather-item">
            <div style="font-weight: 600;">Temperature</div>
            <div style="font-size: 8vh">${tempCelsius} °C</div>
        </div>
        <div class="weather-item">
            <div>Feels Like</div>
            <div style="font-weight: normal; color: #ff0000;">${feelsLikeCelsius} °C</div>
        </div>
        <div class="weather-item">
            <div style="font-weight: 700">Humidity</div>
            <div>${humidity}%</div>
        </div>
        <div class="weather-item">
            <div>Pressure</div>
            <div>${pressure} hPa</div>
        </div>
        <div class="weather-item">
            <div>Sunrise</div>
            <div>${moment(data.sys.sunrise * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${moment(data.sys.sunset * 1000).format('HH:mm a')}</div>
        </div>
        <div class="weather-item">
            <div>Description</div>
            <div>${data.weather[0].description}</div>
        </div>

    `;
}