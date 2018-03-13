

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
      var database = firebase.database();

      $("#button-1").on("click", function() {
        // var locationDataBase = "";
        var location = $(this).attr("dataLocation");
        var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBn5ySae8mKDqxCbjeeF8qw16nylIjhUu0";
        
          
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

            $("#lat-display").html("Latitude: " + locationLat);
            $("#lng-display").html("Longitude: " + locationLng);

            console.log("lat: " + locationLat);
            console.log("lng: " + locationLng);
            
        });
    });
});


   function initMap() {
    
             var options = {
                zoom: 8,
                center: {lat:39, lng: -94}
            }

            $("#button-2").on("click", function() {
                var map = new google.maps.Map(document.getElementById('map'), options);
                var userLat = $("#user-Lat").val();
                var userLng = $("#user-Lng").val();
                var userLatLng = {lat: userLat, lng: userLng};
                    console.log("userlatlng: " + userLatLng);
                
                    console.log("show user Lat: " + userLat);
                    console.log("show user Lng: " + userLng);
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
            
    
            addMarker(userLat);
            function addMarker(coords) {
                var marker = new google.maps.Marker({
                    position: coords,
                    map: map,
                    icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    
                });
            }
    
            });
        // Create a map object and specify the DOM element for display.
            
         // add a marker 
            

        // add marker function 

    }    