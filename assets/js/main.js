import bindToggles from './modules/toggle';
import bindModals from './modules/modals';
import bindAjaxForms from './modules/ajaxForm';
import bindEventTracking from './modules/eventTracking';
import bindFootnotes from 'littlefoot';

function init(){
    bindToggles();
    bindModals();
    bindAjaxForms();
    bindEventTracking();
    bindFootnotes();
}

window.addEventListener('DOMContentLoaded', init);
