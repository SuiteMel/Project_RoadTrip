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
}

var userInput = $("#restInput").val().trim();


// var latitude = "38.8989439";
// var longitude = "-94.7256576";

$("#foodFormsubmit").on("click", function (event) {
  event.preventDefault();
  getFood(parsedLat, parsedLng);
});



function getFood(lati, long) {
  
var queryURL = "https://developers.zomato.com/api/v2.1/search";
  queryURL += '?' + $.param({
    'lat': lati,
    'lon': long,
    'sort': "real_distance",
    'start': 0,
    'q': userInput
  });

  $.ajax({
    url: queryURL,
    headers: {"user-key": "347df1f1ac7c392cc9a8c55d2bbf3ed3"},
    method: 'GET'
  }).then(function (response) {
// console.log(response);

console.log("food: " ,foodResults);
foodResults = [];
$("#food").empty();
    for (i=0; i<5; i++) {
        console.log("for loop");
        // console.log(response.restaurants[i]);
        var restaurantCords = {
            lat: parseInt(response.restaurants[i].restaurant.location.latitude),
            lng: parseInt(response.restaurants[i].restaurant.location.longitude)
        };

        foodResults.push(restaurantCords);
    var resName = $("<dt>").text(response.restaurants[i].restaurant.name);
    var resLocation = response.restaurants[i].restaurant.location.address;

    var resCuisine = response.restaurants[i].restaurant.cuisines
    var price_range = response.restaurants[i].restaurant.price_range;
    var currency = response.restaurants[i].restaurant.currency;

    var rangePrice = currency.repeat(price_range); 

    var resRating = $("<span>").text(response.restaurants[i].restaurant.user_rating.aggregate_rating);
    var ratingText = response.restaurants[i].restaurant.user_rating.rating_text;
    var ratingColor = response.restaurants[i].restaurant.user_rating.rating_color;
    var resVotes = response.restaurants[i].restaurant.user_rating.votes;

    resRating.css("color", "#" + ratingColor);
    

    var resTyLoc = $("<dd>").append(resCuisine + " &#9679; " + resLocation).addClass("mb-0");

    var resRatePrice = $("<dd>");
    resRatePrice.append(resRating, " " + ratingText + " (" + resVotes + " votes)" + " &#9679; " + rangePrice);

    var list = $("<dl>").append(resName, resTyLoc, resRatePrice);
    $("#food").append(list);
  }
  console.log(foodResults);

  foodResults.forEach(function(res) {

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

