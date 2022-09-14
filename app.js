const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req, res) {
    const email = req.body.email;
    const fName = req.body.fName;
    const lName = req.body.lName;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }

    const JSONdata = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/5f9161acc7";

    const options = {
        method: "POST",
        auth: "harishan1:960c042e403e99c935e40b2b17ff5029-us10"
    }

    const request = https.request(url, options, function(response) {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(JSONdata);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
})


//API Key
// 960c042e403e99c935e40b2b17ff5029-us10

//Audience Key
// 5f9161acc7
