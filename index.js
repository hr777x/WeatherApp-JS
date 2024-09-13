const apikey = "e7219753298353a7c19d9c321ea905d9";

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response not ok!");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function displayWeather(data) {
  const weatherResult = document.querySelector(".weatherResult");
  if (data.cod === 200) {
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`; // URL for the weather icon
    weatherResult.innerHTML = `
        <h1 class="cityDisplay">${data.name}</h1>
        <p class="tempDisplay">${temp}° C</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
        <p class="descDisplay">${description}</p>
        <img src="${iconUrl}" alt="${description}" class="weatherEmoji">`;
  } else {
    weatherResult.innerHTML = `
        <p class="errorDisplay">${data.message}</p>`;
  }
}

document.querySelector("#submitbtn").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent the form from refreshing the page
  const city = document.querySelector("#cityInput").value;
  if (city) {
    fetchWeather(city)
      .then((data) => displayWeather(data))
      .catch((error) => {
        document.querySelector(".weatherResult").innerHTML = `
            <p class="errorDisplay">${error.message}</p>`;
      });
  } else {
    document.querySelector(".weatherResult").innerHTML = `
        <p class="errorDisplay">Please enter a valid city name</p>`;
  }
});
