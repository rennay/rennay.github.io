console.log("__init.js Starting Execution...");

const downloadImg = document.querySelector("#downloadImg");
const detectImg = document.querySelector("#detectImg");

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

        var _serial = findGetParameter('serial');
        var dateFolder = moment().format("YYYY-MM-DD");
        console.log(`_serial: [${_serial}] dateFolder: [${dateFolder}]`);

        console.log("rennay....*");

        const imageColl = firestore.collection("/images/" + _serial + "/" + dateFolder);
        imageColl.orderBy("timeTaken", "desc").limit(1).get().then(querySnapshot => {
            var i = 1;
            querySnapshot.forEach(function (result) {
                // console.log(result);
                var objects = result.data();
                // for (var key in objects) {
                //     var value = objects[key];

                //     console.log("key: " + key + " -- value: " + value);
                // }

                var downloadURL = objects.downloadURL;
                var timeTaken = objects.timeTaken;
                downloadImg.src = downloadURL;

                // var detectURL = objects.detectURL;
                // var timeDetected = objects.timeDetected;
                // detectImg.src = detectURL;

                // var detection_data = objects.detection;

                // var summaryList = {};
                // var categoryList = []
                // // var summary = {cls:'', count:0};

                // for (i = 0; i < detection_data.length; i++) {
                //     var data = detection_data[i];
                //     var cls = data.class;
                //     var score = data.score;
                //     var category = data.category;

                //     var summary = summaryList[category];
                //     if (summary === undefined) {
                //         summary = { cls: cls, count: 0 };
                //         summaryList[category] = summary;
                //         categoryList.push(category);
                //     }
                //     summary.count++;

                // }
                // console.log(summaryList);

                // // Find a <table> element with id="myTable":
                // var table = document.getElementById("myTable");
                // for (i = 0; i < categoryList.length; i++) {
                //     var category = categoryList[i];

                //     // Create an empty <tr> element and add it to the 1st position of the table:
                //     var row = table.insertRow(-1);
                //     // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
                //     var cellCategory = row.insertCell(0);
                //     var cellCount = row.insertCell(1);

                //     cellCategory.innerHTML = category;
                //     cellCount.innerHTML = summaryList[category].count;

                //     console.log("category: " + category + " count: " + summaryList[category].count);
                // }

                console.log("-*-");
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
            console.log('Loaded...');
        });
    } else {
        // User is signed out.
        // ...
    }
    // ...
});




