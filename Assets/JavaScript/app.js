// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
$(document).ready(function() {

var config = {
    apiKey: "AIzaSyAOy7htkvkOjHiOF52Pys9-gUaJr9clt-s",
    authDomain: "train-f78f9.firebaseapp.com",
    databaseURL: "https://train-f78f9.firebaseio.com",
    projectId: "train-f78f9",
    storageBucket: "train-f78f9.appspot.com",
    messagingSenderId: "34075437669"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var empName = $("#train-name-input").val().trim();
    var empDestination = $("#destination-input").val().trim();
    var empTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
    var empFrequency = $("#frequency-input").val().trim();

    console.log (empName);
    console.log (empDestination);
    console.log (empTime);
    console.log (empFrequency);
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: empName,
      destination: empDestination,
      time: empTime,
      frequency: empFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
  
    alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empDestination = childSnapshot.val().destination;
    var empTime = childSnapshot.val().time;
    var empFrequency = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(empName);
    console.log(empDestination);
    console.log(empTime);
    console.log(empFrequency);
  
    // Prettify the employee start
    var empTimePretty = moment.unix(empTime).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empTime, "X"), "months"); // < --- Fix
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empFrequency; // < --- Fix
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empName),
      $("<td>").text(empDestination),
      $("<td>").text(empTimePretty),
      $("<td>").text(empMonths), // < --- Fix
      $("<td>").text(empFrequency),
      $("<td>").text(empBilled) // < --- Fix
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
});
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case