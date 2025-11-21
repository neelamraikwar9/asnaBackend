const { initializeDB } = require('./db.connect');
const Task  = require('./models/task.model');
const Project = require('./models/project.model');
const Team = require('./models/team.model');
const User = require('./models/user.model');
const Tag = require('./models/tag.model');
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");


app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const users = [
    {email: 'test@example.com', password: bcrypt.hashSync('password123', 8)}
    // {email: '', password: bcrypt.hashSync('', 8)}

];

const JWT_SECRET = 'your_jwt_secret';

// It is a middleware of json web token..
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

app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if(!user || !bcrypt.compareSync(password, user.password)){
        return res.status(401).json({ error: 'Invalid credentials'})
    } 
    const token = jwt.sign({ email }, JWT_SECRET, {expiresIn: "1h"});
    res.json({ token });
    
});


app.get('/user/private/dashboard', verifyJWT, (req, res) => {
    res.json({message: "Protected route accessible"})
})


// Protected Route
// app.get('/user/api/private/dashboard', (req, res) => {
//     const auth = req.headers['authorization'];
//     console.log(auth, "checking auth")
//     if(!auth){
//         return res.status(401).json({error: 'No token provided'});
//     }

//     if (!auth.startsWith('Bearer ')) {
//   return res.status(401).json({ error: 'Invalid authorization format' });
//   // Proceed with JWT verification...
// }
// const token = auth.slice(7).trim(); // remove 'Bearer ' and any extra spaces

// try {
// const decodeToken = jwt.verify(token, JWT_SECRET);
// res.json({ msg: 'Protected Data', user: decodeToken.email });
// } catch (err) {
// res.status(401).json({ message: 'Invalid token' });
// }
// });




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


// const user4 = {
//     name: "Sohan",
//     email: "sohan2025@gmail.com"
// }



// const addUsers = async (user4) => {
//     try{
//         const newUser = new User(user4);
//         const saveNewUser =  await newUser.save();
//         console.log(saveNewUser, "New User added successfully.")
//     } catch(error){
//         throw error;
//     }
// }

// addUsers(user4);




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

//api to get all projects;
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

//api to get projects by status;

async function getProjectsBystatus(projStatus){
    try{
        const projectStatus = await Project.find({status: projStatus});
        console.log(projectStatus, 'projectStatus');
        return projectStatus;
    } catch(error){
        throw error; 
    }
}
// getProjectsBystatus("Completed");


