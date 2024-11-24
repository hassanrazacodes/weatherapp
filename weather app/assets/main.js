const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  const APIKey = "1de8876972bd1a69dc3332b45c1c5bd3";
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .decription");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;
        container.style.height = "555px";
        container.classList.add("active");
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(() => {
          container.classList.remove("active");
        }, 2500);

        switch (json.weather[0].main) {
          case "Clear":
            image.src = "assets/image/clear.png";
            backgroundVideo.src = "assets/video/clear2.mp4";
            container.style.boxShadow = "0 10px 50px rgba(255, 255, 255, 0.8)"; // Yellow glow for clear
            break;
            case "Smoke":
              image.src = "assets/image/toxic.png";
              backgroundVideo.src = "assets/video/smoke.mp4";
              container.style.boxShadow = "0 10px 50px rgba(255, 255, 255, 0.8)"; // Yellow glow for clear
              break;
      
          case "Rain":
            image.src = "assets/image/rain.png";
            backgroundVideo.src = "assets/video/rainy.mp4";
            container.style.boxShadow = "0 10px 50px rgba(255, 255, 255, 0.8)"; // White glow for rain
            break;
        
          case "Snow":
            image.src = "assets/image/snow.png";
            backgroundVideo.src = "assets/video/snow.mp4";
            container.style.boxShadow = "0 10px 50px rgba(173, 216, 230, 0.8)"; // Light blue glow for snow
            break;
        
          case "Clouds":
            image.src = "assets/image/cloud.png";
            backgroundVideo.src = "assets/video/overcast.mp4";
            container.style.boxShadow = "0 10px 50px rgba(128, 128, 128, 0.8)"; // Grey glow for clouds
            break;
        
          case "Mist":
            image.src = "assets/image/mist.png";
            backgroundVideo.src = "assets/video/mist.mp4";
            container.style.boxShadow = "0 10px 50px rgba(211, 211, 211, 0.8)"; // Light grey glow for mist
            break;
        
          case "Haze":
            image.src = "assets/image/mist.png";
            backgroundVideo.src = "assets/video/haz.mp4";
            container.style.boxShadow = "0 10px 50px, black, 0.8)"; // Orange glow for haze
            break;
          default:
            image.src = "assets/image/clear.png";
            backgroundVideo.src = "assets/video/enter.mp4";
            container.style.boxShadow = "0 10px 50px rgba(255, 255, 255, 0.8)";
        }
        
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        const infoWeather = document.querySelector(".info-weather");
        const infoHumidity = document.querySelector(".info-humidity");
        const infoWind = document.querySelector(".info-wind");

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = "clone-info-weather";
        elCloneInfoWeather.classList.add("active-clone");

        elCloneInfoHumidity.id = "clone-info-humidity";
        elCloneInfoHumidity.classList.add("active-clone");

        elCloneInfoWind.id = "clone-info-wind";
        elCloneInfoWind.classList.add("active-clone");

        setTimeout(() => {
          infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
          infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
          infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll(
          ".info-weather.active-clone"
        );
        const totalCloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];

        const cloneInfoHumidity = document.querySelectorAll(
          ".info-humidity.active-clone"
        );
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];

        const cloneInfoWind = document.querySelectorAll(
          ".info-wind.active-clone"
        );
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalCloneInfoWeather > 0) {
          cloneInfoWeatherFirst.classList.remove("active-clone");
          cloneInfoHumidityFirst.classList.remove("active-clone");
          cloneInfoWindFirst.classList.remove("active-clone");

          setTimeout(() => {
            cloneInfoWeatherFirst.remove();
            cloneInfoHumidityFirst.remove();
            cloneInfoWindFirst.remove();
          }, 2200);
        }
      }
    });
});