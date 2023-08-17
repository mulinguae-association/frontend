const mongoose = require('mongoose');

async function connectToDatabase() {
  return mongoose.connect('mongodb://127.0.0.1:27017/test2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  connectToDatabase,
};
