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

var db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

var latitude = 0;
var longitude = 0;

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
    document.querySelector("#latitude").value = latitude;
    document.querySelector("#longitude").value = longitude;
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

var populateUsers = function () {
    console.log("-- populateUsers...");
    var json = {
        limit: 10
    };
    console.log(json);

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8010/newfriendlychat-63187/us-central1/getUsers";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("-- onreadystatechange");
            console.log("-- " + xhr.responseText);

            var select = document.querySelector("#userUID");
            var i;
            for (i = select.options.length - 1; i >= 0; i--) {
                select.remove(i);
            }

            var myObj, txt = "";
            myObj = JSON.parse(xhr.responseText);
            for (x in myObj.users) {
                var opt = document.createElement('option');
                opt.value = myObj.users[x].userUID;
                opt.innerHTML = myObj.users[x].firstname + " " + myObj.users[x].lastname;
                select.appendChild(opt);
            }
        }
    };
    var data = JSON.stringify(json);
    xhr.send(data);
}

var populateDeals = function (category, limit, userUID) {
    var json = {
        category: category,
        limit: limit,
        userUID: userUID
    };
    console.log(json);

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8010/newfriendlychat-63187/us-central1/getDeals";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("-- onreadystatechange");
            console.log("-- " + xhr.responseText);

            var select = document.querySelector("#dealUID");
            var i;
            for (i = select.options.length - 1; i >= 0; i--) {
                select.remove(i);
            }

            var myObj, txt = "";
            myObj = JSON.parse(xhr.responseText);
            for (x in myObj.deals) {
                var opt = document.createElement('option');
                opt.value = myObj.deals[x].dealUID;
                opt.innerHTML = moment(myObj.deals[x].created).fromNow() + " -- " + myObj.deals[x].description;
                select.appendChild(opt);
            }
        }
    };
    var data = JSON.stringify(json);
    xhr.send(data);
}

var populateOffers = function (dealUID) {
    var json = {
        dealUID: dealUID
    };
    console.log(json);
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8010/newfriendlychat-63187/us-central1/getOffers";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("-- onreadystatechange");
            console.log("-- " + xhr.responseText);

            var select = document.querySelector("#offerUID");
            var i;
            for (i = select.options.length - 1; i >= 0; i--) {
                select.remove(i);
            }

            var myObj, txt = "";
            myObj = JSON.parse(xhr.responseText);
            for (x in myObj.offers) {
                var opt = document.createElement('option');
                opt.value = myObj.offers[x].offerUID;
                opt.innerHTML = moment(myObj.offers[x].created).fromNow() + " -- " + myObj.offers[x].payload.price;
                select.appendChild(opt);
            }
        }
    };
    var data = JSON.stringify(json);
    xhr.send(data);
}

var populateDescription = function (dealUID) {
    var json = {
        dealUID: dealUID
    };
    console.log(json);

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8010/newfriendlychat-63187/us-central1/getDeal";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("-- onreadystatechange");
            console.log("-- " + xhr.responseText);

            var description = document.querySelector("#description");
            myObj = JSON.parse(xhr.responseText);
            description.value = myObj.description;
        }
    };
    var data = JSON.stringify(json);
    xhr.send(data);
}

