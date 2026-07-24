window.LearnHubApp = window.LearnHubApp || {};

window.LearnHubApp.config = {
  breakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },
};

window.LearnHubApp.pages = window.LearnHubApp.pages || {};

window.LearnHubApp.getCurrentPage = function getCurrentPage() {
  return document.body ? document.body.dataset.page || 'index' : 'index';
};

window.LearnHubApp.registerPage = function registerPage(pageName, initFn) {
  if (typeof pageName !== 'string' || typeof initFn !== 'function') {
    return;
  }

  window.LearnHubApp.pages[pageName] = initFn;
};

window.LearnHubApp.runPage = function runPage() {
  const pageName = window.LearnHubApp.getCurrentPage();
  const initFn = window.LearnHubApp.pages[pageName];

  if (typeof initFn === 'function') {
    initFn();
  }
};

document.addEventListener('DOMContentLoaded', function onDomReady() {
  window.LearnHubApp.runPage();
});
