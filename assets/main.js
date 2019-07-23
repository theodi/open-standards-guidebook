import './styles/main.scss';

import bindFootnotes from 'littlefoot';
import bindToggles from './js/toggle';
import bindEventTracking from './js/eventTracking';

function init() {
    bindToggles();
    bindEventTracking();
    bindFootnotes();

    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');
}

window.addEventListener('DOMContentLoaded', init);
