const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', ReportSchema);