(function() {
  const WordList = new wordRandomizer.WordList;
  const Preferences = new wordRandomizer.Preferences;
  const Utilities = new wordRandomizer.Utilities;
  const Localizer = new wordRandomizer.Localizer;

  const extName = chrome.i18n.getMessage('extName');
  const studyTitle = chrome.i18n.getMessage('notificationTitle');
  const studyMessage = chrome.i18n.getMessage('notificationMessage');

  window.addEventListener('DOMContentLoaded', () => {
    Localizer.localize();
  });

  let last = 0;
  var history_log = [];
  var current_state = '';
  let day = 0;

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
    let date = Utilities.getTimes();

    WordList.initList(function(_wordList) {
      WordList.setWord(function(_wordSet) {
        messageNotification();
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
    new Notification(studyTitle, {
      icon: chrome.extension.getURL('images/icon_128.png'),
      body: studyMessage
    });
  }

  const checkTime = setInterval(function() {
    let date = Utilities.getTimes();

    Preferences.get(options => {
      let pollTime = options.pollTime;
      let startTime = options.startTime;
      let stopTime = options.stopTime;

      if (date.last > (last + (1000 * 60 * pollTime))) {
        if (date.day !== day) {
          WordList.resetWordSet();
        }

        if (date.hour > startTime && date.hour < stopTime) {
          checkWords();
        }
      }
    });
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
