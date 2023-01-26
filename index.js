require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const sequelize = require("./database/connect");
const visitorRoute = require("./routes/visitor");
const slotsRoute = require("./routes/slots");
const demoRoute = require("./routes/demo");
const createStudentRoute = require("./routes/createStudentRoute");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use("/visitor", visitorRoute);
app.use("/slots", slotsRoute);
app.use("/demo", demoRoute);
app.use('/createStudent',createStudentRoute)

app.use(notFound);
app.use(errorHandlerMiddleware);

const defineModels = () => {
  const modelDefiners = [
    require("./database/models/visitors"),
    require("./database/models/demo"),
    require("./database/models/zoom"),
    require("./database/models/slot"),
    require("./database/models/demo_class"),
    require("./database/models/student"),

  ];

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
