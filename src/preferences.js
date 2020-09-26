(function() {
  window.wordRandomizer = window.wordRandomizer || {};

  wordRandomizer.Preferences = function() {
    this.settings = {
      options: {
        pollTime: 30,
        startTime: 9,
        stopTime: 22
      }
    }
  };

  wordRandomizer.Preferences.prototype = {
    get: function(key, cb) {
      chrome.storage.sync.get(this.settings, store => {
        cb(store.options[key]);
      });
    },
    set: function(key, val) {
      chrome.storage.sync.get(this.settings, store => {
        store.options[key] = val;
        chrome.storage.sync.set(store);
      });
    }
  };
})();
