const mongoose = require('mongoose');
// Team Schema
const teamSchema = new mongoose.Schema({
 name: { type: String, required: true, unique: true }, // Team names must be unique
 
 member: [
  { type: mongoose.Schema.Types.ObjectId, ref: 'User', 
  required: true } // Refers to User model (owners)
  ],

 description: { type: String }, // Optional description forthe team

 member1 : { type: String }, //Optional
 member2 : { type: String }, //Optional
 member3 : { type: String } //Optional

 
});
module.exports = mongoose.model('Team', teamSchema);