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
		// Get all the input placeholders and update the preview
		const inputs = this.getInputs();

		let out = '';

		inputs.forEach((input, index) => {
			const br = index === inputs.length - 1 || !input.value ? '' : '<br>';

			switch (input.dataset.style) {
				case 'title':
					out += `<strong>${input.value}</strong>${br}`;
					break;
				case 'phone':
					const phone = this.formattedPhone(input.value);
					out += `<a style="color:black;font-family: Arial, Helvetica, sans-serif;" href="tel:${input.value}">${phone}</a>${br}`;
					break;
				default:
					out += `${input.value}${br}`;
			}
		});

		// Render the initial template
		this.preview.innerHTML = template(out);
	}

	registerEvents() {
		const inputs = this.getInputs();

		inputs.forEach((input) => {
			input.addEventListener('input', this.renderPreview.bind(this));
			input.addEventListener('click', (e) => e.target.select());
		});

		document.querySelector('#copy-signature').addEventListener('click', this.copySignature.bind(this));
		document.querySelector('#copy-code').addEventListener('click', this.copySignatureCode.bind(this));
	}

	getInputs() {
		return this.form.querySelectorAll('input[data-signature]');
	}

	copySignature(event) {
		const content = this.preview.innerHTML;
		function listener(e) {
			e.clipboardData.setData('text/html', content);
			e.clipboardData.setData('text/plain', content);
			e.preventDefault();
		}
		document.addEventListener('copy', listener);
		document.execCommand('copy');
		document.removeEventListener('copy', listener);
		this.copiedSignatureButtonMessage(event);
	}

	copySignatureCode(event) {
		const textarea = document.createElement('textarea');
		const value = this.minifyCode(this.preview.innerHTML);
		textarea.value = value;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		textarea.remove();
		this.copiedSignatureButtonMessage(event);
	}

	copiedSignatureButtonMessage(event) {
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
