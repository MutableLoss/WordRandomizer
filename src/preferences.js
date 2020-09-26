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
    constructor: function() {
      Object.keys(this.settings.options).map(key => {
        this.settings[key] = this.get(key);
      });
    },
    getLocal: function(prefKey) {
      this.settings.options[prefKey];
    },
    get: function(prefKey, cb) {
      chrome.storage.sync.get(this.settings, store => {
        cb(store ? store.options[prefKey] : this.settings.options[prefKey]);
      });
    },
    set: function(prefKey, value) {
      this.settings.options[prefKey] = value;
      chrome.storage.sync.get(this.settings, store => {
        store.options[prefKey] = value;
        chrome.storage.sync.set(store);
      });
    }
  };
})();
