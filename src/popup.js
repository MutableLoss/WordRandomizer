(function() {
  const bkg = chrome.extension.getBackgroundPage();

  const port = chrome.runtime.connect({ name: "randomizer" });

  var settings, wordSet

  function createBlock() {
    let wordDiv = document.querySelector('.word');
    let wordBlock = document.createElement('span');
    wordBlock.setAttribute('class', 'word-block word-question');
    wordBlock.innerHTML = wordSet.word;

    let answerBlock = document.createElement('span');
    answerBlock.setAttribute('class', 'word-block word-answer');
    answerBlock.innerHTML = wordSet.meaning;

    wordDiv.append(wordBlock);

    if (wordSet.example && wordSet.example.trim()) {
      let exampleBlock = document.createElement('span');
      exampleBlock.setAttribute('class', 'word-block word-example');
      exampleBlock.innerHTML = wordSet.example;

      wordDiv.append(exampleBlock);
    }

    wordDiv.append(answerBlock);
  }

  chrome.runtime.sendMessage({ name: 'clear-badge' }, function(response) {});
  chrome.runtime.sendMessage({ name: 'get-word' }, function(response) {});


  chrome.runtime.onMessage.addListener(function(message) {
    if ('action' in message && message.action == 'update-word') {
      if (Object.keys(message).includes('word')) {
        wordSet = message.word;
        createBlock();
      }
    }
  })
})();
