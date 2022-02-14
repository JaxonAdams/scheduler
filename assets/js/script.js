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

var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));

    if (!events) {
        events = {
            9: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: [],
            16: [],
            17: []
        };
    }

    $.each(events, function(thisHour, events) {
        events.forEach(function(event) {

        });
    });
}

var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
}


// Load events
var loadEvents = function() {
    events = JSON.parse(localStorage.getItem("events"));

    if (!events) {
        events = {
            9: [],
            10: [],
            11: [],
            12: [],
            13: [],
            14: [],
            15: [],
            16:[],
            17: []
        };
    }

    $.each(events, function (hour, events) {
        events.forEach(function(thisEvent) {
            createEvent(thisEvent.text, hour);
        });
    });
}

// Save events
var saveEvents = function() {
    localStorage.setItem("events", JSON.stringify(events));
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
    var text = $(this).text().trim();

    var eventHour = $(this).closest(".timeblock").attr("id");

    events[eventHour].text = text;
    //saveEvents();

    var eventP = $("<p>").addClass("event").text(text);

    $(this).replaceWith(eventP);
});

loadEvents();

// Check hour periodically
$(".timeblock").each(function(index, el) {
    auditEvent(el);
});

// Save button
$(".saveBtn").on("click", function() {
    var eventDescription = $("#event-description").val();
    

});

setInterval(function() {
    $(".timeblock").each(function(index, el) {
        auditEvent(el);
        console.log(el);
      });
}, (1000 * 60) * 60);