const btnGetNotifications = document.querySelector("#btnGetNotifications");
if (btnGetNotifications != null) {
    console.log("Binding btnGetNotifications...");

    populateUsers();

    btnGetNotifications.addEventListener("click", function () {
        var old_element = document.getElementById("btnGetNotifications");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        const userUID = document.querySelector("#userUID").value;

        var query = db.collection('source4me/root/users').doc(userUID).collection('notifications').orderBy('created', 'desc').limit(10);

        var observer = query.onSnapshot(querySnapshot => {
            console.log(`Received query snapshot of size ${querySnapshot.size}`);

            var table = document.getElementById("myTable");
            var i = 0;
            for (i = table.rows.length - 1; i > 0; i--) {
                table.deleteRow(i);
            }

            var dealList = [];
            var promiseList = [];
            querySnapshot.forEach(doc => {
                var dealUID = doc.data().dealUID;

                var promise_x = db.collection(`source4me/root/deals`).doc(dealUID).get()
                    .then(function (dealDoc) {
                        var row = table.insertRow(1);

                        var deal = {
                            dealUID: dealDoc.id,
                            description: dealDoc.data().description,
                            created: moment(doc.data().created.toDate()).fromNow(),
                            updated: moment(doc.data().updated.toDate()).fromNow(),
                            count: doc.data().count
                        }
                        dealList.push(deal);
                    });
                promiseList.push(promise_x);
            });
            Promise.all(promiseList)
                .then(function (notificationDocs) {
                    var i = 0;

                    for (i = 0; i < dealList.length; i++) {
                        var row = table.insertRow();

                        var deal = dealList[i];

                        var cellDeal = row.insertCell(0);
                        var cellCreated = row.insertCell(1);
                        var cellUpdated = row.insertCell(2);
                        var cellCount = row.insertCell(3);

                        // Add some text to the new cells:
                        cellDeal.innerHTML = `<a href='/source4me-addOffer.html?dealUID=${deal.dealUID}/'>${deal.description}</a>`;
                        // "<a href='10'>" + deal.description + "</a>";
                        cellCreated.innerHTML = deal.created;
                        cellUpdated.innerHTML = deal.updated;
                        cellCount.innerHTML = deal.count;
                    }
                });
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    });
}

const btnAddDeal = document.querySelector("#btnAddDeal");
if (btnAddDeal != null) {
    console.log("Binding btnAddDeal...");

    populateUsers();
    getLocation();

    btnAddDeal.addEventListener("click", function () {
        const category = document.querySelector("#category").value;
        const description = document.querySelector("#description").value;
        const expiry = document.querySelector("#expiry").value;
        const userUID = document.querySelector("#userUID").value;

        var json = {
            category: category,
            description: description,
            expiry: expiry,
            userUID: userUID
        };
        console.log(json);

        /* Optional */
        var location = {};
        location.latitude = latitude;
        location.longitude = longitude;

        var distance = document.querySelector("#distance").value;
        console.log(`-- distance: ${distance}`);

        var size_min = document.querySelector("#size_min").value;
        console.log(`-- size_min: ${size_min}`);

        var size_max = document.querySelector("#size_max").value;
        console.log(`-- size_max: ${size_max}`);

        var refresh_min = document.querySelector("#refresh_min").value;
        console.log(`-- refresh_min: ${refresh_min}`);

        var refresh_max = document.querySelector("#refresh_max").value;
        console.log(`-- refresh_max: ${refresh_max}`);

        var guarantee_min = document.querySelector("#guarantee_min").value;
        console.log(`-- guarantee_min: ${guarantee_min}`);

        var guarantee_max = document.querySelector("#guarantee_max").value;
        console.log(`-- guaranteee_max: ${guarantee_max}`);

        var quality = [];
        if (document.querySelector("#quality1").checked) {
            quality.push(document.querySelector("#quality1").value);
        }
        if (document.querySelector("#quality2").checked) {
            quality.push(document.querySelector("#quality2").value);
        }
        if (document.querySelector("#quality3").checked) {
            quality.push(document.querySelector("#quality3").value);
        }
        if (document.querySelector("#quality4").checked) {
            quality.push(document.querySelector("#quality4").value);
        }
        console.log(`-- quality.length: ${quality.length}`);

        var availability_min = document.querySelector("#availability_min").value;
        console.log(`-- availability_min: ${availability_min}`);

        var availability_max = document.querySelector("#availability_max").value;
        console.log(`-- availability_max: ${availability_max}`);

        var sellerType = [];
        if (document.querySelector("#sellerType1").checked) {
            sellerType.push(document.querySelector("#sellerType1").value);
        }
        if (document.querySelector("#sellerType2").checked) {
            sellerType.push(document.querySelector("#sellerType2").value);
        }
        if (document.querySelector("#sellerTyp3").checked) {
            sellerType.push(document.querySelector("#sellerType3").value);
        }
        if (document.querySelector("#sellerType4").checked) {
            sellerType.push(document.querySelector("#sellerType4").value);
        }
        console.log(`-- sellerType.length: ${sellerType.length}`);

        // var xhr = new XMLHttpRequest();
        // var url = "http://localhost:8010/newfriendlychat-63187/us-central1/addDeal";
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         console.log("-- onreadystatechange");
        //         console.log("-- " + xhr.responseText);

        //         document.querySelector("#responseText").value = xhr.responseText;
        //     }
        // };
        // var data = JSON.stringify(json);
        // xhr.send(data);
    });
}

const btnAddUser = document.querySelector("#btnAddUser");
if (btnAddUser != null) {
    const categoryRow = document.querySelector("#categoryRow");
    const radioBuyer = document.querySelector("#radioBuyer");
    const radioSeller = document.querySelector("#radioSeller");
    const selectCategory = document.querySelector("#category");

    console.log("Binding radios...");
    radioBuyer.addEventListener("click", function () {
        categoryRow.style.display = "none";
    });

    radioSeller.addEventListener("click", function () {
        categoryRow.style.display = "inline";
    });

    console.log("Binding btnAddUser...");
    btnAddUser.addEventListener("click", function () {
        const firstname = document.querySelector("#firstname").value;
        const lastname = document.querySelector("#lastname").value;

        var categoryJSON = {}
        var i = 0;
        for (i = 0; i < selectCategory.options.length; i++) {
            if (selectCategory[i].selected) {
                var key = selectCategory[i].value;
                categoryJSON[key] = true;
            }
        }

        var json = {
            firstname: firstname,
            lastname: lastname,
            category: categoryJSON
        };
        console.log(JSON.stringify(json));

        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8010/newfriendlychat-63187/us-central1/addUser";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("-- onreadystatechange");
                console.log("-- " + xhr.responseText);

                document.querySelector("#responseText").value = xhr.responseText;
            }
        };
        var data = JSON.stringify(json);
        xhr.send(data);
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return "--";
};

const btnAddOffer = document.querySelector("#btnAddOffer");
if (btnAddOffer != null) {
    console.log("Binding btnAddOffer...");

    var dealUID = getQueryVariable("dealUID");
    console.log("-- dealUID: " + dealUID);
    document.querySelector("#dealUID").value = dealUID;

    populateDescription(dealUID);
    populateUsers();
    getLocation();

    btnAddOffer.addEventListener("click", function () {
        const dealUID = document.querySelector("#dealUID").value;
        const userUID = document.querySelector("#userUID").value;
        const price = document.querySelector("#price").value;
        const fulfilmentDate = document.querySelector("#fulfilmentDate").value;

        /* Optional */
        var location = {};
        location.latitude = latitude;
        location.longitude = longitude;

        var size = document.querySelector("#size").value;
        console.log(`-- size: ${size}`);

        var refresh = document.querySelector("#refresh").value;
        console.log(`-- refresh: ${refresh}`);

        var manufacturer = "--";
        if (document.getElementById("manufacturer1").checked) {
            manufacturer = document.getElementById("manufacturer1").value;
        }
        else if (document.getElementById("manufacturer2").checked) {
            manufacturer = document.getElementById("manufacturer2").value;
        }
        else if (document.getElementById("manufacturer3").checked) {
            manufacturer = document.getElementById("manufacturer3").value;
        }
        else if (document.getElementById("manufacturer4").checked) {
            manufacturer = document.getElementById("manufacturer4").value;
        }
        console.log(`-- manufacturer: ${manufacturer}`);

        var guarantee = document.querySelector("#guarantee").value;
        console.log(`-- guarantee: ${guarantee}`);

        /*  QUALITY */
        var quality = [];
        console.log(`document.getElementById("quality1").checked: ${document.getElementById("quality1").checked}`);
        console.log(`document.getElementById("quality2").checked: ${document.getElementById("quality2").checked}`);
        console.log(`document.getElementById("quality3").checked: ${document.getElementById("quality3").checked}`);

        if (document.getElementById("quality1").checked) {
            quality.push(document.getElementById("quality1").value);
        }
        if (document.getElementById("quality2").checked) {
            quality.push(document.getElementById("quality2").value);
        }
        if (document.getElementById("quality3").checked) {
            quality.push(document.getElementById("quality3").value);
        }
        if (document.getElementById("quality4").checked) {
            quality.push(document.getElementById("quality4").value);
        }
        if (document.getElementById("quality5").checked) {
            quality.push(document.getElementById("quality5").value);
        }
        if (document.getElementById("quality6").checked) {
            quality.push(document.getElementById("quality6").value);
        }
        console.log(`-- quality: ${JSON.stringify(quality)}`);

        var availability = document.querySelector("#availability").value;
        console.log(`-- availability: ${availability}`);

        var sellerType = "--";
        if (document.getElementById("sellerType1").checked) {
            sellerType = document.getElementById("sellerType1").value;
        }
        else if (document.getElementById("sellerType2").checked) {
            sellerType = document.getElementById("sellerType2").value;
        }
        else if (document.getElementById("sellerType3").checked) {
            sellerType = document.getElementById("sellerType3").value;
        }
        else if (document.getElementById("sellerType4").checked) {
            sellerType = document.getElementById("sellerType4").value;
        }
        console.log(`-- sellerType: ${sellerType}`);

        // var json = {
        //     dealUID: dealUID,
        //     userUID: userUID,
        //     payload: {
        //         location: location,
        //         price: price,
        //         fulfilmentDate: fulfilmentDate
        //     }
        // };
        // console.log(json);

        // var xhr = new XMLHttpRequest();
        // var url = "http://localhost:8010/newfriendlychat-63187/us-central1/addOffer ";
        // xhr.open("POST", url, true);
        // xhr.setRequestHeader("Content-Type", "application/json");
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState === 4 && xhr.status === 200) {
        //         console.log("-- onreadystatechange");
        //         console.log("-- " + xhr.responseText);

        //         document.querySelector("#responseText").value = xhr.responseText;
        //     }
        // };
        // var data = JSON.stringify(json);
        // xhr.send(data);
    });
}

const btnGetDeals = document.querySelector("#btnGetDeals");
if (btnGetDeals != null) {
    console.log("Binding btnGetDeals*...");

    populateUsers();

    btnGetDeals.addEventListener("click", function () {
        const category = document.querySelector("#category").value;
        const limit = Number(document.querySelector("#limit").value);
        const userUID = document.querySelector("#userUID").value;

        var json = {
            category: category,
            limit: limit,
            userUID: userUID
        };
        console.log(json);
        var xhr = new XMLHttpRequest();
        var url = "http://localhost:9001/newfriendlychat-63187/us-central1/getDeals";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("-- onreadystatechange");
                console.log("-- " + xhr.responseText);

                var myObj, txt = "";
                txt += "<table border='1'>"
                txt += "<tr>";
                txt += "<th>Description</th>";
                txt += "<th>Created</th>";
                txt += "<th>Category</th>";
                txt += "<th>Expiry</th>";
                txt += "<th>Status</th>";
                txt += "<th>User UID</th>";
                txt += "</tr>";
                myObj = JSON.parse(xhr.responseText);
                for (x in myObj.deals) {
                    txt += "<tr>";
                    txt += `<td><a href='/source4me-getOffers.html?dealUID=${myObj.deals[x].dealUID}'>${myObj.deals[x].description}</a></td>`;
                    txt += "<td>" + myObj.deals[x].created + "</td>";
                    txt += "<td>" + myObj.deals[x].category + "</td>";
                    txt += "<td>" + moment(myObj.deals[x].expiry).fromNow() + "</td>";
                    txt += "<td>" + myObj.deals[x].status + "</td>";
                    txt += "<td>" + myObj.deals[x].userUID + "</td>";
                    txt += "</tr>";
                }
                txt += "</table>"
                document.getElementById("demo").innerHTML = txt;
            }
        };
        var data = JSON.stringify(json);
        xhr.send(data);
    });
}

