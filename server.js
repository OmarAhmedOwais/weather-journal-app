projectData = {}

// Port
const port = 4000;

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, () => {
  console.log(`server run on port ${port}`);
})

// Initialize all route with a callback function
app.get('/all', getAll);
app.post('/addItem', postAll);

// Callback function to complete GET '/all'
function getAll(req, res) {
  res.send(projectData);
}

// Post Route
function postAll(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}