const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL

async function connectionToDB() {
  await mongoose.connect(MONGO_URL);
}

module.exports = {
    connectionToDB
};
