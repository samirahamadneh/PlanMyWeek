// Import express.js
const express = require("express");
const bodyParser = require('body-parser');
const mysql = require('mysql');

/* var appp = (function () {
  var WebsiteName = "PlanMyWeek";
  return {
    getWebsiteName: function() {
      return WebsiteName;
    }
  }
}) (); */

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));
const bodyParser = require('body-parser');

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretplanmyweek',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


app.set('view engine', 'html');
app.set('views', './app/views');

const db = require('./services/db');

// Models- user
const { login } = require("./login");

// Parse request body
app.use(bodyParser.urlencoded({ extended: true }));

// Create a route for root 
// app.get("/", function(req, res) {    sql = 'select post_id, title, LEFT(content, 60) AS content from blog_posts ORDER BY post_id DESC LIMIT 3';
//    db.query(sql).then(results => {
//        res.render("index", {results:results})
//    })
//    });

// Route for about page 
app.get("/views/about-us", (req, res) => {
    res.render('about-us');
});

// Route for contact page 
app.get("/contact-us", (req, res) => {
    res.render('contact-us');
});

app.get('/api/workSchedule', (req, res) => {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const query = `SELECT * FROM workSchedule WHERE date BETWEEN ? AND ? ORDER BY date, startTime`;
  connection.query(query, [today, nextWeek], (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

const calendarBox = document.getElementById('calendar-box');

/* fetch('/PlanMyWeek/weekSchedule')
    .then(response => response.json())
    .then(data => {
        const today = new Date();

        // Loop through 7 days
        for (let i = 0; i < 7; i++) {
            const dayElement = document.getElementById(`day-${i + 1}`);
            const currentDay = new Date(today);
            currentDay.setDate(today.getDate() + i);

            dayElement.innerHTML = `<h4>${currentDay.toDateString()}</h4>`;

            // Filter and append the schedules for the current day
            const daySchedules = data.filter(schedule => {
                return new Date(schedule.date).toDateString() === currentDay.toDateString();
            });

            daySchedules.forEach(schedule => {
                const scheduleElement = document.createElement('div');
                scheduleElement.className = 'schedule-item';
                scheduleElement.innerText = `${schedule.startTime} - ${schedule.endTime}: ${schedule.ScheduleName}`;
                dayElement.appendChild(scheduleElement);
            });
            // Add goals for the day
            data.goals.forEach(goal => {
              if (goal.frequency === 'daily' || (goal.frequency === 'weekly' && i < 5)) {
                  const goalElement = document.createElement('div');
                  goalElement.className = 'schedule-item';
                  goalElement.innerText = `Goal: ${goal.title} (${goal.duration})`;
                  dayElement.appendChild(goalElement);
              }
          });

          // Add tasks with specific due dates
            const dayTasks = data.tasks.filter(task => {
              return new Date(task.due_date).toDateString() === currentDay.toDateString();
            });

            dayTasks.forEach(task => {
              const taskElement = document.createElement('div');
              taskElement.className = 'schedule-item';
              taskElement.innerText = `Task: ${task.title} (Progress: ${task.progress})`;
              dayElement.appendChild(taskElement);
            });
      
        }
    });

    app.get('/api/PlanMyWeek/goals', (req, res) => {
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
  
      // Fetch goals for the week
      const goalsQuery = `
          SELECT * FROM goals
          WHERE (frequency <= ? AND duration >= ?)
      `;
      
      // Fetch tasks for the week
      const tasksQuery = `
          SELECT * FROM tasks
          WHERE deadline BETWEEN ? AND ?
      `;
      
      connection.query(goalsQuery, [nextWeek, today], (err, goals) => {
          if (err) throw err;
          
          connection.query(tasksQuery, [today, nextWeek], (err, tasks) => {
              if (err) throw err;
              
              res.json({ goals, tasks });
          });
      });
  });

  fetch('/api/week-goals-tasks')
    .then(response => response.json())
    .then(data => {
        const goalsList = document.getElementById('goals-list');
        const tasksList = document.getElementById('tasks-list');

        // Display goals
        data.goals.forEach(goal => {
            const goalElement = document.createElement('li');
            goalElement.className = 'goal-item';
            goalElement.innerText = `${goal.title} - ${goal.description} (${goal.frequency}, ${goal.duration})`;
            goalsList.appendChild(goalElement);
        });

        // Display tasks
        data.tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.className = 'task-item';
            taskElement.innerText = `${task.title} - ${task.description} (Due: ${task.due_date}, Progress: ${task.progress})`;
            tasksList.appendChild(taskElement);
        });
    });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'PlanMyWeek'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

// Route to handle work schedule form submission
app.post('/add-workSchedule', (req, res) => {
    const { date, DayOfWeek, startTime, endTime } = req.body;
    const sql = 'INSERT INTO workSchedule (date, DayOfWeek, startTime, endTime) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [date, DayOfWeek, startTime, endTime], (err, result) => {
        if (err) throw err;
        res.send('Work schedule added successfully!');
    });
});

// Route to handle goal form submission
app.post('/add-goal', (req, res) => {
    const { goalName, description, frequency, duration } = req.body;
    const sql = 'INSERT INTO goals (goalName, description, frequency, duration) VALUES (?, ?, ?, ?)';
    
    db.query(sql, [goalName, description, frequency, duration], (err, result) => {
        if (err) throw err;
        res.send('Goal added successfully!');
    });
});

// Route to handle task form submission
app.post('/add-task', (req, res) => {
    const { taskName, description, deadline } = req.body;
    const sql = 'INSERT INTO tasks (taskName, description, deadline) VALUES (?, ?, ?)';
    
    db.query(sql, [taskName, description, deadline], (err, result) => {
        if (err) throw err;
        res.send('Task added successfully!');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); */