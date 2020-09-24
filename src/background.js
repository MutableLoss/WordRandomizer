(function() {
  const pollTime = 1000 * 60 * 30;
  const WordList = new wordRandomizer.WordList;
  let last = 0;

  function checkWords() {
    WordList.initList(function() {
      WordList.setWord(function() {
        messageNotification();
        last = Date.now()
      });
    });
  }

  function messageNotification() {
    sendMessage();
    statusUpdate();
    badgeUpdate();
  }

  function badgeUpdate() {
      chrome.browserAction.setBadgeText({text: 'あ'});
      chrome.browserAction.setBadgeBackgroundColor({color: [125,125,225,255]});
  }

  function clearBadge() {
      chrome.browserAction.setBadgeText({text: ''});
  }

  function sendMessage() {
    new Notification(`Time for a new word!`, {
      icon: chrome.extension.getURL('images/icon_128.png'),
      body: 'Study a word!'
    });
  }

  function statusUpdate() {
    new Notification('Nihon Randomizer', {
      icon: chrome.extension.getURL('images/icon_128.png'),
      body: 'Time to study!'
    });
  }

  checkTime = setInterval(function() {
    if (Date.now() > (last + pollTime)) {
      checkWords()
    }
  }, 10000);

  checkWords();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var word = undefined;
    if(request.name === 'get-word') {
      word = WordList.word;
      wordSet = WordList.wordSet;

      chrome.runtime.sendMessage({
          action: 'update-word',
          word: word,
          wordSet: wordSet
      });
    } else if(request.name === 'clear-badge') {
      clearBadge();
    }
  })
})();
