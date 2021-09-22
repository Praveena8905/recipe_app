// ------------------------------------------------
// * Application: Vegan recipes app
// * Author: chanduthedev@gmail.com
// ------------------------------------------------

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const User = require("./models/user");
const routes = require("./routes/apiRoutes.js");
const appConfig = require("./appConfig").configuration;
// TODO: Need to remove later
const cors = require("cors");
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const swaggerDocument = YAML.load("./specs/api.yml");

const app = express();
app.use(cors());

const PORT = process.env.PORT || appConfig.appServer.port;
const mongoDBUrl = process.env.MONGODB_CONNECTION_STRING;
mongoose
  .connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the Database successfully");
  });

// const { MongoClient } = require("mongodb");
// const uri =
//   "mongodb+srv://recipe_user:<password>@cluster0.c8m58.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// client.connect((err) => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// app.use("/api-docs", swaggerUi.serve);

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(async (req, res, next) => {
  if (req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { userName, exp } = await jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      // If token has expired
      if (exp < Date.now().valueOf() / 1000) {
        return res.status(401).json({
          error: "JWT token has expired, please login to obtain a new one",
        });
      }
      const userDetails = await User.findOne({
        user_name: userName,
      });
      res.locals.loggedInUser = {
        userName: userDetails.user_name,
        email: userDetails.email,
      };
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

routes(app);

app.listen(PORT, () => {
  console.log("Server is listening on Port:", PORT);
});
