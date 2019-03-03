console.log("Starting Execution...");

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

console.log("Hello Range");

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value
var images = [];

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value;
}

// Update the current slider value (each time you drag the slider handle)
slider.onchange = function () {
    var i = this.value;
    var imageData = images[i - 1];
    myImg.src = imageData.downloadURL;
    outputHeader.innerText = imageData.timestamp;
}

firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        // ...      
        console.log(`isAnonymous: ${isAnonymous}`);

        var firestore = firebase.firestore();
        const outputHeader = document.querySelector("#outputHeader");
        const myImg = document.querySelector("#myImg");
        const myRange = document.querySelector("#myRange");

        var _serial = findGetParameter('serial');
        var _max = findGetParameter('max');
        if (!_max) {
            _max = "10";
        }
        var max = parseInt(_max);
        var dateFolder = moment().format("YYYY-MM-DD");

        console.log(`_serial: [${_serial}] max: [${max}] dateFolder: [${dateFolder}]`);      

        const imageColl = firestore.collection("/images/" + _serial + "/" + dateFolder);
        imageColl.orderBy("timeTaken", "desc").limit(max).onSnapshot(querySnapshot => {
            var i = 1;

            querySnapshot.forEach(function (result) {
                // console.log(result);
                var objects = result.data();
                // for (var key in objects) {
                //     var value = objects[key];

                //     console.log("key: " + key + " -- value: " + value);
                // }

                var downloadURL = objects.downloadURL;
                var timestamp = objects.timeTaken;

                // console.log(`i: ${i} timestamp: ${timestamp}`)

                var imageData = {
                    i: i,
                    timestamp: timestamp,
                    downloadURL: downloadURL
                };
                images.push(imageData);
                i++;
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
            console.log('Loaded...');
            myRange.max = --i;

            var imageData = images[0];
            myImg.src = imageData.downloadURL;
            outputHeader.innerText = imageData.timestamp;
        });
    }
});