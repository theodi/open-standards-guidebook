import bindToggles from './toggle';

const pageContainer = document.querySelector('[data-page-container]');
const blurClass = 'is--modal-active';

const opts = {
    afterIn: () => pageContainer.classList.add(blurClass),
    afterOut: () => pageContainer.classList.remove(blurClass),
};

export default function() {
    bindToggles('[data-modal]', opts);
}
