import SignatureGenerator from './lib/generator.js';

const signatureForm = document.querySelector('#signature-form');
const signaturePreview = document.querySelector('#signature-preview');
const signatureGenerator = new SignatureGenerator(signatureForm, signaturePreview);
signatureGenerator.init();