const btnGetOffers = document.querySelector("#btnGetOffers");
if (btnGetOffers != null) {

    console.log("Binding btnGetOffers*...");
    var dealUID = getQueryVariable("dealUID");
    console.log(`dealUID: ${dealUID}`);

    console.log("Binding btnGetDeals*...");

    var json = {
        dealUID: dealUID
    };
    console.log(json);

    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8010/newfriendlychat-63187/us-central1/getDeal";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("-- onreadystatechange");
            console.log("-- " + xhr.responseText);

            var myObj, txt = "";
            myObj = JSON.parse(xhr.responseText);
            document.querySelector("#description").value = myObj.description;
        }
    };
    var data = JSON.stringify(json);
    xhr.send(data);

    populateOffers(dealUID);

    btnGetOffers.addEventListener("click", function () {
        var old_element = document.getElementById("btnGetOffers");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        const offerUID = document.querySelector("#offerUID").value;

        var json = {
            dealUID: dealUID,
            offerUID: offerUID
        };
        console.log(json);

        var xhr = new XMLHttpRequest();
        var url = "http://localhost:8010/newfriendlychat-63187/us-central1/getOffer";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log("-- onreadystatechange");
                console.log("-- " + xhr.responseText);

                var myObj, txt = "";
                myObj = JSON.parse(xhr.responseText);
                // console.log("-- " + moment.unix(myObj.payload.fulfilmentDate._seconds/1000).format("DD MMM YYYY hh:mm a"));
                // document.querySelector("#fulfilmentDate").value = moment(myObj.payload.fulfilmentDate._seconds).format('yyyy-MM-dd');
                document.querySelector("#price").value = myObj.payload.price;
            }
        };
        var data = JSON.stringify(json);
        xhr.send(data);
    });
}

