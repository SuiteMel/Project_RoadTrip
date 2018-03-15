$(document).ready(function () {

var lati=38;
var longitude=-94;
    
    $("#gasStation").on("click", function(event) {
        event.preventDefault();

        var station = $(this).data('name');
        var apiUrl = "http://api.mygasfeed.com/stations/radius/"+ lati +"/" + longitude +"/25/reg/distance/dfoh89ze54.json";
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
    $("#gasStation").empty();//clear button

  $("#gas").empty();  // clear box

   // create list
     for (var i = 0; i < 5; i++) {
        var gasLatitude=gasList[i].lat;
        var gasLongitude = gasList[i].lng;
        var gasName =$("<dt>").text(gasList[i].station);
        var gasDistance =$("<dd>").text(gasList[i].distance).addClass("mb-0");
        var gasZip = gasList[i].zip;
        var gasAddress = $("<dd>").text(gasList[i].address).addClass("mb-0");
        var gasCity = gasList[i].city;
        var gasLoc= $("<dd>").text(gasCity + " " + gasZip).addClass("mb-0");
        var gasPrice = $("<dd>").text("Regular: "+gasList[i].reg_price).addClass("mb-0");
        var dieselPrice = $("<dd>").text("Diesel: "+gasList[i].diesel_price).addClass("mb-0");
        var gasDesc = $("<dl>").append(gasName, gasDistance,gasAddress, gasLoc, gasPrice, dieselPrice);
    $("#gas").append(gasDesc);

        
    }

    
};