const apiKey = '631b54059a7685cd2a3b02d495ec1018'
const inputEl = $("#city");
const searchEl = $("#searchButton");

function searchFunction1() {
    const cityName = inputEl.val();
    getCityData(cityName)
}

function addtotextbox(id) {
    $('#city').val(recentSearches[id]);
    console.log(recentSearches[id]);
}
//empty array
var recentSearches = [];

searchEl.on("click", searchFunction1)

//display temp of searched city
var getCityData = function (city) {
    const apiWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=631b54059a7685cd2a3b02d495ec1018&units=imperial";



    $.get(apiWeather, function (data) {
        console.log(data)

        // start rendering data for current weather
        const cityH3El = $('#currentCity');
        const tempH4El = $('#currentTemp');
        const windH4El = $('#currentWind');
        const humidityH4El = $('#currentHumidity');
        const indexH4El = $('#currentIndex');


        cityH3El.text(data.name)
        tempH4El.text("Temperature: " + data.main.temp + "°F")
        windH4El.text("Wind: " + data.wind.speed + "mph")
        humidityH4El.text("Humidity: " + data.main.humidity + "%")
        indexH4El.text("Index")

        const apiWeatherFor5Day = "https://api.openweathermap.org/data/2.5/forecast?q=" + data.name + "&appid=631b54059a7685cd2a3b02d495ec1018&units=imperial";

        $.get(apiWeatherFor5Day, function (fiveDayData) {
            console.log(fiveDayData)

            const tempDay1El = $('#tempDay1')
            const tempDay2El = $('#tempDay2')
            const tempDay3El = $('#tempDay3')
            const tempDay4El = $('#tempDay4')
            const tempDay5El = $('#tempDay5')

            const windDay1El = $('#windDay1')
            const windDay2El = $('#windDay2')
            const windDay3El = $('#windDay3')
            const windDay4El = $('#windDay4')
            const windDay5El = $('#windDay5')

            const humidityDay1El = $('#humidityDay1')
            const humidityDay2El = $('#humidityDay2')
            const humidityDay3El = $('#humidityDay3')
            const humidityDay4El = $('#humidityDay4')
            const humidityDay5El = $('#humidityDay5')

            tempDay1El.text("Temperature: " + fiveDayData.list[0].main.temp)
            tempDay2El.text("Temperature: " + fiveDayData.list[8].main.temp)
            tempDay3El.text("Temperature: " + fiveDayData.list[15].main.temp)
            tempDay4El.text("Temperature: " + fiveDayData.list[23].main.temp)
            tempDay5El.text("Temperature: " + fiveDayData.list[31].main.temp)

            windDay1El.text("Wind: " + fiveDayData.list[0].wind.speed)
            windDay2El.text("Wind: " + fiveDayData.list[8].wind.speed)
            windDay3El.text("Wind: " + fiveDayData.list[15].wind.speed)
            windDay4El.text("Wind: " + fiveDayData.list[23].wind.speed)
            windDay5El.text("Wind: " + fiveDayData.list[31].wind.speed)

            humidityDay1El.text("Humidity: " + fiveDayData.list[0].main.humidity)
            humidityDay2El.text("Humidity: " + fiveDayData.list[8].main.humidity)
            humidityDay3El.text("Humidity: " + fiveDayData.list[15].main.humidity)
            humidityDay4El.text("Humidity: " + fiveDayData.list[23].main.humidity)
            humidityDay5El.text("Humidity: " + fiveDayData.list[31].main.humidity)
        })

        searchFunction();
    })


    //called from onclick
    function searchFunction(data) {
        recentSearches.push($('#city').val()); 
        console.log($('#city').val());
        $('#city').val(""); 
        $('#searchHistory').text(""); 

        $.each(recentSearches, function (index, value) {
            $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox(" + index + ")'>" + value + '</li>');
        });
    }

    //function for searching for next city
    function search() {
        var city = $("#city").val();
        console.log("searching for " + city);
        recentSearches.push(city);
        buildSearchHistory();
    }

    function buildSearchHistory() {
        console.log("adding to text box");
        $("#searchHistory ul").empty();
        $.each(recentSearches, function (index, value) {
            $("#searchHistory ul")
                .append("<li onclick='searchAgain(" + index + ")' >" + value + "</li>");
        });
    }

    function searchAgain(index) {
        $("#city").val(recentSearches[index]);
        search();
    }



};