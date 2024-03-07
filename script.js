//Modified code originally created by Tobias Bogliolo, publicist, visual designer and frontend developer based in Barcelona.

//Global:
var survey = []; //Bidimensional array: [ [1,3], [2,4] ]

$(document).ready(function() {
    // Handling radio button activation with jQuery
    $('.rb-tab').click(function() {
        // Remove active class from siblings and add to the clicked tab
        $(this).siblings().removeClass('rb-tab-active');
        $(this).addClass('rb-tab-active');
    });

    // Form submission with jQuery
    $('#survey-form').submit(function(e) {
        e.preventDefault(); // Prevent default form submission
        
        var formData = {
            article: $('#article').val(),
            difficulty: $('#rb-1 .rb-tab-active').data('value'),
            readability: $('#rb-2 .rb-tab-active').data('value'),
            value: $('#rb-3 .rb-tab-active').data('value')
        };
        
        $.ajax({
            url: 'https://script.google.com/macros/s/AKfycbyrdFFwBKOx1Amm5jj0FT0zW-IdQgWs13RoddfZw5si3uKJldzCZeUYYvyJV50Z0It6/exec', // Replace with your endpoint
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(data) {
                console.log(data);
                alert("Review submitted successfully.");
                // Optionally reset the form or redirect the user
            },
            error: function(xhr, status, error) {
    let errorMessage = "An error occurred. Please try again.";
    if (xhr.status === 0) {
        errorMessage = "Not connect. Verify Network.";
    } else if (xhr.status == 404) {
        errorMessage = "Requested page not found. [404]";
    } else if (xhr.status == 500) {
        errorMessage = "Internal Server Error [500].";
    } else if (error === 'parsererror') {
        errorMessage = "Requested JSON parse failed.";
    } else if (error === 'timeout') {
        errorMessage = "Time out error.";
    } else if (error === 'abort') {
        errorMessage = "Ajax request aborted.";
    } else {
        errorMessage = "Uncaught Error. " + xhr.responseText;
    }
    console.error('Error:', errorMessage);
    $('#error-message').text(errorMessage).show();
    //alert(errorMessage); // Consider replacing this with a more user-friendly error display method
}
        });
    });
});
