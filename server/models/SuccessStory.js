const mongoose = require('mongoose');

const SuccessStorySchema = new mongoose.Schema(
  {
    partnerOne: {
      type: String,
      required: [true, 'Please provide the name of Partner 1'],
      trim: true,
    },
    partnerTwo: {
      type: String,
      required: [true, 'Please provide the name of Partner 2'],
      trim: true,
    },
    story: {
      type: String,
      required: [true, 'Please provide the success story description'],
    },
    location: {
      type: String,
      required: [true, 'Please provide the location (e.g., Connected in Hyderabad)'],
      trim: true,
    },
    marriageDate: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SuccessStory', SuccessStorySchema);
