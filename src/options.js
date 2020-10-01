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

  // window.addEventListener('DOMContentLoaded', () => {
  //   Localizer.localize();
  // });

  let submitButton = document.getElementById('saveButton');
  let pollTime = document.querySelector('input[name=pollTime]');
  let startTime = document.querySelector('input[name=startTime]');
  let stopTime = document.querySelector('input[name=stopTime]');
  let setLang = 'en';

  submitButton.addEventListener('click', function(e) {
    if (event.target.id === 'saveButton') {
      Preferences.set('pollTime', pollTime.value);
      Preferences.set('startTime', startTime.value);
      Preferences.set('stopTime', stopTime.value);
    }
  });

  locales.forEach(area => { Utilities.updateMessage(area) });

  Preferences.get(options => {
    pollTime.value = options.pollTime;
    startTime.value = options.startTime;
    stopTime.value = options.stopTime;
    // setLang = options.language;
  });
})();
