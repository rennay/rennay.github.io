
var moment = require('moment');
var request = require('request');
const path = require('path');
const util = require('util');

const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

const cors = require('cors')({ origin: true });

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.sendMessage = (req, res) => {
    var info = "-";
    var now = moment().utcOffset(120);

    // HTTP POST
    console.log("HTTP POST");

    const destination = req.body.destination;
    const content = req.body.content;

    console.log(`destination*: [${destination}]`);
    console.log(`content*: [${content}]`);

    var token = Buffer.from("19fbe2a6-dcd4-4fdf-96af-fd8b2fc78053:HgFvW+9i4a4r28N2JTe/xLL+5ruV4HQ+").toString('base64');
    console.log("token: [" + token + "]");

    var authorization = "BASIC " + token;

    request.get({
        headers: { 'Content-Type': 'application/json', 'authorization': authorization },
        url: 'https://rest.mymobileapi.com/v1/Authentication'
    }, function (error, response, body) {
        info = JSON.parse(body);
        console.log(info);
        token = info.token;
        console.log("token: [" + token + "]");

        authorization = "Bearer " + token;
        console.log("authorization: [" + authorization + "]");

        var sendRequest = {
            'messages': [{ 'content': content, 'destination': destination }]
        };

        console.log(sendRequest);

        request.post({
            headers: { 'Content-Type': 'application/json', 'Authorization': authorization },
            url: 'https://rest.smsportal.com/v1/bulkmessages',
            json: true,
            body: sendRequest
        }, function (error, response, body) {
            // console.log("[" + body + "]");
            // info = JSON.parse(body);
            // console.log(info);

            var eventId = body.eventId;

            var nowString = now.format("YYYY-MM-DD hh:mm:SS");

            console.log("helloWorld... " + nowString);
            res.status(200).send("eventId: " + eventId);
        });
    });
};

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloWorld = (req, res) => {
    var now = moment().utcOffset(120);

    // HTTP POST
    console.log("HTTP POST");

    console.log(util.inspect(req, false, null));

    // var info = JSON.parse(req.body);
    // console.log(info);

    // const msisdn = info.msisdn;
    // const status = info.status;
    // const eventId = info.eventId;

    // console.log(`msisdn+: [${msisdn}]`);
    // console.log(`status+: [${status}]`);
    // console.log(`eventId+: [${eventId}]`);    

    var nowString = now.format("YYYY-MM-DD hh:mm:SS");

    console.log("helloWorld... " + nowString);

    res.status(200).send("True 123");
};

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.addUser = (req, res) => {
    cors(req, res, () => {
        var now = moment().utcOffset(120);

        var category = req.body.category;
        var created = new Date();
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;

        console.log("category: [" + category + "]");
        console.log("created: [" + created + "]");
        console.log("firstname: [" + firstname + "]");
        console.log("lastname: [" + lastname + "]");

        var collectionRef = db.collection('source4me/root/users');

        // Add a new document with a generated id.
        var addDoc = collectionRef.add({
            category: category,
            created: created,
            firstname: firstname,
            lastname: lastname
        }).then(ref => {
            console.log('Added document with ID: ', ref.id);
            res.status(200).send(`Added document with ID: ${ref.id}`);
        }).catch(err => {
            console.log('Error adding document', err);
            res.status(200).send(`Error adding document - ${err}... ${now}`);
        });
    });
};

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getUser = (req, res) => {
    cors(req, res, () => {
        var now = moment().utcOffset(120);

        var userUID = req.body.userUID;

        console.log("userUID: [" + userUID + "]");

        var userDocRef = db.collection('source4me/root/users').doc(userUID);

        var userDoc = userDocRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                    res.status(200).send(`No such document... ${now}`);
                } else {
                    var docData = doc.data();
                    console.log('Document data:', docData);

                    var notificationsRef = doc.ref.collection("notifications");
                    var allNotifications = notificationsRef.orderBy('created', 'desc').get()
                        .then(snapshot => {
                            docData.notifications = [];
                            snapshot.forEach(notificationDoc => {
                                console.log(notificationDoc.id, '=>', notificationDoc.data());
                                docData.notifications.push(notificationDoc.data());
                            });

                            res.setHeader('Content-Type', 'application/json');
                            res.send(JSON.stringify(docData));

                            res.status(200).send(`Retrieved document + notifications... ${now}`);
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                            res.status(200).send(`Error getting document - ${err}... ${now}`);
                        });
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
                res.status(200).send(`Error getting document - ${err}... ${now}`);
            });
    });
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.getUsers = (req, res) => {
    cors(req, res, () => {
        var now = moment().utcOffset(120);

        var limit = req.body.limit;

        console.log("limit: [" + limit + "]");

        // Create a reference to the deals collection
        var usersCollectionRef = db.collection('source4me/root/users');

        var query = usersCollectionRef;
        query = query.limit(limit).get();

        var allUsers = query.then(snapshot => {
            var docData = {};
            docData.users = [];
            snapshot.forEach(userDoc => {
                console.log(userDoc.id, '=>', userDoc.data());
                var userDocData = userDoc.data();
                userDocData.userUID = userDoc.id;
                docData.users.push(userDocData);
            });

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(docData));

            res.status(200).send(`Retrieved document... ${now}`);
        }).catch(err => {
            console.log('Error getting documents', err);
            res.status(200).send(`Error getting document - ${err}... ${now}`);
        });
    });
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.updateUser = (req, res) => {
    cors(req, res, () => {
        var now = moment().utcOffset(120);

        var userUID = req.body.userUID;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var updated = new Date();

        console.log("firstname: [" + firstname + "]");
        console.log("lastname: [" + lastname + "]");
        console.log("updated: [" + updated + "]");
        console.log("userUID: [" + userUID + "]");

        var userDocRef = db.collection('source4me/root/users').doc(userUID);

        var updateSingle = userDocRef.update({
            firstname: firstname,
            lastname: lastname,
            updated: updated
        }).then(ref => {
            res.status(200).send(`Updated document... ${now}`);
        }).catch(err => {
            console.log('Error updating document', err);
            res.status(200).send(`Error updating document - ${err}... ${now}`);
        });
    });
}

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.addDeal = (req, res) => {
    cors(req, res, () => {
        var now = moment().utcOffset(120);

        var category = req.body.category;
        var created = new Date();
        var description = req.body.description;
        var expiry = moment(req.body.expiry).toDate();
        var status = 1;
        var userUID = req.body.userUID;

        console.log("category: [" + category + "]");
        console.log("created: [" + created + "]");
        console.log("description: [" + description + "]");
        console.log("expiry: [" + expiry + "]");
        console.log("userUID: [" + userUID + "]");

        var collectionRef = db.collection('source4me/root/deals');

        // Add a new document with a generated id.
        var dealDoc = collectionRef.add({
            category: category,
            created: created,
            description: description,
            expiry: expiry,
            status: status,
            userUID: userUID,
        }).then(ref => {
            console.log('Added document with ID: ', ref.id);
            res.status(200).send(`Added document with ID: ${ref.id}`);
        }).catch(err => {
            console.log('Error adding document', err);
            res.status(200).send(`Error adding document - ${err}... ${now}`);
        });
    });
}

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.getDeal = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var dealUID = req.body.dealUID;

            console.log("dealUID: [" + dealUID + "]");

            var dealDocRef = db.collection('source4me/root/deals').doc(dealUID);

            var dealDoc = dealDocRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                        res.status(200).send(`No such document... ${now}`);
                    } else {
                        var docData = doc.data();
                        console.log('Document data:', docData);

                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(docData));

                        res.status(200).send(`Retrieved document... ${now}`);
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                    res.status(200).send(`Error getting document - ${err}... ${now}`);
                });
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.getDeals = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var category = req.body.category;
            var limit = req.body.limit;
            var userUID = req.body.userUID;

            console.log("category: [" + category + "]");
            console.log("limit: [" + limit + "]");
            console.log("userUID: [" + userUID + "]");

            // Create a reference to the deals collection
            var dealsCollectionRef = db.collection('source4me/root/deals');

            var query = dealsCollectionRef;
            if (category != "*") {
                query = query.where('category', '==', category);
            }
            if (userUID != "*") {
                query = query.where('userUID', '==', userUID);
            }

            query = query.limit(limit).get();

            var allDeals = query.then(snapshot => {
                var docData = {};
                docData.deals = [];
                snapshot.forEach(dealDoc => {
                    console.log(dealDoc.id, '=>', dealDoc.data());
                    var dealDocData = dealDoc.data();
                    dealDocData.dealUID = dealDoc.id;
                    docData.deals.push(dealDocData);
                });

                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(docData));

                res.status(200).send(`Retrieved document... ${now}`);
            })
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.updateDeal = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var dealUID = req.body.dealUID;
            var status = 2;
            var updated = new Date();

            console.log("dealUID: [" + dealUID + "]");
            console.log("updated: [" + updated + "]");

            var docRef = db.collection('source4me/root/deals').doc(dealUID);

            var updateSingle = docRef.update({
                status: status,
                updated: updated
            }).then(ref => {
                res.status(200).send(`Updated document... ${now}`);
            }).catch(err => {
                console.log('Error updating document', err);
                res.status(200).send(`Error updating document - ${err}... ${now}`);
            });
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.addOffer = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var created = new Date();
            var dealUID = req.body.dealUID;
            var userUID = req.body.userUID;

            console.log("created: [" + created + "]");
            console.log("dealUID: [" + dealUID + "]");
            console.log("userUID: [" + userUID + "]");

            var payload = req.body.payload;
            var _fulfilmentDate = moment(payload.fulfilmentDate).toDate();
            var _location = new admin.firestore.GeoPoint(payload.location.latitude, payload.location.longitude);

            // console.log("_fulfilmentDate: [" + _fulfilmentDate + "]");
            // console.log("_location: [" + _location + "]");

            payload.location = _location;
            payload.fulfilmentDate = _fulfilmentDate;

            console.log("payload: [" + payload + "]");

            var docRef = db.collection('source4me/root/deals').doc(dealUID);

            docRef.collection('offers').add({
                created: created,
                userUID: userUID,
                payload: payload
            }).then(ref => {
                console.log('Added document with ID: ', ref.id);
                res.status(200).send(`Added document with ID: ${ref.id}`);
            }).catch(err => {
                console.log('Error adding document', err);
                res.status(200).send(`Error adding document - ${err}... ${now}`);
            });
        });
    };

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.getOffer = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var dealUID = req.body.dealUID;
            var offerUID = req.body.offerUID;

            console.log("dealUID: [" + dealUID + "]");
            console.log("offerUID: [" + offerUID + "]");

            var offerDocRef = db.collection('source4me/root/deals').doc(dealUID).collection('offers').doc(offerUID);

            var offerDoc = offerDocRef.get()
                .then(doc => {
                    if (!doc.exists) {
                        console.log('No such document!');
                        res.status(200).send(`No such document... ${now}`);
                    } else {
                        var docData = doc.data();
                        console.log('Document data:', docData);

                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(docData));

                        res.status(200).send(`Retrieved document... ${now}`);
                    }
                })
                .catch(err => {
                    console.log('Error getting document', err);
                    res.status(200).send(`Error getting document - ${err}... ${now}`);
                });
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.getOffers = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var dealUID = req.body.dealUID;

            console.log("dealUID: [" + dealUID + "]");

            var docData = {};
            docData.offers = [];

            db.collection('source4me/root/deals').doc(dealUID).collection('offers')
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (offerDoc) {
                        // doc.data() is never undefined for query doc snapshots
                        var offerDocData = offerDoc.data();
                        console.log(offerDoc.id, " => ", offerDocData);

                        offerDocData.offerUID = offerDoc.id;
                        docData.offers.push(offerDocData);
                    });

                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(docData));

                    res.status(200).send(`Retrieved document... ${now}`);
                
                })
                .catch(err => {
                    console.log('Error getting document', err);
                    res.status(200).send(`Error getting document - ${err}... ${now}`);
                });
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.updateOffer = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var dealUID = req.body.dealUID;
            var updated = new Date();
            var offerUID = req.body.offerUID;
            var userUID = req.body.userUID;

            console.log("dealUID: [" + dealUID + "]");
            console.log("updated: [" + updated + "]");
            console.log("offerUID: [" + offerUID + "]");
            console.log("userUID: [" + userUID + "]");

            var payload = req.body.payload;
            var _fulfilmentDate = moment(payload.fulfilmentDate).toDate();
            var _location = new admin.firestore.GeoPoint(payload.location.latitude, payload.location.longitude);

            // console.log("_fulfilmentDate: [" + _fulfilmentDate + "]");
            // console.log("_location: [" + _location + "]");

            payload.location = _location;
            payload.fulfilmentDate = _fulfilmentDate;

            console.log("payload: [" + payload + "]");

            var docRef = db.collection('source4me/root/deals').doc(dealUID).collection('offers').doc(offerUID);

            var updateSingle = docRef.update({
                updated: updated,
                userUID: userUID,
                payload: payload
            }).then(ref => {
                res.status(200).send(`Updated document... ${now}`);
            }).catch(err => {
                console.log('Error updating document', err);
                res.status(200).send(`Error updating document - ${err}... ${now}`);
            });
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.setWeights = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var created = new Date();
            var dealUID = req.body.dealUID;
            var weights = req.body.weights;

            console.log("created: [" + created + "]");
            console.log("dealUID: [" + dealUID + "]");
            console.log("weights: [" + JSON.stringify(weights) + "]");

            var collectionRef = db.collection('source4me/root/deals').doc(dealUID).collection("weights");

            var promiseList = [];
            for (weightKey in weights) {
                var weight = weights[weightKey];

                var weightOperator = weight.operator;
                var weightMeasurement = weight.measurement;
                var weightValues = weight.values;
                var weightScore = weight.score;

                var promise_x = collectionRef.doc(weightKey).set(weight);
                promiseList.push(promise_x);
            }

            return Promise.all(promiseList)
                .then(function () {
                    res.status(200).send("Weights updated: " + now);
                }).catch(err => {
                    console.log('Error adding document', err);
                    res.status(200).send(`Error adding document - ${err}... ${now}`);
                });
        });
    }

    /**
     * Responds to any HTTP request that can provide a "message" field in the body.
     *
     * @param {Object} req Cloud Function request context.
     * @param {Object} res Cloud Function response context.
     */
    exports.getWeights = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var dealUID = req.body.dealUID;

            console.log("dealUID: [" + dealUID + "]");

            var weights = {};

            db.collection('source4me/root/deals').doc(dealUID).collection('weights')
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (weightDoc) {
                        var weightKey = weightDoc.id;
                        var weight = weightDoc.data();

                        weights[weightKey] = weight;
                    });

                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(weights));

                    res.status(200).send(`Retrieved document... ${now}`);
                })
                .catch(err => {
                    console.log('Error getting document', err);
                    res.status(200).send(`Error getting document - ${err}... ${now}`);
                });
        });
    }

    exports.scoreOnOfferChange = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var created = new Date();
            var dealUID = req.body.dealUID;
            var offerUID = req.body.offerUID;

            console.log("dealUID: [" + dealUID + "]");
            console.log("offerUID: [" + offerUID + "]");

            var weights = {};
            var scoreCard = {};
            var summaryScore = 0;
            var promiseList = [];

            var dealDocRef = db.collection('source4me/root/deals').doc(dealUID);

            /* Remove old scorecard */
            var scoreCardCollRef = dealDocRef.collection("offers").doc(offerUID).collection("scorecard");
            return scoreCardCollRef.get()
                .then(function (scorecards) {
                    if (scorecards.size == 0) {
                        return 0;
                    }
                    var batch = db.batch();
                    scorecards.forEach(function (scorecard) {
                        console.log("-- " + scorecard.id);
                        batch.delete(scorecard.ref);
                    });
                    return batch.commit();
                })
                .then(() => {
                    return dealDocRef.collection('weights').get()
                })
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (weightDoc) {
                        var weightKey = weightDoc.id;
                        var weight = weightDoc.data();

                        weights[weightKey] = weight;
                    });
                    console.log("-- weights: " + JSON.stringify(weights));

                    return dealDocRef.collection("offers").doc(offerUID).get();
                })
                .then(function (offerDoc) {
                    if (!offerDoc.exists) {
                        res.status(200).send(`Offer ${offerUID} for Deal ${dealUID} not found... ${now}`);
                    }
                    var payload = offerDoc.data().payload;

                    var scoreCardCollection = dealDocRef.collection("offers").doc(offerUID).collection("scorecard");
                    for (weightKey in weights) {
                        var weight = weights[weightKey];

                        var weightOperator = weight.operator;
                        var weightMeasurement = weight.measurement;
                        var weightValues = weight.values;
                        var weightScore = weight.score;

                        var offerValue = payload[weightKey];
                        var offerScore = 0;

                        scoreCard[weightKey] = {};
                        scoreCard[weightKey].weight = {};
                        scoreCard[weightKey].weight.operator = weightOperator;
                        scoreCard[weightKey].weight.measurement = weightMeasurement;
                        scoreCard[weightKey].weight.values = weightValues;
                        scoreCard[weightKey].weight.score = weightScore;

                        console.log(`weightKey: [${weightKey}] weightOperator: [${weightOperator}] weightMeasurement: [${weightMeasurement}] weightValues: [${weightValues}] weightScore: [${weightScore}] offerValue: [${offerValue}]`);

                        if (offerValue != undefined) {
                            if (weightOperator == "less") {
                                console.log("-- less");
                                if (offerValue < weightValues[0]) {
                                    offerScore = weightScore;
                                }
                            }
                            else if (weightOperator == "equal") {
                                console.log("-- equal");
                                if (offerValue == weightValues[0]) {
                                    offerScore = weightScore;
                                }
                            }
                            else if (weightOperator == "greater") {
                                if (offerValue > weightValues[0]) {
                                    offerScore = weightScore;
                                }
                            }
                            else if (weightOperator == "between") {
                                if ((offerValue >= weightValues[0]) && (offerValue <= weightValues[1])) {
                                    offerScore = weightScore;
                                }
                            }
                            else if (weightOperator == "in") {
                                for (j = 0; j < weightValues.length; j++) {
                                    if (offerValue == weightValues[j]) {
                                        offerScore = weightScore;
                                        break;
                                    }
                                }
                            }
                            else if (weightOperator == "range") {
                                console.log("-- range");
                            }
                            else if (weightOperator == "ignore") {
                                console.log("-- ignore");
                            }
                        }
                        else {
                            offerValue = "none";
                        }
                        scoreCard[weightKey].offer = {};
                        scoreCard[weightKey].offer.value = offerValue;
                        scoreCard[weightKey].offer.score = offerScore;
                        summaryScore += offerScore;

                        var promise_x = scoreCardCollection.doc(weightKey).set(scoreCard[weightKey]);
                        promiseList.push(promise_x);
                    }
                    console.log("** -->" + JSON.stringify(scoreCard));

                    var promise_y = scoreCardCollection.doc("summary").set({
                        created: created,
                        score: summaryScore
                    });
                    promiseList.push(promise_y);

                    return Promise.all(promiseList);
                })
                .then(function () {
                    c
                })
                .catch(err => {
                    console.log('Error getting document', err);
                    res.status(200).send(`Error getting document - ${err}... ${now}`);
                });
        });
    }

    exports.localTest = (req, res) => {
        cors(req, res, () => {
            var now = moment().utcOffset(120);

            var updated = new Date();
            var dealUID = req.body.dealUID;

            console.log("updated: [" + updated + "]");
            console.log("dealUID: [" + dealUID + "]");

            var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
            var xhr = new XMLHttpRequest();

            var url = "https://frightanic.com/goodies_content/docker-names.php";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log("-- onreadystatechange");
                    console.log("-- " + xhr.responseText);

                    res.setHeader('Content-Type', 'text/plain');
                    res.send(xhr.responseText);
                }
            };
            var data = JSON.stringify("");
            xhr.send(data);
        });
    }