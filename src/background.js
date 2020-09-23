(function() {
  const pollTime = 3600000;
  const WordList = new wordRandomizer.WordList;

  function checkWords() {
    WordList.initList(function() {
      WordList.setWord(function() {
        messageNotification();
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

  checkTime = setInterval(checkWords(), pollTime);

  checkWords();

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var wordSet = undefined;
    if(request.name === 'get-word') {
      wordSet = WordList.word;

      chrome.runtime.sendMessage({
          action: 'update-word',
          word: wordSet
      });
    } else if(request.name === 'clear-badge') {
      clearBadge();
    }
  })
})();
