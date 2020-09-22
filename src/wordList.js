(function() {
  window.wordRandomizer = window.wordRandomizer || {};

  window.words = chrome.runtime.getURL('words.json')

  wordRandomizer.WordList = function() {
    this.total = 0;
    this.conversationList = [];
  };

  wordRandomizer.WordList.prototype = {
    initList: cb => {
      fetch(window.words)
      .then(res => res.json())
      .then(out => {
          cb(this.wordList);
        });
      ) 
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
