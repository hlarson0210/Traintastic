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
    var tTime = moment($("#train-time").val().trim(), "HHmm").format("HHmm");
    var tFrequency = $("#frequency").val().trim();

    moment().format('LT');

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

    var empTimePretty = moment.unix(tTime).format("HH:mm");

    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tDestination),
        $("<td>").text(tFrequency),
        $("<td>").text(empTimePretty),
    );

    $("#employee-table > tbody").append(newRow);
})