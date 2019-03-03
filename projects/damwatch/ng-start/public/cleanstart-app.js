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

if (!firebase.apps.length) {
    firebase.initializeApp(config);
    console.log("Initialised...");

    var db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true };
    db.settings(settings);
}
// ========================================== UTILITY FUNCTIONS ==========================================

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


// ========================================== BACKEND FUNCTIONS ==========================================

var addUser = function (firstname, lastname, category) {
    var created = new Date();

    var collectionRef = db.collection('source4me/root/users');

    // Add a new document with a generated id.
    return collectionRef.add({
        category: category,
        created: created,
        firstname: firstname,
        lastname: lastname
    }).then(ref => {
        return `Added User with ID: ${ref.id}`;
    }).catch(err => {
        return `Error adding User: ${err}`;
    });
}

var updateUser = function (userUID, firstname, lastname, category) {
    var updated = new Date();

    var userDocRef = db.collection('source4me/root/users').doc(userUID);

    // Add a new document with a generated id.
    return userDocRef.set({
        firstname: firstname,
        lastname: lastname,
        category: category,
        updated: updated
    },
        {
            merge: false
        }).then(ref => {
            return `Updated User...`;
        }).catch(err => {
            return `Error adding User: ${err}`;
        });
}

var addOffer = function (dealUID, userUID, payload) {
    var created = new Date();

    var docRef = db.collection('source4me/root/deals').doc(dealUID);

    return docRef.collection('offers').add({
        created: created,
        userUID: userUID,
        payload: payload
    }).then(ref => {
        return `Added Offer with ID: ${ref.id}`;
    }).catch(err => {
        return `Error adding Offer: ${err}`;
    });
}

var addDeal = function (category, description, expiry, userUID) {
    var created = new Date();

    var collectionRef = db.collection('source4me/root/deals');

    // Add a new document with a generated id.
    return collectionRef.add({
        category: category,
        created: created,
        description: description,
        expiry: expiry,
        userUID: userUID
    }).then(ref => {
        return `Added Deal with ID: ${ref.id}`;
    }).catch(err => {
        return `Error adding User: ${err}`;
    });
}

var getUser = function (userUID) {
    var userDocRef = db.collection('source4me/root/users').doc(userUID);

    var docData = {};
    return userDocRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                return docData;
            } else {
                var docData = doc.data();
                return docData;
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
            return docData;
        });
}

var getUsers = function (limit) {
    // Create a reference to the deals collection
    var usersCollectionRef = db.collection('source4me/root/users');

    var query = usersCollectionRef;
    query = query.limit(limit).get();

    var users = [];
    return query.then(snapshot => {
        snapshot.forEach(userDoc => {
            console.log(userDoc.id, '=>', userDoc.data());
            var userDocData = userDoc.data();
            userDocData.userUID = userDoc.id;
            users.push(userDocData);
        });
        return users;
    }).catch(err => {
        console.log('Error getting documents', err);
        return users;
    });
}

var getDealsByBuyer = function (userUID, limit) {
    // Create a reference to the deals collection
    var dealsCollectionRef = db.collection('source4me/root/deals');

    var query = dealsCollectionRef;
    query = query.where('userUID', '==', userUID);
    query = query.limit(limit).get();

    var deals = [];
    return query
        .then(snapshot => {
            snapshot.forEach(dealDoc => {
                console.log(dealDoc.id, '=>', dealDoc.data());
                var dealDocData = dealDoc.data();
                dealDocData.dealUID = dealDoc.id;
                deals.push(dealDocData);
            });
            console.log("--> " + deals.length);
            return deals;
        }).catch(err => {
            console.log('Error getting documents', err);
            return deals;
        });
}

var getDealsByCategory = function (categoryList, limit) {
    // Create a reference to the deals collection
    var dealsCollectionRef = db.collection('source4me/root/deals');
    var query = dealsCollectionRef;

    var i = 0;
    var deals = [];
    var promiseList = [];
    for (i = 0; i < categoryList.length; i++) {
        var category = categoryList[i];
        console.log("-- " + category);

        query = dealsCollectionRef.where('category', '==', category);
        var promise_x = query.limit(limit).get()
            .then(snapshot => {
                snapshot.forEach(dealDoc => {
                    console.log(dealDoc.id, '=>', dealDoc.data());
                    var dealDocData = dealDoc.data();
                    dealDocData.dealUID = dealDoc.id;
                    deals.push(dealDocData);
                });
                console.log("--> " + deals.length);
            }).catch(err => {
                console.log('Error getting documents', err);
                return deals;
            });

        promiseList.push(promise_x);
    }
    return Promise.all(promiseList)
        .then(docs => {
            console.log(`Number of promises returned: ${docs.length}`);
            return deals;
        });
}

