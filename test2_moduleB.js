let students = [];
var fs = require("fs");

exports.prepare = function () {
  return new Promise(function (resolve, reject) {
    fs.readFile("./students.json", function (err, data) {
      if (err) {
        reject("unable to read file");
      } else {
        students = JSON.parse(data);
        resolve();
      }
    });
  });
};

exports.getCPA = function () {
  return new Promise(function (resolve, reject) {
    var cpaStudents = [];
    for (let i = 0; i < students.length; i++) {
      if (students[i].program == "CPA") {
        cpaStudents.push(students[i]);
      }
    }
    if (cpaStudents.length > 0) {
      resolve(cpaStudents);
    } else {
      reject("Failed to find any CPA students");
    }
  });
};

exports.highGPA = function () {
  return new Promise(function (resolve, reject) {
    var highestGPA = students[0].gpa;
    var saveIndex = 0;
    for (let i = 0; i < students.length; i++) {
      if (students[i].gpa > highestGPA) {
        highestGPA = students[i].gpa;
        saveIndex = i;
      }
    }
    if (saveIndex !== "undefined") {
      resolve(students[saveIndex]);
    } else {
      reject("Failed to find the student with the highest GPA");
    }
  });
};
