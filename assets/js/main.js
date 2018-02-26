import bindToggles from './modules/toggle';
import bindModals from './modules/modals';
import bindAjaxForms from './modules/ajaxForm';

function init(){
    bindToggles();
    bindModals();
    bindAjaxForms();
}

window.addEventListener('DOMContentLoaded', init);
