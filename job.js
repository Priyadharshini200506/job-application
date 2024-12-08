const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: {
    type: String,
    enum: ['Applied', 'Interviewing', 'Rejected', 'Offered'],
    default: 'Applied',
  },
  interviewDate: { type: Date, default: null },
  notes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
