(function() {
  const pollTime = 3600000;
  const WordList = new wordRandomizer.WordList;

  function checkWords(cb = null) {
    WordList.initList(words => {
      WordList.setWord(words[Math.floor(Math.random() * words.length) + 1])
    });
  }

  
  function badgeUpdate(total) {
    if(total !== 0) {
      chrome.browserAction.setBadgeText({text: total.toString()});
      chrome.browserAction.setBadgeBackgroundColor({color: [185,0,0,255]});
    } else {
      chrome.browserAction.setBadgeText({text: '0'});
      chrome.browserAction.setBadgeBackgroundColor({color: [125,125,225,255]});
    }
  }

  function sendMessage() {
    new Notification(`Time for a new word!`, {
      icon: chrome.extension.getURL('images/icon_128.png'),
      body: 'Study a word!'
    });
  }

  function messageNotification() {
    sendMessage();
  }

  function statusUpdate(total) {
    new Notification('Nihon Randomizer', {
      icon: chrome.extension.getURL('images/icon_128.png'),
      body: 'Time to study!'
    });
  }

  checkTime = setInterval(checkWords, pollTime);

  checkWords();

  // sync lookup on popup
  // TODO refactor to single screen scrape
  chrome.runtime.onMessage.addListener(function() {
    checkWords();
  });
})();
