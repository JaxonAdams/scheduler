var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");



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

    var status = $(this).closest(".timeblock").attr("id");

    events[status].text = text;
    //saveEvents;

    var eventP = $("<p>").addClass("event").text(text);

    $(this).replaceWith(evenP);
});