const functions = require('firebase-functions');
var moment = require('moment');

// The Firebase Admin SDK to access the Firebase Realtime Database. 
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

// const firestore = new Firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

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