const { initializeDB } = require('./db.connect');
const Task  = require('./models/task.model');
const Project = require('./models/project.model');
const Team = require('./models/team.model');
const User = require('./models/user.model');
const Tag = require('./models/tag.model');
const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

const corsOptions = {
  origin: "*",
  Credential: true,
};

initializeDB();

// const newTeam = new Team({
//  name: 'Support',
//  description: 'Handles customer support issues'
// });
// newTeam.save().then(team => console.log(team))
// .catch(err => console.log(err));



