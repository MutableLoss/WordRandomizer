(function() {
  const WordList = new wordRandomizer.WordList;
  const Preferences = new wordRandomizer.Preferences;
  const Utilities = new wordRandomizer.Utilities;

  let last = 0;
  var history_log = [];
  var current_state = '';
  var day = 0;

  chrome.idle.onStateChanged.addListener(function(newState) {
    var time = new Date();

    if (history_log.length >= 20) {
      history_log.pop();
    }

    history_log.unshift({ state: newState, time: time });
    current_state = newState;
    console.log(current_state);
  });

  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.detectLanguage(tab.id, function(language) {
      Preferences.set('language', language);
    });
  });

  function checkWords() {
    WordList.initList(function() {
      WordList.setWord(function() {
        messageNotification();
        let date = getTimes();
        day = date.day;
        last = date.last;
      });
    });
  }

  function messageNotification() {
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

  function statusUpdate() {
    new Notification('Nihon Randomizer', {
      icon: chrome.extension.getURL('images/icon_128.png'),
      body: 'Time to study!'
    });
  }

  checkTime = setInterval(function() {
    let date = Utilities.getTimes();
    let pollTime = Preferences.getLocal['pollTime'];

    if (date.last > (last + (1000 * 60 * pollTime))) {
      if (date.day > day || date.day == 0) {
        WordList.resetWordSet();
      }
      checkWords();
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
