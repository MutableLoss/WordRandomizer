(function() {
  window.wordRandomizer = window.wordRandomizer || {};
  const i18n = window.chrome.i18n;

  wordRandomizer.Localizer = function() {
    this.defaultTranslate = i18n.getMessage;
    this.defaultAttributeName = 'data-chrome-i18n';
  }

  wordRandomizer.Localizer.prototype = {
    constructor: function(options = {}) {
      const { translate = this.defaultTranslate, attributeName = this.defaultAttributeName, parse = this.defaultParse } = options;
      this.translate = translate;
      this.attributeName = attributeName;
      this.parse = parse;
    },

    defaultParse: function(value) {
      return (value || '').split(';').map(text => (text.includes('=') ? text.split('=') : ['', text]));
    },

    localizeElement: function(element) {
      for (const [destination, name] of this.parse(element.getAttribute(this.attributeName))) {
        console.log(`${name} / ${destination}`)
        if (!name)
          continue;
        const message = this.translate(name) || '';
        if (!destination) {
          element.textContent = message;
        } else {
          element.setAttribute(destination, message);
        }
      }
    },

    localize: function(target = window.document) {
      const nodes = target instanceof NodeList ? target : target.querySelectorAll(`[${CSS.escape(this.attributeName)}]`);
      for (const node of nodes)
        this.localizeElement(node);
    }
  }
})();
