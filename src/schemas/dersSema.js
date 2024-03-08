// dersSema.js

const mongoose = require('mongoose');

const DersSemaSchema = new mongoose.Schema({
  guildID: String, // veya ObjectId tipine uygun bir alan kullanabilirsin
  channelID: String, // veya ObjectId tipine uygun bir alan kullanabilirsin
  duration: Number,
});

module.exports = mongoose.model('DersSema', DersSemaSchema);
