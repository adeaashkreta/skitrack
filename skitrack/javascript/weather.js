// JavaScript code for fetching weather data and displaying it

const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API Key
const city = 'Tirana';          // City name (can be changed to any ski resort location)
const units = 'metric';         // Units for temperature (metric = Celsius)

// Get weather data from OpenWeatherMap API
async function getWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Extract relevant weather data
    const weather = data.weather[0];
    const temp = data.main.temp;
    const description = weather.description;
    const windSpeed = data.wind.speed;
    const snow = data.snow ? data.snow["1h"] : 0;  // Snow in the last 1 hour (if available)

    // Update the UI with weather info
    document.getElementById('weather-title').textContent = `${city} Weather`;
    document.getElementById('weather-description').textContent = `Conditions: ${description}, Temp: ${temp}°C, Wind Speed: ${windSpeed} m/s`;

    // Check if it's suitable for skiing
    let skiConditions = '';
    if (temp <= 0 && snow > 0) {
      skiConditions = '<span class="suitable-skiing">Great conditions for skiing! Fresh snow is falling.</span>';
    } else if (temp > 0 && temp <= 5) {
      skiConditions = '<span class="suitable-skiing">Skiing is possible, but conditions are not ideal. Keep an eye on the snow!</span>';
    } else {
      skiConditions = '<span class="not-suitable-skiing">Conditions are not suitable for skiing. Too warm!</span>';
    }
    document.getElementById('ski-conditions').innerHTML = skiConditions;

    // Display safety tips based on wind and snow conditions
    let safetyTips = '';
    if (windSpeed > 10) {
      safetyTips = 'Warning: Strong winds, be cautious on high slopes!';
    } else if (snow > 0) {
      safetyTips = 'Fresh snow reported! Ensure the slopes are properly groomed for safety.';
    } else {
      safetyTips = 'Make sure to check weather updates regularly for safety.';
    }
    document.getElementById('safety-tips').textContent = safetyTips;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    document.getElementById('weather-description').textContent = "Unable to retrieve weather data.";
  }
}

// Call the function to get the weather data when the page loads
window.onload = getWeatherData;
