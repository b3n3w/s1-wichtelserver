
const mongoose = require("mongoose");

const uri = 'mongodb+srv://administrator:UBQQdwRIwK6xFa6d@cluster0-httvm.mongodb.net/wichteln?retryWrites=true&w=majority'

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex : true
    });
  
    console.log("Connected to MongoDB Cloud Atlas - Cluster0 : wichteln");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
