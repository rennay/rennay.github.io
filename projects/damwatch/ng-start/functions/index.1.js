const functions = require('firebase-functions');
var moment = require('moment');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

// const firestore = new Firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

// Imports the Google Cloud storage client library
// var storage = require('@google-cloud/storage')();

// Imports the Google Cloud client library
var pubsub = require('@google-cloud/pubsub')();

const path = require('path');

const request = require('request');

// exports.processUpload = functions.storage.object().onChange(event => {
//     const object = event.data; // The Storage object.

//     const fileBucket = object.bucket; // The Storage bucket that contains the file.
//     const filePath = object.name; // File path in the bucket.
//     const contentType = object.contentType; // File content type.
//     const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
//     const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

//     // Exit if this is a move or deletion event.
//     if (resourceState === 'not_exists') {
//         console.log('This is a deletion event.');
//         return 0;
//     }

//     // console.log("Retrieving metadata...");
//     var metadata = object.metadata;
//     for (var key in metadata) {
//         var value = metadata[key];

//         console.log("key: " + key + " -- value: " + value);
//     }

//     // var serial = metadata.serial;
//     // var timeTaken = metadata.timeTaken;        
//     var serial = "ABC-XYZ-123";
//     var timeTaken = new Date();
//     var detection = metadata.detection;
//     console.log(`serial: ${serial} timeTaken: ${timeTaken} detection: ${detection}`);

//     var myBucket = storage.bucket(fileBucket);
//     var file = myBucket.file(filePath);

//     var now = moment();
//     var expiryTime = now.add(72, 'hours');

//     // Generate a URL that allows temporary access to download your file.
//     console.log("Expiry in 72 hours...");
//     var config = {
//         action: 'read',
//         expires: expiryTime
//     };

//     const my_promise = file.getSignedUrl(config).then(results => {
//         const downloadURL = results[0];
//         // console.log('downloadURL: ' + downloadURL);

//         var db = admin.firestore();
//         var imagesRef = db.collection("images");
//         var dateFolder = moment().utcOffset(120).format("YYYY-MM-DD");
//         console.log("dateFolder: " + dateFolder);

//         if (detection === "true") {
//             console.log('This is an image which has been detected...');
//             var docref_path = metadata.docref_path;
//             console.log(`docref_path: ${docref_path}`);
//             let documentRef = db.doc(docref_path);

//             documentRef.get().then(function (doc) {
//                 var summaryList = {};
//                 if (doc.exists) {
//                     // console.log("Document data:", doc.data());

//                     var detection_data = doc.data().detection;
//                     var categoryList = []

//                     for (i = 0; i < detection_data.length; i++) {
//                         var data = detection_data[i];
//                         var cls = data.class;
//                         var score = data.score;
//                         var category = data.category;

//                         var summary = summaryList[category];
//                         if (summary === undefined) {
//                             summary = { cls: cls, count: 0 };
//                             summaryList[category] = summary;
//                             categoryList.push(category);
//                         }
//                         summary.count++;
//                     }

//                     console.log(summaryList);
//                 } else {
//                     // doc.data() will be undefined in this case
//                     console.log("No such document!");
//                 }

//                 var imageData = {
//                     detectURL: downloadURL,
//                     timeDetected: new Date(),
//                     summaryList: summaryList
//                 }

//                 documentRef.update(imageData).then(res => {
//                     console.log(`Document updated at ${res}`);
//                 }).catch(function (error) {
//                     console.log("Got an error: ", error);
//                 });

//             }).catch(function (error) {
//                 console.log("Error getting document:", error);
//             });
//         }
//         else {
//             var imageData = {
//                 serial: serial,
//                 downloadURL: downloadURL,
//                 timeTaken: timeTaken,
//                 timeLoaded: new Date()
//             };
//             console.log(imageData);

//             imagesRef.doc(serial).collection(dateFolder).add(imageData).then(ref => {
//                 console.log('Added document with ID: ', ref.id, ' at: ' + ref.path);

