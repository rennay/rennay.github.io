(function () {
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

    var app = angular.module('app', ['firebase']);
    var MyCtrl = app.controller('MyCtrl', function ($scope, $firebaseObject) {
        const rootRef = firebase.database().ref().child('dams');
        const ref = rootRef.child('-L0aZ3vctyS7FxwPy6qV');
        this.object = $firebaseObject(ref);

        $scope.data = "Yeeha!";

        var resultsRef = firebase.database().ref('dams/-L0aZ3vctyS7FxwPy6qV/collectorMap/DAMDWA/results');
        const lastResult = resultsRef.child('-L0czEtUHjbWAr87Zq93')
        lastResult.on('value', function(snapshot) {
            $scope.dams = [];
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                // console.log("-- childKey: " + childKey + " -childData: " + childData);

                var dam = {};
                dam.name = childKey;
                dam.value = childData;

                $scope.dams.push(dam);
              });
              console.log($scope.dams.length);    
        });

    });

    var NewCtrl = app.controller('NewCtrl', function () {
        this.name = "Rennay";
    });

    var studentController = app.controller('studentController', function ($scope) {
        $scope.student = {
            firstName: "Mahesh",
            lastName: "Parashar",
            fees: 500,

            subjects: [
                { name: 'Physics', marks: 70 },
                { name: 'Chemistry', marks: 80 },
                { name: 'Math', marks: 99 },
                { name: 'English', marks: 75 },
                { name: 'Hindi', marks: 67 }
            ],

            fullName: function () {
                var studentObject;
                studentObject = $scope.student;
                return studentObject.firstName + " " + studentObject.lastName;
            }
        };
    });

 
}());