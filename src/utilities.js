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

    updateMessage: function(elementId) {
      let element = document.getElementById(elementId);
      let data = element.getAttribute('data-chrome-i18n')
      let text = chrome.i18n.getMessage(data);

      element.textContent = text;
    }
  };
})();
