var moment = require('moment');

console.log("Hello world...");

// GET CURRENT DATE
var date = new Date();

// GET YYYY, MM AND DD FROM THE DATE OBJECT
var yyyy = date.getFullYear().toString();
var mm = (date.getMonth()+1).toString();
var dd  = date.getDate().toString();

// CONVERT mm AND dd INTO chars
var mmChars = mm.split('');
var ddChars = dd.split('');

// CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
var dateString = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);

console.log(dateString);


