var savedDate = 1896

$( "#date-slider" ).slider({
    values: savedDate,
    min: 1896,
    max: 1951,
    value: savedDate
});

$('#date-slider').on('slide', function(event, ui) {
    $("#current-date").text(ui.value);

});

var filterButton = document.querySelector("#filter-btn")

filterButton.addEventListener("click", function() {
    savedDate = $('#date-slider').slider("option", "value");
    updateList();
    
});

function updateList() {
    buttonClicked.click();
    hideOtherBtnMenus();
}

function parseDates(pieceDates, filterDate) {
    if (pieceDates.length > 4) {
        if (parseInt(pieceDates.substring(0, 4)) >= filterDate) {
            return 0;
        } 
        else if (parseInt(pieceDates.substring(7, 11)) >= filterDate) {
            return 0;
        }
        else {
            return 1;
        }
    }
    else if (parseInt(pieceDates.substring(0, 4)) >= filterDate) {
        return 0;
    } 
    else {
        return 1;
    }
}