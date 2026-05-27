// API Configuration
const OPENWEATHER_API_KEY = 'YOUR_API_KEY_HERE'; // Get from https://openweathermap.org/api
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const suggestionsDiv = document.getElementById('suggestions');
const weatherContainer = document.getElementById('weatherContainer');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const addFavoriteBtn = document.getElementById('addFavoriteBtn');
const clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
const favoritesList = document.getElementById('favoritesList');

let currentCity = null;
let currentWeatherData = null;

// Initialize
function init() {
    loadFavorites();
    searchBtn.addEventListener('click', () => searchWeather());
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchWeather();
    });
    searchInput.addEventListener('input', handleSearchInput);
    locationBtn.addEventListener('click', useCurrentLocation);
    addFavoriteBtn.addEventListener('click', addToFavorites);
    clearFavoritesBtn.addEventListener('click', clearFavorites);
    
    // Default city
    fetchWeatherByCity('New York');
}

// Check if API key is set
function checkApiKey() {
    if (OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE') {
        showError('⚠️ Please set your OpenWeatherMap API key in weather-script.js');
        return false;
    }
    return true;
}

// Search weather by city name
async function searchWeather() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherByCity(city);
    }
}

// Handle search input suggestions
async function handleSearchInput(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
        suggestionsDiv.classList.add('hidden');
        return;
    }

    if (!checkApiKey()) return;

    try {
        const response = await fetch(
            `${GEO_API_URL}/direct?q=${query}&limit=5&appid=${OPENWEATHER_API_KEY}`
        );
        const data = await response.json();

        if (data.length > 0) {
            suggestionsDiv.innerHTML = '';
            data.forEach(location => {
                const suggestion = document.createElement('div');
                suggestion.className = 'suggestion-item';
                suggestion.textContent = `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`;
                suggestion.addEventListener('click', () => {
                    fetchWeatherByCoordinates(location.lat, location.lon);
                    suggestionsDiv.classList.add('hidden');
                    searchInput.value = '';
                });
                suggestionsDiv.appendChild(suggestion);
            });
            suggestionsDiv.classList.remove('hidden');
        } else {
            suggestionsDiv.classList.add('hidden');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

// Fetch weather by city name
async function fetchWeatherByCity(city) {
    if (!checkApiKey()) return;

    showLoading();
    try {
        const response = await fetch(
            `${OPENWEATHER_BASE_URL}/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        currentCity = data.name;
        fetchWeatherByCoordinates(data.coord.lat, data.coord.lon);
    } catch (error) {
        showError('❌ ' + error.message);
        hideLoading();
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoordinates(lat, lon) {
    if (!checkApiKey()) return;

    showLoading();
    try {
        // Fetch current weather
        const weatherResponse = await fetch(
            `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const weatherData = await weatherResponse.json();

        // Fetch forecast
        const forecastResponse = await fetch(
            `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        // Fetch air quality
        const aqResponse = await fetch(
            `${OPENWEATHER_BASE_URL}/air_quality?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
        );
        const aqData = await aqResponse.json();

        currentWeatherData = weatherData;
        currentCity = weatherData.name;
        
        displayCurrentWeather(weatherData);
        displayForecast(forecastData);
        displayAirQuality(aqData);
        
        hideLoading();
        hideError();
    } catch (error) {
        showError('❌ Error fetching weather data: ' + error.message);
        hideLoading();
    }
}

// Use current location
function useCurrentLocation() {
    if (!navigator.geolocation) {
        showError('❌ Geolocation is not supported by your browser');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
            showError('❌ Unable to get your location: ' + error.message);
            hideLoading();
        }
    );
}

// Display current weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = (data.wind.speed * 3.6).toFixed(1); // Convert m/s to km/h
    const pressure = data.main.pressure;
    const visibility = (data.visibility / 1000).toFixed(1);
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    
    // Get sunrise/sunset times
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Update DOM
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('dateTime').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('weatherIcon').src = iconUrl;
    document.getElementById('feelsLike').textContent = `${feelsLike}°C`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${windSpeed} km/h`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('visibility').textContent = `${visibility} km`;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;

    // UV Index (mock value, requires separate API call)
    document.getElementById('uvIndex').textContent = 'N/A';

    weatherContainer.classList.remove('hidden');
}

// Display 5-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Get one forecast per day (every 8 * 3-hour periods)
    const dailyForecasts = {};
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });

    Object.values(dailyForecasts).slice(0, 5).forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
        const temp = Math.round(item.main.temp);
        const tempMin = Math.round(item.main.temp_min);
        const tempMax = Math.round(item.main.temp_max);
        const description = item.weather[0].main;
        const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="forecast-date">${date}</div>
            <img src="${icon}" alt="${description}" class="forecast-icon">
            <div class="forecast-description">${description}</div>
            <div class="forecast-temp">${temp}°C</div>
            <div class="forecast-temp-range">${tempMin}°C ~ ${tempMax}°C</div>
        `;
        forecastContainer.appendChild(card);
    });
}

