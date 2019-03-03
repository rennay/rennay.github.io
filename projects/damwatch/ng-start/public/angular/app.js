(function() {
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

    angular
        .module('app', ['firebase'])
        .controller('MyCtrl', function($firebaseObject) {
            const rootRef = firebase.database().ref().child('angular');
            const ref = rootRef.child('object');
            this.object = $firebaseObject(ref);
        })
        .controller('NewCtrl', function() {
            this.name = "Rennay";
        });
}());