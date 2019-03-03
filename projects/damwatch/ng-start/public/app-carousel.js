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

const outputHeader = document.querySelector("#hotDogOutput");

var firestore = firebase.firestore();

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

var _serial = findGetParameter('serial');
console.log("_serial: " + _serial);

var dateFolder = moment().format("YYYY-MM-DD");                
const imageColl = firestore.collection("/images/" + _serial + "/" + dateFolder);

var m = ['957.jpg']

imageColl.orderBy("timeTaken", "desc").limit(10).onSnapshot(querySnapshot => {
    var i = 1;
    $('.x').remove();
    $('.y').remove();

    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');    
    
    querySnapshot.forEach(function (result) {
        // console.log(result);
        var objects = result.data();
        for (var key in objects) {
            var value = objects[key];

            console.log("key: " + key + " -- value: " + value);
        }
        
        var downloadURL = objects.downloadURL;
        var timeTaken = objects.timeTaken;
        var serial = objects.serial;

        $('<div class="item"><img data-src="'+downloadURL+'"><div class="carousel-caption"><h3>' + serial + '</h3><p>' + timeTaken + '</p></div>   </div>').appendTo('.carousel-inner');
        $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'" class="y"></li>').appendTo('.carousel-indicators')

        i++;
    },err => {
        console.log(`Encountered error: ${err}`);
    });
});

$(document).ready(function(){  
    for(var i=0 ; i< m.length ; i++) {
      $('<div class="item"><img src="'+m[i]+'"><div class="carousel-caption"><h3>957 Waterfall Country Estate</h3></div>   </div>').appendTo('.carousel-inner');
      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')
  
    }
    $('.item').first().addClass('active');
    $('.carousel-indicators > li').first().addClass('active');
    $('#carousel-example-generic').carousel();
  });

  $('#carousel-example-generic').on('slide.bs.carousel', function (ev) {
    console.log("hey....");
    var lazy;
      lazy = $(ev.relatedTarget).find("img[data-src]");
      lazy.attr("src", lazy.data('src'));
      lazy.removeAttr("data-src");  
  })  
