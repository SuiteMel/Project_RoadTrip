$(document).ready(function () {
    
    var station = $(this).data('name');
    var apiUrl = "http://api.mygasfeed.com/stations/radius/38/-94/25/reg/distance/dfoh89ze54.json";
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(response);

        
    var gasLatitude= response.stations[0].lat;
    console.log(gasLatitude)
    var gasLongitude = response.stations[0].lng;
    console.log(gasLongitude)
    var gasName = response.stations[0].station;
    console.log(gasName)
    var gasAddress = response.stations[0].address;
    console.log(gasAddress)
    var gasCity = response.stations[0].city;
    console.log(gasCity)
    var gasPrice = response.stations[0].reg_price;
    console.log(gasPrice)
    var gasDiesel = response.stations[0].diesel;
    console.log(gasDiesel)
    var dieselPrice = response.stations[0].diesel_price;
    console.log(dieselPrice)



    });

   
});
    