//                 const topicName = 'my-topic';
//                 var destination_file_name = "/tmp/" + path.basename(file.name);
//                 const data = JSON.stringify(
//                     {
//                         bucket: fileBucket,
//                         source_blob_name: filePath,
//                         destination_file_name: destination_file_name,
//                         docref_path: ref.path
//                     });
//                 // Publishes the message as a string
//                 const dataBuffer = Buffer.from(data);
//                 console.log("Publishing message...");
//                 pubsub
//                     .topic(topicName)
//                     .publisher()
//                     .publish(dataBuffer)
//                     .then(results => {
//                         const messageId = results[0];
//                         console.log(`Message ${messageId} published.`);
//                     })
//                     .catch(err => {
//                         console.error('ERROR:', err);
//                         res.status(400).send('Error publishing message... ', err);
//                     });
//             }).catch(function (error) {
//                 console.log("Got an error: ", error);
//             });
//         }
//     }).catch(err => {
//         console.error('ERROR:', err);
//     });

//     return my_promise;
// });

// exports.updateImage = functions.firestore
// .document('images/{imageSerial}')
// .onUpdate(event => {
//   // Get an object representing the document
//   // e.g. {'name': 'Marie', 'age': 66}
//   var newValue = event.data.data();
//   console.log('functions.firestore.onUpdate')
// //   console.log(`newValue: ${newValue}`);

// //   // ...or the previous value before this update
// //   var previousValue = event.data.previous.data();
// //   console.log(`previousValue: ${previousValue}`);

// //   // access a particular field as you would any JS property
// // //   var name = newValue.name;

// //   // perform desired operations ...
// // });

// /**
//  * Responds to any HTTP request that can provide a "message" field in the body.
//  *
//  * @param {Object} req Cloud Function request context.
//  * @param {Object} res Cloud Function response context.
//  */
// exports.housekeepFirestore = functions.https.onRequest((req, res) => {
//     console.log("starting housekeepFirestore...");

//     var db = admin.firestore();

//     var now = moment().utcOffset(120);
//     var nowString = now.format("YYYY-MM-DD");
//     console.log("nowString: " + nowString);

//     let imagesRef = db.collection('images');
//     var allImages = imagesRef.get()
//         .then(snapshot => {
//             snapshot.forEach(doc => {
//                 console.log(`[${doc.id}] => ${doc.data()}  -- [${doc.ref.path}]`);

//                 let documentRef = db.doc(doc.ref.path);
//                 documentRef.getCollections().then(collections => {
//                     for (let collection of collections) {
//                         try {
//                             // console.log(`Found subcollection with id: ${collection.id}`);
//                             var dateFolder = moment(collection.id, "YYYY-MM-DD");

//                             var diffBetweenDates = now.diff(dateFolder, 'days');
//                             console.log(`id: ${collection.id} path: ${collection.path} diffBetweenDates:  ${diffBetweenDates}`);
//                             if (diffBetweenDates > 3) {
//                                 console.log("Deleting Collection...");
//                                 deleteCollection(db, collection.path, 10);
//                             }
//                         }
//                         catch (err) {
//                             console.log("error during processing of collection :" + collection.id + ": " + err);
//                         }
//                     }
//                 }).catch(err => {
//                     console.log('Error getting documents', err);
//                 });
//             });
//             res.status(200).send("Complete... " + nowString);
//         })
//         .catch(err => {
//             console.log('Error getting images', err);
//             res.status(400).send('Error publishing message... ', err);
//         });
// });

// function deleteCollection(db, collectionPath, batchSize) {
//     var collectionRef = db.collection(collectionPath);
//     var query = collectionRef.orderBy('__name__').limit(batchSize);

//     return new Promise((resolve, reject) => {
//         deleteQueryBatch(db, query, batchSize, resolve, reject);
//     });
// }

// function deleteQueryBatch(db, query, batchSize, resolve, reject) {
//     query.get()
//         .then((snapshot) => {
//             // When there are no documents left, we are done
//             if (snapshot.size == 0) {
//                 return 0;
//             }

//             // Delete documents in a batch
//             var batch = db.batch();
//             snapshot.docs.forEach((doc) => {
//                 batch.delete(doc.ref);
//             });

//             return batch.commit().then(() => {
//                 return snapshot.size;
//             });
//         }).then((numDeleted) => {
//             if (numDeleted === 0) {
//                 resolve();
//                 return;
//             }

