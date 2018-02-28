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
}

window.addEventListener('DOMContentLoaded', init);
