// @ts-nocheck

if (typeof window !== 'undefined') {
    // Ensure jQuery is available globally in the window object, a necessary step if jQuery is being used in a React project.
    window.$ = window.jQuery = require('jquery');

    $(document).ready(function () {});
}
