(function() {
  window.wordRandomizer = window.wordRandomizer || {};

  wordRandomizer.Preferences = function() {
    this.settings = {
      options: {
        pollTime: 30,
        startTime: 9,
        stopTime: 22,
        language: 'en'
      }
    }
  };

  wordRandomizer.Preferences.prototype = {
    get: function(prefKey, cb) {
      chrome.storage.sync.get(this.settings, store => {
        cb(store.options[prefKey]);
      });
    },
    set: function(prefKey, value) {
      chrome.storage.sync.get(this.settings, store => {
        store.options[prefKey] = value;
        chrome.storage.sync.set(store);
      });
    }
  };
})();
