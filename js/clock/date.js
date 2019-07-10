function initDate() {
    var now = new Date();
    var currYear = now.getFullYear();

    var yearSelect = document.getElementById("yearSelect");
    for (var i = 0; i < 65; i ++) {
        var year = document.createElement('option');
        year.value = currYear - i;
        year.innerText = currYear - i;
        yearSelect.appendChild(year);
    }

    var monthSelect = document.getElementById("monthSelect");
    for (var j = 1; j <= 12; j ++) {
        var month = document.createElement('option');
        month.value = j;
        month.innerText = j;
        monthSelect.appendChild(month);
    }

    var daySelect = document.getElementById("daySelect");
    for (var k = 1; k <= 31; k ++) {
        var day = document.createElement('option');
        day.value = k;
        day.innerText = k;
        daySelect.appendChild(day);
    }

    var timeSelect = document.getElementById("timeSelect");
    for (var l = 1; l <= 24; l ++) {
        var hour = document.createElement('option');
        hour.value = l;
        hour.innerText = l;
        timeSelect.appendChild(hour);
    }
}
