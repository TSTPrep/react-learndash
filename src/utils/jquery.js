if (typeof window !== 'undefined') {

    window.$ = window.jQuery = require('jquery');


    $(document).ready(function() {


        setTimeout(function() {  


            // PART 1 - edits on form content
                    
            // Change the h5 text
            $('h5').text("TST Prep's Writing Evaluation Demo 1");

            // Change placeholder text for textarea elements
            $('textarea[name="task"]').attr('placeholder', 'Paste your TOEFL integrated writing task here').css('margin-bottom', '30px');
            $('textarea[name="essay"]').attr('placeholder', 'Paste or write your essay here');



            // Part 2 - Behavior after form submission

            var targetNode = document.querySelector('.course-details-content');
    var config = { childList: true, subtree: true, characterData: true, attributes: true };

    // Timer functionality encapsulated within startTimer function
    function startTimer() {
        var seconds = 0; // Initialize seconds to 0
        // Update the timer every second
        return setInterval(function() {
            seconds++;
            $('#timer').text(seconds + ' seconds'); // Dynamically update the text
        }, 1000); // Set interval to 1 second
    }

    var timerInterval = null; // Declare outside to make it accessible

    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
        mutationsList.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1 && $(node).find('#timer').length) {
                        // Timer exists, indicating form submission occurred and timer was set
                        if (timerInterval) clearInterval(timerInterval);
                        timerInterval = startTimer(); // Start or restart the timer
                    }
                });

                if (!$(mutation.target).closest('.course-details-content').find('.edu-btn').length) {
                    // If the submit button disappears, clear the timer and remove additional content
                    clearInterval(timerInterval);
                    $('#elapsedTime, #waitingTime').remove();
                }
            }
        });
    };

    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    // Handle form submission
    $('.course-details-content form').on('submit', function(event) {
        event.preventDefault(); // Prevent the actual form submission for demonstration; adjust as needed

        // Initialize or reset UI elements and timer upon form submission
        $('textarea[name="task"], textarea[name="essay"]').prop('disabled', true).css({
            'background-color': '#f0f0f0',
            'cursor': 'not-allowed'
        });
        
        var submitButton = $(this).find('.edu-btn').prop('disabled', true).text('Loading...')
            .css({'pointer-events': 'none', 'filter': 'saturate(30%)'});

        if (!$('#elapsedTime').length) {
            $('<p id="elapsedTime" style="margin-bottom: 0;">Elapsed time: <span id="timer">0 seconds</span></p>').insertBefore(submitButton);
            $('<p id="waitingTime" style="margin-bottom: 0;">Depending on the length of your essay and the amount of mistakes, <br>the waiting time can vary between 15s and 120s</p>').insertBefore(submitButton);
        }

        if (timerInterval) clearInterval(timerInterval); // Clear any existing timer
        timerInterval = startTimer(); // Start the timer
    });


        }, 700);
    });


}
