$(document).ready(function () {

var latitude=38;
var longitude=-94;
    
    $("#gasStation").on("click", function(event) {
        event.preventDefault();
        $("#station").empty();//clear button
        displayGasList(latitude, longitude);
    }); // close onClick
 }); // end of onDocumentReady

var displayGasList = function(lati, long) {
    
    var apiUrl = "http://api.mygasfeed.com/stations/radius/"+ lati +"/" + long +"/10/reg/distance/dfoh89ze54.json";
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).then(function (response) {
            var gasList = response.stations;

  $("#gas").empty();  // clear box

   // create list
     for (var i = 0; i < 5; i++) {
        var gasLatitude=gasList[i].lat;
        console.log(gasLatitude)
        var gasLongitude = gasList[i].lng;
        console.log(gasLongitude)
        var gasName =$("<dt>").text(gasList[i].station);
        console.log(gasName)
        var gasDistance =$("<dd>").text(gasList[i].distance).addClass("mb-0");
        console.log(gasDistance)

        var gasZip = gasList[i].zip;
        console.log(gasZip)
        var gasAddress = $("<dd>").text(gasList[i].address).addClass("mb-0");
        console.log(gasAddress)
        var gasCity = gasList[i].city;
        console.log(gasCity)

        var gasLoc= $("<dd>").text(gasCity + " " + gasZip).addClass("mb-0");


        var gasPrice = $("<dd>").text("Regular: "+gasList[i].reg_price).addClass("mb-0");
        console.log(gasPrice)
        var dieselPrice = $("<dd>").text("Diesel: "+gasList[i].diesel_price).addClass("mb-0");
        console.log(dieselPrice)


        var gasDesc = $("<dl>").append(gasName, gasDistance,gasAddress, gasLoc, gasPrice, dieselPrice);
    $("#gas").append(gasDesc);

        
    }

}); // close ajax  
};