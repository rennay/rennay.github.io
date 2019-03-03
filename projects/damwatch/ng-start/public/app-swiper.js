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
// console.log("Initialised...");

console.log("__init.js Starting Execution...");

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

        var firestore = firebase.firestore();

        // Initialize Swiper
        var index = 0;
        var swiper = new Swiper('.swiper-container', {
            // Enable lazy loading
            lazy: true,
            // effect: 'fade',
            keyboard: {
                enabled: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        var _serial = findGetParameter('serial');
        var _max = findGetParameter('max');
        if (!_max) {
            _max = "10";
        }
        var max = parseInt(_max);
        var dateFolder = moment().format("YYYY-MM-DD");
        console.log(`_serial: [${_serial}] max: [${max}] dateFolder: [${dateFolder}]`);

        const imageColl = firestore.collection("/images/" + _serial + "/" + dateFolder);
        imageColl.orderBy("timeTaken", "desc").limit(1).get().then(querySnapshot => {
            var i = 1;
            querySnapshot.forEach(function (result) {
                // console.log(result);
                var objects = result.data();
                // for (var key in objects) {
                //     var value = objects[key];

                //     console.log("key: " + key + " -- value: " + value);
                // }

                var downloadURL = objects.downloadURL;
                var timeTaken = objects.timeTaken;

                var detectURL = objects.detectURL;
                var timeDetected = objects.timeDetected;

                var detection_data = objects.detection;

                var summaryList = {};
                var categoryList = []
                // var summary = {cls:'', count:0};

                for (i = 0; i < detection_data.length; i++) {
                    var data = detection_data[i];
                    var cls = data.class;
                    var score = data.score;
                    var category = data.category;

                    var summary = summaryList[category];
                    if (summary === undefined) {
                        summary = { cls: cls, count: 0 };
                        summaryList[category] = summary;
                        categoryList.push(category);
                    }
                    summary.count++;

                }
                console.log(summaryList);

                for (i = 0; i < categoryList.length; i++) {
                    var category = categoryList[i];
                    console.log("category: " + category + " count: " + summaryList[category].count);
                }

                swiper.appendSlide('<div class="swiper-slide"><br/><font color="white">' + timeTaken + '</font><img data-src="' + downloadURL + '" class="swiper-lazy"><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div></div>');
                swiper.appendSlide('<div class="swiper-slide"><br/><font color="white">' + timeDetected + '</font><img data-src="' + detectURL + '" class="swiper-lazy"><div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div></div>');

                console.log("-*-");
            }, err => {
                console.log(`Encountered error: ${err}`);
            });
            console.log('Loaded...');
        });
    } else {
        // User is signed out.
        // ...
    }
    // ...
});




