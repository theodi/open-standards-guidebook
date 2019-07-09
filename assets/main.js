import './styles/main.scss';

import bindFootnotes from 'littlefoot';
import bindToggles from './js/toggle';
import bindModals from './js/modals';
import bindAjaxForms from './js/ajaxForm';
import bindEventTracking from './js/eventTracking';

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