var getTyreWidths = function () {
    var widthDocRef = db.collection('tyresizes').doc('widths');
    var widths = [ ];
    return getDoc = widthDocRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                var widthsDocData = doc.data();
                console.log('Document data:', widthsDocData);
                for (key in widthsDocData) {
                    widths.push(key);
                }
            }
            return widths;
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}

var getTyreProfiles = function (_width) {
    var widthDocRef = db.collection('tyresizes').doc('width').collection(_width).doc('profiles');
    var profiles = [ ];
    return getDoc = widthDocRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                var profilesDocData = doc.data();
                console.log('Document data:', profilesDocData);
                for (key in profilesDocData) {
                    profiles.push(key);
                }
            }
            return profiles;
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}

var getTyreDiameters = function (_width, _profile) {
    var widthDocRef = db.collection('tyresizes').doc('width').collection(_width).doc('profile').collection(_profile).doc('diameters');
    var diameters = [ ];
    return getDoc = widthDocRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                var diametersDocData = doc.data();
                console.log('Document data:', diametersDocData);
                for (key in diametersDocData) {
                    diameters.push(key);
                }
            }
            return diameters;
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
}

// ========================================== HELPER FUNCTIONS ==========================================
var populateUsers = function (limit) {
    var _promise = getUsers(limit);
    _promise.then(_users => {
        console.log(`_users.length: ${_users.length}`);

        var select = document.querySelector("#_userUID");
        var i;
        for (i = select.options.length - 1; i >= 0; i--) {
            select.remove(i);
        }

        var opt = document.createElement('option');
        opt.innerHTML = "Choose User";
        opt.selected = "selected";
        select.appendChild(opt);

        for (x in _users) {
            var opt = document.createElement('option');
            var _user = _users[x];
            opt.value = _user.userUID;
            opt.innerHTML = _user.firstname + " " + _user.lastname;
            select.appendChild(opt);
        }
    });
}

var populateWidths = function (limit) {
    var _promise = getTyreWidths();
    _promise.then(_widths => {

        var select = document.querySelector("#_selectWidths");
        var i;
        for (i = select.options.length - 1; i >= 0; i--) {
            select.remove(i);
        }

        for (i=0; i < _widths.length; i++) {
            var width = _widths[i];

            var opt = document.createElement('option');
            opt.value = width;
            opt.innerHTML = width;
            select.appendChild(opt);
            
        }
    });
}

var populateProfiles = function(_width) {
    console.log("-- _width: " + _width);
    var _promise = getTyreProfiles(_width);
    _promise.then(_profiles => {

        var select = document.querySelector("#_selectProfiles");
        var i;
        for (i = select.options.length - 1; i >= 0; i--) {
            select.remove(i);
        }

        for (i=0; i < _profiles.length; i++) {
            var profile = _profiles[i];

            var opt = document.createElement('option');
            opt.value = profile;
            opt.innerHTML = profile;
            select.appendChild(opt);
            
        }
    });
}

var populateDiameters = function(_width, _profile) {
    console.log(`-- _width: ${_width} profile: ${_profile}`);
    var _promise = getTyreDiameters(_width, _profile);
    _promise.then(_diameters => {

        var select = document.querySelector("#_selectDiameters");
        var i;
        for (i = select.options.length - 1; i >= 0; i--) {
            select.remove(i);
        }

        for (i=0; i < _diameters.length; i++) {
            var diameter = _diameters[i];

            var opt = document.createElement('option');
            opt.value = diameter;
            opt.innerHTML = diameter;
            select.appendChild(opt);
            
        }
    });
}

// ========================================== FRONTEND FUNCTIONS ==========================================

$("#btnAddUser").click(function (event) {
    var now = moment().utcOffset(120);
    var _firstname = document.querySelector("#_firstname").value;
    var _lastname = document.querySelector("#_lastname").value;
    var _category = [];

    var _addUser = addUser(_firstname, _lastname, _category);
    _addUser.then(_status => {
        console.log(_status);
        document.querySelector("#_responseText").innerHTML = `${now} -- ${_status}`;
    });
});

$("#btnAddDeal").click(function (event) {
    var now = moment().utcOffset(120);
    var _category = document.querySelector("#_category").value;
    var _description = document.querySelector("#_description").value;
    const _expiry = moment(document.querySelector("#_expiry").value).toDate();
    const _userUID = document.querySelector("#_userUID").value;

    var _addDeal = addDeal(_category, _description, _expiry, _userUID);
    _addDeal.then(_status => {
        console.log(_status);
        document.querySelector("#_responseText").innerHTML = `${now} -- ${_status}`;
    });
});

