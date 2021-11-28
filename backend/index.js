//You must install Nodemon and set your MongoDB Database
if (process.env.NODE_ENV == "development") {
  require("dotenv").config();
}

//Modules
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
require("./database/database");

//App Settings
app.set("port", process.env.PORT);

//Middlewears
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api', require('./routes/serverRoutes'));

app.get("/", (request, response) => {
    response.send("The Server is Working Correctly!");
});

app.listen(app.get("port"), () => {
    console.log(`The Server is Working on the PORT: ${app.get("port")}`);
});