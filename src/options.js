(function() {
  const locales = [
    'extName',
    'pollTimeLabel',
    'pollInputType',
    'startTimeLabel',
    'stopTimeLabel',
    'saveButton'
  ];

  window.wordRandomizer = window.wordRandomizer || {};
  const Preferences = new wordRandomizer.Preferences;
  const Utilities = new wordRandomizer.Utilities;
  const Localizer = new wordRandomizer.Localizer;

  window.addEventListener('DOMContentLoaded', () => {
    Localizer.localize();
  });

  let submitButton = document.getElementById('saveButton');
  let pollTime = document.querySelector('input[name=pollTime]');
  let startTime = document.querySelector('input[name=startTime]');
  let stopTime = document.querySelector('input[name=stopTime]');
  let setLang = 'en';

  locales.forEach(area => { Utilities.updateMessage(area) });

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
