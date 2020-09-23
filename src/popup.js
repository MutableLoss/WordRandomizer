(function() {
  const WordList = new wordRandomizer.WordList;

  const bkg = chrome.extension.getBackgroundPage();
  const port = chrome.runtime.connect({ name: "randomizer" });

  function createBlock() {
    let wordList = document.querySelector('.word-list');
    let wordBlock = document.createElement('span');
    wordBlock.setAttribute('target', '_inbox');
    wordBlock.setAttribute('class', 'button message-block');
    wordBlock.textHtml = window.setWord

    bkg.console.log(`pop: ${WordList.getWord()}`)

    wordList.append(wordBlock);
  }

  function populateList() {
    WordList.initList(words => createBlock());

    chrome.runtime.sendMessage({}, function(response) {
      console.log(`popup: ${response}`)
    });
  }

  populateList();
})();
