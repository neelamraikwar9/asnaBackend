const { initializeDB } = require('./db.connect');
const Task  = require('./models/task.model');
const Project = require('./models/project.model');
const Team = require('./models/team.model');
const User = require('./models/user.model');
const Tag = require('./models/tag.model');
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();


const SECRET_KEY = "supersecret";
const JWT_SECRET = 'your_jwt_secret'


app.use(express.json());

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization']

    if(!token){
        return response.status(401).json({message: "No token provided."});
    }

    try{
        // console.log(token);
        const decodeToken = jwt.verify(token, JWT_SECRET);
        req.user = decodeToken;
        next();
    } catch(error){
        res.status(402).json({message: "Invalid token."})
    }
}

app.post('/admin/login', (req, res) => {
    const {secret} = req.body;

    if(secret === SECRET_KEY){
        const token = jwt.sign({role: 'admin'}, JWT_SECRET, {expiresIn: "24h"});
        res.json({ token });
    } else{
        res.json({message: "Invalid email and password."});
    }
});



app.get('/admin/api/data', verifyJWT, (req, res) => {
    res.json({message: "Protected route accessible"});
});


app.listen()

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
//  name: 'Kindful',
//  description: 'Give information about products.'
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


// const newTask = new Task({
//  name: 'complete functions',
//  project: '6910980709509efc9985c69d', // Reference to a Project ID
//  team: '69108b3f7df55fbdbf89c2ef', // Reference to a Team ID
//  owners: ['69109a419204907e48c87f44'], // Array of User IDs(owners)
//  tags: ['Support', 'Urgent'],
//  timeToComplete: 2
// });
// newTask.save().then(task => console.log(task))
// .catch(err => console.log(err));


//query to get projects;

async function getAllProjects(){
    try{
        const allProj = await Project.find();
        console.log(allProj, "Getting all projects.")
        return allProj;
    }
    catch{
        throw error;
    }
}

// getAllProjects();

//api to get projects;
app.get("/projects", async (req, res) => {
    try{
        const projects = await getAllProjects();
        if(projects){
            res.json(projects);
        } else{
            res.status(404).json({error: "Projects not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Projects."})
    }
}
)


// const newProj = {
//     name : "Real-time Chat Application",
//     description: "A full-stack chat app enabling instant messaging between users with features like group chats, user presence, message history, and notifications. It demonstrates real-time communication using WebSockets or Socket.io with efficient backend data handling.",
//     technologies: "React, Node.js, Socket.io, MongoDB"
// }

//method to add new projects;
async function addNewProj(newProj){
    try{
    const projNew = new Project(newProj);
    const saveProj = await projNew.save();
    console.log(saveProj, "project added successfully.");
    return saveProj;
    } catch(error){
        throw error;
    }
}
// addNewProj();

// api to add new projects;

app.post("/projects", async(req, res) => {
    try{
    const newProj = req.body;
    const projects = await addNewProj(newProj);
    res.status(201).json({message: "Project added successfully.", projNew : projects })
    } catch(error){
        res.status(500).json({error: 'Failed to add Project.'})
    }
})


//query to get all tasks;

const getAllTasks = async() => {
    try{
        const tasks = await Task.find();
        console.log(tasks, "getting all tasks.")
        return tasks;
    } catch(error){
        throw error;
    }
}

// getAllTasks();

// api to get all tasks

app.get("/tasks", async(req, res) => {
    try{
    const allTasks = await getAllTasks();
    if(allTasks){
        res.json(allTasks);
    } else {
        res.status(404).json({error: "Tasks not found."})
    }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Tasks."})
    }
})


//method to add new Task;


// const newTask = new Task({
//  name: 'Add a new chatboat for customers help.',
//  project: '6910984357513e8067ff3cb7', // Reference to a Project ID
//  team: '69116d670fb56030f0a9ea99', // Reference to a Team ID
//  owners: ['69109a537ec2486c393ffacb'], // Array of User IDs(owners)
//  tags: ['Support', 'Urgent'],
//  timeToComplete: 5
// });


async function addNewTask(newTask){
    try{
        const Tasks = new Task(newTask);
        const saveTask = await Tasks.save();
        console.log(saveTask, "Task added successfully.")
    } catch(error){
        throw error;
    }
}

// addNewTask();

//api to add new task;

app.post("/tasks", async (req, res) => {
    try{
        const newTask = req.body;
        const newTasks = await addNewTask(newTask);
        res.status(201).json({message: " Task added successfully.", Tasks: newTasks})
        } 
    catch(error){
        res.status(500).json({error: 'Failed to add Task.'})
    }
})


//api to get tasks by status;

async function tasksByStatus(taskStatus){
    try{
        const InProgTask = await Task.findOne({status: taskStatus})
        console.log(InProgTask, "Got Task with the status In progress.");
        return InProgTask;
    } catch(error){
        throw error;
    }
}
// tasksByStatus("In Progress");

//api 
app.get("/tasks/status/:taskStatus", async (req, res) => {
    try{
        const taskStatus = await tasksByStatus(req.params.taskStatus);
        if(taskStatus){
            res.json(taskStatus);
        } else{
        res.status(404).json({ error: "Task not found." });
        }
    } catch(error){
    res.status(500).json({ error: "Failed to fetch Task by Status." });
    }
});


//api to get tasks by "project", "team", "owners"

async function getTasksByProjects(projId){
    try{
        const tasksByProjs = await Task.find({ project: projId }).populate("project");
        console.log(tasksByProjs, "Tasks by project id.")
        return tasksByProjs;
    } catch(error){
        throw error;
    }
}

// getTasksByProjects("69109157b9e38c37e4c55feb");



app.get("/tasks/byProjects/:projId", async (req, res) => {
    try{
        const getTaskByProj =  await getTasksByProjects(req.params.projId);
        if(getTaskByProj){
            res.json(getTaskByProj);
        } else{
            res.status(404).json({error: "Tasks by Projects id not found."})
        }
    } catch(error){
        res.status(500).json({error: 'failed to fetch Tasks by project id.'})
    }
})




// async function getTasksByTeams(teamId){
//     try{
//         const tasksByProjs = await Task.find({ team: teamId }).populate("project");
//         console.log(tasksByProjs, "Tasks by project id.")
//         return tasksByProjs;
//     } catch(error){
//         throw error;
//     }
// }

// getTasksByTeams("69109157b9e38c37e4c55feb")





// async function getTasksByOwners(ownerId){
//     try{
//         const tasksByProjs = await Task.find({ owners: ownerId }).populate("project");
//         console.log(tasksByProjs, "Tasks by project id.")
//         return tasksByProjs;
//     } catch(error){
//         throw error;
//     }
// }

// getTasksByOwners("69109157b9e38c37e4c55feb")







//api to delete a task;
// async function deleteTaskById(taskId){
//     try{
//     const task = await Task.findByIdAndDelete(taskId);
//     console.log(task, "Task deleted successfully.")
//     } catch(error){
//         throw error;
//     }
// } 

// deleteTaskById("");





















const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})


