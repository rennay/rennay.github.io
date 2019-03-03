var graphPlotterDemoApp = angular.module('graphPlotterDemoApp', ['graphPlotter', 'firebase']);

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

console.log("app-plotly.js");

graphPlotterDemoApp.controller('graphPlotterDemoCtrl', function ($scope, $firebaseObject) {
    const rootRef = firebase.database().ref().child('dams');
    const ref = rootRef.child('-L0aZ3vctyS7FxwPy6qV');
    this.object = $firebaseObject(ref);

    $scope.data = "Yeeha!";

    var resultsRef = firebase.database().ref('dams/-L0aZ3vctyS7FxwPy6qV/collectorMap/DAMDWA/results');
    const lastResult = resultsRef.child('-L0czEtUHjbWAr87Zq93');
    
    lastResult.on('value', function (snapshot) {
        var traceDam = {};
        traceDam.x = [];
        traceDam.y = [];
        traceDam.type = 'bar';
            
        $scope.dams = [];
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log("-- childKey: " + childKey + " -childData: " + childData);

            var dam = {};
            dam.name = childKey;
            dam.value = childData;

            $scope.dams.push(dam);
            traceDam.x.push(childKey);
            traceDam.y.push(childData);
        });
        console.log($scope.dams.length);
        console.log(traceDam);  
        
        $scope.graphPlots = [traceDam];
    });

    // traceDam.x.push('GC');
    // traceDam.y.push('61');

    // traceDam.x.push('WC');
    // traceDam.y.push('33');



    var trace1 = {
        x: ['GC', 'WC', 'EC', 'NC'],
        y: [5, 15, 13, 17],
        type: 'bar'
    };

    // var trace2 = {
    //     x: [1, 2, 3, 4],
    //     y: [16, 5, 11, 9],
    //     type: 'scatter'
    // };

    // var trace3 = {
    //     x: [1, 2, 3, 4],
    //     y: [23, 4, 2, 6],
    //     type: 'scatter'
    // };

    // var trace4 = {
    //     x: [1, 2, 3, 4],
    //     y: [9, 11, 3, 12],
    //     type: 'scatter'
    // };

    $scope.graphPlots = [trace1];
});