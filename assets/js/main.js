import bindToggles from './modules/toggle';
import bindModals from './modules/modals';

function init(){
    bindToggles();
    bindModals();
}

window.addEventListener('DOMContentLoaded', init);
