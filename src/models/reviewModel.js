const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, 
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: false }, 
    rating: { type: Number, required: true, min: 1, max: 5 }, 
    comment: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
