(function() {
  window.wordRandomizer = window.wordRandomizer || {};

  wordRandomizer.Utilities = function() {};

  wordRandomizer.Utilities.prototype = {
    getTimes: function() {
      let date = new Date();
      return {
        day: date.getDate(),
        hour: date.getHours(),
        last: Date.parse(date)
      }
    },

  };
})();
