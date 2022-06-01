// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// const request = require('request')
// request('https://www.epochconverter.com/', function (
//   error,
//   response,
//   body
// ) {
//   console.error('error:', error)
//   // console.log('response: ', response )
//   console.log('body:', body)
// })

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//UTC Function
/*
Original Function before using
https://codebeautify.org/jsviewer

const UTCResult = (unixtime) => {
	var date = new Date(unixtime);
	var days = date.getDay()
	var dayName;
	if (days == 1) {
		dayName = "Mon"
	} else if (days == 2) {
		dayName = "Tue"
	} else if (days == 3) {
		dayName = "Wed"
	} else if (days == 4) {
		dayName = "Thu"
	} else if (days == 5) {
		dayName = "Fri"
	} else if (days == 6) {
		dayName = "Sat"
	} else if (days == 7) {
		dayName = "Sun"
	}

	var months = (date.getMonth() + 1)
	var monthName;
	if (months == 1) {
		monthName = "Jan"
	} else if (months == 2) {
		monthName = "Feb"
	} else if (months == 3) {
		monthName = "Mar"
	} else if (months == 4) {
		monthName = "Apr"
	} else if (months == 5) {
		monthName = "May"
	} else if (months == 6) {
		monthName = "Jun"
	} else if (months == 7) {
		monthName = "Jul"
	} else if (months == 8) {
		monthName = "Aug"
	} else if (months == 9) {
		monthName = "Sep"
	} else if (months == 10) {
		monthName = "Oct"
	} else if (months == 11) {
		monthName = "Nov"
	} else if (months == 12) {
		monthName = "Des"
	}

	var utcResult = (dayName + ", " + date.getDate() + " " + (monthName) + " " +
		date.getFullYear() + " " + date.getHours().toString().padStart(2, '0') + ":" +
		date.getMinutes().toString().padStart(2, '0') + ":" +
		date.getSeconds().toString().padStart(2, '0'))
	return utcResult
}

*/
// UTCResult Function After Using
// https://codebeautify.org/jsviewer
const UTCResult = t => {
	var e, a = new Date(t),
		r = a.getDay();
	1 == r ? e = "Mon" : 2 == r ? e = "Tue" : 3 == r ? e = "Wed" : 4 == r ? e = "Thu" : 5 == r ? e = "Fri" : 6 == r ? e = "Sat" : 7 == r && (e = "Sun");
	var n, g = a.getMonth() + 1;
	return 1 == g ? n = "Jan" : 2 == g ? n = "Feb" : 3 == g ? n = "Mar" : 4 == g ? n = "Apr" : 5 == g ? n = "May" : 6 == g ? n = "Jun" : 7 == g ? n = "Jul" : 8 == g ? n = "Aug" : 9 == g ? n = "Sep" : 10 == g ? n = "Oct" : 11 == g ? n = "Nov" : 12 == g && (n = "Des"), e + ", " + a.getDate() + " " + n + " " + a.getFullYear() + " " + a.getHours().toString().padStart(2, "0") + ":" + a.getMinutes().toString().padStart(2, "0") + ":" + a.getSeconds().toString().padStart(2, "0")
};


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  if((req.params.date).includes("-")==true){
    var unixtime = new Date(req.params.date).getTime()
    res.json({unix:unixtime ,utc: UTCResult(unixtime)})
    }else{
      var unixTimestamp = req.params.date/1000
      var date = new Date(unixTimestamp*1000);
      res.json({unix: req.params.date ,utc: UTCResult(date)})}
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
