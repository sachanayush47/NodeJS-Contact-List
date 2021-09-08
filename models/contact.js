const mongoose = require("mongoose");

// Schema of the database.
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
})

// - - - - - - - - - - Name of collection - Schema of that database.
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;