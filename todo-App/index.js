// require express for setting up the express server
const express = require("express");
// set up the port number
const port = 7000;

// importing the DataBase
const db = require("./config/mongoose");

// importng the Schema For tasks
const Task = require("./models/task");

// using express
const app = express();

// using static files
app.use(express.static("./views"));
// to use encrypted data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// rendering the App Page
app.get("/views", (req, res)=> {
  Task.find((err, task)=> {
    if (err) {
      console.log("Error in fetching tasks from db");
      return;
    }

    return res.render("home", {
      title: "TODO App",
      task: task,
    });
  });
});

// creating Tasks
app.post("/create-task", (req, res)=> {
  Task.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    (err, newtask)=> {
      if (err) {
        console.log("error in creating task", err);
        return;
      }

      //console.log(newtask);
      return res.redirect("back");
    }
  );
});

// deleting Tasks
app.get("/delete-task", (req, res)=> {
  // get the id from query
  var id = req.query;

  // checking the number of tasks selected to delete
  const num = Object.keys(id).length;
  for (let i = 0; i < num; i++) {
    // finding and deleting tasks from the DB one by one using id
    Task.findByIdAndDelete(Object.keys(id)[i], (err)=> {
      if (err) {
        console.log("error in deleting task");
      }
    });
  }
  return res.redirect("back");
});

// To listen on asigned port number
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }

  console.log(`Server is running on port : ${port}`);
});
