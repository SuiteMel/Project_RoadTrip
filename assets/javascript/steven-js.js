

$(function(){
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




   function initMap() {
    
    $("#button-1").on("click", function() {
        var database = firebase.database();
        // var locationDataBase = "";
        var location = $(this).attr("dataLocation");
        var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyARYyZkZLUQZOyJQU7cMku9y1ypSjCz5iE";
        
          
// https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&callback=initMap

// https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBn5ySae8mKDqxCbjeeF8qw16nylIjhUu0&callback=initMap


      $.ajax({
          url: queryURL,
          method: "POST"
        
       }).then(function(response) {
        //   console.log("response: " + response);
            
            database.ref().push(response.location);
            
            // console.log("firebase should update");
        });

        database.ref().limitToFirst(1).on("child_added", function(snapshot) {
            var locationLat = snapshot.val().lat;
            var locationLng = snapshot.val().lng;
            var zipCode = snapshot.val().postal_code;

            $("#lat-display").html("Latitude: " + locationLat);
            $("#lng-display").html("Longitude: " + locationLng);
            $("#zip-code").html("Zip Code: " + zipCode);

            console.log("lat: " + locationLat);
            console.log("lng: " + locationLng);
            console.log("zip: " + zipCode);
            
    

             

            $("#button-2").on("click", function() {
                var parsedLat = parseFloat(locationLat);
                var parsedLng = parseFloat(locationLng);
               
                // var userLat = $("#user-Lat").val();
                // var userLng = $("#user-Lng").val();
                // var userLatLng = {lat: $("#user-Lat").val(), lng: $("#user-Lng").val()};
                var userLatLng = {lat: parsedLat, lng: parsedLng};
                    console.log("userlatlng: " + userLatLng);                
                    // console.log("show user Lat: " + userLat);
                    // console.log("show user Lng: " + userLng);
                    


                    var options = {
                    zoom: 12,
                    center: userLatLng
                }
                var map = new google.maps.Map(document.getElementById('map'), options);
                var marker = new google.maps.Marker({
                    position: userLatLng, 
                    map: map
                
                });
               
                var infoWindow = new google.maps.InfoWindow({
                    content: '<h3>This is a test message!</h3>'
                })
            
                    marker.addListener('click', function(){
                        infoWindow.open(map, marker);
                    })
            
    
            addMarker(userLatLng);
            function addMarker(coords) {
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    
                });
            }
    
            });

        });
    });
}    