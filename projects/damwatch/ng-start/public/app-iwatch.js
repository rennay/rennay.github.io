// Initialize Firebase
var config = {
    apiKey: "AIzaSyD0fFvCw2H_bcuPDBb82mAw7M38IvWD4hI",
    authDomain: "newfriendlychat-63187.firebaseapp.com",
    databaseURL: "https://newfriendlychat-63187.firebaseio.com",
    projectId: "newfriendlychat-63187",
    storageBucket: "newfriendlychat-63187.appspot.com",
    messagingSenderId: "976092231898"
};

firebase.initializeApp(config);
console.log("Initialised...");

var firestore = firebase.firestore();
        
const outputHeader = document.querySelector("#hotDogOutput");
const loadButton = document.querySelector("#loadButton");
const loadStatus = document.querySelector("#loadStatus");
const myImg = document.querySelector("#myImg");

docRef.onSnapshot(function (doc) {
// docRef.get().then(function (doc) {
    if (doc && doc.exists) {
        console.log("-----");
        const myData = doc.data();
        outputHeader.innerText = "Status: " + myData.hotdogStatus;
    }
});

loadButton.addEventListener("click", function () {
    console.log("loadButton clicked...");
    var theUrl = "/publishMessage";
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            loadStatus.innerText = xmlHttp.responseText;
            console.log(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);    
        
});

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

var _location = findGetParameter('location');
console.log("_location: " + _location);

var dateFolder = moment().format("YYYY-MM-DD");            
const imageColl = firestore.collection("/images/" + _location + "/" + dateFolder);

imageColl.orderBy("TIMESTAMP", "desc").limit(1).onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (result) {
        // console.log(result);
        var objects = result.data();
        for (var key in objects) {
            var value = objects[key];

            console.log("key: " + key + " -- value: " + value);
        }
        
        var downloadURL = objects.downloadURL;
        var timestamp = objects.TIMESTAMP;
        // console.log("downloadURL: " + downloadURL);
        myImg.src = downloadURL;
        outputHeader.innerText = timestamp;
    });
});
