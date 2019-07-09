import './components/main.scss';

import bindFootnotes from 'littlefoot';
import bindToggles from './modules/toggle';
import bindModals from './modules/modals';
import bindAjaxForms from './modules/ajaxForm';
import bindEventTracking from './modules/eventTracking';

function init() {
    bindToggles();
    bindModals();
    bindAjaxForms();
    bindEventTracking();
    bindFootnotes();

    document.documentElement.classList.remove('js-loading');
    document.documentElement.classList.add('js-loaded');
}

window.addEventListener('DOMContentLoaded', init);
