  (function() {
  window.wordRandomizer = window.wordRandomizer || {};
  window.words = chrome.runtime.getURL('words.json');

  wordRandomizer.WordList = function() {
    this.wordList = [];
    this.wordSet = [];
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

    setWord: function(cb = null) {
      if (this.wordList.length) {
        this.word = this.wordList[Math.floor(Math.random() * this.wordList.length) + 1]
        this.wordSet.push(this.word);
        console.log(`set: ${this.word.word}`)
      }
      if (cb) {
        cb(this.word)
      } else {
        console.log(this.word)
      }
    },

    getWord: function() {
      console.log(`get: ${this.word.word}`)
      this.word
    },

    getWordSet: function() {
      this.wordSet
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
