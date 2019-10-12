const functions = require('firebase-functions');
var moment = require('moment');

// const cors = require('cors')({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase 08-07-2019!");
});

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

var db = admin.firestore();

const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

// // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = admin.storage();

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
const projectId = 'homer-ionic-mvp';

// Creates a client
const storage = new Storage({
    projectId: projectId,
});

const bucketName = 'homer-ionic-mvp.appspot.com';

const SMSPORTAL_API_KEY = functions.config().smsportal.key;
const request = require('request');
var rp = require('request-promise');

/*******************************************/
/* 2.1. CUSTOMER CREATE                       */
/*******************************************/
exports.onCustomerCreateUpdateLive = functions.firestore /* 2.1.1 */
    .document('/customers/{customerUID}')
    .onCreate((snap, context) => {
        var currentDate = new Date();
        var customerUID = context.params.customerUID;

        console.log("currentDate: [" + currentDate + "]");
        console.log("customerUID: [" + customerUID + "]");

        // Get an object representing the current document
        const data = snap.data();
        var start_time = data.start_time;

        console.log("data: [" + JSON.stringify(data) + "]");
        console.log("start_time: [" + start_time + "]");

        return db.collection('latest').doc('record').set(data)
            .then(val => {
                console.log("Live Homer updated...");
                return Promise.resolve();
            })
            .catch(err => {
                console.log('Error processing onCustomerCreateUpdateLive', err);
                return Promise.reject();
            });
    });

/*******************************************/
/* 2.1. ACCOUNT CREATE                       */
/*******************************************/
exports.onAccountCreateUpdateLive = functions.firestore /* 2.1.1 */
    .document('/accounts/{accountUID}')
    .onCreate((snap, context) => {
        var currentDate = new Date();
        var accountUID = context.params.accountUID;

        console.log("currentDate: [" + currentDate + "]");
        console.log("accountUID: [" + accountUID + "]");

        // Get an object representing the current document
        const data = snap.data();
        var start_time = data.start_time;

        console.log("data: [" + JSON.stringify(data) + "]");
        console.log("start_time: [" + start_time + "]");

        return db.collection('latest').doc('record').set(data)
            .then(val => {
                console.log("Live Homer updated...");
                return Promise.resolve();
            })
            .catch(err => {
                console.log('Error processing onAccountCreateUpdateLive', err);
                return Promise.reject();
            });
    });

exports.cleanup = functions.https.onRequest((req, res) => {
    var now = moment().utcOffset(120);
    var nowString = now.format("YYYY-MM-DD");
    console.log("nowString: " + nowString);

    var _days = 3;
    if (req.query.days !== undefined) {
        _days = Number(req.query.days);
    }
    console.log(`_days: ${_days}`);

    var promiseList = [];

    promiseList.push(deleteCollection(db, 'customers', 100, _days));
    promiseList.push(deleteCollection(db, 'accounts', 100, _days));

    return Promise.all(promiseList)
        .then(function (docs) {
            console.log(`${docs.length} Promises completed successfully...`);
            res.status(200).send(`${docs.length} Promises completed successfully... ${now}`);
        })
        .catch(err => {
            console.log('Error cleaning up...', err);
            res.status(400).send('Error cleaning up... ', err);
        });
});

function deleteCollection(db, collectionPath, batchSize, _days) {
    console.log(`deleteCollection(${collectionPath})`)
    let cutoffDate = moment().subtract(_days, "days").toDate();
    console.log(`cutoffDate: ${cutoffDate}`);

    var collectionRef = db.collection(collectionPath);
    var query = collectionRef.where('start_time', '<', cutoffDate).limit(batchSize);

    var promiseList = [];
    query.get()
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                var filename = doc.data().filename;
                console.log(`-- Deleting ${doc.id} filename: ${filename}`);

                // Deletes the file from the bucket
                var promise_x = storage
                    .bucket(bucketName)
                    .file(filename)
                    .delete()
                    .then(() => {
                        console.log(`gs://${bucketName}/${filename} deleted.`);
                    })
                    .catch(err => {
                        console.log(`Error deleting ${filename}... ${err}`);
                    })

                promiseList.push(promise_x);
            })
        });

    var promise_y = new Promise((resolve, reject) => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
    promiseList.push(promise_y);

    return Promise.all(promiseList);
}

