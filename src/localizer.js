(function() {
  window.wordRandomizer = window.wordRandomizer || {};
  const i18n = (window.browser || window.chrome || {}).i18n || { getMessage: () => undefined };

  wordRandomizer.Localizer = function() {
    this.defaultTranslate = i18n.getMessage;
    this.defaultAttributeName = 'data-chrome-i18n';
  }

  wordRandomizer.Localizer.prototype = {
    constructor: function(options = {}) {
      const { translate = Localizer.defaultTranslate, attributeName = Localizer.defaultAttributeName, parse = Localizer.defaultParse } = options;
      this.translate = translate;
      this.attributeName = attributeName;
      this.parse = parse;
    },

    defaultParse: function(value) {
      return (value || '').split(';').map(text => (text.includes('=') ? text.split('=') : ['', text]));
    },

    localizeElement: function(element) {
      for (const [destination, name] of this.parse(element.getAttribute(this.attributeName))) {
        if (!name)
          continue;
        const message = this.translate(name) || '';
        if (!destination) {
          element.textContent = message;
        }
        else {
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
