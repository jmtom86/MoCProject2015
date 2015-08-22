var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
var Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
  name: String,
  list: [{type: Schema.Types.ObjectId, ref: 'Item'}]
});
UserSchema.plugin(deepPopulate);

var User = mongoose.model('User', UserSchema);

var dummy = new User({
  name: 'null',
  list: []
});
dummy.save( function (err, result) {});