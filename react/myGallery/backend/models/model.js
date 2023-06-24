// The purpose of this code is to define two Mongoose schemas and create two Mongoose models, User and Quote, which can be used in other parts of the application. The userSchema includes fields for username, password, and favoriteMovies. The quoteSchema includes fields for quote, character, quoteFrom, actor, and year.

const mongoose = require("mongoose");

// Define model schema
const UserSchema = new mongoose.Schema({
  username:{ type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },


  favoritePhotos: [], //added this for saving movies under a user
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
