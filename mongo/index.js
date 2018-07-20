var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/tontestdb1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log("Mongo On"); });

var UsersSchema = mongoose.Schema({
  email : {type : String},
  passwd : {type : String},
  name : {type : String},
  token : {type : String}
});
var SocialSchema = mongoose.Schema({
  name : {type : String},
  filename : {type : String}
});
Users = mongoose.model('users', UsersSchema);
Social = mongoose.model('social', SocialSchema);

exports.Social = Social;
exports.Users = Users;
exports.db = db;
