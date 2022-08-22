/* Author: AxP

 */

/*
 * Slider
 */
$(window).load(function() {
    $('#slider').nivoSlider({
        effect : "fade",
        slices : 15,
        boxCols : 8,
        boxRows : 4,
        animSpeed : 500,
        pauseTime : 5000,
        startSlide : 0,
        directionNav : true,
        directionNavHide : true,
        controlNav : false,
        controlNavThumbs : false,
        controlNavThumbsFromRel : true,
        keyboardNav : true,
        pauseOnHover : true,
        manualAdvance : false
    });
});
/*
 * Sidebar
 */
var sideHeader = document.getElementById('side_header');
var on = false;

sideHeader.onmouseover = function() {
    on = true;
    sideHeader.style.opacity = '1';
}

sideHeader.onmouseout = function() {
    on = false;
    sideHeader.style.opacity = '0';
}
// #####

document.getElementById('about').onmouseover = function() {
    sideHeader.style.opacity = '0.7';
}

document.getElementById('about').onmouseout = function() {
    if(!on)
        sideHeader.style.opacity = '0';
}
// #####

document.getElementById('screenshots').onmouseover = function() {
    sideHeader.style.opacity = '0.7';
}

document.getElementById('screenshots').onmouseout = function() {
    if(!on)
        sideHeader.style.opacity = '0';
}
// #####
document.getElementById('android').onmouseover = function() {
    sideHeader.style.opacity = '0.7';
}

document.getElementById('android').onmouseout = function() {
    if(!on)
        sideHeader.style.opacity = '0';
}
// #####
document.getElementById('programmer').onmouseover = function() {
    sideHeader.style.opacity = '0.7';
}

document.getElementById('programmer').onmouseout = function() {
    if(!on)
        sideHeader.style.opacity = '0';
}
/*
 * Scroll
 */

var duration = 2000;

var coord_about = $('#about').offset().top;
var coord_screens = $('#screenshots').offset().top;
var coord_android = $('#android').offset().top;
var coord_programmer = $('#programmer').offset().top;

if($.browser.webkit) {
    coord_about = coord_about * 1 / 100 + coord_about;
    coord_screens = coord_screens - coord_screens * 1 / 100;
    coord_android = coord_android * 2 / 100 + coord_android;
    coord_programmer = coord_programmer * 5 / 100 + coord_programmer;
}

// ####
$('#navBtn1').click(function() {
    $("html,body").animate({
        scrollTop : coord_programmer
    }, duration);
    return false;

});

$('#side_navBtn1').click(function() {
    $("html,body").animate({
        scrollTop : coord_programmer
    }, duration);
    return false;

});
// ####
$('#navBtn2').click(function() {
    $("html,body").animate({
        scrollTop : coord_about
    }, duration);
    return false;

});

$('#side_navBtn2').click(function() {
    $("html,body").animate({
        scrollTop : coord_about
    }, duration);
    return false;

});
// ####

$('#side_navBtn3').click(function() {
    $("html,body").animate({
        scrollTop : 0
    }, duration);
    return false;

});
// ####
$('#navBtn4').click(function() {
    $("html,body").animate({
        scrollTop : coord_screens
    }, duration);
    return false;

});

$('#side_navBtn4').click(function() {
    $("html,body").animate({
        scrollTop : coord_screens
    }, duration);
    return false;

});
// ####
$('#navBtn5').click(function() {
    $("html,body").animate({
        scrollTop : coord_android
    }, duration);
    return false;

});

$('#side_navBtn5').click(function() {
    $("html,body").animate({
        scrollTop : coord_android
    }, duration);
    return false;

});
