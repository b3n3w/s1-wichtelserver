
const mongoose = require("mongoose");
const { successLog, warningLog } = require("../api/helper/logging");


const InitiateMongoServer = async () => {

  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });

      successLog("Connected to MongoDB Cloud Atlas")
    } catch (e) {
      console.log(e);
      throw e;
    }
  } else {
    warningLog("DB URI not found - please check enviroment variable")
  }
};

module.exports = InitiateMongoServer;
