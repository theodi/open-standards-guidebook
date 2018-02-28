import axios from 'axios';

function AjaxForm(form) {
    this.form = form;
    this.action = form.getAttribute('action');
    this.submitBtn = form.querySelector('input[type=submit]');
    this.messageContainer = form.querySelector('[data-form-message]');

    this.init();
}

AjaxForm.prototype = {
    constructor: AjaxForm,
    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    },
    handleSubmit(e) {
        e.preventDefault();

        this.submitBtn.setAttribute('disabled', true);

        this.ajaxSubmit();
    },
    ajaxSubmit() {
        const data = new FormData(this.form);
        const ajaxForm = this;

        axios.post(this.action, data)
            .then(response => ajaxForm.handleSuccess(response))
            .catch(error => ajaxForm.handleError(error));
    },
    handleSuccess({ data }) {
        this.showSuccessMessage(data.success);
        this.submitBtn.removeAttribute('disabled');
    },
    handleError(error) {
        this.showErrorMessage();
        console.error(error);
        this.submitBtn.removeAttribute('disabled');
    },
    showSuccessMessage(successUrl) {
        this.messageContainer.innerHTML = `<div class="callout">
            <h4>We've received your submission</h4>
            <p>Thanks for taking the time to contact us - you can <a href="${successUrl}"
            targe"_blank" rel="noreferrer noopener">track the progress of your
            submission here</a>.</p></div>`;
    },
    showErrorMessage() {
        this.messageContainer.innerHTML = `<div class="callout">
            <h4>Sorry, something went wrong</h4>
            <p>We weren't able to process your submission. If this problem persists, please <a href="/about/contact/">contact us</a>.</p></div>`;
    },
};

export default function () {
    [...document.querySelectorAll('[data-ajax-form]')].forEach(f => new AjaxForm(f));
}
