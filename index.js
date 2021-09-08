const express = require("express");
const path = require("path");
const func = require(path.join(__dirname, "operations", "operation.js"));

// Start server at this port.
const port = 8000;

// Require the MONGOOSE CONFIG file.
const db = require("./config/mongoose");
// Require the CONTACT file.
const Contact = require("./models/contact");

// Start the server.
const app = express();

// Configuring VIEW ENGINE.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/** Decodes the encoded data sent from the browser and
 *  send it to the action route,
 *  puts the decoded data into req.body as a object
*/
app.use(express.urlencoded({ extended: true }));

// To use the static files like css, browser js, imagesm etc.
app.use(express.static("assets"));

// let contactList = [];

/** Tells the server to listen on the given port and
 *  a callback function to handle error, if any.
*/
app.listen(port, function(err) {
    if(err) {
        console.log("Error in running the server", err);
    } else {
        console.log("Server is running on port" , port);
    }
});

// - - Route - - Controller - -   
app.get("/", function(req, res) {

    Contact.find({}, function(err, contacts){
        if(err) {
            console.log("Error in fetching contacts from db");
            return;
        }
        return res.render("home", {
            title: "Contact List",
            contact_list: contacts
        });

    });
});

// - - - - - - Route - - - - - Controller - - - - - -  
app.post("/create-contact", function(req, res) {
    req.body.name = func.capitalize(req.body.name);
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact) {
        if(err) {
            console.log("Error in creating contact");
            return;
        }

        console.log("Contact Added", newContact);
        return res.redirect("back");
    });

    //console.log(req.body);
    // return res.redirect("/");
})

app.get("/delete-contact", function (req, res) {
    console.log(req.query);
    // let phone = req.query.phone;
    // let contactIndex = contactList.findIndex(contact => contact.phone == phone); 
    // if(contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }

    let id = req.query.id;

    Contact.findByIdAndDelete(id, function(err){
        if(err) {
            console.log("Error in deleting in contact", err);
        }
    }); 

    return res.redirect("/");
});
