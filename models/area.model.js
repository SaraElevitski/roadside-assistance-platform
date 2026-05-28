const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({

  _id: {
    type: Number,
    required: true
  },
  name: { type: String, required: true }

});


module.exports = mongoose.model('Area', AreaSchema, 'areas');