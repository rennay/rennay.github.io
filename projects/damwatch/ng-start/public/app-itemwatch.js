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

const tblDynamic = document.querySelector("#tblDynamic");

// var headings = ["Item", "Dischem", "Game", "PnP", "Clicks", "Makro", "Woolworths", "Spar"];
var headings = ["Item", "Dischem", "Game", "PnP", "Clicks", "Makro", "Woolworths"];

var table = document.getElementById("mytable");
var row = table.insertRow();

for (i = 0; i < headings.length; i++) {
    var cell = row.insertCell();
    cell.innerHTML = headings[i];
    cell.style = "font-weight: bold;background-color:lightgray;text-align:center";
}

function myFunction() {
    alert("myFunction");
}

getItemResult = function () {
    // firestore.collection("items").get().then(function(querySnapshot) {        
    firestore.collection("items").onSnapshot(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var itemID = doc.id;
            console.log(itemID, " => ", doc.data());
            var itemDocumentReference = doc.ref;

            var collectorRow = document.getElementById("row_" + itemID);
            if (typeof collectorRow == "undefined" || collectorRow == null) {
                collectorRow = table.insertRow();
                collectorRow.id = "row_" + itemID;

                cell = collectorRow.insertCell();
                cell.innerHTML = "<a href='itemwatch.histo.html?itemID=" + itemID + "'>" + doc.data().name + "</a>";

                for (i = 1; i < headings.length; i++) {
                    cell = collectorRow.insertCell();
                    cell.id = "cell_" + headings[i] + "_" + itemID;
                    // cell.style = "font-weight: bold;background-color:lightgray";
                }
            }

            // console.log("-- " + itemDocumentReference);
            var collectorsCollectionReference = itemDocumentReference.collection("collectors");

            // collectorsCollectionReference.onSnapshot(function(querySnapshot) {
            collectorsCollectionReference.get().then(function (querySnapshot) {
                var collectorsSize = querySnapshot.size;
                var lowestPrice = 100000.0;
                var lowestPriceCell = {};

                querySnapshot.forEach(function (collectorDoc) {
                    var collectorID = collectorDoc.id;
                    var collectorCell = document.getElementById("cell_" + collectorID + "_" + itemID);

                    var collectorDocumentReference = collectorDoc.ref;
                    var doc = collectorDocumentReference.get().then(doc => {
                        if (!doc.exists) {
                            console.log('No such document!');
                        } else {
                            var resultsCollectionReference = collectorDocumentReference.collection("results");
                            resultsCollectionReference.orderBy("TIMESTAMP", "desc").limit(1).onSnapshot(function (resultQuerySnapshot) {
                                // resultsCollectionReference.orderBy("TIMESTAMP", "desc").limit(1).get().then(function(resultQuerySnapshot) {
                                resultQuerySnapshot.forEach(function (resultDoc) {
                                    // console.log(resultDoc.data());

                                    var result = resultDoc.data();

                                    var currentPrice = result.PRICE;
                                    if (currentPrice < lowestPrice) {
                                        lowestPriceCell = collectorCell;
                                        lowestPrice = currentPrice;
                                    }

                                    var innerHTML = "<a href='" + doc.data().endpoint + "' target='_blank'>"
                                    var gsURL = result.GS_URL;
                                    if (gsURL != "undefined" && gsURL != null) {
                                        innerHTML += "<img src='" + gsURL + "' height='100' width='100'>";
                                        innerHTML += "<br/>";
                                    }
                                    innerHTML += result.PRICE.toFixed(2);
                                    innerHTML += "</a>";
                                    collectorCell.innerHTML = innerHTML;
                                    collectorCell.style = "background-color:white;text-align:center";

                                    collectorsSize--;
                                    if (collectorsSize == 0) {
                                        lowestPriceCell.style = "background-color:powderblue;text-align:center";
                                    }
                                });
                            });
                        }
                    }).catch(err => {
                        console.log('Error getting document', err);
                    });
                });
            });
        });
    });
};

getItemResult();


