const apiKey = "fe3451092f40afa1463671f5019b9b01"; 
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  const errorDiv = document.getElementById("errorMsg");

  resultDiv.classList.add("hidden");
  errorDiv.classList.add("hidden");

  if (!city) {
    errorDiv.textContent = "Please enter a city name.";
    errorDiv.classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Fill in the data
    document.getElementById("cityName").textContent =
      `📍 ${data.name}, ${data.sys.country}`;
    document.getElementById("temperature").textContent =
      `🌡️ Temperature: ${data.main.temp}°C`;
    document.getElementById("condition").textContent =
      `⛅ Condition: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent =
      `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("wind").textContent =
      `💨 Wind Speed: ${data.wind.speed} m/s`;

    resultDiv.classList.remove("hidden");

  } catch (error) {
    errorDiv.textContent = "City not found. Please try again.";
    errorDiv.classList.remove("hidden");
  }
}

document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});