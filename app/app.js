// Import express.js
const express = require("express");

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



