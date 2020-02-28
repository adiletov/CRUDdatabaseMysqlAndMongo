const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

const test = require('./router/Tests');
const mysqlDb = require('./mysqlDb');

app.use(cors());
app.use(express.json());


const run = async ()=>{
    await mysqlDb.connect();
    app.use('/test',test );
  app.listen(port);

    process.on('exit', ()=>{
        mysqlDb.disconnect()
    })
};

run().catch(e=>{
    console.error(e)
});