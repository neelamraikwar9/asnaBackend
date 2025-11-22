const mongoose = require("mongoose");
// Team Schema
const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Team names must be unique

  //  member: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'User',
  //   required: true } // Refers to User model (owners)
  //   ],

  member1: { type: String, required: true, unique: true }, //Optional
  member2: { type: String, required: true, unique: true }, //Optional
  member3: { type: String, required: true, unique: true }, //Optional

  description: { type: String }, // Optional description forthe team
});
module.exports = mongoose.model("Team", teamSchema);
