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


// New Team
// const newTeam = new Team({
//  name: 'Support',
//  description: 'Handles customer support issues'
// });

// const newTeam = new Team({
//  name: 'Generous',
//  description: 'Provide honest help to customers.'
// });
// newTeam.save().then(team => console.log(team))
// .catch(err => console.log(err));


// New Project

// const proj1 = {
//     name : "E-commerce Website with AI-driven Recommendations",
//     description: "A full-stack platform that allows users to browse products, add items to a shopping cart, and complete purchases online. It integrates AI recommendation algorithms to personalize product suggestions according to browsing history, purchase patterns, and customer demographics, thereby enhancing user experience and boosting sales.",
//     technologies: "React.js for frontend, Node.js/Express for backend, MongoDB for database, AI/ML for recommendations."
// }

// const proj2 = {
//     name : "AI Chatbot for Customer Service",
//     description: "A conversational AI chatbot designed to assist customers by answering common queries, guiding through products/services, and handling support tickets. It uses natural language processing (NLP) to understand and respond effectively, reducing the need for human intervention in support tasks.",
//     technologies: "Python, TensorFlow or SpaCy for NLP, Flask/Django for API, React for UI integration."
// }

// const proj3 = {
//     name : "Smart Home Automation System",
//     description: "A software solution to control and automate home appliances (lights, thermostat, security cameras) remotely via mobile or web app. It leverages IoT sensors and devices for real-time monitoring and smart decision-making, improving convenience, energy efficiency, and security.",
//     technologies: "Arduino/Raspberry Pi for hardware integration, MQTT for messaging, Node.js backend, React Native or Flutter for mobile app."
// }

// async function addProjects(){
//     try{
//         const newProj = new Project();
//         const saveProj = await newProj.save();
//         console.log(saveProj, "Project added successfully.")
//     } catch(error){
//         throw error;
//     }
// }
// addProjects();

// New User

// const user1 = {
//     name: "Jack Doe",
//     email: "jackDoe2025@gmail.com"
// }

// const user2 = {
//     name: "Dale Carnegi",
//     email: "daleCarnegi2025@gmail.com"
// }

// const addUsers = async () => {
//     try{
//         const newUser = new User();
//         const saveNewUser =  await newUser.save();
//         console.log(saveNewUser, "New User added successfully.")
//     } catch(error){
//         throw error;
//     }
// }

// addUsers()




// New Task:

// const newTask = new Task({
//  name: 'Resolve support tickets',
//  project: '69109157b9e38c37e4c55feb', // Reference to a Project ID
//  team: '691084f86fb1c428ed1858ca', // Reference to a Team ID
//  owners: ['6873c7156fbc27488ab86db1'], // Array of User IDs(owners)
//  tags: ['Support', 'Urgent'],
//  timeToComplete: 2
// });
// newTask.save().then(task => console.log(task))
// .catch(err => console.log(err));


const newTask = new Task({
 name: 'complete functions',
 project: '6910980709509efc9985c69d', // Reference to a Project ID
 team: '69108b3f7df55fbdbf89c2ef', // Reference to a Team ID
 owners: ['69109a419204907e48c87f44'], // Array of User IDs(owners)
 tags: ['Support', 'Urgent'],
 timeToComplete: 2
});
newTask.save().then(task => console.log(task))
.catch(err => console.log(err));


