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

const docRef = firestore.doc("samples/sandwichData");

const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

saveButton.addEventListener("click", function () {
    const textToSave = inputTextField.value;
    console.log(textToSave);
    docRef.set({
        hotdogStatus: textToSave
    }).then(function () {
        console.log("Saved...");
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

getRealtimeUpdates();

const damColl = firestore.collection("/dams/NXUET3azMeyqcYY71hhH/collectorMap/DAMDWA/results");

damColl.orderBy("TIMESTAMP", "desc").limit(1).onSnapshot(function (querySnapshot) {
    querySnapshot.forEach(function (result) {
        console.log(result);
        // console.log("Document data:", doc.data());
        var objects = result.data();

        var traceDam = {};
        traceDam.x = [];
        traceDam.y = [];
        traceDam.type = 'bar';

        for (var key in objects) {
            var value = objects[key];

            console.log("key: " + key + " -- value: " + value);
            if (key != "TIMESTAMP") {
                traceDam.x.push(key);
                traceDam.y.push(value);
            }
        }
        console.log(traceDam);
        TESTER = document.getElementById('tester');
        Plotly.purge(TESTER);
        Plotly.plot(TESTER, [{
            x: traceDam.x,
            y: traceDam.y,
            type: 'bar'
        }], {
                margin: { t: 0 }
            });
    });
});

// getDamLevels = function() {
//     damRef.onSnapshot(function(doc) {        
//         if (doc.exists) {
//     });
// }

// getDamLevels();


