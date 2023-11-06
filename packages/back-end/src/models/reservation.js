const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/hilton_restaurants', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const reservationSchema = new mongoose.Schema({
  guestName: {
    type: String,
    required: true
  },
  contactInfo: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  tableSize: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;