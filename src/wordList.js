  (function() {
  window.wordRandomizer = window.wordRandomizer || {};
  window.words = chrome.runtime.getURL('words.json');

  wordRandomizer.WordList = function() {
    this.wordList = [];
    this.word = {};
  };

  wordRandomizer.WordList.prototype = {
    initList: function(cb) {
      fetch(window.words)
      .then(res => res.json())
      .then(out => {
        this.wordList = out
        cb(out)
      });
    },

    setWord: function(cb) {
      if (this.wordList.length) {
        this.word = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1]
      }
      cb(this.word)
    },

    getWord: function() {
      this.word
    }
  };

  // make single instance for extension
  wordRandomizer.setupWordList = function() {
    let background = chrome.extension.getBackgroundPage();
    if (!Object.prototype.hasOwnProperty.call(background.wordRandomizer, 'WordList')) {
      background.wordRandomizer.WordList = new wordRandomizer.WordList;
    }
    return background.wordRandomizer.WordList;
  };
})();
