function toggle({ trigger, target, opts }) {
    const isHidden = target.getAttribute('aria-hidden') === 'true';
    trigger.classList.toggle(opts.triggerActiveClass);
    target.classList.toggle(opts.targetActiveClass);
    target.setAttribute('aria-hidden', !isHidden);
}

function bindToggle(trigger, opts) {
    const targetSelector = trigger.getAttribute('data-toggle');
    const target = document.querySelector(targetSelector);

    trigger.addEventListener('click', function() {
        toggle({ trigger, target, opts });
    });
}

export default function initToggle(selector = '[data-toggle]', opts){
    const defaults = {
        targetActiveClass: 'is--open',
        triggerActiveClass: 'is--active',
    };

    const options = Object.assign({}, defaults, opts);

    const toggleElements = document.querySelectorAll(selector);

    [...toggleElements].forEach(item => bindToggle(item, options));
}
