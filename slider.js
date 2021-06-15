$( "#date-slider" ).slider({
    values: [1896],
    min: 1896,
    max: 1951,
    value: 1896,
});

$('#date-slider').on('slide', function(event, ui) {
    $("#current-date").text(ui.value);
});

var date = $("#current-date").text();