window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
    setTimeout(fn, 1000 / 60);
};
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

function getStyle(obj) {
    return obj.currentStyle || getComputedStyle(obj)
}

function smove(obj, attr, speed,callback) {
    var s = [], //结束的大小
        start = [], //起始的大小
        index; //判断起始 与 结束 哪个大

    for (let key in attr) {
        if (attr.hasOwnProperty(key)) {
            s[key] = attr[key];
            start[key] = parseFloat(getStyle(obj)[key]);
            index = s[key] > start[key];

            index ? (speed = Math.abs(speed)) : (speed = -speed);
            fn(key, index, speed)
        }
    }

    function fn(key, index, speed) {
        (key === 'opacity') ? start[key] += speed / 1000: start[key] += speed;
        if (index ? start[key] >= s[key] : start[key] <= s[key]) {
            start[key] = s[key];
        } else {
            requestAnimationFrame(fn.bind(null, key, index, speed));
        }
        (key === 'opacity') ? obj.style[key] = start[key]: obj.style[key] = start[key] + 'px';

    }

}

function tmove(obj, attr, time,callback) {

    var start = [],
        s = [],
        sTime,
        nTime,
        pTime,
        rtiao,
        sValue;


    for (var key in attr) {
        if (attr.hasOwnProperty(key)) {
            start[key] = parseFloat(getStyle(obj)[key]);
            s[key] = attr[key] - start[key];
        }
    }

    sTime = new Date(); //开始的时间

    fn();

    function fn() {
        nTime = new Date();
        pTime = nTime - sTime;
        rtiao = pTime / time; // 所走时间);
        rtiao > 1 ? rtiao = 1 : requestAnimationFrame(fn);
        for (var key in start) {
            if (start.hasOwnProperty(key)) {
                if (key === 'opacity') {
                    sValue = start[key] + s[key] * rtiao;
                    obj.style[key] = sValue
                    obj.style.filter = "alpha(opacity=" + sValue * 100 + ")";
                } else {
                    obj.style[key] = start[key] + s[key] * rtiao + 'px';
                }
            }
        }
        (rtiao === 1)&&(callback && callback());
    }
}


function move(obj,attr,varaible,callback){
    (varaible > 100)?tmove(obj,attr,varaible,callback):smove(obj,attr,varaible,callback);
}
