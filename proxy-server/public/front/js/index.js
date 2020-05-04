
    var index_play = document.getElementById("index_play");
    var index_arl = document.getElementById("index_arl");
    var index_arr = document.getElementById("index_arr");

    var minwidth = index_play.children[0].offsetWidth;
    var count = index_play.children.length;
    var index = 0;
    var index_banner_play = document.getElementById("index_banner_play");
    index_arr.onclick = function () {
        if(index < count){
            index++;
            animate(index_play,-index * minwidth);
        }
        else{
            index = 1;
            index_play.style.left = 0;
            animate(index_play, -index * minwidth);
        }
    }
    index_arl.onclick = function () {
        if(index === 0){
            index_play.style.left = -count * minwidth + "px";
            index = count - 1;
            animate(index_play, -index * minwidth);
        }else{
            index--;
            animate(index_play, -index * minwidth);
        }
    }
    var liclone = index_play.children[0].cloneNode(true);
    index_play.appendChild(liclone);

    var timeid = setInterval(function () {
        index_arr.click();
    },2000);

    index_banner_play.onmouseenter = function () {
            clearInterval(timeid);
        }

    index_banner_play.onmouseleave = function () {
            timeid = setInterval(function (params) {
                index_arr.click();
            },2000);
        }
    