function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
        .then((snapshot) => {
            // When there are no documents left, we are done
            if (snapshot.size == 0) {
                return 0;
            }

            // Delete documents in a batch
            var batch = db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            return batch.commit().then(() => {
                return snapshot.size;
            });
        }).then((numDeleted) => {
            if (numDeleted === 0) {
                resolve();
                return;
            }

            // Recurse on the next process tick, to avoid
            // exploding the stack.
            process.nextTick(() => {
                deleteQueryBatch(db, query, batchSize, resolve, reject);
            });
        })
        .catch(reject);
}


/* Responds to any HTTP request that can provide a "message" field in the body.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
exports.sendMessage = functions.https.onRequest((req, res) => {
    var info = "-";
    var now = moment().utcOffset(120);

    // HTTP POST
    console.log("HTTP POST");

    const destination = req.body.destination;
    const content = req.body.content;

    console.log(`destination*: [${destination}]`);
    console.log(`content*: [${content}]`);

    return internalSendSMS(destination, content)
        .then(val => {
            res.status(200).send("Completed....");
        })
        .catch(err => {
            console.log('Error processing internalSendSMS', err);
            res.status(200).send("error: " + err);
        });
});

function internalSendSMS(destination, content) {
    console.log(`destination*: [${destination}]`);
    console.log(`content*: [${content}]`);

    var token = Buffer.from(SMSPORTAL_API_KEY).toString('base64');
    var authorization = "BASIC " + token;

    // console.log("token: [" + token + "]");

    var options = {
        method: 'GET',
        uri: 'https://rest.mymobileapi.com/v1/Authentication',
        headers: {
            'Content-Type': 'application/json',
            'authorization': authorization
        },
        json: true // Automatically parses the JSON string in the response
    };

    return rp(options)
        .then(function (body) {
            console.log("-- body: " + JSON.stringify(body));
            token = body.token;
            console.log("token: [" + token + "]");

            authorization = "Bearer " + token;
            console.log("authorization: [" + authorization + "]");

            return authorization;
        })
        .then(authorization => {
            var sendRequest = {
                'messages': [{ 'content': content, 'destination': destination }]
            };

            console.log(sendRequest);
            options = {
                method: 'POST',
                uri: 'https://rest.smsportal.com/v1/bulkmessages',
                body: sendRequest,
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': authorization
                },
                json: true // Automatically parses the JSON string in the response
            };

            return rp(options)
        })
        .then(function (body) {
            var eventId = body.eventId;
            console.log(`eventId: ${eventId}`);
            return Promise.resolve();
        })
        .catch(err => {
            console.log('Error processing internalSendSMS', err);
            return Promise.reject();
        });
}

exports.checkLastHour = functions.https.onRequest((req, res) => {
    var now = moment().utcOffset(120);
    var nowString = now.format("YYYY-MM-DD");
    console.log("nowString*: " + nowString);

    let customersRef = db.collection('customers');
    return customersRef.orderBy('start_time', 'desc').limit(10).get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            var _flag = false;
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());

                let _status = doc.data().status;
                console.log(`_status: ${_status}`);
                if (_status === true) {
                    _flag = true;
                }
            });
            console.log(`_flag: ${_flag}`);
            if (_flag === false) {
                console.log("Send SMS...");
                return internalSendSMS("0829039796", "Homer has picked up an issue...")
                .then(val => {
                    res.status(200).send(`Completed.... _flag: ${_flag}`);
                })
            }
            res.status(200).send(`Completed.... _flag: ${_flag}`);
        })
        .catch(err => {
            console.log('Error getting documents', err);
            res.status(200).send(`Error ${err}....`);
        });
});