import bindToggles from './toggle';

const pageContainer = document.querySelector('[data-page-container]');
const blurClass = 'is--modal-active';

const opts = {
    beforeIn({ opts }) {
        opts.activeElement =  document.activeElement;
    },
    afterIn: ({ target }) => {
        pageContainer.classList.add(blurClass);

        const fields = [...target.querySelectorAll('input, textarea, select')];

        if (fields.length) {
            fields[0].focus();
        }
    },
    afterOut: ({ opts }) => {
        pageContainer.classList.remove(blurClass);
        if (opts.activeElement) {
            opts.activeElement.focus();
        }
    },
};

export default function() {
    bindToggles('[data-modal]', opts);
}
