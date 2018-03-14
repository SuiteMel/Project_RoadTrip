

var userInput = $("#restInput").val().trim();


var latitude = "38.8989439";
var longitude = "-94.7256576";

$("#foodFormsubmit").on("click", function (event) {
  event.preventDefault();
  getFood(latitude, longitude);
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

    for (i=0; i<5; i++) {
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
  });
}