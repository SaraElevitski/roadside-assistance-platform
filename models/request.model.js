const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({

  _id: {
    type: Number,
    required: true
  },

  location: {
    areaCode: { type: Number, required: true },
    name: { type: String, required: true }
  },

  problemDescription: {
    type: String,
    required: true
  },

  contactPhone: {
    type: String,
    required: true
  },
  // צריך לזכור לבדוק
  status: {
    type: String,
    enum: ['ממתין', 'בטיפול', 'הסתיים'],
    default: 'ממתין'
  },

  peopleStuck: {
    type: Number,
    default: 1
  },

  priority: { type: Number, required: true },
  volunteerCode: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('helprequests', RequestSchema);