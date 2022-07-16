const mongoose = require("mongoose");

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URI, ).then
((data) =>{
    console.log(`Mongodb connected with server: ${data.connection.host}`);
})
// Used catch before implementing  process.on("unhandledRejection" in server.js 
/*.catch((err)=> {
    console.log(err)
})*/
}

module.exports = connectDatabase