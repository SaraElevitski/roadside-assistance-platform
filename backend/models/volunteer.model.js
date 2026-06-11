const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  tz: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  specialties: [String],
  role: {type: String}
});

module.exports = mongoose.model('volunteers', VolunteerSchema);