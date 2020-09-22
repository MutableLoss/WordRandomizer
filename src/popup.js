(function() {
  const WordList = new wordRandomizer.WordList;
  const port = chrome.runtime.connect({ name: "randomizer" });

  function createBlock() {
    let wordList = document.querySelector('.word-list');
    let wordBlock = document.createElement('a');
    wordBlock.setAttribute('target', '_inbox');
    wordBlock.setAttribute('class', 'button message-block');

    wordList.append(wordBlock);
  }

  function populateList() {
    WordList.initList(words => createBlock());

    chrome.runtime.sendMessage({}, function(response) {});
  }

  populateList();
})();
