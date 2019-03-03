console.log("Initialising...");

// Get a reference to the database service
var database = firebase.database();

function initMap() {
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        // ...      
        console.log(`isAnonymous: ${isAnonymous}`);
    }
});

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

/* Uses the HTML5 geolocation API to get the current user's location */
var getLocation = function () {
    if (typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
        console.log("Asking user to get their location");
        navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
    } else {
        console.log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
    }
};

/* Callback method from the geolocation API which receives the current user's location */
var geolocationCallback = function (location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

    var myLatLng = { lat: latitude, lng: longitude };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: myLatLng
    });

    var locationsRef = database.ref("locations");
    // locationsRef.limitToLast(10).on('child_added', function (snapshot) {
    locationsRef.on('child_added', function (snapshot) {
        console.log(snapshot.key + " -- " + snapshot.val().provider);

        var marker = new google.maps.Marker({
            position: { lat: snapshot.val().latitude, lng: snapshot.val().longitude },
            map: map
        });
    });
}

// Get the current user's location
getLocation();
