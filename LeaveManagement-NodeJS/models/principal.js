var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var passportLocalMongoose = require("passport-local-mongoose");

var principalSchema = new mongoose.Schema({
  name: String,
  type: String,
  username: String,
  password: String,
  hostel: String,
  image: String
});

principalSchema.plugin(passportLocalMongoose);
var principal = (module.exports = mongoose.model("principal", principalSchema));

module.exports.createprincipal = function(newprincipal, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newprincipal.password, salt, function(err, hash) {
      newprincipal.password = hash;
      newprincipal.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  principal.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  principal.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, passwordFound) {
    if (err) throw err;
    callback(null, passwordFound);
  });
};