$("#btnAddOffer").click(function (event) {
    var now = moment().utcOffset(120);

    const _dealUID = document.querySelector("#_dealUID").value;
    const _userUID = document.querySelector("#_userUID").value;
    const _price = document.querySelector("#_price").value;

    console.log(`_dealUID: ${_dealUID}`);
    console.log(`_userUID: ${_userUID}`);
    console.log(`_price: ${_price}`);

    var payload = {
        price: _price
    };

    var _addOffer = addOffer(_dealUID, _userUID, payload);
    _addOffer.then(_status => {
        console.log(_status);
        document.querySelector("#_responseText").innerHTML = `${now} -- ${_status}`;
    });
});

$("#btnUpdateUser").click(function (event) {
    console.log("-- btnUpdateUser");
    var now = moment().utcOffset(120);

    var _userUID = document.querySelector("#_userUID").value;
    var _firstname = document.querySelector("#_firstname").value;
    var _lastname = document.querySelector("#_lastname").value;

    var categoryJSON = {}
    for (i = 0; i < _category.options.length; i++) {
        if (_category[i].selected) {
            var key = _category[i].value;
            categoryJSON[key] = true;
        }
    }

    console.log(`_userUID: ${_userUID}`);
    console.log(`_firstname: ${_firstname}`);
    console.log(`_lastname: ${_lastname}`);
    console.log(`categoryList: ${JSON.stringify(categoryJSON)}`);

    var _updateUser = updateUser(_userUID, _firstname, _lastname, categoryJSON);
    _updateUser.then(_status => {
        console.log(_status);
        document.querySelector("#_responseText").innerHTML = `${now} -- ${_status}`;
    });
});

// ========================================== NASTY FUNCTIONS ==========================================

$("#btnGetNotifications").click(function (event) {
    console.log("-- btnGetNotifications");
    var now = moment().utcOffset(120);

    const _userUID = document.querySelector("#_userUID").value;
    console.log(`_userUID: ${_userUID}`);

    var query = db.collection('source4me/root/users').doc(_userUID).collection('notifications').orderBy('created', 'desc').limit(10);

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
                    cellDeal.innerHTML = `<a href='/cleanstart-addOffer.html?dealUID=${deal.dealUID}/' target='_blank'>${deal.description}</a>`;
                    cellCreated.innerHTML = deal.created;
                    cellUpdated.innerHTML = deal.updated;
                    cellCount.innerHTML = deal.count;
                    cellCount.align = 'center';
                }
            });
    }, err => {
        console.log(`Encountered error: ${err}`);
    });
});

$("#btnSearchDeals").click(function (event) {
    console.log("-- btnSearchDeals");
    var now = moment().utcOffset(120);

    var _userUID = document.querySelector("#_userUID").value;
    var _searchByBuyer = document.querySelector("#_searchByBuyer");
    var _searchBySeller = document.querySelector("#_searchBySeller");
    var _searchByCategory = document.querySelector("#_searchByCategory");
    var _category = document.querySelector("#_category");

    var categoryList = [];
    for (i = 0; i < _category.options.length; i++) {
        if (_category[i].selected) {
            var key = _category[i].value;
            categoryList.push(key);
        }
    }

    var _resultsTable = document.getElementById("_resultsTable");
    var i = 0;
    for (i = _resultsTable.rows.length - 1; i > 0; i--) {
        _resultsTable.deleteRow(i);
    }

    console.log("-- _userUID: " + _userUID);
    console.log("-- _searchByBuyer: " + _searchByBuyer.checked);
    console.log("-- _searchBySeller: " + _searchBySeller.checked);
    console.log("-- _searchByCategory: " + _searchByCategory.checked);

    var limit = 10;
    if (_searchByBuyer.checked) {
        console.log("**** _searchByBuyer");
        var _promise = getDealsByBuyer(_userUID, limit);
    }

    if (_searchByCategory.checked) {
        console.log("**** _searchByCategory");
        var _promise = getDealsByCategory(categoryList, limit);
    }

    _promise.then(_deals => {
        for (x in _deals) {
            var _deal = _deals[x];
            console.log("-- " + JSON.stringify(_deal));
            var row = _resultsTable.insertRow();

            var cellCategory = row.insertCell(0);
            var cellDescription = row.insertCell(1);
            var cellCreated = row.insertCell(2);
            var cellExpiry = row.insertCell(3);
            var cellAddOffer = row.insertCell(4);
            // var cellUserUID = row.insertCell(4);            

            cellCategory.innerHTML = _deal.category;
            cellDescription.innerHTML = _deal.description;
            cellCreated.innerHTML = moment(_deal.created.toDate()).fromNow();
            cellExpiry.innerHTML = moment(_deal.expiry.toDate()).fromNow();
            cellAddOffer.innerHTML = `<a href='cleanstart-addOffer.html?dealUID=${_deal.dealUID}' target='_blank'>Add Offer</a>`;
            // cellUserUID.innerHTML = _deal.userUID;            
        }
    });
});