
// fetch(requestURL)
// .then(function(response) {
//     if (response.status === 404) {
//         location.replace("404.html");
//         return;
//     } else {
//         return response.json();
//     }
// })
// .then(function(data) {
//     console.log(data);
//     icon = data.weather[0].icon;
//     temp = data.main.temp;
//     wind = data.wind.speed;
//     humidity = data.main.humidity;
// })
const apikey = "8e0d96b38170e9b7a96c40d93fb7248f";
const today = dayjs();
var cityInput = $("#input-city");
var stateDrop = $("#state");
var searchButton = $("#search-button");
var city = "";
var state = "";
var ico = "";
var tem = "";
var win = "";
var hum = "";
var locationData = [];

function init() {
    //get user location
    // popCurr();
    buildForecastCards();
}

// function search() {
//     city = cityInput.val();
//     state = stateDrop.val();
//     if (city !== "") {
//         city = city.charAt(0).toUpperCase() + city.slice(1);
//         var locations = [];
//         // var locations = JSON.parse(window.localStorage.getItem("location")) || [];
//         var newLocation = {
//             city: city,
//             state: state,
//         }
// //problem here. says locations is not a function ???????
//         locations.push(newLocation);
//         // window.localStorage.setItem("location", JSON.stringify(locations));
//     } else if (city == "") {
//         alert("Enter a city and continue.");
//         return;
//     }
//     goFetch();
//     addCityButton();
// }

function goFetch() {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&APPID=" + apikey + "&cnt=5&units=imperial";
    fetch(requestURL)
    .then(function(response) {
        if (response.status === 404) {
            location.replace("404.html");
            return;
        } else {
            return response.json();
        }
    })
    .then(function(data) {
        console.log(data);
        ico = data.weather[0].icon;
        tem = data.main.temp;
        win = data.wind.speed;
        hum = data.main.humidity;
        popCurr();
        pop5fore();  
    })
}

function popCurr() {
    console.log(ico);
    console.log(tem);
    console.log(win);
    console.log(hum);
    console.log("\^ should be data")
    //populate current day weather
    //to do get weather info
//problem here ico, tem, win, hum are empty for some reason on the first click of the search button
//click the search button again and then it populates
    var currDate = today.format("M / D / YY");
    $("#curr-city").text(city + ", " + state + " " + currDate);
    $("#curr-icon").text("Icon" + ico);
    $("#curr-temp").text("Temp: " + tem);
    $("#curr-wind").text("Wind: " + win + " MPH");
    $("#curr-humid").text("Humidity: " + hum + "\%");
}

//to do get 5 day forecast data
function pop5fore() {
    //need to get weather info
    for (i = 1; i <= 5; i++) {
        var futureDate = today.add(i, "d").format("M / D / YY");
        $("#fut-date-" + i).text(futureDate);
        $("#fut-icon-" + i).text("icon");
        $("#fut-temp-" + i).text("Temp: ");
        $("#fut-wind-" + i).text("Wind: ");
        $("#fut-humid-" + i).text("Humidity: ");
    }
}
function addCityButton() {
    //populate previous cities buttons
    var cityButton = "";
    cityButton += '<button id="' + city + state + '" class="btn btn-success p-1 my-2 w-100">' + city + '</button>';
    $("#prev-city-container").append(cityButton);
}

function buildForecastCards() {
    for (i = 1; i <= 5; i++) {
        var futureDate = today.add(i, "d").format("M / D / YY");
        var forecastCard = "";
        forecastCard += '<div class="card col-2 bg-dark text-light mx-1">'
        forecastCard += '<p id="fut-date-' + i + '">' + futureDate + '</p>';
        forecastCard += '<p id="fut-icon-' + i + '"></p>';
        forecastCard += '<p id="fut-temp-' + i + '"></p>';
        forecastCard += '<p id="fut-wind-' + i + '"></p>';
        forecastCard += '<p id="fut-humid-' + i + '"></p>';
        forecastCard += "</div>"
        $("#forecast-container").append(forecastCard);
    }
}

function search() {
    city = cityInput.val();
    state = stateDrop.val();
    if (city !== "") {
        city = city.charAt(0).toUpperCase() + city.slice(1);
        var locations = [];
        // var locations = JSON.parse(window.localStorage.getItem("location")) || [];
        var newLocation = {
            city: city,
            state: state,
        }
//problem here. says locations is not a function ???????
        locations.push(newLocation);
        // window.localStorage.setItem("location", JSON.stringify(locations));
    } else if (city == "") {
        alert("Enter a city and continue.");
        return;
    }
    goFetch();
    addCityButton();
}

init();
searchButton.click(search);

//previous city buttons click fetch
    //populate current weather
    //populate 5-day forecast