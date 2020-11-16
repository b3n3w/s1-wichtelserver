
const mongoose = require("mongoose");

const uri = 'mongodb+srv://@127.0.0.1/wichteln?retryWrites=true&w=majority'

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex : true
    });
  
    console.log("Connected to MongoDB Cloud Atlas - Cluster0 : united_skillserver");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
