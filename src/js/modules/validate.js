export default function validation(form) {
    // Deleting existing errorMessage
    function deleteErrorMessage(currentInput) {
        const parent = currentInput.parentNode;

        if (parent.classList.contains('error')) {
            parent.querySelector('.error_text').remove();
            parent.classList.remove('error');
        }
    }

    //  Creating text with error
    function createErrorMessage(currentInput, errorMessage) {
        const parentInputNode = currentInput.parentNode;

        const errorText = document.createElement('span');
        errorText.classList.add('error_text');
        errorText.textContent = errorMessage;

        parentInputNode.classList.add('error');
        parentInputNode.append(errorText);
    }

    // Validation
    let answer = true;
    const textInputs = form.querySelectorAll('input[type=text]');
    const emailInput = form.querySelector('input[type=email]');
    const textareaMessage = form.querySelector('textarea');

    // Validate each element on filling
    for (const input of textInputs) {
        deleteErrorMessage(input);
        if (input.dataset.required == 'true') {
            if (input.value == '') {
                createErrorMessage(input, '*required');
                answer = false;
            }
        }
    }

    deleteErrorMessage(emailInput);
    if (emailInput.dataset.required == 'true') {
        if (!emailInput.value.match(/\S+@\S+\.\S+/)) {
            createErrorMessage(emailInput, '*required email');
            answer = false;
        }
    }

    if (textareaMessage.dataset.required == 'true') {
        if (textareaMessage.value == '') {
            createErrorMessage(textareaMessage, '*required message');
            answer = false;
        }
    }

    return answer;
}

document
    .getElementById('feedback_form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        if (validation(this) == true) {
            alert('Data is valid');
        }
    });
//  Event submit
