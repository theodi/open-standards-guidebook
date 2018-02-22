function toggle({ trigger, target, opts }) {
    const wasHidden = target.getAttribute('aria-hidden') === 'true';

    trigger.classList.toggle(opts.triggerActiveClass);
    target.classList.toggle(opts.targetActiveClass);
    target.setAttribute('aria-hidden', !wasHidden);

    if (wasHidden) {
        opts.afterIn();
    } else {
        opts.afterOut();
    }
}

function bindToggle(trigger, opts) {

    const targetAttribute = opts.selector.slice(1, -1);
    const targetSelector = trigger.getAttribute(targetAttribute);
    const target = document.querySelector(targetSelector);

    trigger.addEventListener('click', function() {
        toggle({ trigger, target, opts });
    });
}

export default function initToggle(selector = '[data-toggle]', opts){
    const defaults = {
        targetActiveClass: 'is--open',
        triggerActiveClass: 'is--active',
        afterIn: () => {},
        afterOut: () => {},
        selector: selector,
    };

    const options = Object.assign({}, defaults, opts);

    const toggleElements = document.querySelectorAll(selector);

    [...toggleElements].forEach(item => bindToggle(item, options));
}
