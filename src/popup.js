(function() {
  const bkg = chrome.extension.getBackgroundPage();

  const port = chrome.runtime.connect({ name: "randomizer" });

  var settings

  function createBlock() {
    let wordList = document.querySelector('.word-list');
    let wordBlock = document.createElement('span');
    wordBlock.setAttribute('target', '_inbox');
    wordBlock.setAttribute('class', 'button message-block');
    wordBlock.textHtml = window.setWord

    bkg.console.log(`pop: ${WordList.getWord()}`)

    wordList.append(wordBlock);
  }

  function onSettingsReady(message) {
    console.log(message)
  }

  chrome.runtime.sendMessage({ name: 'get-word' }, function(response) {
    console.log(`resp: ${response}`)
      wordSet = response.word;
      onSettingsReady(settings);
  });

  chrome.runtime.onMessage.addListener(function(message) {
    if ('action' in message && message.action == 'update-word') {
      console.log(`response: ${response}`)
      wordSet = response.word;
      onSettingsReady(settings);
    }
  })

  createBlock();
})();
