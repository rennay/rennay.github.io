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

var itemID = findGetParameter('itemID');
console.log("itemID: [" + itemID + "]");

const path = "/items/" + itemID;
const itemDocRef = firestore.doc(path);
const itemColl = firestore.collection(path + "/collectors");

const outputHeader = document.querySelector("#itemhistoryOutput");

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

drawGraph = function (data) {
    // alert('here');
    // console.log(data);
    var myPlot = document.getElementById('tester');
    Plotly.purge(myPlot);
    // Plotly.plot(myPlot, [{
    //     x: data.x,
    //     y: data.y,
    //     type: data.type
    // }], {
    //         margin: { t: 0 }
    //     });
    Plotly.newPlot(myPlot, data);
}

getItemResult = function () {
    var getDoc = itemDocRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                // console.log("--" + doc.get("name"));
                outputHeader.innerText = "Item History: " + doc.get("name");
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    var data = [];
    // itemColl.onSnapshot(function(querySnapshot) {   
    itemColl.get().then(function (querySnapshot1) {
        var collectorsSize = querySnapshot1.size;
        querySnapshot1.forEach(function (doc) {
            var collectorID = doc.id;
            // console.log(collectorID, " => ", doc.data());

            var itemDocumentReference = doc.ref;

            var resultsCollectionReference = itemDocumentReference.collection("results");

            // resultsCollectionReference.onSnapshot(function(querySnapshot) {                
            resultsCollectionReference.orderBy("TIMESTAMP", "desc").limit(10).get().then(function (querySnapshot2) {
                var trace1 = {};
                trace1.x = [];
                trace1.y = [];
                trace1.type = "scatter";
                trace1.name = collectorID;

                querySnapshot2.forEach(function (resultDoc) {
                    var result = resultDoc.data();
                    // console.log("-- " + result.PRICE);
                    // console.log("-- " + result.TIMESTAMP);

                    trace1.x.push(result.TIMESTAMP);
                    trace1.y.push(result.PRICE);
                });
                data.push(trace1);
                collectorsSize--;
                if (collectorsSize == 0) {
                    drawGraph(data);
                }
            });
            // drawGraph(data);                
        });
        // console.log(data);
        // drawGraph(data);           
    });
};

getItemResult();


