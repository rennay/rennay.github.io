// console.log("Hotdog...");

// // Initialize Firebase
// var config = {
//     apiKey: "AIzaSyD0fFvCw2H_bcuPDBb82mAw7M38IvWD4hI",
//     authDomain: "newfriendlychat-63187.firebaseapp.com",
//     databaseURL: "https://newfriendlychat-63187.firebaseio.com",
//     projectId: "newfriendlychat-63187",
//     storageBucket: "newfriendlychat-63187.appspot.com",
//     messagingSenderId: "976092231898"
// };
// firebase.initializeApp(config);
console.log("Initialised...");

firebase.auth().signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;

        // ...      
        console.log(`isAnonymous: ${isAnonymous}`);

    }

    var firestore = firebase.firestore();
    
    const outputHeader = document.querySelector("#outputHeader");
    
    const damColl = firestore.collection("/newdam/rE53zMDUCLdVyLnCHAy1/collectors/DAMDWA/results");
    
    function findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
    
    // console.log("--- " + findGetParameter('criteria'));
    var traceDam = {};
    traceDam.x = [];                        
    traceDam.y = [];
    traceDam.type = '';
    
    drawGraph = function(traceDam) {
        console.log(traceDam);
        var myPlot = document.getElementById('tester');
        Plotly.purge(myPlot);
        Plotly.plot(myPlot, [{
            x: traceDam.x,
            y: traceDam.y,
            // text: traceDam.y,
            // textposition: 'auto',
            // hoverinfo: 'none',            
            type: traceDam.type
        }], {
                margin: { t: 0 }
            });
    
            myPlot.on('plotly_click', function(data){
                // alert('You clicked this Plotly chart!');
                // console.log("-- data: " + data.points.length);
                for(var i=0; i < data.points.length; i++){
                    pn = data.points[i].pointNumber;
                    tn = data.points[i].curveNumber;
                    _province = data.points[i].x;
                    // colors = data.points[i].data.marker.color;
    
                    console.log("pn: " + pn);
                    console.log("tn: " + tn);
                    console.log("_province: " + _province);
    
                    var uri = "damwatch.html?province=" + _province;
                    var res = encodeURI(uri);                
    
                    window.location = res;
                  };            
            });
    }
    
    getHistoricDamLevels = function(province) {
        // damColl.orderBy("TIMESTAMP", "desc").limit(10).onSnapshot(function (querySnapshot) {
        damColl.orderBy("TIMESTAMP", "desc").onSnapshot(function (querySnapshot) {
            traceDam.type = 'scatter';
    
            outputHeader.innerText = "Histogram*... " + province;
        
            querySnapshot.forEach(function (result) {
                console.log(result);
                // console.log("Document data:", doc.data());
                var objects = result.data();
    
                var _time = "";
                var _province = "";
                for (var key in objects) {
                    var value = objects[key];
    
                    console.log("key: " + key + " -- value: " + value);
                    if (key == "TIMESTAMP") {
                        _time = value;
                    }
                    if (key == province) {
                        _province = value;
                    }
                }
                traceDam.x.push(_time);
                traceDam.y.push(_province);            
            });
            drawGraph(traceDam);
        });
    };
    
    getDamLevels = function() {
        damColl.orderBy("TIMESTAMP", "desc").limit(1).onSnapshot(function (querySnapshot) {
            querySnapshot.forEach(function (result) {
                console.log(result);
                // console.log("Document data:", doc.data());
                var objects = result.data();
    
                var timestamp = objects.TIMESTAMP;
                outputHeader.innerText = "Dam Watch: " + timestamp;
    
                traceDam.type = 'bar';
    
                for (var key in objects) {
                    var value = objects[key];
    
                    console.log("key: " + key + " -- value: " + value);
                    if (key != "TIMESTAMP") {
                        traceDam.x.push(key);
                        traceDam.y.push(value);
                    }
                }
            });
            drawGraph(traceDam);
        });
    };
    
    var province = findGetParameter('province');
    console.log("province: " + province);
    if (typeof province !== "undefined" && province !== null) {
        getHistoricDamLevels(province);
    }
    else {
        getDamLevels();
    }    
});




