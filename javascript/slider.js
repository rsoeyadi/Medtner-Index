var savedDate = 1896

var dates = Array();

for (var i = 1896; i < 1952; i++) {
    dates[i] = i;
}

$("#date-slider")

    .slider({
        min: 1896,
        max: dates.length - 1,
    })

    .slider("pips", {
        rest: false
    })

    .slider("float", {
        labels: dates,

    })

    .on("slidechange", function (e, ui) {
        $("#current-date").text("Works completed after " + dates[ui.value]);
        savedDate = dates[ui.value];
        updateList();
    });

var filterButton = document.querySelector("#filter-btn")

function updateList() {
    buttonClicked.click();
    hideOtherBtnMenus();
}

function parseDates(pieceDates, filterDate) {
    if (pieceDates.length > 4) {
        if (parseInt(pieceDates.substring(0, 4)) >= filterDate) {
            return 0;
        } else if (parseInt(pieceDates.substring(7, 11)) >= filterDate) {
            return 0;
        } else {
            return 1;
        }
    } else if (parseInt(pieceDates.substring(0, 4)) >= filterDate) {
        return 0;
    } else {
        return 1;
    }
}