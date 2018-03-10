

$(function(){

    var config = {
        apiKey: "AIzaSyARYyZkZLUQZOyJQU7cMku9y1ypSjCz5iE",
        authDomain: "project-roadtrip.firebaseapp.com",
        databaseURL: "https://project-roadtrip.firebaseio.com",
        projectId: "project-roadtrip",
        storageBucket: "project-roadtrip.appspot.com",
      };
      firebase.initializeApp(config);
      var database = firebase.database();
     
      $("button").on("click", function() {
        // var locationDataBase = "";
        var location = $(this).attr("dataLocation");
          var queryURL = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBn5ySae8mKDqxCbjeeF8qw16nylIjhUu0";
        
          
// https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk&callback=initMap

// https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBn5ySae8mKDqxCbjeeF8qw16nylIjhUu0&callback=initMap


      $.ajax({
          url: queryURL,
          method: "POST"
        
       }).then(function(response) {
          console.log("response: " + response);
            
            database.ref().set(response.location);
            console.log("firebase should update");
        });

});

    });

    
    
    function initMap() {
        //need to change the default location somehow
        // map options   zoom max is 14. 
        var options = {
            zoom: 12,
            center: {lat: 50, lng: 50}
        }
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), options);

        /*
        // add a marker 
        var marker = new google.maps.Marker({
            position: {lat: 38.8135, lng: -94.5990}, 
            map: map
        });

       var infoWindow = new google.maps.InfoWindow({
            content: '<h3>This is a test message!</h3>'
        })
        marker.addListener('click', function(){
            infoWindow.open(map, marker);
        })
        */

        addMarker({lat: 38.8135,lng: -94.5990});

        // add marker function 
        function addMarker(coords) {
            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

            });
        }

    }    