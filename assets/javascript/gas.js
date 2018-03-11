$(document).ready(function () {
    var station = $(this).data('name');
    var apiUrl = "http://api.mygasfeed.com/stations/radius/38/-94/50/reg/distance/dfoh89ze54.json";
    $.ajax({
        url: apiUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
    }); 

});
