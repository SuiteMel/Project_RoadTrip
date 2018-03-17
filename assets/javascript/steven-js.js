$(function () {
    console.log("ready");

    var config = {
        apiKey: "AIzaSyARYyZkZLUQZOyJQU7cMku9y1ypSjCz5iE",
        authDomain: "project-roadtrip.firebaseapp.com",
        databaseURL: "https://project-roadtrip.firebaseio.com",
        projectId: "project-roadtrip",
        storageBucket: "project-roadtrip.appspot.com",
    };
    firebase.initializeApp(config);
});
var parsedLat = null;
var parsedLng = null;
var foodResults = [];
var map;
function initMap() {

    $("#button-1").on("click", function () {
        var database = firebase.database();

        var location = $(this).attr("dataLocation");
        var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyARYyZkZLUQZOyJQU7cMku9y1ypSjCz5iE";


        // https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&callback=initMap

        // https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBn5ySae8mKDqxCbjeeF8qw16nylIjhUu0&callback=initMap


        $.ajax({
            url: queryURL,
            method: "POST"

        }).then(function (response) {

            database.ref().push(response.location);

        });

        database.ref().limitToFirst(1).on("child_added", function (snapshot) {
            var locationLat = snapshot.val().lat;
            var locationLng = snapshot.val().lng;


            $("#lat-display").html("Latitude: " + locationLat);
            $("#lng-display").html("Longitude: " + locationLng);

            parsedLat = parseFloat(locationLat);
            parsedLng = parseFloat(locationLng);


            var userLatLng = {
                lat: parsedLat,
                lng: parsedLng
            };




            var options = {
                zoom: 12,
                center: userLatLng
            }
            var map = new google.maps.Map(document.getElementById('map'), options);
            var marker = new google.maps.Marker({
                position: userLatLng,

                map: map,
                icon: 'assets/images/markers/darkgreenU.png '

            });
            console.log(marker);
            var infoWindow = new google.maps.InfoWindow({
                content: '<h3>This is a test message!</h3>'
            })

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            })


            addMarker(userLatLng);

            function addMarker(coords) {
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'assets/images/markers/darkgreenU.png '

                });
            }

        });
    });

//------------------------------

var userInput = $("#restInput").val().trim();


// var latitude = "38.8989439";
// var longitude = "-94.7256576";

$("#foodFormsubmit").on("click", function (event) {
    event.preventDefault();
    getFood(parsedLat, parsedLng);
});



function getFood(lati, long) {

    var foodQueryURL = "https://developers.zomato.com/api/v2.1/search";
    foodQueryURL += '?' + $.param({
        'lat': lati,
        'lon': long,
        'sort': "real_distance",
        'start': 0,
        'q': userInput
    });

    $.ajax({
        url: foodQueryURL,
        headers: { "user-key": "347df1f1ac7c392cc9a8c55d2bbf3ed3" },
        method: 'GET'
    }).then(function (resp) {
        console.log(foodQueryURL);

        // console.log("food: " ,foodResults);
        foodResults = [];
        $("#food").empty();
        for (i = 0; i < 5; i++) {
            console.log("for loop");
            // console.log(response.restaurants[i]);
            // var restaurantCords = {
            //     lat: parseInt(response.restaurants[i].restaurant.location.latitude),
            //     lng: parseInt(response.restaurants[i].restaurant.location.longitude)
            // };

            // foodResults.push(restaurantCords);
            var resName = $("<dt>").text(resp.restaurants[i].restaurant.name);
            var resLocation = resp.restaurants[i].restaurant.location.address;

            var resCuisine = resp.restaurants[i].restaurant.cuisines
            var price_range = resp.restaurants[i].restaurant.price_range;
            var currency = resp.restaurants[i].restaurant.currency;

            var rangePrice = currency.repeat(price_range);

            var resRating = $("<span>").text(resp.restaurants[i].restaurant.user_rating.aggregate_rating);
            var ratingText = resp.restaurants[i].restaurant.user_rating.rating_text;
            var ratingColor = resp.restaurants[i].restaurant.user_rating.rating_color;
            var resVotes = resp.restaurants[i].restaurant.user_rating.votes;

            resRating.css("color", "#" + ratingColor);


            var resTyLoc = $("<dd>").append(resCuisine + " &#9679; " + resLocation).addClass("mb-0");

            var resRatePrice = $("<dd>");
            resRatePrice.append(resRating, " " + ratingText + " (" + resVotes + " votes)" + " &#9679; " + rangePrice);

            var list = $("<dl>").append(resName, resTyLoc, resRatePrice);
            $("#food").append(list);
        }
        console.log(foodResults);

        foodResults.forEach(function (res) {

            var marker = new google.maps.Marker({
                position: res,
                map: map,
                icon: 'assets/images/markers/darkgreenU.png '

            });

            var infoWindow = new google.maps.InfoWindow({
                content: '<h3>This is a test message!</h3>'
            })

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            })


            addMarker(userLatLng);
        })

    });
}

// var latitude = 38;
// var longitude = -94;

$("#gasStation").on("click", function (event) {
    event.preventDefault();
    $("#station").empty();//clear button
    displayGasList(parsedLat, parsedLng);
}); // close onClick


var displayGasList = function (lati, long) {

    var apiUrl = "http://api.mygasfeed.com/stations/radius/" + lati + "/" + long + "/10/reg/distance/dfoh89ze54.json";
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).then(function (response) {
        var gasList = response.stations;

        $("#gas").empty();  // clear box

        // create list
        for (var i = 0; i < 5; i++) {
            var gasLatitude = gasList[i].lat;
            console.log(gasLatitude)
            var gasLongitude = gasList[i].lng;
            console.log(gasLongitude)
            var gasName = $("<dt>").text(gasList[i].station);
            console.log(gasName)
            var gasDistance = $("<dd>").text(gasList[i].distance).addClass("mb-0");
            console.log(gasDistance)

            var gasZip = gasList[i].zip;
            console.log(gasZip)
            var gasAddress = $("<dd>").text(gasList[i].address).addClass("mb-0");
            console.log(gasAddress)
            var gasCity = gasList[i].city;
            console.log(gasCity)

            var gasLoc = $("<dd>").text(gasCity + " " + gasZip).addClass("mb-0");


            var gasPrice = $("<dd>").text("Regular: " + gasList[i].reg_price).addClass("mb-0");
            console.log(gasPrice)
            var dieselPrice = $("<dd>").text("Diesel: " + gasList[i].diesel_price).addClass("mb-0");
            console.log(dieselPrice)


            var gasDesc = $("<dl>").append(gasName, gasDistance, gasAddress, gasLoc, gasPrice, dieselPrice);
            $("#gas").append(gasDesc);


        }
    });
} 
