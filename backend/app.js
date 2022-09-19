const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);




//Middleware for Errors
app.use(errorMiddleware);

module.exports = app;