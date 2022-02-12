var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

// Display current date
$("#currentDay").text(currentDate);

// Update current date every second
setInterval(function () {
    currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(currentDate);
}, 1000);
