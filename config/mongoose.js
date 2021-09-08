// Require the library.
const mongoose = require("mongoose");

// Connect to the database.
mongoose.connect("mongodb://localhost/contact_list_db", {useNewUrlParser: true, useUnifiedTopology: true});

// Accquire the connection (to check if it is successful).
const db = mongoose.connection;

// Error
db.on("error", console.error.bind(console, "Error connecting to db"));

// Up and running, then print the message.
db.once("open", function() {
    console.log("Sucessfully connected to the database");
});