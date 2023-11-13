const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputCity = document.querySelector('.search-box input');

// Function to perform the weather search
function performWeatherSearch() {
    const APIKey = 'b21a15d9cde525097686b9b8e2ee3618'; // Replace with your API key
    const city = inputCity.value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
            } else {
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.gif';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.gif';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.gif';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.gif';
                        break;
                    case 'Mist':
                        image.src = 'images/mist.gif';
                        break;
                    
                    case 'Haze':
                        image.src = 'images/mist.gif';
                        break;
                    default:
                        image.src = 'images/location_not_found.gif';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '590px';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Add a keydown event listener to the input field
inputCity.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // If the "Enter" key is pressed, perform the weather search
        performWeatherSearch();
    }
});

// Add a click event listener to the search button (optional, for clicking the button)
searchButton.addEventListener('click', () => {
    performWeatherSearch();
});
