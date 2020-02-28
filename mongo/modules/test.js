const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const newSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const Test = mongoose.model('test', newSchema);

module.exports = Test;

