import IMask from 'imask';

export const phoneInput = document.getElementById('phone');

export const maskOption = new IMask(phoneInput, {
    mask: '+{375} (00) 000-00-00',
});
