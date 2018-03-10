// var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat=38.8989439&lon=-94.7256576";

var latitude = "38.8989439";
var longitude = "-94.7256576";

var queryURL = "https://developers.zomato.com/api/v2.1/geocode";
  queryURL += '?' + $.param({
    'lat': latitude,
    'lon': longitude
  });

  $.ajax({
    url: queryURL,
    headers: {"user-key": "347df1f1ac7c392cc9a8c55d2bbf3ed3"},
    method: 'GET'
  }).then(function (response) {
    var resName = response.nearby_restaurants[0].restaurant.name;
    var resLocation = response.nearby_restaurants[0].restaurant.location.address;

    var resCuisine = response.nearby_restaurants[0].restaurant.cuisines;
    var price_range = response.nearby_restaurants[0].restaurant.price_range;
    var currency = response.nearby_restaurants[0].restaurant.currency;

    var resRating = response.nearby_restaurants[0].restaurant.user_rating.aggregate_rating;
    var ratingText = response.nearby_restaurants[0].restaurant.user_rating.rating_text;
    var resVotes = response.nearby_restaurants[0].restaurant.user_rating.votes;

  });