//             // Recurse on the next process tick, to avoid
//             // exploding the stack.
//             process.nextTick(() => {
//                 deleteQueryBatch(db, query, batchSize, resolve, reject);
//             });
//         })
//         .catch(reject);
// }

//   const topicName = 'my-topic';
//   const data = JSON.stringify({ foo: 'bar', timestamp: new Date() });
//   // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
//   const dataBuffer = Buffer.from(data);
//   console.log("publishing message...");
//   pubsub
//     .topic(topicName)
//     .publisher()
//     .publish(dataBuffer)
//     .then(results => {
//       const messageId = results[0];
//       console.log(`Message ${messageId} published.`);
//       res.status(200).send(`Message ${messageId} published.`);
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//       res.status(400).send('Error publishing message... ', err);
//     });
// });

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    // https://us-central1-newfriendlychat-63187.cloudfunctions.net/addMessage?id={device}&time={time}&data={data}&lat={lat}&lng={lng}&station={station}

    // HTTP GET
    // console.log("HTTP GET");
    // const device = req.query.device;
    // const time = req.query.time;
    // const data = req.query.data;
    // const lat = req.query.lat;
    // const lng = req.query.lng;
    // const station = req.query.station;

    // HTTP POST
    console.log("HTTP POST");
    const device = req.body.device;
    const time = req.body.time;
    const data = req.body.data;
    const lat = req.body.lat;
    const lng = req.body.lng;
    const station = req.body.station;

    console.log(`device: [${device}]`);
    console.log(`time: [${time}]`);
    console.log(`data: [${data}]`);
    console.log(`lat: [${lat}]`);
    console.log(`lng: [${lng}]`);
    console.log(`station: [${station}]`);

    // const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.database().ref('/messages').push({ device: device }).then(snapshot => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        //   res.redirect(303, snapshot.ref);
        res.status(200).send('Received...' + new Date());
    });
});

exports.login = functions.https.onRequest((req, res) => {
    console.log("exports.login");
    var sender_psid = req.query.sender_psid;
    var paymentID = "ABC-XYZ-123";
    var data = {
        paymentID: paymentID,
        timestamp: new Date()
    };

    console.log(`sender_psid: ${sender_psid} paymentID: ${paymentID}`);

    var db = admin.firestore();

    var senderRef = db.collection('apim').doc(sender_psid);
    var getDoc = senderRef.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
                // Add a new document in collection "cities" with ID 'LA'
                var setDoc = db.collection('apim').doc(sender_psid).set(data).then(ref => {
                    console.log('Added document with ID: ', ref.id);
                });
            } else {
                console.log('Document data:', doc.data());

                // TODO: get the token and check the timestamp.
                // if token is valid
                // res.redirect("https://newfriendlychat-63187.firebaseapp.com/fbclosewindow.html");
            }
            res.redirect("https://newfriendlychat-63187.firebaseapp.com/fblogin.html");
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

});

exports.redirect = functions.https.onRequest((req, res) => {
    let response;
    console.log("exports.redirect");

    console.log("code: " + req.query.code);

    var paymentID = req.query.code; // actually get the paymentID from the heavy token metadata _using_ the code

    console.log(`Running query for ${paymentID}...`);
    var db = admin.firestore();
    var apimCollection = db.collection("apim");

    var errorFlag = false;
    var queryRef = apimCollection.where("paymentID", "==", paymentID).get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());

            // TODO: store the token with a timestamp

            var sender_psid = doc.id;

            response = {
                "text": `Successfully signed into Nedbank API Marketplace!`
            }

            // Sends the response message
            callSendAPI(sender_psid, response);
        });
        res.redirect("https://newfriendlychat-63187.firebaseapp.com/fbclosewindow.html");
    })
        .catch(err => {
            console.log('Error getting documents', err);
            res.redirect("https://newfriendlychat-63187.firebaseapp.com/fbclosewindow.html");
        });
});


// exports.login = functions.https.onRequest((req, res) => {
//     // 0. Retrieve token if available - 

//     // 1. If available and valid
//     // respond to user

//     // Else
//         // 1. Intent Token Call
//         // in: clientID, secret
//         // out: access token

