const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const request = require('request');

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
                    ,{
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

