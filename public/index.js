var express = require("express");
var app = express();
var fs = require

var bodyParser = require("body-parser");
const { application, response } = require("express");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
    res.sendFile(_dirname + "/" + "index.html");
});

app.post("/process_post", function (req, res) {
    //Prepare output in JSON format
    response = {
        first_name: req.body.first_name,
    }
})