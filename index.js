let weatherInfo;
let errorMessage;
const content = document.querySelector(".content");
const container = document.querySelector(".container");
const heading = document.querySelector("#heading");
const stepeni = document.querySelector("#stepeni");
const description = document.querySelector("#description");
const image = document.querySelector("#img");

loading();
const fetchData = async () => {
  try {
    const key = `95662109ff51268dddd80880a65ffd09`;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=Berlin,&appid=${key}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    weatherInfo = {
      city: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
    console.log(weatherInfo);

    displayContent(weatherInfo);
    content.classList.add("hide");
  } catch (error) {
    console.log(error.message);
    errorMessage = "Something went wrong";
    displayError();
  }
};

fetchData();

function displayContent(obj) {
  container.classList.remove("hide");
  heading.textContent = `Europe/${obj.city}`;
  stepeni.textContent = `${obj.temp} F`;
  description.textContent = obj.description;
  image.src = `http://openweathermap.org/img/wn/${obj.icon}.png`;
}

function displayError() {
  content.textContent = errorMessage;
}

function loading() {
  content.classList.remove("hide");
  content.textContent = "Loading...";
}