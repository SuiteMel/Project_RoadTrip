 $(document).ready(function () {
    
    var station = $(this).data('name');
    var apiUrl = "http://api.mygasfeed.com/stations/radius/38/-94/25/reg/distance/dfoh89ze54.json";
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        
     for (var i = 0; i < 5; i++) {
         
       
    var gasLatitude= response.stations[i].lat;
    console.log(gasLatitude)
    var gasLongitude = response.stations[i].lng;
    console.log(gasLongitude)
    var gasName = response.stations[i].station;
    console.log(gasName)
    var gasDistance = response.stations[i].distance;
    console.log(gasDistance)
    var gasAddress = response.stations[i].address;
    console.log(gasAddress)
    var gasCity = response.stations[i].city;
    console.log(gasCity)
    var gasPrice = response.stations[i].reg_price;
    console.log(gasPrice)
    var dieselPrice = response.stations[i].diesel_price;
    console.log(dieselPrice)
   
     }
    
   
    });

   
});
    


