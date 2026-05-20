const mongoose = require('mongoose');

const FeatureSchema = new mongoose.Schema({
  viewFullBio: { type: Boolean, default: false },
  viewContactDetails: { type: Boolean, default: false },
  chat: { type: Boolean, default: false },
  shortlist: { type: Boolean, default: false },
  dailyViewLimit: { type: Number, default: 5 }
});

const SettingsSchema = new mongoose.Schema(
  {
    premiumPrice: {
      type: Number,
      default: 999,
    },
    elitePrice: {
      type: Number,
      default: 1999,
    },
    paymentGatewayMode: {
      type: String,
      enum: ['mock', 'live'],
      default: 'mock',
    },
    freePlanFeatures: {
      type: FeatureSchema,
      default: () => ({
        viewFullBio: false,
        viewContactDetails: false,
        chat: false,
        shortlist: false,
        dailyViewLimit: 5
      })
    },
    premiumPlanFeatures: {
      type: FeatureSchema,
      default: () => ({
        viewFullBio: true,
        viewContactDetails: true,
        chat: true,
        shortlist: true,
        dailyViewLimit: 30
      })
    },
    elitePlanFeatures: {
      type: FeatureSchema,
      default: () => ({
        viewFullBio: true,
        viewContactDetails: true,
        chat: true,
        shortlist: true,
        dailyViewLimit: 99999
      })
    }
  },
  { timestamps: true }
);

// We only ever need ONE settings document
module.exports = mongoose.model('Settings', SettingsSchema);
