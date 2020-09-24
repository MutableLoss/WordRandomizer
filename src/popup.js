(function() {
  const bkg = chrome.extension.getBackgroundPage();

  const port = chrome.runtime.connect({ name: "randomizer" });

  var settings, word, wordSet;

  function createBlock() {
    let wordDiv = document.querySelector('.word');
    let wordBlock = document.createElement('span');
    wordBlock.setAttribute('class', 'word-block word-question');
    wordBlock.innerHTML = word.word;

    let answerBlock = document.createElement('span');
    answerBlock.setAttribute('class', 'word-block word-answer');
    answerBlock.innerHTML = word.meaning;

    wordDiv.append(wordBlock);

    if (word.example && word.example.trim()) {
      let exampleBlock = document.createElement('span');
      exampleBlock.setAttribute('class', 'word-block word-example');
      exampleBlock.innerHTML = word.example;

      wordDiv.append(exampleBlock);
    }

    wordDiv.append(answerBlock);
  }

  chrome.runtime.sendMessage({ name: 'clear-badge' }, function(response) {});
  chrome.runtime.sendMessage({ name: 'get-word' }, function(response) {});


  chrome.runtime.onMessage.addListener(function(message) {
    if ('action' in message && message.action == 'update-word') {
      if (Object.keys(message).includes('word')) {
        word = message.word;
        wordSet = message.wordSet;
        createBlock();
      }
    }
  })
})();
