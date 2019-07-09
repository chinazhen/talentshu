var monthText = ["I", "II", "III", "IV", "V", "VI", "VII", "VII", "IX", "X", "XI", "XII"];
var dayText = ["LX","I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX","XXXI"];
var weekText = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
var shiChenText = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戊", "亥"];
var hourText=["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV"];
var minuteText = ["LX","I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX", "XXXI", "XXXII", "XXXIII", "XXXIV", "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX", "XL", "XLI", "XLII", "XLIII", "XLIV", "XLV", "XLVI", "XLVII", "XLVIII", "XLIX", "L", "LI", "LII", "LIII", "LIV", "LV", "LVI", "LVII", "LVIII", "LIX"];
var secondsText = ["I", "II", "III", "IV", "V", "VI", "VII", "VII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX", "XXXI", "XXXII", "XXXIII", "XXXIV", "XXXV", "XXXVI", "XXXVII", "XXXVIII", "XXXIX", "XL", "XLI", "XLII", "XLIII", "XLIV", "XLV", "XLVI", "XLVII", "XLVIII", "XLIX", "L", "LI", "LII", "LIII", "LIV", "LV", "LVI", "LVII", "LVIII", "LIX", "LX"];
var clock;
var monthList = [];
var dayList = [];
var weekList = [];
var hourList = [];
var shiChenList = [];
var minuteList = [];
var secondsList = [];

var scMap = [[23,1], [1,3], [3,5], [5,7], [7,9], [9,11], [11,13], [13,15], [15,17], [17,19], [19,21], [21,23]];

var isCircle = false;
var textSet = [[monthText, monthList], [dayText, dayList], [weekText, weekList], [shiChenText, shiChenList], [hourText, hourList], [minuteText, minuteList], [secondsText, secondsList]];
window.onload = function() {
    init();
    setInterval(function() {
        runTime();
    },
    100);
    changePosition();
    setTimeout(function() {
        changeCircle();
    },
    2000);
}
function init() {
    clock = document.getElementById('clock');
    for (var i = 0; i < textSet.length; i++) {
        for (var j = 0; j < textSet[i][0].length; j++) {
            var temp = createLabel(textSet[i][0][j]);
            clock.appendChild(temp);
            textSet[i][1].push(temp);
        }
    }
}
function createLabel(text) {
    var div = document.createElement('div');
    div.classList.add('label');
    div.innerText = text;
    return div;
}
function runTime() {
    var now = new Date();
    var month = now.getMonth();
    var day = now.getDate();
    var week = now.getDay();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var seconds = now.getSeconds();
    var shiChen = 1;

    for (var n = 1; n <= scMap.length; n ++) {
        if(hour < scMap[n][1] && hour >= scMap[n][0]) {
            shiChen = n;
            break;
        }
    }

    initStyle();
    var nowValue = [month, day - 1, week, shiChen, hour, minute, seconds];
    for (var m = 0; m < nowValue.length; m++) {
        var num = nowValue[m];
        textSet[m][1][num].style.color = '#fff';
    }
    if (isCircle) {
        var widthMid = document.body.clientWidth / 2;
        var heightMid = document.body.clientHeight / 2;
        for (var i = 0; i < textSet.length; i++) {
            for (var j = 0; j < textSet[i][0].length; j++) {
                var r = (i + 1) * 20 + 35 * i;
                var deg = 360 / textSet[i][1].length * (j - nowValue[i]);
                var x = r * Math.sin(deg * Math.PI / 180) + widthMid ;
                var y = heightMid - r * Math.cos(deg * Math.PI / 180);
                var temp = textSet[i][1][j];
                temp.style.transform = 'rotate(' + ( - 90 + deg) + 'deg)';
                temp.style.left = x + 'px';
                temp.style.top = y + 'px';
            }
        }
    }
}
function initStyle() {
    var label = document.getElementsByClassName('label');
    for (var i = 0; i < label.length; i++) {
        label[i].style.color = '#4d4d4d';
    }
}
function changePosition() {
    for (let i = 0; i < textSet.length; i++) {
        for (let j = 0; j < textSet[i][1].length; j++) {
            let tempX = textSet[i][1][j].offsetLeft + "px";
            let tempY = textSet[i][1][j].offsetTop + "px";
            setTimeout(function() {
                textSet[i][1][j].style.position = "absolute";
                textSet[i][1][j].style.left = tempX;
                textSet[i][1][j].style.top = tempY;
            },
            50);
        }
    }
}
function changeCircle() {
    isCircle = true;
    clock.style.transform = "rotate(90deg)";
}
