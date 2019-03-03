console.log("Geofire List");

const saveButton = document.querySelector("#saveButton");

// Get a reference to the database service
var database = firebase.database();

var geofireRef = database.ref("geofire");
var geoFire = new GeoFire(geofireRef);
console.log("Initialised Geofire...");

var locationsRef = database.ref("locations");

var latitude;
var longitude;

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
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");
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

saveButton.addEventListener("click", function () {
    console.log("saveButton clicked!"); 
    // Get the current user's location

    log("User's location: [" + latitude + ", " + longitude + "]");

    console.log('query...');
    var myRadius = parseFloat(document.getElementById("myRadius").value);
    console.log(`myRadius: [${myRadius}]`)    
    var geoQuery = geoFire.query({
        center: [latitude, longitude],
        radius: myRadius // in kilometers
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
});

getLocation();    
