(function() {
  window.wordRandomizer = window.wordRandomizer || {};
  const Preferences = new wordRandomizer.Preferences;
  const Localizer = new wordRandomizer.Localizer;

  window.addEventListener('DOMContentLoaded', () => {
    Localizer.localize();
  });

  let submitButton = document.getElementById('submit');
  let pollTime = document.querySelector('input[name=pollTime]');
  let startTime = document.querySelector('input[name=startTime]');
  let stopTime = document.querySelector('input[name=stopTime]');
  let setLang = 'en';

  Preferences.get('pollTime', savedPollTime => {
    pollTime.value = savedPollTime;
  });

  Preferences.get('startTime', savedStartTime => {
    startTime.value = savedStartTime;
  });

  Preferences.get('stopTime', savedStopTime => {
    stopTime.value = savedStopTime;
  });

  Preferences.get('language', savedLanguage => {
    setLang = savedLanguage || Preferences.getLocal('language');
  });

  submitButton.addEventListener('click', function() {
    Preferences.set('pollTime', pollTime.value);
    Preferences.set('startTime', startTime.value);
    Preferences.set('stopTime', stopTime.value);
  });
})();
