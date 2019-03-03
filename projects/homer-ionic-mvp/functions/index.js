const functions = require('firebase-functions');
var moment = require('moment');
// const cors = require('cors')({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
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