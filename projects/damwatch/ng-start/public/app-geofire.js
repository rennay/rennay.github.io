console.log("Geofire");

// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyD0fFvCw2H_bcuPDBb82mAw7M38IvWD4hI",
//     authDomain: "newfriendlychat-63187.firebaseapp.com",
//     databaseURL: "https://newfriendlychat-63187.firebaseio.com",
//     projectId: "newfriendlychat-63187",
//     storageBucket: "newfriendlychat-63187.appspot.com",
//     messagingSenderId: "976092231898"
// };
// firebase.initializeApp(config);
// console.log("Initialised...");

// Get a reference to the database service
var database = firebase.database();

var geofireRef = database.ref("geofire");
var geoFire = new GeoFire(geofireRef);

console.log("Initialised Geofire...");

var locationKey = "nedbank";

geoFire.set(locationKey, [-26.038604, 28.070948]).then(function () {
    console.log("Provided key has been added to GeoFire*");
}, function (error) {
    console.log("Error: " + error);
});

var locationsRef = database.ref("locations");

// firebase.database().ref('locations/' + locationKey).set({
//     url: "https://www.cnn.com"
// }).then(function () {
//     console.log("Provided key has been added to Locations");
// }, function (error) {
//     console.log("Error: " + error);
// });

/* Uses the HTML5 geolocation API to get the current user's location */
var getLocation = function () {
    if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
        log("Asking user to get their location");
        navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
    } else {
        log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
    }
};

/* Callback method from the geolocation API which receives the current user's location */
var geolocationCallback = function (location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");
    _initMap(latitude, longitude);

    console.log('query...');
    var geoQuery = geoFire.query({
        center: [latitude, longitude],
        radius: 0.6 // 
    });

    // Attach event callbacks to the query
    var onKeyEnteredRegistration = geoQuery.on("key_entered", function (key, location) {
        console.log(key + " entered the query. Hi " + key + "!");

    });

    var onKeyExitedRegistration = geoQuery.on("key_exited", function (key, location) {
        console.log(key + " migrated out of the query. Bye bye :(");

    });

    var onKeyMovedRegistration = geoQuery.on("key_moved", function (key, location) {
        console.log(key + " moved to somewere else within the query.");
    });

    // var username = "rennay";
    // geoFire.set(username, [latitude, longitude]).then(function() {
    //   log("Current user " + username + "'s location has been added to GeoFire");

    //   // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
    //   // remove their GeoFire entry
    // //   firebaseRef.child(username).onDisconnect().remove();

    // //   log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
    // }).catch(function(error) {
    //   log("Error adding user " + username + "'s location to GeoFire");
    // });    

}

/* Handles any errors from trying to get the user's current location */
var errorHandler = function (error) {
    if (error.code == 1) {
        log("Error: PERMISSION_DENIED: User denied access to their location");
    } else if (error.code === 2) {
        log("Error: POSITION_UNAVAILABLE: Network is down or positioning satellites cannot be reached");
    } else if (error.code === 3) {
        log("Error: TIMEOUT: Calculating the user's location too took long");
    } else {
        log("Unexpected error code")
    }
}

/*************/
/*  HELPERS  */
/*************/
/* Logs to the page instead of the console */
function log(message) {
    // var childDiv = document.createElement("div");
    // var textNode = document.createTextNode(message);
    // childDiv.appendChild(textNode);
    // document.getElementById("log").appendChild(childDiv);
    console.log(message);
}

// Get the current user's location
getLocation();

function initMap() {
    console.log("initMap");
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });    
}

function _initMap(latitude, longitude) {
    console.log("_initMap...");
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: { lat: latitude, lng: longitude }
    });

    locationsRef.on('child_added', function (data) {
        var locationKey = data.key;
        // console.log(locationKey);

        geoFire.get(locationKey).then(function (location) {
            if (location === null) {
                console.log("Provided key is not in GeoFire");
            }
            else {
                console.log("Provided key has a location of " + location);
                var marker = new google.maps.Marker({
                    position: { lat: location[0], lng: location[1] },
                    map: map,
                    url: "?serial=" + locationKey
                });

                // marker.addListener('click', function () {
                //     console.log("marker clicked");
                // });

                // google.maps.event.addListener(marker, 'click', function () {
                //     var myViewSelect = document.getElementById("myViewSelect");
                //     var myMaxSelect = document.getElementById("myMaxSelect");

                //     var newUrl = myViewSelect.value + this.url + "&max=" + myMaxSelect.value;
                //     console.log(`newUrl: [${newUrl}]`);
                    
                //     window.location.href = newUrl;
                // });
            }
        }, function (error) {
            console.log("Error: " + error);
        });
    });
}