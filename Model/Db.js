const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mealusers", { useNewUrlParser: true, useUnifiedTopology: true });

var userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    meals:[{
        name:String,
        calories:Number,
        date:String
    }],
    accessToken: String
});

var db = mongoose.model("User", userSchema);

module.exports = db;