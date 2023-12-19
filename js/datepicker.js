$(function () {
    $("#datepicker").datepicker({
        showOn: "button",
        buttonImage: "img/calendar-icon.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: "mm/dd/yy",
        minDate: new Date(2023, 0, 1),
        maxDate: new Date(2023, 11, 20),
        beforeShow: function (input, inst) {
            // Hide the input temporarily to prevent focus
            $(input).css("display", "none");

            // Use a timeout to show the input after a short delay
            setTimeout(function () {
                $(input).css("display", "block");
            }, 0);

            // Continue with the default behavior
            return {};
        },
        onSelect: function (dateText, inst) {
            // Focus on the input field after selecting a date
            $(this).focus();
        }
    });
});
