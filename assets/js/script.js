// // var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=8e0d96b38170e9b7a96c40d93fb7248f";
// var requestURL = "https://api.openweathermap.org/data/2.5/forecast?waco,tx&appid=8e0d96b38170e9b7a96c40d93fb7248f";

// fetch(requestURL)
// .then(function(response) {
//     return response.json();
// })
// .then(function(data) {
//     console.log(data);
// })
const apikey = "8e0d96b38170e9b7a96c40d93fb7248f";
const today = dayjs();
var cityInput = $("#input-city");
var stateDrop = $("#state");
var searchButton = $("#search-button");
var city;
var state;

function init() {
    //get user location
    popCurr();
    buildForecastCards();
}

function search() {
    city = cityInput.val();
    state = stateDrop.val();
    // fetch city from weather and place in local storage
    popCurr();
    pop5fore();
    // popPrevCity();
}

function popCurr() {
    //populate current day weather
    var currDate = today.format("M / D / YY");
    $("#curr-city").text(city + ", " + state + " " + currDate);
    $("#curr-temp").text("Temp: ");
    $("#curr-wind").text("Wind: ");
    $("#curr-humid").text("Humidity: ");
}

function pop5fore() {
    for (i = 1; i <= 5; i++) {
        var foreDate = today.add(i, "d").format("M / D / YY");
        $("#fut-date-" + i).text(foreDate);
        $("#fut-icon-" + i).text("icon");
        $("#fut-temp-" + i).text("Temp: ");
        $("#fut-wind-" + i).text("Wind: ");
        $("#fut-humid-" + i).text("Humidity: ");
    }
    //populate 5-day forecast
}

function popPrevCity() {
    //populate previous cities buttons
    popCurr();
    pop5fore();
}

function buildForecastCards() {
    for (i = 1; i <= 5; i++) {
        var foreDate = today.add(i, "d").format("M / D / YY");
        var forecastCard = "";
        forecastCard += '<div class="card col-2 bg-dark text-light mx-1">'
        forecastCard += '<p id="fut-date-"' + i + '>' + foreDate + '</p>';
        forecastCard += '<p id="fut-icon-"' + i + '>Icon' +  + '</p>';
        forecastCard += '<p id="fut-temp-"' + i + '>Temp: ' + + '</p>';
        forecastCard += '<p id="fut-wind-"' + i + '>Wind: ' + + '</p>';
        forecastCard += '<p id="fut-humid-"' + i + '>Humidity: ' + + '</p>';
        forecastCard += "</div>"
        $("#forecast-container").append(forecastCard);
    }
}

init();
searchButton.click(search);

//previous city buttons click fetch
    //populate current weather
    //populate 5-day forecast