var mongoose = require('mongoose');
var fs = require('fs');
mongoose.connect('mongodb://jkhh:jkhh123@ds035553.mongolab.com:35553/mocproject
');
var models_path = __dirname + '/../server/models';
mongodb://jkhh:jkhh123@ds035553.mongolab.com:35553/mocproject
fs.readdirSync(models_path).forEach( function (file) {
  if (file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
});
