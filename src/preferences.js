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

    let Prefs = this
    Object.keys(this.settings.options).map(function(key) {
      Prefs.get(key, function(value) {
        if (value) {
          Prefs.settings.options[key] = value
        }
      });
    });
  };

  wordRandomizer.Preferences.prototype = {
    getLocal: function(prefKey) {
      return this.settings.options[prefKey];
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
