require("dotenv").config();
require("express-async-errors");
// const { default: axios } = require("axios");
// const buffer = require("buffer").Buffer;
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const sequelize = require("./database/connect");
const visitorRoute = require("./routes/visitor");
app.use(express.json());
app.use(cors());

app.use("/visitor", visitorRoute);
app.use(notFound);
app.use(errorHandlerMiddleware);

const defineModels = () => {
  const modelDefiners = [require("./database/models/visitors")];

  for (const modelDefiner of modelDefiners) {
    modelDefiner();
  }
};

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Sequelize has established DB connection successfully.");
    defineModels();
    console.log(`Models defined`);
    console.log(`Database connection OK!`);
    //send();
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

const fireServer = async () => {
  try {
    await assertDatabaseConnectionOk();
    app.listen(port, () => {
      console.log(`Server is fired succefully on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// firing the http server
fireServer();