//         // 2.  Intent Creation Call
//         // in: access token, request body
//         // out: customer request ID (referenceID)

//         // 3.  Store referenceID with sender_psid

//         // 4.  Authorization
//         // redirect - https://api-ete.it.nednet.co.za/apimarket/authorization/open-banking/oauth2/authorize?response_type=code&scope=payments&paymentrequestid=1276tthvdnnm&client_id=12455&redirect_uri=http://localhost/demo-mobilia-php/paymnet_redir.php
//         // res.status(200).send('Received...' + new Date());
// }

// exports.redirect = functions.https.onRequest((req, res) => {
//     // 1. Get Auth Code
//     // in: redirect URI

//     // 2.  Get Customer Token (Heavy)
//     // in: auth code

//     // 3. Retrieve referenceID from heavy token response metadata

//     // 4. Retrieve sender_psid using referenceID

//     // 5. Customer details call with heavy token

//     // 6. Respond to user with sender_psid and info from 5.
// }

exports.webhook = functions.https.onRequest((req, res) => {
    switch (req.method) {
        case 'GET':
            handleFBGET(req, res);
            break;
        case 'POST':
            handleFBPOST(req, res);
            break;
        default:
            res.status(500).send({ error: 'Something blew up!' });
            break;
    }
});

// Accepts POST requests at /webhook endpoint
function handleFBPOST(req, res) {

    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Get the webhook event. entry.messaging is an array, but 
            // will only ever contain one event, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

};

const PAGE_ACCESS_TOKEN = "EAAWqvFz4QDEBABpWv8oRZBb4ERFLGSEU8uZBq4vZBAFl5P258wlE1TbxnuaPxy4G2C9a71mgznWuIbwYixIzf6FWxXRuqcjh2O4GGG9XrunZAvBOZArvSWT3QbX9RcZCXRkjwbqWZBT3lMOtYOFYPIZCXGcAHXZBkDIXQF248E6Wd7QZDZD";

// 
// Accepts GET requests at the /webhook endpoint
function handleFBGET(req, res) {

    /** UPDATE YOUR VERIFY TOKEN **/
    const VERIFY_TOKEN = "rennay";

    // Parse params from the webhook verification request
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Check if a token and mode were sent
    if (mode && token) {

        // Check the mode and token sent are correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Respond with 200 OK and challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

// Handles messages events
function handleMessage(sender_psid, received_message) {
    let response;

    // Check if the message contains text
    if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    }
    else if (received_message.attachments) {

        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        console.log(`attachment_url: ${attachment_url}`);
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                            , {
                                "type": 'web_url',
                                "title": 'Login',
                                "url": 'https://us-central1-newfriendlychat-63187.cloudfunctions.net/login?sender_psid=' + sender_psid,
                                "webview_height_ratio": 'compact',
                                "messenger_extensions": true
                            }
                        ],
                    }]
                }
            }
        }
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    console.log("**** callSendAPI");
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    console.log('--' + request_body);
    console.log('PAGE_ACCESS_TOKEN: ' + PAGE_ACCESS_TOKEN);

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/
// exports.helloHttp = function helloHttp (req, res) {        
exports.helloHttp = functions.https.onRequest((req, res) => {
    switch (req.method) {
        case 'GET':
            handleGET(req, res);
            break;
        case 'PUT':
            handlePUT(req, res);
            break;
        default:
            res.status(500).send({ error: 'Something blew up!' });
            break;
    }

    response = "This is a sample response from your webhook!" //Default response from the webhook to show it's working


    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    res.send(JSON.stringify({
        "speech": response, "displayText": response
        //"speech" is the spoken version of the response, "displayText" is the visual version
    }));
});

// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// 'use strict';
const http = require('http');
const host = 'api.worldweatheronline.com';
const wwoApiKey = 'f1c169cb20364cd8a24143441182702';

