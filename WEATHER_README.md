# Weather Dashboard

A beautiful, real-time weather dashboard that fetches data from the OpenWeatherMap API. Get current weather, 5-day forecasts, air quality information, and more for any location worldwide.

## Features

✅ **Real-time Weather Data** - Current temperature, humidity, wind speed, pressure
✅ **5-Day Forecast** - Weather predictions for the next 5 days
✅ **Air Quality Index** - AQI status and pollutant levels (PM2.5, PM10, NO₂, O₃)
✅ **Location Search** - Search any city worldwide with autocomplete suggestions
✅ **Current Location** - Get weather for your current location using geolocation
✅ **Sunrise & Sunset Times** - View exact times for sunrise and sunset
✅ **Favorites** - Save your favorite cities for quick access
✅ **Local Storage** - Persistent favorites using browser storage
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Beautiful UI** - Modern gradient design with smooth animations
✅ **Error Handling** - User-friendly error messages

## Files Included

- **weather.html** - Main HTML structure
- **weather-style.css** - Complete styling with animations
- **weather-script.js** - JavaScript functionality and API integration

## Setup Instructions

### Step 1: Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API keys section
4. Copy your free API key

### Step 2: Add API Key to Code

Open `weather-script.js` and find this line:

```javascript
const OPENWEATHER_API_KEY = 'YOUR_API_KEY_HERE';
```

Replace `YOUR_API_KEY_HERE` with your actual API key:

```javascript
const OPENWEATHER_API_KEY = 'abc123def456ghi789jkl';
```

### Step 3: Open in Browser

```
http://localhost/village-complaint-portal/weather.html
```

## How to Use

### 1. **Search for a City**
   - Type city name in the search box
   - Select from autocomplete suggestions
   - Or click the Search button

### 2. **Use Current Location**
   - Click "📍 Current Location" button
   - Allow browser to access your location
   - Weather updates automatically

### 3. **View Weather Details**
   - **Current Weather**: Temperature, description, humidity, wind
   - **5-Day Forecast**: Weather predictions for next 5 days
   - **Air Quality**: AQI status and pollutant levels
   - **Sun Times**: Sunrise and sunset times

### 4. **Manage Favorites**
   - Click "⭐ Add to Favorites" to save current city
   - Click on a favorite to quickly view its weather
   - Click ✕ to remove a favorite
   - Click "Clear All" to remove all favorites

## API Endpoints Used

### 1. **Current Weather**
```
https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}
```

### 2. **5-Day Forecast**
```
https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&units=metric&appid={API_KEY}
```

### 3. **Air Quality**
```
https://api.openweathermap.org/data/2.5/air_quality?lat={lat}&lon={lon}&appid={API_KEY}
```

### 4. **Geolocation**
```
https://api.openweathermap.org/geo/1.0/direct?q={city}&limit={limit}&appid={API_KEY}
```

## Weather Information Displayed

### Current Weather
- **Temperature** - Current temperature in Celsius
- **Feels Like** - Perceived temperature
- **Weather Description** - Condition (Sunny, Cloudy, Rainy, etc.)
- **Humidity** - Moisture level in %
- **Wind Speed** - Wind speed in km/h
- **Pressure** - Atmospheric pressure in hPa
- **Visibility** - Visibility distance in km
- **Weather Icon** - Visual representation of weather

### Forecast Information
- **Date** - Forecast date
- **Temperature** - High and low temps
- **Weather Description** - Expected conditions
- **Weather Icon** - Visual representation

### Air Quality Information
- **AQI Status** - Good, Fair, Moderate, Poor, Very Poor
- **PM2.5** - Fine particulate matter (μg/m³)
- **PM10** - Coarse particulate matter (μg/m³)
- **NO₂** - Nitrogen dioxide (μg/m³)
- **O₃** - Ozone (μg/m³)

## Customization

### Change Temperature Unit

In `weather-script.js`, change `units=metric` to:
- `units=imperial` - For Fahrenheit
- `units=standard` - For Kelvin

```javascript
// Change this line:
`${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`

// To this:
`${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPENWEATHER_API_KEY}`
```

### Change Colors

Edit the gradient colors in `weather-style.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adjust Update Frequency

Add auto-refresh (modify in `weather-script.js`):

```javascript
// Auto-refresh every 10 minutes
setInterval(() => {
    if (currentCity) fetchWeatherByCity(currentCity);
}, 10 * 60 * 1000);
```

## Browser Compatibility

✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers
✅ Requires JavaScript enabled

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter | Search weather |
| Escape | Close suggestions |

## Troubleshooting

### "Please set your OpenWeatherMap API key"
- You forgot to add your API key
- Solution: Add API key in `weather-script.js`

### "City not found"
- City name might be misspelled
- Try using suggestions dropdown
- Use country code (e.g., "New York, US")

### Geolocation not working
- Check browser permissions
- Must use HTTPS (unless localhost)
- Check if geolocation is enabled in settings

### Weather data not updating
- Check internet connection
- Verify API key is correct
- Check OpenWeatherMap API status
- Clear browser cache

### Air quality shows "N/A"
- Air quality data may not be available for this location
- Try a different city
- Check API subscription level

## API Pricing

**Free Tier Includes:**
- Current weather data
- 5-day forecast
- Air quality data
- 1,000 API calls/day
- Excellent for personal projects

**Paid Plans:**
- Higher API call limits
- Priority support
- Additional features

Visit [OpenWeatherMap Pricing](https://openweathermap.org/price) for more info.

## Future Enhancements

- 🌙 Dark mode toggle
- 📈 Historical weather data
- 🏙️ Multiple city comparison
- 📱 Weather alerts and notifications
- 🌍 Map view with weather overlay
- 📊 Advanced charts and statistics
- 🔔 Severe weather warnings
- 🗣️ Voice search
- 🌐 Multi-language support
- 📤 Share weather data

## Integration with Village Portal

Add link to main navigation in `index.html`:

```html
<a href="weather.html" target="_blank">🌤️ Weather Dashboard</a>
```

Or embed in an iframe:

```html
<iframe src="weather.html" width="100%" height="800"></iframe>
```

## Performance Tips

1. **Minimize API calls** - Cache data when possible
2. **Use compression** - Minify CSS and JavaScript
3. **Lazy load images** - Load weather icons on demand
4. **Optimize images** - Use WebP format if possible

## Security Notes

⚠️ **Important**: The API key should be protected in production:
- Never commit API keys to version control
- Use environment variables
- Implement backend proxy
- Add rate limiting
- Monitor API usage

## Support & Resources

- **OpenWeatherMap Docs**: https://openweathermap.org/api
- **API Key**: https://home.openweathermap.org/api_keys
- **GitHub**: https://github.com/gugulothushohini-oss/village-complaint-portal

## License

Free to use for personal and educational purposes.

---

**Stay informed about the weather! 🌤️☀️🌧️⛈️**