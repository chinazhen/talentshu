var yearList = [];
var yearText  = [new Date().getUTCFullYear()];

var monthList = [];
var monthText = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月","12月"];

var dayList = [];
var dayText = ["31日","1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日",
    "18日", "19日", "20日", "21日", "22日", "23日","24日","25日","26日","27日","28日","29日","30日"];

var hourList = [];
var hourText = ["24时","1时", "2时", "3时", "4时", "5时", "6时", "7时", "8时", "9时", "10时", "11时", "12时", "13时", "14时", "15时", "16时", "17时",
    "18时", "19时", "20时", "21时", "22时", "23时"];

var minuteList = [];
var minuteText = ["60分", "1分", "2分", "3分", "4分", "5分", "6分", "7分", "8分", "9分", "10分", "11分", "12分", "13分", "14分", "15分", "16分", "17分",
    "18分", "19分", "20分", "21分", "22分", "23分", "24分", "25分", "26分", "27分", "28分", "29分", "30分", "31分", "32分", "33分", "34分", "35分",
    "36分", "37分", "38分", "39分", "40分", "41分", "42分", "43分", "44分", "45分", "46分", "47分", "48分", "49分", "50分", "51分", "52分", "53分",
    "54分", "55分", "56分", "57分", "58分", "59分"];

var secondsList = [];
var secondsText = ["60", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
    "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35",
    "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53",
    "54", "55", "56", "57", "58", "59"];

var scMap = [[23,1], [1,3], [3,5], [5,7], [7,9], [9,11], [11,13], [13,15], [15,17], [17,19], [19,21], [21,23]];
var shiChenList = [];
var shiChenText = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戊", "亥"];

var jieqiList = [];
var jieqiText = ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至",
    "小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"];

var textSet = [[yearText, yearList],[monthText, monthList],[shiChenText,shiChenList],[dayText, dayList],[hourText, hourList],[jieqiText, jieqiList], [minuteText, minuteList],[secondsText, secondsList]];

var isCircle = false;

function getjq(){
    var now = new Date();
    var yyyy = now.getFullYear();
    var mm = now.getMonth();
    var dd = now.getDay();
    mm = mm - 1;
    var sTermInfo = [0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,
                    263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758];

    var solarTerms = -1;
//　　此方法可以获取该日期处于某节气
    while (solarTerms === -1){

        var tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[ mm * 2 + 1] * 60000) + Date.UTC(1900,0,6,2,5));

        var tmp2 = tmp1.getUTCDate();

        if (tmp2 === dd)
            solarTerms =  mm * 2 + 1;

        tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[ mm * 2] * 60000) + Date.UTC(1900,0,6,2,5));
        tmp2= tmp1.getUTCDate();
        if (tmp2 === dd) {
            solarTerms = mm * 2;
        }


        if(dd > 1){
            dd = dd - 1;
        }else {
            mm = mm - 1;
            if(mm < 0){
                yyyy = yyyy - 1; mm = 11;
            }
            dd = 31;
        }
    }
    return solarTerms;
}

function init() {
    clock = document.getElementById('clock');
    for (var i = 0; i < textSet.length; i++) {
        for (var j = 0; j < textSet[i][0].length; j++) {
            var temp = createLabel(textSet[i][0][j], i);
            clock.appendChild(temp);
            textSet[i][1].push(temp);
        }
    }
}

function createLabel(text, position) {
    var div = document.createElement('div');

    if (position === 0) {
        div.classList.add('label');
    } else if (position === 1) {
        div.classList.add('label');
        div.classList.add('label1');
    }  else if (position === 2) {
        div.classList.add('label');
        div.classList.add('label2');
    } else if (position === 3) {
        div.classList.add('label');
        div.classList.add('label3');
    } else if (position === 4) {
        div.classList.add('label');
        div.classList.add('label4');
    } else if (position === 5) {
        div.classList.add('label');
        div.classList.add('label5');
    }else if (position === 6) {
        div.classList.add('label');
        div.classList.add('label6');
    }else if (position === 7) {
        div.classList.add('label');
        div.classList.add('label7');
    }
    div.innerText = text;
    return div;
}

function runTime() {
    var now = new Date();
    var year = 0;
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var seconds = now.getSeconds();
    var shiChen = 1;
    var jieqi = getjq();

    for (var n = 1; n <= scMap.length; n ++) {
        if(hour < scMap[n][1] && hour >= scMap[n][0]) {
            shiChen = n;
            break;
        }
    }


    initStyle();
    var nowValue = [year,month, shiChen, day, hour, jieqi, minute, seconds];
    for (var m = 0; m < nowValue.length; m++) {
        var num = nowValue[m];
        textSet[m][1][num].style.color = '#FFFFFF';
    }

    if (isCircle) {
        var widthMid = 350;
        var heightMid = 165;
        for (var i = 0; i < textSet.length; i++) {
            for (var j = 0; j < textSet[i][0].length; j++) {
                var r = 0;
                switch (i) {
                    case 0:
                        r = 0; break;
                    case 1:
                        r = 35; break;
                    case 2:
                        r = 60; break;
                    case 3:
                        r = 80; break;
                    case 4:
                        r = 110; break;
                    case 5:
                        r = 140; break;
                    case 6:
                        r = 175; break;
                    case 7:
                        r = 205; break;
                }

                var deg = 360 / textSet[i][1].length * (j - nowValue[i]);
                var x = r * Math.sin(deg * Math.PI / 180) + widthMid ;
                var y = heightMid - r * Math.cos(deg * Math.PI / 180);
                var temp = textSet[i][1][j];
                // temp.style.transform = 'rotate(' + ( - 90 + deg) + 'deg)';
                temp.style.transform = 'rotate(' + ( 270) + 'deg)';
                temp.style.left = x + 'px';
                temp.style.top = y + 'px';
            }
        }
    }

}

function initStyle() {
    var label = document.getElementsByClassName('label');


    for (var i = 0; i < label.length; i++) {
        var clz = label[i].getAttribute("class")
        clz = clz.replace("label ","").trim();
        if (clz === "label7") {
            label[i].style.color = '#FFA500';
        }
        if (clz === "label6") {
            label[i].style.color = '#FFD700';
        }
        if (clz === "label5") {
            label[i].style.color = '#FFA500';
        }
        if (clz === "label4") {
            label[i].style.color = '#FFD700';
        }
        if (clz === "label3") {
            label[i].style.color = '#FFA500';
        }
        if (clz === "label2") {
            label[i].style.color = '#FFD700';
        }
        if (clz === "label1") {
            label[i].style.color = '#FFA500';
        }

    }
}

function changeCircle() {
    isCircle = true;
    clock.style.transform = "rotate(90deg)";
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
