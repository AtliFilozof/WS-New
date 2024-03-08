// money.js

const mongoose = require('mongoose');

const moneySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  inventory: [
    {
      itemId: String,
      itemName: String,
    },
  ],
});

const money = mongoose.model('money', moneySchema);

module.exports = money;
