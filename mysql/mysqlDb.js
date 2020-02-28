const mysqlDb = require('promise-mysql');
const config = require('./config');

let connection = null;

const connect =async ()=> {
   connection =  await mysqlDb.createConnection(config.database)
};

const disconnect = ()=>{
    connection.end()
};

module.exports={
    connect,
    disconnect,
    getConnection: ()=> connection
};