// exports.weatherWebhook = (req, res) => {
exports.weatherWebhook = functions.https.onRequest((req, res) => {
    // Get the city and date from the request
    let city = req.body.result.parameters['geo-city']; // city is a required param
    // Get the date for the weather forecast (if present)
    let date = '';
    if (req.body.result.parameters['date']) {
        date = req.body.result.parameters['date'];
        console.log('Date: ' + date);
    }
    // Call the weather API
    callWeatherApi(city, date).then((output) => {
        // Return the results of the weather API to Dialogflow
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': output, 'displayText': output }));
    }).catch((error) => {
        // If there is an error let the user know
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ 'speech': error, 'displayText': error }));
    });
});

function callWeatherApi(city, date) {
    return new Promise((resolve, reject) => {
        // Create the path for the HTTP request to get the weather
        let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
            '&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
        console.log('API Request: ' + host + path);
        // Make the HTTP request to get the weather
        http.get({ host: host, path: path }, (res) => {
            let body = ''; // var to store the response chunks
            res.on('data', (d) => { body += d; }); // store each response chunk
            res.on('end', () => {
                // After all the data has been received parse the JSON for desired data
                let response = JSON.parse(body);
                let forecast = response['data']['weather'][0];
                let location = response['data']['request'][0];
                let conditions = response['data']['current_condition'][0];
                let currentConditions = conditions['weatherDesc'][0]['value'];
                // Create response
                let output = `Current conditions in the ${location['type']} 
        ${location['query']} are ${currentConditions} with a projected high of
        ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of 
        ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on 
        ${forecast['date']}.`;
                // Resolve the promise with the output text
                console.log(output);
                resolve(output);
            });
            res.on('error', (error) => {
                reject(error);
            });
        });
    });
}

exports.modifyUser = functions.firestore
    .document('users/{userID}')
    .onWrite((change, context) => {
        console.log("-- modifyUser *+* ...");
        return 0;
    });

exports.timerOnDealCreate = functions.firestore
    .document('source4me/root/deals/{dealUID}')
    .onCreate((snap, context) => {
        var dealUID = context.params.dealUID;

        // Get an object representing the document
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const created = newValue.created;
        const category = newValue.category;

        console.log("created: [" + created.toDate() + "]");
        console.log("category: [" + category + "]");
        console.log("dealUID: [" + dealUID + "]");

        return db.collection('source4me/root/configs').doc("category").collection(category).doc(category)
            .get()
            .then(function (doc) {
                console.log(doc.id, " => ", doc.data());

                var docData = doc.data();
                var validity = docData["validity"];
                console.log("-- " + doc.id + " : " + JSON.stringify(docData));
                console.log("-- validity*: " + validity);

                var createdMoment = moment(created.toDate());
                console.log("createdMoment: [" + createdMoment + "]");

                var expiryDate = createdMoment.add(validity, 'days');
                var collectionDate = expiryDate.format("YYYY-MM-DD");

                console.log("expiryDate: [" + expiryDate.toDate() + "]");
                console.log("collectionDate: [" + collectionDate + "]");

                return db.collection("source4me/root/system/timer/" + collectionDate).add({
                    dealUID: dealUID
                }).then(timerRef => {
                    console.log('Added Timer with ID: ', timerRef.id);
                });

            })
            .catch(function (error) {
                console.log("Error getting document:", error);
            });
    });

exports.scoreOnWeightChange = functions.firestore
    .document('source4me/root/deals/{dealUID}/weights/{weight}')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var updated = new Date();
        var dealUID = context.params.dealUID;
        var weight = context.params.weight;

        console.log("updated: [" + updated + "]");
        console.log("dealUID: [" + dealUID + "]");
        console.log("weight: [" + weight + "]");

        return Promise.resolve();
    });


exports.rankOnScoreCardChange = functions.firestore
    .document('source4me/root/deals/{dealUID}/offers/{offerUID}/scorecard/summary')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var updated = new Date();
        var dealUID = context.params.dealUID;
        var offerUID = context.params.offerUID;

        console.log("updated: [" + updated + "]");
        console.log("dealUID: [" + dealUID + "]");
        console.log("offerUID: [" + offerUID + "]");

        return db.collection(`source4me/root/deals/${dealUID}/offers/${offerUID}/scorecard`).doc("summary").get()
            .then(function (summaryDoc) {
                if (!summaryDoc.exists) {
                    throw `Summary for Offer ${offerUID} for Deal ${dealUID} not found...`;
                }
                var score = summaryDoc.data().score;
                console.log("-- score: " + score);

                return db.collection(`source4me/root/deals/${dealUID}/leaderboard`).doc(offerUID).set({
                    score: score,
                    updated: updated
                },
                    { merge: true }
                );
            })
            .then(function (docs) {
                console.log("Summary updated... " + updated);
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    });

