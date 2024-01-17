document.addEventListener('DOMContentLoaded', function () {
    const calendarIcon = document.getElementById('calendarIcon');
    const dateInput = document.getElementById('release');

    calendarIcon.addEventListener('click', function () {
        // Trigger the click event on the associated date input
        dateInput.click();
    });
});