const btnGetLeaderboard = document.querySelector("#btnGetLeaderboard");
if (btnGetLeaderboard != null) {
    console.log("Binding btnGetLeaderboard*...");

    populateUsers();

    btnGetLeaderboard.addEventListener("click", function () {
        console.log("btnGetLeaderboard clicked...");
        const dealUID = document.querySelector("#dealUID").value;

        var query = db.collection(`source4me/root/deals/${dealUID}/leaderboard`).orderBy("rank", "asc");

        var observer = query.onSnapshot(querySnapshot => {
            console.log(`Received query snapshot of size ${querySnapshot.size}`);

            var myObj, txt = "";
            txt += "<table border='1'>"
            txt += "<tr>";
            txt += "<th>Offer UID</th>";
            txt += "<th>Rank</th>";
            txt += "<th>Score</th>";
            txt += "<th>Updated</th>";
            txt += "</tr>";

            querySnapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                txt += "<tr>";
                txt += "<td>" + doc.id + "</td>";
                txt += "<td>" + doc.data().rank + "</td>";
                txt += "<td>" + doc.data().score + "</td>";
                txt += "<td>" + moment(doc.data().updated.toDate()).fromNow() + "</td>";

                txt += "</tr>";
            });
            txt += "</table>"
            txt += "<br/><br/>"
            txt += "" + new Date();

            document.getElementById("demo").innerHTML = txt;
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
    })
}

const btnGetLeaderboardDeals = document.querySelector("#btnGetLeaderboardDeals");
if (btnGetLeaderboardDeals != null) {

    console.log("Binding btnGetLeaderboardDeals*...");
    btnGetLeaderboardDeals.addEventListener("click", function () {
        const category = document.querySelector("#category");
        const userUID = document.querySelector("#userUID");
        const limit = Number(document.querySelector("#limit").value);

        populateDeals(category.value, limit, userUID.value);
    });
}

getLocation();

// $("#tabs").tabs({
//     activate: function (event, ui) {
//         var active = $('#tabs').tabs('option', 'active');
//         console.log('the tab id is ' + $("#tabs ul>li a").eq(active).attr("href"));
//     }
// }

// );

// Event binding using a convenience method
$( "#helloBtn" ).click(function( event ) {
    alert( "Hello jQuery!" );
});

$( "#helloBtn" ).on({
    mouseenter: function() {
        console.log( "hovered over a div" );
    },
    mouseleave: function() {
        console.log( "mouse left a div" );
    },
    click: function() {
        console.log( "clicked on a div" );
    }
});