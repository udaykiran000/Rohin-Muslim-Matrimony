const mongoose = require('mongoose');
const User = require('./models/User');
const Profile = require('./models/Profile');
require('dotenv').config();

async function run() {
  try {
    const connString = process.env.MONGO_URI || 'mongodb://localhost:27017/muslim-matrimony';
    console.log('Connecting to:', connString);
    await mongoose.connect(connString);
    const adminUser = await User.findOne({ role: 'admin' });
    console.log('Admin User:', adminUser);
    if (adminUser) {
      let adminProfile = await Profile.findOne({ user: adminUser._id });
      console.log('Existing Admin Profile:', adminProfile);
      
      if (!adminProfile) {
        console.log('Creating Admin Profile...');
        try {
          adminProfile = await Profile.create({
            user: adminUser._id,
            name: 'Administrator',
            gender: 'male',
            age: 35,
            city: 'Admin City'
          });
          console.log('Successfully created Admin Profile:', adminProfile);
        } catch (createErr) {
          console.error('Failed to create Admin Profile:', createErr);
        }
      }
    } else {
      console.log('No Admin User found in DB!');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
