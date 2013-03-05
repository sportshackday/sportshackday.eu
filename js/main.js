'use strict';
if (!(window.console && console.log)) {
  (function () {
    var noop = function () {
    };
    var methods = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'profile',
        'profileEnd',
        'markTimeline',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'trace',
        'warn'
      ];
    var length = methods.length;
    var console = window.console = {};
    while (length--) {
      console[methods[length]] = noop;
    }
  }());
}
$(document).ready(function () {
  function getTweets() {
    $('.tweets').miniTwitter({
      query: '#sportshackday OR #sportshackdayeu OR @sportshackdayeu OR sportshackday.eu',
      limit: 8
    });
  }
  getTweets();
  setInterval(function () {
    getTweets();
  }, 10000);
});