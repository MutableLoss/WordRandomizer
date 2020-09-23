(function() {
  window.wordRandomizer = window.wordRandomizer || {};
  window.words = chrome.runtime.getURL('words.json')

  wordRandomizer.WordList = function() {
    this.total = 0;
    this.wordList = [];
    this.setWord = {};
    this.conversationList = [];
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
      if (word) {
        this.setWord = word
      } else {
        this.setWord = this.wordList[Math.floor(Math.random() * wordList.length) + 1]
      }
      cb(this.setWord)
    },

    getWord: function() {
      this.setWord
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
