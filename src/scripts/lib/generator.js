import template from './template.js';
import PhoneNumber from 'awesome-phonenumber';

class SignatureGenerator {
	constructor(form, preview) {
		this.form = form;
		this.preview = preview;
	}

	init() {
		this.renderPreview();
		this.registerEvents();
	}

	renderPreview() {
		// Render the initial template
		this.preview.innerHTML = template;
		// Get all the input placeholders and update the preview
		const inputs = this.getInputs();
		inputs.forEach((input) => {
			const id = input.dataset.signatureInput;
			this.preview.querySelector(`#${id}`).innerHTML = input.placeholder;
		});
	}

	registerEvents() {
		const inputs = this.getInputs();
		inputs.forEach((input) => {
			input.addEventListener('input', this.updatePreview.bind(this));
		});
		document.querySelector('#copy-signature').addEventListener('click', this.copySignature.bind(this));
	}

	getInputs() {
		return this.form.querySelectorAll('input[data-signature-input]');
	}

	updatePreview(event) {
		const id = event.target.dataset.signatureInput;

		let value = '';
		switch (event.target.type) {
			case 'tel':
				value = this.formattedPhone(event.target.value);
				break;
			default:
				value = event.target.value;
		}
		value = value || event.target.placeholder;

		this.preview.querySelector(`#${id}`).innerHTML = value;
	}

	copySignature(event) {
		const textarea = document.createElement('textarea');
		const value = this.minifyCode(this.preview.innerHTML);
		textarea.value = value;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();

		// Add a little message under the button to indicate that the code has been copied
		const prevValue = event.target.value;
		event.target.value = 'Copied signature!';
		setTimeout(() => {
			event.target.value = prevValue;
		}, 1500);
	}

	formattedPhone(number) {
		const phone = new PhoneNumber(number);

		if (phone.isValid()) {
			return phone.getNumber('international');
		} else {
			return number;
		}
	}

	minifyCode(code) {
		return code.replace(/\n/g, '');
	}
}

export default SignatureGenerator;
