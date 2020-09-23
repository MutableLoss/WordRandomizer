(function() {
  const bkg = chrome.extension.getBackgroundPage();

  const port = chrome.runtime.connect({ name: "randomizer" });

  var settings, wordSet

  function createBlock() {
    let wordDiv = document.querySelector('.word');
    let wordBlock = document.createElement('span');
    wordBlock.setAttribute('class', 'word-block word-question');
    wordBlock.innerHTML = wordSet.word

    let answerBlock = document.createElement('span');
    answerBlock.setAttribute('class', 'word-block word-answer');
    answerBlock.innerHTML = wordSet.meaning

    wordDiv.append(wordBlock);
    wordDiv.append(answerBlock);
  }

  chrome.runtime.sendMessage({ name: 'get-word' }, function(response) {});

  chrome.runtime.onMessage.addListener(function(message) {
    if ('action' in message && message.action == 'update-word') {
      wordSet = message.word;
      createBlock();
    }
  })
})();
