 $(document).ready(function () {
    
    $("#gasStation").on("click", function(event) {
        event.preventDefault();

        var station = $(this).data('name');
        var apiUrl = "http://api.mygasfeed.com/stations/radius/38/-94/25/reg/distance/dfoh89ze54.json";
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            displayGasList(response.stations);
        }); // close ajax

    }); // close onClick
 }); // end of onDocumentReady

var displayGasList = function(gasList) {

    // clear box

    // create list
     for (var i = 0; i < 5; i++) {
        var gasLatitude=gasList[i].lat;
        console.log(gasLatitude)
        var gasLongitude = gasList[i].lng;
        console.log(gasLongitude)
        var gasName = gasList[i].station;
        console.log(gasName)
        var gasDistance = gasList[i].distance;
        console.log(gasDistance)
        var gasAddress = gasList[i].address;
        console.log(gasAddress)
        var gasCity = gasList[i].city;
        console.log(gasCity)
        var gasPrice = gasList[i].reg_price;
        console.log(gasPrice)
        var dieselPrice = gasList[i].diesel_price;
        console.log(dieselPrice)
    }

    // add to box
};