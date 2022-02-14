var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
var currentHour = moment();
var timeblock = document.querySelector(".timeblock");
var timeblockContainer = document.querySelector(".timeblock-container");
var events = {};

// Define auditEvent function
var auditEvent = function(eventEl) {
    var hourString = $(eventEl).find("span").text().trim();
    // Change to 24hr Time (I know, this is inefficient)
    if (hourString === "1:00") {
        hourString = "13:00"
    } else if (hourString === "2:00") {
        hourString = "14:00"
    } else if (hourString === "3:00") {
        hourString = "15:00"
    } else if (hourString === "4:00") {
        hourString = "16:00"
    } else if (hourString === "5:00") {
        hourString = "17:00"
    }
    
    var momentObj = moment(hourString, "HH:mm");

    $(eventEl).removeClass("past present future");

    if (moment(currentHour, "hour").isSame(momentObj)) {
        $(eventEl).addClass("present");
    } else if (moment(currentHour, "hour").isAfter(momentObj)) {
        $(eventEl).addClass("past");
    } else if (moment(currentHour, "hour").isBefore(momentObj)) {
        $(eventEl).addClass("future");
    }
}

// Load and Save functions

// Get events
var getEvent9 = function() {
    return localStorage.getItem("9");
};

var getEvent10 = function() {
    return localStorage.getItem("10");
};

var getEvent11 = function() {
    return localStorage.getItem("11");
};

var getEvent12 = function() {
    return localStorage.getItem("12");
};

var getEvent13 = function() {
    return localStorage.getItem("13");
};

var getEvent14 = function() {
    return localStorage.getItem("14");
};

var getEvent15 = function() {
    return localStorage.getItem("15");
};

var getEvent16 = function() {
    return localStorage.getItem("16");
};

var getEvent17 = function() {
    return localStorage.getItem("17");
};

// Load Events
var loadEvents = function() {
    var event9 = getEvent9();
    var event10 = getEvent10();
    var event11 = getEvent11();
    var event12 = getEvent12();
    var event13 = getEvent13();
    var event14 = getEvent14();
    var event15 = getEvent15();
    var event16 = getEvent16();
    var event17 = getEvent17();

    $("#event-description9").text(event9);
    $("#event-discription10").text(event10);
    $("#event-discription11").text(event11);
    $("#event-discription12").text(event12);
    $("#event-discription13").text(event13);
    $("#event-discription14").text(event14);
    $("#event-discription15").text(event15);
    $("#event-discription16").text(event16);
    $("#event-discription17").text(event17);
}

// Save events
var saveEvents = function() {
    var thisEvent9 = $("#event-description9").text();
    var thisEvent10 = $("#event-description10").text();
    var thisEvent11 = $("#event-description11").text();
    var thisEvent12 = $("#event-description12").text();
    var thisEvent13 = $("#event-description13").text();
    var thisEvent14 = $("#event-description14").text();
    var thisEvent15 = $("#event-description15").text();
    var thisEvent16 = $("#event-description16").text();
    var thisEvent17 = $("#event-description17").text();

    localStorage.setItem("9", thisEvent9);
    localStorage.setItem("10", thisEvent10);
    localStorage.setItem("11", thisEvent11);
    localStorage.setItem("12", thisEvent12);
    localStorage.setItem("13", thisEvent13);
    localStorage.setItem("14", thisEvent14);
    localStorage.setItem("15", thisEvent15);
    localStorage.setItem("16", thisEvent16);
    localStorage.setItem("17", thisEvent17);
};

// Display current date
$("#currentDay").text(currentDate);

// Update current date every second
setInterval(function () {
    currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(currentDate);
}, 1000);

// Edit event on click
$(".timeblock").on("click", "p", function() {
    var text = $(this).text().trim();

    var textInput = $("<textarea>").val(text);

    $(this).replaceWith(textInput);
    textInput.trigger("focus");
});

$(".timeblock").on("blur", "textarea", function() {
    var text = $(this).val().trim();
    var eventHour = $(this).closest(".timeblockContainer").attr("id");

    events[eventHour].text = text;
    saveEvents();

    var eventP = $("<p>").addClass("event").text(text);

    $(this).replaceWith(eventP);
});

// Check hour periodically
$(".timeblock").each(function(index, el) {
    auditEvent(el);
});

// Save button
$(".saveBtn").on("click", function() {
    saveEvents();
});

setInterval(function() {
    $(".timeblock").each(function(index, el) {
        auditEvent(el);
        console.log(el);
      });
}, (1000 * 60) * 60);

loadEvents();