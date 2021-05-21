const content = document.querySelector("#content-message");
const containerItem = document.querySelector(".container_item");
const heading = document.querySelector("#heading");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const image = document.querySelector("#img");

let errorMessage;

loading();
const fetchData = async () => {
  try {
    const key = `95662109ff51268dddd80880a65ffd09`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Berlin,&appid=${key}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const weatherInfo = {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
    console.log(weatherInfo);

    displayContent(weatherInfo);
    content.classList.add("hide_content");
  } catch (error) {
    console.log(error.message);
    errorMessage = "Something went wrong";
    displayError();
  }
};

fetchData();

function displayContent(obj) {
  containerItem.classList.remove("hide_content");
  heading.textContent = `Europe/${obj.city}`;
  temperature.textContent = `${obj.temp} F`;
  description.textContent = obj.description;
  image.src = `http://openweathermap.org/img/wn/${obj.icon}.png`;
}

function displayError() {
  content.textContent = errorMessage;
}

function loading() {
  content.classList.remove("hide_content");
  content.textContent = "Loading...";
}
