var config = {
    apiKey: "AIzaSyAcYtrcdN0K6szg04TQpPFP-XiVd0izCME",
    authDomain: "train-scheduler-a05c4.firebaseapp.com",
    databaseURL: "https://train-scheduler-a05c4.firebaseio.com",
    projectId: "train-scheduler-a05c4",
    storageBucket: "",
    messagingSenderId: "54361661007",
    appId: "1:54361661007:web:227be2637419c583"
  };

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var tName = $("#train-name").val().trim();
    var tDestination = $("#destination").val().trim();
    var tTime = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm");
    var tFrequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: tName,
        destination: tDestination,
        time: tTime,
        frequency: tFrequency
    };

    // pushes newTrain object to database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train schedule successfully added");

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot);

    var tName = childSnapshot.val().name;
    var tDestination = childSnapshot.val().destination;
    var tTime = childSnapshot.val().time;
    var tFrequency = childSnapshot.val().frequency;

    console.log(tName);
    console.log(tDestination);
    console.log(tTime);
    console.log(tFrequency);

    // need to create the time calculation for this

    var firstTime = tTime;
    console.log(firstTime);
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var currentTime = moment();
    console.log("Current time: " + currentTime);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("Difference in time: " + diffTime);
    var tRemainder = diffTime % tFrequency;
    console.log("REMAINDER: " + tRemainder);
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("Minutes til Train: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "hh:mm");
    console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));


    var empTimePretty = moment.unix(nextTrain).format("hh:mm A");
    console.log("HEY: " + empTimePretty);

    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),
    );

    $("#employee-table > tbody").append(newRow);
})