(function() {
  const bkg = chrome.extension.getBackgroundPage();

  const port = chrome.runtime.connect({ name: "randomizer" });

  var settings, word, wordSet;
  var currentWord = 0;

  function nextWord() {
    currentWord++;

    wipeBlock();
    createBlock();
  }

  function wipeBlock() {
    let wordList = document.querySelector('.word-list');
    wordList.setAttribute('height', '250px');

    let wordDiv = document.querySelector('.word');
    let example = document.querySelector('.word-example');
    let button = document.querySelector('.next-button');

    if (example) {
      wordDiv.removeChild(example);
    }
    wordDiv.removeChild(button);
  }

  function createBlock() {
    let wordDiv = document.querySelector('.word');
    let wordBlock = document.querySelector('.word-question');
    wordBlock.innerHTML = wordSet[currentWord].word;

    let typeContainer = document.querySelector('.type-container');
    typeContainer.children[0].innerHTML = wordSet[currentWord].type;

    let answerBlock = document.querySelector('.word-answer');
    answerBlock.innerHTML = wordSet[currentWord].meaning;

    if (wordSet[currentWord].example && wordSet[currentWord].example.trim()) {
      let exampleBlock = document.createElement('span');
      exampleBlock.setAttribute('class', 'word-block word-example');
      exampleBlock.innerHTML = wordSet[currentWord].example;

      wordDiv.insertBefore(exampleBlock, answerBlock);
    }

    if (currentWord < (wordSet.length - 1)) {
      let nextButton = document.createElement('button')
      nextButton.setAttribute('class', 'next-button');
      nextButton.id = 'next';
      nextButton.innerText = 'Next';

      wordDiv.insertBefore(nextButton, typeContainer);
    }
  }

  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'next') {
      nextWord();
    }
  })

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
