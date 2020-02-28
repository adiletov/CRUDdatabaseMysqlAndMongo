const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;
const test = require('./router/Tests');

const run = async ()=>{
    await mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    app.use('/test', test);
    app.listen(port)
};

run().catch(e=>{
    console.error(e)
});