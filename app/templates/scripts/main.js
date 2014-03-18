//on ready
$(function () {
  //.. your code

});



//--------------------------------------------------------------------------
//snapp.js
//--------------------------------------------------------------------------
/*global Snap:false*/
$(function () {

  'use strict';

  //config
  var menuTriggerLeft = '#toggle-left-menu';
  var menuTriggerRight = '#toggle-right-menu';

  //add snapper
  var snapper = new Snap({
    element: document.getElementById('snap-content'),
    touchToDrag: false
  });

  //responsive snapper
  $(window).resize(function () {
    if ($(document).width() < 770) {
      snapper.enable();
    } else {
      snapper.disable();
    }
  }).trigger('resize');

  //open left
  $(menuTriggerLeft).click(function () {

    if ($('.snapjs-left').length) {
      snapper.close();
    } else {
      snapper.open('left');

    }
  });
  //open right
  $(menuTriggerRight).click(function () {

    if ($('.snapjs-right').length) {
      snapper.close();
    } else {
      snapper.open('right');

    }
  });
});