import './styles/main.scss';

import bindFootnotes from 'littlefoot';
import bindToggles from './js/toggle';
import bindSearch from "./js/search/index";
import bindEventTracking from './js/eventTracking';

function init() {
    if (APP.CONFIG.ALGOLIA) {
      APP.SEARCH = bindSearch(APP.CONFIG.ALGOLIA); // eslint-disable-line no-param-reassign
    }
    bindToggles();
    bindEventTracking();
    bindFootnotes();

    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');
}

window.addEventListener('DOMContentLoaded', init);
