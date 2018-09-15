// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Restaurant (DATA)
// =============================================================
var reservations = [
    {
        customerName: "1",
        phoneNumber: "1",
        customerEmail: "1",
        customerID: "1"
    }
];

var waitList = [
    {
        customerName: "2",
        phoneNumber: "2",
        customerEmail: "2",
        customerID: "2"
    }
];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "table.html"));
});

// api get waiting list or reservation list
app.get("/api/tables", function (req, res) {
    return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
    return res.json(waitList);
});


// api post routes to change data
// below adds entry to array
app.post("/api/tables", function (req, res) {
    var newReservation = req.body;

    if (reservations.length < 5) {
        reservations.push(newReservation)
        console.log("Added new REservation")
        res.json(true)
    } else {
        waitList.push(newReservation)
        console.log("added new waitlist")
        res.json(false)
    }


});

// clears both arrays
app.post("/api/clear", function(req, res) {
    reservations = []
    waitList = []
})



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});


/*
customerName: $("#reserve-name").val().trim(),
phoneNumber: $("#reserve-phone").val().trim(),
customerEmail: $("#reserve-email").val().trim(),
customerID: $("#reserve-unique-id").val().trim()
*/