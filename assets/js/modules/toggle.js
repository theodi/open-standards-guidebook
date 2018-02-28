function toggle({ trigger, target, opts }) {
    const wasHidden = target.getAttribute('aria-hidden') === 'true';

    if (wasHidden) {
        opts.beforeIn({ trigger, target, opts });
    } else {
        opts.beforeOut({ trigger, target, opts });
    }


    trigger.classList.toggle(opts.triggerActiveClass);
    target.classList.toggle(opts.targetActiveClass);
    target.setAttribute('aria-hidden', !wasHidden);

    if (wasHidden) {
        opts.afterIn({ trigger, target, opts });
    } else {
        opts.afterOut({ trigger, target, opts });
    }
}

function bindToggle(trigger, opts) {

    const targetAttribute = opts.selector.slice(1, -1);
    const targetSelector = trigger.getAttribute(targetAttribute);
    const target = document.querySelector(targetSelector);

    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        toggle({ trigger, target, opts });
    });
}

export default function initToggle(selector = '[data-toggle]', opts){
    const defaults = {
        targetActiveClass: 'is--open',
        triggerActiveClass: 'is--active',
        beforeIn:() => {},
        afterIn: () => {},
        beforeOut: () => {},
        afterOut:() => {},
        selector: selector,
    };

    const options = Object.assign({}, defaults, opts);

    const toggleElements = document.querySelectorAll(selector);

    [...toggleElements].forEach(item => bindToggle(item, options));
}
