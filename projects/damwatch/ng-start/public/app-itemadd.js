console.log("Hotdog...");

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

const collectionName = "items";

const outputHeader = document.querySelector("#outputHeader");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function () {
    const itemName = document.querySelector("#itemName").value;
    const itemDescription = document.querySelector("#itemDescription").value;
        
    var data = {
        name: itemName,
        description: itemDescription,
        lastupdate: new Date(),
        uuid: guid()
    };
    console.log(data);
    docRef = firestore.collection(collectionName).doc();
        
    docRef.set(data).then(function () {
        var itemID = docRef.id;
        console.log("Saved Item..." + itemID);

        var collectorCollection = docRef.collection("collectors");

        var urlPnP = document.querySelector("#urlPnP").value;
        var urlClicks = document.querySelector("#urlClicks").value;
        var urlDischem = document.querySelector("#urlDischem").value;
        var urlGame = document.querySelector("#urlGame").value;
        var urlMakro = document.querySelector("#urlMakro").value;
        var urlWoolworths = document.querySelector("#urlWoolworths").value;

        var collectors = [
            {ID: "PnP", URL: urlPnP},
            {ID: "Clicks", URL: urlClicks},
            {ID: "Dischem", URL: urlDischem},
            {ID: "Game", URL: urlGame},
            {ID: "Makro", URL: urlMakro},
            {ID: "Woolworths", URL: urlWoolworths}
        ];

        for (i=0; i < collectors.length; i++) {
            var collector = collectors[i];
            var collectorID = collector.ID;
            var collectorURL = collector.URL;

            if (collectorURL.length > 0) {
                addCollector(collectorCollection, collectorID, collectorURL, itemID) 
            }
        }
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });
});

loadButton.addEventListener("click", function () {
    console.log("loadButton clicked...");
    docRef.get().then(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerText = "Hot dog status: " + myData.hotdogStatus;
        }
    }).catch(function () {
        console.log("Got an error: ", error);
    });
});

getRealtimeUpdates = function () {
    docRef.onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            outputHeader.innerText = "Hot dog status: " + myData.hotdogStatus;
        }
    });
}

// getRealtimeUpdates();

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function addCollector(collectorCollection, collectorID, collectorURL, itemID) {
    var collectorData = {
        ID: collectorID,
        endpoint: collectorURL,
        itemID: itemID
    };   
    console.log(collectorData); 

    var collectorDoc = collectorCollection.doc(collectorID).set(collectorData).then(function() {
        console.log("Saved Collector...");
    }).catch(function (error) {
        console.log("Got an error: ", error);
    });

    return collectorData;
}