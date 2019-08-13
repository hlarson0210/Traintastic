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
    var tTime = moment($("#train-time").val().trim(), "HH:MM").format("HH:MM");
    var tFrequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newEmp = {
        name: tName,
        destination: tDestination,
        time: tTime,
        frequency: tFrequency
    };

    database.ref().push(newEmp);

    console.log(newEmp.name);
    console.log(newEmp.destination);
    console.log(newEmp.time);
    console.log(newEmp.frequency);

    alert("Train schedule successfully added");

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});