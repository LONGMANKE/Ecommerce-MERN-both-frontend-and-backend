const app = require("./app");
const cloudinary = require("cloudinary");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

//Handling uncaught exception like   console.log(youtube)


process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`The server is shutting down due to uncaught Promise rejection`);

    process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

//connecting with database
connectDatabase();


const server = app.listen(process.env.PORT, () => {

    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})


// Unhandled rejection when the db doesn't connect
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`The server is shutting down due to unhanddled Promise rejection`);

    server.close(() => {
        process.exit(1);
    });

});





/* Alternative.

require('dotenv').config()

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, () => console.log("server is up and running"))*/

