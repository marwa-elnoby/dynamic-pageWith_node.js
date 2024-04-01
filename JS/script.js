const countryContent = document.getElementById("country-content");
const zoneContent = document.getElementById("zone-content");
const latitudeContent = document.getElementById("latitude-content");
const longitudeContent = document.getElementById("longitude-content");
const temperatureContent = document.getElementById("temperature-content");
const timeContent = document.getElementById("time-content");
const errorContent = document.getElementById("error-content");
const weatherContent = document.getElementById("weather-content");

const allData = document.querySelector(".all-data");
const weatherForm = document.getElementById("weather-form");
const inputAddress = document.getElementById("address");

weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await getWeather();
  weatherForm.reset();
});

async function getWeather() {
  try {
    const location = inputAddress.value;
    const response = await fetch(
      `http://localhost:3000/weather?address=${location}`
    );
    const data = await response.json();
    console.log(data);
    if (data.error) {
      allData.style.visibility = "hidden";
      errorContent.innerText = data.error;
    } else {
      const info = data.forecast;
      errorContent.innerText = "";
      allData.style.visibility = "visible";
      deleteContents();
      await updateContentWithDelay(
        countryContent,
        `Country: ${info.location.country}`,
        100
      );
      await updateContentWithDelay(
        latitudeContent,
        `Latitude: ${info.location.lat}`,
        250
      );
      await updateContentWithDelay(
        longitudeContent,
        `Longitude: ${info.location.lon}`,
        400
      );
      await updateContentWithDelay(
        temperatureContent,
        `Temperature: ${info.current.temp_c}`,
        550
      );
      await updateContentWithDelay(
        weatherContent,
        `Weather: ${info.current.condition.text}`,
        700
      );
      await updateContentWithDelay(
        timeContent,
        `Time: ${info.current.last_updated}`,
        850
      );
    }
  } catch (error) {
    console.error(error);
    errorContent.innerText = "An error occurred while fetching data.";
  }
}

function deleteContents() {
  countryContent.innerText = "";
  latitudeContent.innerText = "";
  longitudeContent.innerText = "";
  temperatureContent.innerText = "";
  timeContent.innerText = "";
  weatherContent.innerText = "";
}

function updateContentWithDelay(element, content, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      element.innerText = content;
      resolve();
    }, delay);
  });
}