//api
app.get("/projects/status/:projStatus", async (req, res) => {
    try{
        const projByStatus = await getProjectsBystatus(req.params.projStatus);
        console.log(projByStatus);
        if(projByStatus){
            res.json(projByStatus);
        } else{
            res.status(404).json({error: "Projects by status not found."});
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Projects by status."});
    }
})


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
        const tasks = await Task.find().populate(["project", "team", "owners"]);
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


// get task by id; 
async function taskById(taskId){
    try{
        const tasks = await Task.findById(taskId).populate(["project", "team", "owners"]);
        console.log(tasks);
        return tasks; 
    } catch(error){
        throw error; 
    }
}

// taskById("6910a1352d61b81fb8aa2d3f");

app.get("/tasks/taskById/:taskId", async(req, res) => {
    try{
        const getTask = await taskById(req.params.taskId);
        console.log(getTask);
        if(getTask){
            res.json(getTask);
        } else{
            res.status(404).json({error: "Failed to get Task by Id."})
        }
    } catch(error){
        res.status(500).json({error: "Cannot fetch Task by Id."})
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


// api to get tasks by "project", "team", "owners"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

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


// api to get tasks by status;
async function getTaskByStatus(taskStatus){
    try{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        const getTasks = await Task.find({status: taskStatus}).populate(["project", "team", "owners"]);
        console.log(getTasks, 'Tasks by status');                                                                                                                                                                                                                                                                                                                          
        return getTasks; 
    } catch(error){
        throw error; 
    }
}

// getTaskByStatus("In Progress");

app.get("/tasks/byStatus/:taskStatus", async(req, res) => {
    try{
        const taskByStatus = await getTaskByStatus(req.params.taskStatus);
        console.log(taskByStatus);
        if(taskByStatus){
            res.json(taskByStatus)
        } else{
            res.status(404).json({error: "Task by status is not found."})
        } 
    } catch(error){
        res.status(500).json({error: "Failed to fetch Task by Status."})
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

// const newTeam = new Team ({
//     name: "Generous",
//     member: ["691711c36ce1842ec65b2cbb", "691712291e988e4d3d2c0cda", "69171244ea34ccad2a58ad82"],
//     description: "Provide honest help to customers.",
//     // member1: "",
//     // member2:"",
//     // member3: ""
// });


// const newTeam = new Team ({
//     name: "Testing Team ",
//     member1: "user 1",
//     member2:"user 2",
//     member3: "user 3",
//     description: "Provide honest help to customers by testing products.",
// });


//api to add new team; 
async function addNewTeam(newTeam){
    try{
        const teamNew = new Team(newTeam);
        const saveTeam = await teamNew.save();
        console.log(saveTeam, "team added.")
        return saveTeam;

    } catch(error){
        throw error;
    }
}

// addNewTeam(newTeam);


app.post("/teams", async(req, res) => {
    try{
        const newTeam = req.body;
        const teams = await addNewTeam(newTeam);
        console.log(teams, "teams");
        if(teams){
        res.status(201).json({message: " Team added successfully.", teamNew: teams})
        }
    }  catch(error){
        res.status(500).json({error: 'Failed to add Team.'});
    }
})


async function totalCompleteTask(){
    try{
        const totalTask = await Task.countDocuments({status: "Completed"});
        console.log(totalTask, "totalCompletedTasks");
        return totalTask; 
    } catch(error){
        console.log(error, "error");
    }
};
// totalCompleteTask();


app.get("/tasks/report/completedTasks", async(req, res) => {
    try{
        const compTasks = await totalCompleteTask();
        console.log(compTasks, "completed Tasks");
        if(compTasks){
            res.status(200).json({totalCompletedTasks : compTasks})
        } else{
        res
        .status(404)
        .json({ error: "Total Completed Tasks is not found." });
        }
    } catch (error) {
    res.status(500).json({ error: "Cannot fetch total Completed Tasks." });
  }
});













//api to get teams; 
async function getAllTeams(){
    try{
        const getTeams = await Team.find()
        console.log(getTeams, "gettin all teams.");
        // console.log(JSON.stringify(getTeams, null, 2));
        return getTeams;
    } catch(error){
        throw error; 
    }
}

// getAllTeams();


// api

app.get("/teams", async (req, res) => {
    try{
        const allTeams = await getAllTeams();
        console.log(allTeams, "chekin all teams.");
        if(allTeams){
            res.json(allTeams);
        } else{
            res.status(404).json({error: "Teams not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch teams."})
    }
})



//api to get all users/members/owners;

async function getAllUsers(){
    try{
    const allUsers =  await User.find();
    console.log(allUsers, "getting all users.");
    return allUsers;
    } catch(error){
        throw error;
    }
}
// getAllUsers();

//api;
app.get("/users", async (req, res) => {
    try{
        const users = await getAllUsers();
        if(users){
            res.json(users);
        } else{
            res.status(404).json({error: "Users not found."})
        }
    } catch(error){
        res.status(500).json({error: "Cannot fetch Users."})
    }
});



// api to add users team members.

// const newUser = {
//     name: "Mac",
//     email: "Don"
// }

const addNewUser = async (newUser) => {
    try{
        const newUsers =  new User(newUser);
        const saveNew = await newUsers.save();
        console.log(saveNew, "new user added successfully.");
        return saveNew;
    } catch(error){
        throw error;
    }
}


// addNewUser(newUser);

app.post("/users", async(req, res) => {
    try{
    const newUser = req.body;
    const users = await addNewUser(newUser);
    res.status(201).json({message: " Users added successfully.", newUsers: users})
    } catch(error){
        res.status(500).json({error: 'Failed to add Users.'})
    }
})


//api to add tags and add tags in MonogDB.

// let newTag = {
//     name: "Support"
// }

let newTag = {
    name: "Urgent"
}

// query/ method to add tags;

async function addTags(newTag){
    try{
    const tags =  new Tag(newTag);
    const saveTags = await tags.save();
    console.log(saveTags, "Tag added successfully.");
    return saveTags;
    } catch(error){
        throw error; 
    }
}

// addTags(newTag);

// api to add new tag; 

app.post("/tags", async (req, res) => {
    try{
        const newTag = req.body;
        const saveTag = await addTags(newTag);
        console.log(saveTag);
        if(saveTag){
            res.status(201).json({message: "Tag added successfully.", tags: saveTag})
        }
    } catch(error){
        res.status(500).json({error: "Failed to add tag."});
    }
})











const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})


