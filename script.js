//Modified code originally created by Tobias Bogliolo, publicist, visual designer and frontend developer based in Barcelona.

// Debugging utility function
function debugLog(message) {
    var p = document.createElement('p');
    p.textContent = message;
    document.getElementById('debugLog').appendChild(p);
}

// Example usage of debugLog
debugLog('Debugging is enabled.');

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
            error: function(xhr, status, errorThrown) {
                console.error("AJAX Error: ", status, errorThrown);
                console.error("Response Text:", xhr.responseText);
                // Displaying more detailed error information on the web page
                let userFriendlyMessage = "An error occurred. Please try again. More details in console.";
                if (xhr.responseText) {
                    try {
                        let responseJson = JSON.parse(xhr.responseText);
                        if (responseJson && responseJson.error) {
                            userFriendlyMessage += " Error: " + responseJson.error.message;
                        }
                    } catch (e) {
                        // If there's an error parsing JSON, display the raw responseText
                        userFriendlyMessage += " Error details: " + xhr.responseText;
                    }
                }
                $('#error-message').text(userFriendlyMessage).show();
        });
    });
});
