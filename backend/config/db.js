
const mongoose = require("mongoose");


const InitiateMongoServer = async () => {

  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      });

      console.log("Connected to MongoDB Cloud Atlas - Cluster0 : wichteln");
    } catch (e) {
      console.log(e);
      throw e;
    }
  } else {
    console.log("DB URI not found - please check enviroment variable");
  }
};

module.exports = InitiateMongoServer;
