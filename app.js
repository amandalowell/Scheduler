 // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyB055Th0PsU5RJO5K9iGE5DNgxSz_lHMZo",
    authDomain: "scheduler-271a0.firebaseapp.com",
    databaseURL: "https://scheduler-271a0.firebaseio.com",
    projectId: "scheduler-271a0",
    storageBucket: "scheduler-271a0.appspot.com",
    messagingSenderId: "187606175557",
    appId: "1:187606175557:web:d02c5f818d9da80a"
  };
  // call the initiation
  firebase.initializeApp(firebaseConfig);


console.log(firebase); //

//var database = firebase.database(); 

// function to calculate train time 

// var mockTrains = [
 //{
 //   name: "red",
   // destination: "Dallas",
    //firstTrainTime: 18*60*60*1000, //format for miliseconds, 1800
    //frequency: 5*60*1000 //5 min

  //}
//]

// we have ^ trains with their start time
// we know start time and we know current time and frequency
//we need next arrival time
//need to push data to data base (using database variable)
//^^ in order to push this data, i need to get this data from the webpage (JQ)
//make click functions, make forms, on submit. event.preventDefault 
//JQ to listen for on sumbit for Train Form. 
//once that even fires, its going to pass event to function and event will have properties for input values
//this is how I will get the values to put them onto data base. 
//instead of hard code like example, use input values instead. 
//once we push to data base, we can get it back from data base, and then add it to screen.
//^^ use append.
// put empty div with class name, to placehold
//could add form to HTML
//train schedule div ( empty div)
// jumbotron bootstrap


//function countTrainTime(train){
 // var currentTime = new Date().getTime(); 
//  console.log(currentTime, train.firstTrainTime);
//}

//countTrainTime(mockTrains[0]);



var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;



$("#addTrain").on("click", function() {

  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

  
});


// MAIN PROCESS + INITIAL CODE
database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  
  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;


  
  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment(); 

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");


  
  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);


  

});