exports.rankOnOfferPriceChange = functions.firestore
    .document('source4me/root/deals/{dealUID}/offers/{offerUID}')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var updated = new Date();
        var dealUID = context.params.dealUID;
        var offerUID = context.params.offerUID;
        var offerList = [];
        var promiseList = [];

        console.log("updated: [" + updated + "]");
        console.log("dealUID: [" + dealUID + "]");
        console.log("offerUID: [" + offerUID + "]");

        console.log("change.before.exists: [" + change.before.exists + "]");
        console.log("change.after.exists: [" + change.after.exists + "]");

        const previousValue = change.before.data();
        var previousPrice = change.before.exists ? previousValue.payload.price : 0;
        const newValue = change.after.data();
        var newPrice = newValue.payload.price;

        console.log(`-- previousPrice: ${previousPrice} newPrice: ${newPrice}`);

        if (previousPrice == newPrice) {
            console.log("Price has not changed. Returning...");
            return Promise.resolve();
        }

        var dealDocRef = db.collection('source4me/root/deals').doc(dealUID);
        var offerCollRef = dealDocRef.collection("offers");

        return offerCollRef
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (offerDoc) {
                    console.log("-- " + offerDoc.id);

                    var offer = {
                        key: offerDoc.id,
                        price: offerDoc.data().payload.price
                    }
                    offerList.push(offer);
                });

                /* Then sort */
                offerList.sort(function (a, b) {
                    return parseFloat(a.price) - parseFloat(b.price);
                });

                var leaderBoardCollRef = dealDocRef.collection("leaderboard");

                var i = 0, rank = 0, oldPrice = 0, newPrice = 0;
                for (i = 0; i < offerList.length; i++) {
                    var offer = offerList[i];
                    var offerKey = offer.key;

                    newPrice = offer.price;
                    if (newPrice != oldPrice) {
                        rank++;
                    }

                    oldPrice = newPrice;

                    var json = {
                        rank: rank,
                        updated: updated
                    }

                    // console.log(`offerKey: ${offerKey} ${JSON.stringify(json)}`);

                    var promise_x = leaderBoardCollRef.doc(offerKey).set(json,
                        { merge: true }
                    );

                    promiseList.push(promise_x);
                }

                console.log("--- FIN ---");

                return Promise.all(promiseList);
            })
            .then(function (docs) {
                console.log("Promise.all completed: " + docs.length);
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    });

exports.scoreonDealWeightChange = functions.firestore
    .document('source4me/root/deals/{dealUID}/weights/{weight}')
    .onWrite((change, context) => {
        // Get an object with the current document value.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var updated = new Date();
        var dealUID = req.body.dealUID;

        console.log("updated: [" + updated + "]");
        console.log("dealUID: [" + dealUID + "]");

        var promiseList = [];

        var dealDocRef = db.collection('source4me/root/deals').doc(dealUID);
        return dealDocRef.collection("offers").get()
            .then(function (offersSnapshot) {
                offersSnapshot.forEach(function (offerDoc) {
                    var offerKey = offerDoc.id;

                    var promise_x = db.collection(`source4me/root/deals/${dealUID}/offers/${offerKey}/command`).doc("rescore")
                        .set({
                            updated: updated
                        });
                    promiseList.push(promise_x);
                })
                return Promise.all(promiseList);
            })
            .then(function (docs) {
                console.log("Promise.all completed: " + docs.length);
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    });

exports.scoreOnOfferChange = functions.firestore
    .document('source4me/root/deals/{dealUID}/offers/{offerUID}')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var created = new Date();
        var dealUID = context.params.dealUID;
        var offerUID = context.params.offerUID;

        console.log("created: [" + created + "]");
        console.log("dealUID: [" + dealUID + "]");
        console.log("offerUID: [" + offerUID + "]");

        return db.collection(`source4me/root/deals/${dealUID}/offers/${offerUID}/command`).doc("rescore")
            .set({
                created: created
            })
            .then(function (doc) {
                console.log("Summary updated... " + created);
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    });

exports.rescoreOfferOnCommand = functions.firestore
    .document('source4me/root/deals/{dealUID}/offers/{offerUID}/command/rescore')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var created = new Date();
        var dealUID = context.params.dealUID;
        var offerUID = context.params.offerUID;

        console.log("created: [" + created + "]");
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
                    throw `Offer ${offerUID} for Deal ${dealUID} not found... ${now}`;
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
            .then(function (docs) {
                console.log("Promise.all completed: " + docs.length);
                return Promise.resolve();
            })
            .catch(err => {
                console.log('Error processing scoreOnOfferChange', err);
            })
    });

