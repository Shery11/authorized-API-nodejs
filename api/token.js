var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TokenSchema = new Schema({

    value : {type: String}
    
});

module.exports = mongoose.model('Token', TokenSchema);

