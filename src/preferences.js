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
      Prefs.get(function(value) {
        if (value) {
          Prefs.settings.options = value
        }
      });
    });
  };

  wordRandomizer.Preferences.prototype = {
    getLocal: function(prefKey) {
      return this.settings.options[prefKey];
    },
    get: function(cb) {
      chrome.storage.sync.get(this.settings, store => {
        cb(store && store.options ? store.options : this.settings.options);
      });
    },
    set: function(prefKey, value) {
      this.settings.options[prefKey] = value;
      chrome.storage.sync.set(this.settings, function() {
        // window.alert('settings saved');
      });
    }
  };
})();
