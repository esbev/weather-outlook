const apikey = "8e0d96b38170e9b7a96c40d93fb7248f";
const today = dayjs();
var cityInput = $("#input-city");
var stateDrop = $("#state");
var searchButton = $("#search-button");
var clearButton = $("#clear-button");
var city = "";
var state = "";
var ico = "";
var tem = "";
var win = "";
var hum = "";
var locations = [];

function init() {
    // popCurr();
    buildForecastCards();
    addCityButton();
}

function goFetch() {
    var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + state + "&APPID=" + apikey + "&units=imperial";
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
        ico = data.weather[0].icon;
        tem = data.main.temp;
        win = data.wind.speed;
        hum = data.main.humidity;
    })
    .then(function(data) {
        popCurr();
        pop5fore(); 
    })
}

function popCurr() {
    var currDate = today.format("M / D / YY");
    $("#curr-city").text(city + ", " + state + " " + currDate);
    $("#curr-icon").attr("src", 'https://openweathermap.org/img/wn/' + ico + '@2x.png');
    $("#curr-temp").text("Temp: " + tem);
    $("#curr-wind").text("Wind: " + win + " MPH");
    $("#curr-humid").text("Humidity: " + hum + "\%");
}

function clearHistory() {
    localStorage.clear();
    locations = [];
    $("#prev-city-container").empty();
}

function addCityButton() {
    var newLocations = JSON.parse(window.localStorage.getItem("locations"));

    $("#prev-city-container").empty();
    for (i in newLocations) {
        var cityButton = "";
        cityButton += '<button id="' + newLocations[i].city + "-" + newLocations[i].state + '" class="btn btn-success p-1 my-2 w-100 cityBtn">' + newLocations[i].city + '</button>';
        $("#prev-city-container").append(cityButton);
    }
}

function buildForecastCards() {
    for (i = 1; i <= 5; i++) {
        var futureDate = today.add(i, "d").format("M / D / YY");
        var forecastCard = "";
        forecastCard += '<div class="card col-2 bg-dark text-light mx-1">'
        forecastCard += '<p id="fut-date-' + i + '">' + futureDate + '</p>';
        forecastCard += '<p><img class="img-fluid" id="fut-icon-' + i + '" src=""></p>';
        forecastCard += '<p id="fut-temp-' + i + '"></p>';
        forecastCard += '<p id="fut-wind-' + i + '"></p>';
        forecastCard += '<p id="fut-humid-' + i + '"></p>';
        forecastCard += "</div>"
        $("#forecast-container").append(forecastCard);
    }
}

//to do get 5 day forecast data
function pop5fore() {
    var requestFutureURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "&APPID=" + apikey + "&units=imperial";
    fetch(requestFutureURL)
    .then(function(response) {
        if (response.status === 404) {
            location.replace("404.html");
            return;
        } else {
            return response.json();
        }
    })
    .then(function(data) {
        var ind = 1;
        for (i=0; i < data.list.length; i+=8) {
            var futureDate = today.add(ind, "d").format("M / D / YY");
            $("#fut-date-" + ind).text(futureDate);
            $("#fut-icon-" + ind).attr("src", 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png');
            $("#fut-temp-" + ind).text("Temp: " + data.list[i].main.temp);
            $("#fut-wind-" + ind).text("Wind: " + data.list[i].wind.speed);
            $("#fut-humid-" + ind).text("Humidity: " + data.list[i].main.humidity);
            ind++;
        }
    })
}

function search() {
    city = cityInput.val();
    state = stateDrop.val();
    if (city !== "") {
        city = city.charAt(0).toUpperCase() + city.slice(1);
        var newLocation = {
            city: city,
            state: state,
        }
        locations.push(newLocation);
        localStorage.setItem("locations", JSON.stringify(locations));
    } else if (city == "") {
        alert("Enter a city and continue.");
        return;
    }
    goFetch();
    addCityButton();
}

init();
searchButton.click(search);
clearButton.click(clearHistory);

$("#prev-city-container").on("click", function (event) {
    var cityID = $(event.target).attr("id");
    let buttonId = $(event.target).attr("id");
  console.log(buttonId);
    var tempArr = cityID.split("-");
    city = tempArr[0];
    state = tempArr[1];
    goFetch();
});


//previous city buttons click fetch
    //populate current weather
    //populate 5-day forecast