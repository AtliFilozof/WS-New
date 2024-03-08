// bonusCooldown.js

const mongoose = require('mongoose');

const bonusCooldownSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  lastBonusDate: {
    type: Number,
    default: 0,
  },
});

const BonusCooldown = mongoose.model('BonusCooldown', bonusCooldownSchema);

module.exports = BonusCooldown;
