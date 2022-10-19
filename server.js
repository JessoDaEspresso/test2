//Jesse Pirrotta
//Student Number: 169115219
//BTI325 - Test 2
//Date: 2022-10-19

//Cyclic URL: https://zany-gray-peacock-cuff.cyclic.app/

//Constants
const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080; //Means to use the environment port, if its not set, use 8080
const moduleB = require("./test2_moduleB.js");
//OnStart
function onHTTPStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

//CSS Files
app.use(express.static("public"));

// ---- Routes ----//

//Home Route
app.get("/", (req, res) => {
  console.log("Home Page: " + req.url);
  //display text in html format
  res.send(
    "<h2>Declaration</h2>" +
      "<p>I acknowledge the College's academic integrity policy — and my own " +
      "integrity—remain in effect whether my work is done remotely or onsite." +
      " Any test or assignment is an act of trust between me and my instructor, and especially with my classmates..." +
      " even when no one is watching. I declare I will not break that trust.</p>" +
      'Name: <p style="display:inline"><mark>Jesse Pirrotta</mark></p>' +
      "<br>" +
      "<br>" +
      'Student Number: <p style="display:inline"><mark>169115219</mark></p>' +
      "<br>" +
      "<br>" +
      '<a href="/CPA">Click to visit CPA Students</a>' +
      "<br>" +
      '<a href="/highGPA">Click to see who has the highest GPA</a>'
  );
});

//CPA
app.get("/CPA", (req, res) => {
  console.log("CPA: " + req.url);
  moduleB
    .getCPA()
    .then((data) => res.json(data))
    .catch((err) => res.json({ message: err }));
});

//High GPA
app.get("/highGPA", (req, res) => {
  console.log("GPA: " + req.url);
  moduleB
    .highGPA()
    .then((data) =>
      res.send(
        "<h2>Highest GPA</h2>" +
          "<p>Student ID: " +
          data.studId +
          "<br>" +
          "<br>" +
          "Name: " +
          data.name +
          "<br>" +
          "<br>" +
          "Program: " +
          data.program +
          "<br>" +
          "<br>" +
          "GPA: " +
          data.gpa +
          "</p>"
      )
    );
});

//404 Error Route
app.use((req, res) => {
  console.log("404 Error:" + req.url);
  res.status(404).send("Error 404: Page Not Found");
});

// ---- End of Routes ----//

//Start Server
moduleB
  .prepare()
  .then(app.listen(HTTP_PORT, onHTTPStart()))
  .catch((err) => {
    console.log("Error" + err);
  });
