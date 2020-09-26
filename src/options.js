(function() {
  window.wordRandomizer = window.wordRandomizer || {};

  let Preferences = new wordRandomizer.Preferences;

  let submitButton = document.getElementById('submit');
  let pollTime = document.getElementById('pollTime');
  let startTime = document.getElementById('startTime');
  let stopTime = document.getElementById('stopTime');

  Preferences.get('pollTime', savedPollTime => {
    pollTime.value = savedPollTime;
  });

  Preferences.get('startTime', savedStartTime => {
    startTime.value = savedStartTime;
  });

  Preferences.get('stopTime', savedStopTime => {
    stopTime.value = savedStopTime;
  });

  submitButton.addEventListener('click', function() {
    Preferences.set('pollTime', pollTime.value);
    Preferences.set('startTime', startTime.value);
    Preferences.set('stopTime', stopTime.value);
  });
})();
