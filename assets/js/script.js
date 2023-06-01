var requestURL = "https://api.openweathermap.org/data/2.5/forecast?London,uk&appid=8e0d96b38170e9b7a96c40d93fb7248f";

fetch(requestURL)
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
})