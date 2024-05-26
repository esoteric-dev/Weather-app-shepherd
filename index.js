require("dotenv").config()

// const apiKey = new ApiClient(process.env.WEATHER_API_KEY);
const apiKey = '7e5fb085c116db8694ef1d0f2aafa5e4';
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

     if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
  } else {
      const data = await response.json();

         document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

         if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }

          document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

  document.addEventListener('DOMContentLoaded', function () {
    const tour = new Shepherd.Tour({
        defaultStepOptions: {
            cancelIcon: {
                enabled: true
            },
            classes: 'shepherd-theme-arrows',
            scrollTo: { behavior: 'smooth', block: 'center' }
        },
        useModalOverlay: true
    });

      tour.addStep({
        title: 'Welcome to the Weather App!',
        text: 'Enter a city name and click the search button to get the current weather.',
        attachTo: {
            element: '.search input',
            on: 'bottom'
        },
        buttons: [
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

      tour.addStep({
        title: 'Search Button',
        text: 'Click this button to search for the weather in the specified city.',
        attachTo: {
            element: '.search button',
            on: 'right'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back
            },
            {
                text: 'Next',
                action: tour.next
            }
        ]
    });

      tour.addStep({
        title: 'Weather Information',
        text: 'Here you will see the weather information for the city you searched for.',
        attachTo: {
            element: '.weather',
            on: 'top'
        },
        buttons: [
            {
                text: 'Back',
                action: tour.back
            },
            {
                text: 'Finish',
                action: tour.complete
            }
        ]
    });

      tour.start();
});