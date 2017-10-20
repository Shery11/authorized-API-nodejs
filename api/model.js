var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DataSchema = new Schema({

    _id : {type: String , unique : true},
    deviceId : {type: String},
    id : {type: String},
    type : {type: String},
    total:{ type:String},
    taxInPrice:{ type:String},
    timestamp :{type: String},
    items :{ type : Array },
    payments :{type : Array },
    audience : {type: Object}

});

module.exports = mongoose.model('Data', DataSchema);

