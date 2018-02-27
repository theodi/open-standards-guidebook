import bindToggles from './modules/toggle';
import bindModals from './modules/modals';
import bindAjaxForms from './modules/ajaxForm';
import littlefoot from 'littlefoot';

function init(){
    bindToggles();
    bindModals();
    bindAjaxForms();
    littlefoot();
}

window.addEventListener('DOMContentLoaded', init);
