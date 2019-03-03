// Create a root reference
var storageRef = firebase.storage().ref();
const downloadImg = document.querySelector("#downloadImg");
var latitude;
var longitude;

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
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    console.log("Retrieved user's location: [" + latitude + ", " + longitude + "]");
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

// Get the current user's location
getLocation();

function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
                console.log("Uploading...");

                // Create the file metadata
                var metadata = {
                    // contentType: 'image/jpeg',
                    customMetadata: {
                        serial: 'iPhone',
                        location: latitude + "," + longitude,
                        timeTaken: '' + new Date()
                    }                    
                };  
                
                // Upload file and metadata to the object 'images/mountains.jpg'
                var dateFolder = moment().format("YYYYMMDD");
                console.log("dateFolder: " + dateFolder);
                var uploadTask = storageRef.child(dateFolder + "/" + file.name).put(file, metadata);

                // Listen for state changes, errors, and completion of the upload.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                function(snapshot) {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                    }
                }, function(error) {

                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                    case 'storage/canceled':
                    // User canceled the upload
                    break;

                    case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                }
                }, function() {
                // Upload completed successfully, now we can get the download URL
                var downloadURL = uploadTask.snapshot.downloadURL;
                downloadImg.src = downloadURL;
                });                
            }
        }
    } 
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("demo").innerHTML = txt;
}