// Display air quality
function displayAirQuality(data) {
    if (!data.list || data.list.length === 0) {
        document.getElementById('pm25').textContent = 'N/A';
        document.getElementById('pm10').textContent = 'N/A';
        document.getElementById('no2').textContent = 'N/A';
        document.getElementById('o3').textContent = 'N/A';
        document.getElementById('aqiValue').textContent = 'N/A';
        document.getElementById('aqiStatus').textContent = 'Data unavailable';
        return;
    }

    const aq = data.list[0];
    const aqi = aq.main.aqi; // 1-5 scale
    const components = aq.components;

    // AQI status
    const aqiStatuses = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    const aqiStatus = aqiStatuses[aqi - 1];
    const aqiClasses = ['good', 'fair', 'moderate', 'poor', 'very-poor'];

    // Update air quality display
    const aqiElement = document.getElementById('aqiValue');
    aqiElement.textContent = aqiStatus;
    aqiElement.className = 'aqi-value ' + aqiClasses[aqi - 1];
    document.getElementById('aqiStatus').textContent = aqiStatus + ' Air Quality';

    // Pollutants
    document.getElementById('pm25').textContent = components.pm2_5 ? components.pm2_5.toFixed(1) + ' μg/m³' : 'N/A';
    document.getElementById('pm10').textContent = components.pm10 ? components.pm10.toFixed(1) + ' μg/m³' : 'N/A';
    document.getElementById('no2').textContent = components.no2 ? components.no2.toFixed(1) + ' μg/m³' : 'N/A';
    document.getElementById('o3').textContent = components.o3 ? components.o3.toFixed(1) + ' μg/m³' : 'N/A';
}

// Favorites management
function addToFavorites() {
    if (!currentCity) {
        showError('❌ Please search for a city first');
        return;
    }

    let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    
    if (!favorites.includes(currentCity)) {
        favorites.push(currentCity);
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        loadFavorites();
        showError('✅ Added to favorites!', true);
    } else {
        showError('⚠️ Already in favorites', true);
    }
}

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    favoritesList.innerHTML = '';

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="color: #888;">No favorites yet</p>';
        clearFavoritesBtn.style.display = 'none';
        return;
    }

    clearFavoritesBtn.style.display = 'inline-block';
    favorites.forEach(city => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        item.innerHTML = `
            <div class="favorite-name">${city}</div>
            <button class="remove-favorite" onclick="removeFavorite('${city}')" title="Remove">✕</button>
        `;
        item.addEventListener('click', (e) => {
            if (!e.target.classList.contains('remove-favorite')) {
                fetchWeatherByCity(city);
            }
        });
        favoritesList.appendChild(item);
    });
}

function removeFavorite(city) {
    let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
    favorites = favorites.filter(c => c !== city);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    loadFavorites();
}

function clearFavorites() {
    if (confirm('Are you sure you want to clear all favorites?')) {
        localStorage.setItem('weatherFavorites', JSON.stringify([]));
        loadFavorites();
    }
}

// Utility functions
function showError(message, isSuccess = false) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    if (isSuccess) {
        errorMessage.style.background = '#51cf66';
    } else {
        errorMessage.style.background = '#ff6b6b';
    }
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 3000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Initialize
init();