import bindToggles from './modules/toggle';
import bindModals from './modules/modals';
import bindAjaxForms from './modules/ajaxForm';
// import BareFoot from './vendor/barefoot';

function init(){
    bindToggles();
    bindModals();
    bindAjaxForms();
    // BareFoot();
}

window.addEventListener('DOMContentLoaded', init);