exports.notifyOnDealCreate = functions.firestore
    .document('source4me/root/deals/{dealUID}')
    .onCreate((snap, context) => {
        var dealUID = context.params.dealUID;

        // Get an object representing the document
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const created = newValue.created;
        const category = newValue.category;

        console.log("created: [" + created.toDate() + "]");
        console.log("category: [" + category + "]");
        console.log("dealUID: [" + dealUID + "]");

        var categoryCriteria = "category." + category;
        console.log("categoryCriteria: [" + categoryCriteria + "]");

        /* Find users (Sellers) for a specific category */
        return db.collection('source4me/root/users')
            .where(categoryCriteria, "==", true)
            .get()
            .then(function (querySnapshot) {
                var promiseList = [];
                console.log("-- function(querySnapshot)");
                querySnapshot.forEach(function (doc) {
                    var userUID = doc.id;
                    console.log(userUID, " => ", doc.data());

                    var userDocRef = db.collection('source4me/root/users').doc(userUID);
                    var promise_y = userDocRef.collection('notifications_pending').add({
                        created: created,
                        dealUID: dealUID,
                        offerUID: "---",
                        status: "PE"
                    }).then(notificationPendingRef => {
                        console.log('Added Pending Notification with ID: ', notificationPendingRef.id);
                    });

                    promiseList.push(promise_y);
                });

                return Promise.all(promiseList);
            })
            .then(function (docs) {
                console.log("Promise.all completed: " + docs.length);
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    });

exports.notifyOnOfferChange = functions.firestore
    .document('source4me/root/deals/{dealUID}/offers/{offerUID}')
    .onWrite((change, context) => {
        // Get an object with the current document value.
        // If the document does not exist, it has been deleted.

        var isAddorUpdate = change.after.exists; /* update = true, delete = false */
        console.log("isAddorUpdate: [" + isAddorUpdate + "]");

        if (isAddorUpdate == false) {
            console.log("This is a delete event. Returning...");
            return Promise.resolve();
        }

        var created = new Date();
        var dealUID = context.params.dealUID;
        var notificationList = {};
        var offerUID = context.params.offerUID;

        console.log("created: [" + created + "]");
        console.log("dealUID: [" + dealUID + "]");
        console.log("offerUID: [" + offerUID + "]");

        // Get an object representing the current document
        const newValue = change.after.data();
        console.log("newValue: [" + newValue + "]");

        var dealDocRef = db.collection('source4me/root/deals').doc(dealUID);
        return dealDocRef.get()
            .then(doc => {
                if (!doc.exists) {
                    throw new Error('No such document!');
                }
                var docData = doc.data();
                console.log('Document data:', docData);
                var userUID = docData.userUID;

                notificationList[userUID] = userUID;

                return doc.ref.collection('offers').get();
            })
            .then(function (querySnapshot) {
                console.log("-- function(querySnapshot)");
                querySnapshot.forEach(function (offerDoc) {
                    // doc.data() is never undefined for query doc snapshots
                    var offerDocUID = offerDoc.id;
                    var offerDocData = offerDoc.data();
                    var offerDocUserUID = offerDocData.userUID;

                    /* Do not add the user of _this_ offer to the notification list */
                    if (offerUID != offerDocUID) {
                        console.log(offerDocUID, " => ", offerDocData);

                        notificationList[offerDocUserUID] = offerDocUserUID;
                    }
                });
                var promiseList = [];
                // console.log("**-- " + JSON.stringify(notificationList));
                for (var notificationUserUID in notificationList) {
                    if (notificationList.hasOwnProperty(notificationUserUID)) {
                        console.log(notificationUserUID + " -> " + notificationList[notificationUserUID]);

                        var userDocRef = db.collection('source4me/root/users').doc(notificationUserUID);
                        var promise_y = userDocRef.collection('notifications_pending').add({
                            created: created,
                            dealUID: dealUID,
                            offerUID: offerUID,
                            status: "PE"
                            // });
                        }).then(notificationPendingRef => {
                            console.log('Added Pending Notification with ID: ', notificationPendingRef.id);
                        });
                        promiseList.push(promise_y);
                    }
                }
                console.log("Returning Promise.all... " + promiseList.length);
                return Promise.all(promiseList);
            })
            .then(function (docs) {
                console.log("Promise.all completed: " + docs.length);

                return Promise.resolve();
            })
            .catch(err => {
                console.log('Error processing notifyOnOfferChange', err);
            })
    });

exports.consolidateOnPendingNotification = functions.firestore
    .document('source4me/root/users/{userUID}/notifications_pending/{notificationPendingUID}')
    .onCreate((snap, context) => {
        var userUID = context.params.userUID;
        var notificationPendingUID = context.params.notificationPendingUID;

        // Get an object representing the document
        const newValue = snap.data();

        // access a particular field as you would any JS property
        const created = newValue.created;
        const dealUID = newValue.dealUID;
        const offerUID = newValue.offerUID;
        var updated = new Date();

        console.log("created: [" + created.toDate() + "]");
        console.log("dealUID: [" + dealUID + "]");
        console.log("offerUID: [" + offerUID + "]");
        console.log("userUID: [" + userUID + "]");
        console.log("notificationPendingUID: [" + notificationPendingUID + "]");
        console.log("updated: [" + updated + "]");

        var notificationsRef = db.collection('source4me/root/users').doc(userUID).collection("notifications");
        return notificationsRef.where("dealUID", "==", dealUID)
            .get()
            .then(function (querySnapshot) {
                var notificationDoc = {};
                var notificationDocRef = null;
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    notificationDoc = doc.data();
                    notificationDocRef = doc.ref;
                });

                var promiseList = [];
                var promise_x = null;

                /* Notification for this deal already exists */
                if (notificationDocRef != null) {
                    notificationDoc.count = notificationDoc.count + 1;
                    notificationDoc.updated = updated;

                    /* Update notification */
                    promise_x = notificationDocRef.update(notificationDoc);
                } else {
                    notificationDoc = {
                        created: created,
                        dealUID: dealUID,
                        offerUID: offerUID,
                        count: 1,
                        updated: updated
                    }

                    /* Add notification */
                    promise_x = notificationsRef.add(notificationDoc);
                }

                promiseList.push(promise_x);

                var notificationPendingDocRef = snap.ref;
                var promise_y = notificationPendingDocRef.delete();

                promiseList.push(promise_y);

                console.log("Returning Promise.all...");
                return Promise.all([promiseList])
            })
            .then(function (docs) {
                console.log("Promise.all completed: " + docs.length);
                return Promise.resolve();
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    });

exports.makeUppercase = functions.database.ref('/messages/{pushId}/original').onCreate(event => {
    const original = event.data.val()
    console.log('Uppercasing', event.params.pushId, original)
    const uppercase = original.toUpperCase()
    return event.data.ref.parent.child('uppercase').set(uppercase)
})

// var express = require("express")
// var bodyParser = require('body-parser')

// var app = express()

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.write('you posted:\n')
//   console.log("***************** EXPRESS *****************");
//   console.log(JSON.stringify(req.body, null, 2));
//   console.log("***************** EXPRESS *****************");
//   res.end(JSON.stringify(req.body, null, 2))
// })

// // /* Express */
// // const app1 = express()
// // app1.get("*", (request, response) => {
// //   response.send("Hello from Express on Firebase!")
// // })

// const api1 = functions.https.onRequest(app)

// module.exports = {
//   api1
// }
