if (typeof window !== 'undefined') {
    // Ensure jQuery is available globally in the window object, a necessary step if jQuery is being used in a React project.
    window.$ = window.jQuery = require('jquery');

    $(document).ready(function() {
        setTimeout(function() {  
            // PART 1 - Edits on form content
            // Feature: Update the heading to provide a clear title for the demo.
            // For React: This could be done by storing the title in a state variable and using it directly in the render method or JSX return statement.
            $('h5').text("TST Prep's Writing Evaluation Demo 1");

            // Feature: Update placeholder text in textarea fields to guide the user on what to input.
            // For React: Control the placeholder text using state or props, allowing dynamic updates based on user interaction or other conditions.
            $('textarea[name="task"]').attr('placeholder', 'Paste your TOEFL integrated writing task here').css('margin-bottom', '30px');
            $('textarea[name="essay"]').attr('placeholder', 'Paste or write your essay here');

            // PART 2 - Behavior after form submission
            // Setup to observe changes in the form container, allowing dynamic response to form submission and other events.
            var targetNode = document.querySelector('.course-details-content');
            var config = { childList: true, subtree: true, characterData: true, attributes: true };

            // Timer functionality to provide feedback to the user after form submission.
            // For React: Use the useState hook for the seconds counter and useEffect for starting the interval. Ensure to clear the interval on component unmount.
            function startTimer() {
                var seconds = 0; // Initialize seconds to 0
                return setInterval(function() {
                    seconds++;
                    $('#timer').text(seconds + ' seconds'); // Dynamically update the text
                }, 1000); // Set interval to 1 second
            }

            var timerInterval = null; // Declare outside to make it accessible

            // Observe DOM mutations to dynamically adjust UI based on form interaction.
            var callback = function(mutationsList, observer) {
                mutationsList.forEach(function(mutation) {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach(function(node) {
                            // Response to form submission: If the timer element is found, clear any existing timer and start a new one.
                            if (node.nodeType === 1 && $(node).find('#timer').length) {
                                if (timerInterval) clearInterval(timerInterval);
                                timerInterval = startTimer(); // Start or restart the timer
                            }
                        });

                        // Cleanup upon form or page change: If the submit button is no longer present, stop the timer and remove added content.
                        if (!$(mutation.target).closest('.course-details-content').find('.edu-btn').length) {
                            clearInterval(timerInterval);
                            $('#elapsedTime, #waitingTime').remove();
                        }
                    }
                });
            };

            var observer = new MutationObserver(callback);
            observer.observe(targetNode, config);

            // Handle form submission to disable inputs, show a loading state, and start a timer.
            // For React: Implement form submission handling using event handlers. Manage form and button states with useState, and show feedback using state-driven UI updates.
            $('.course-details-content form').on('submit', function(event) {
                event.preventDefault(); // Prevent the actual form submission for demonstration; adjust as needed

                // Disable inputs and show a visual cue to the user that the form is processing.
                $('textarea[name="task"], textarea[name="essay"]').prop('disabled', true).css({
                    'background-color': '#f0f0f0',
                    'cursor': 'not-allowed'
                });
                
                // Change the button text to "Loading..." to indicate processing state.
                var submitButton = $(this).find('.edu-btn').prop('disabled', true).text('Loading...')
                    .css({'pointer-events': 'none', 'filter': 'saturate(30%)'});

                // Add visual feedback about the elapsed time since form submission and expected wait time.
                if (!$('#elapsedTime').length) {
                    $('<p id="elapsedTime" style="margin-bottom: 0;">Elapsed time: <span id="timer">0 seconds</span></p>').insertBefore(submitButton);
                    $('<p id="waitingTime" style="margin-bottom: 0;">Depending on the length of your essay and the amount of mistakes, <br>the waiting time can vary between 15s and 120s</p>').insertBefore(submitButton);
                }

                // Start or reset the timer to give live feedback to the user.
                if (timerInterval) clearInterval(timerInterval); // Clear any existing timer
                timerInterval = startTimer(); // Start the timer
            });

            // PART 3 - display the original content after submission
            // Attach an event handler to the form submission on Screen 1
            $('.course-details-content form').submit(function() {
                var essayContent = $('textarea[name="essay"]').val();
                localStorage.setItem('essayContent', essayContent);
                console.log("Step 1: Form submitted on Screen 1");
                // After form submission, immediately check and display essay content
                checkAndDisplayEssayContent();
            });
            
            // Function to check for Screen 2 and display the essay content
            function checkAndDisplayEssayContent() {
                console.log("Step 2: Inside checkAndDisplayEssayContent function");
                var screen2Detected = $('.course-details-content h5').text().includes("TST Prep's Writing Evaluation Demo 1");
                if (screen2Detected) {
                    var essayContent = localStorage.getItem('essayContent');
                    if (essayContent) {
                        // Create a paragraph element with the essay content, add class and insert after h5 title
                        var $essayParagraph = $('<p></p>').text(essayContent).addClass('original-essay').css('margin-bottom', '0px');
                        $essayParagraph.insertAfter('.course-details-content h5');
                        
                        // Create a bolded title and insert before the paragraph
                        var $title = $('<p></p>').text('Original Essay').addClass('original-essay-title').css('font-size', '16px').css('font-weight', 'bold').css('margin-bottom', '0px');
                        $title.insertBefore($essayParagraph);
                        
                        localStorage.removeItem('essayContent'); // Optional: Clear the localStorage
                        console.log("Step 3: Original essay content displayed");
                    }
                }
            }

        }, 700); // Delay to ensure jQuery manipulations occur after React component render.
    });
}
