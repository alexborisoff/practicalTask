const ajax = () => {
    const form = document.getElementById('feedback_form');
    const input = document.querySelectorAll('input');
    const textarea = document.getElementById('message_textarea');

    const messageUser = {
        loading: 'Waiting loading...',
        success: 'Thanks',
        failure: 'Something wrong :(',
    };

    const answer = {
        error: {
            status: 'error',
            fields: {
                inputName: 'сообщение об ошибке',
            },
        },
        success: {
            status: 'success',
            msg: 'Ваша заявка успешно отправлена',
        },
    };

    // POST Fetch-request
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messageUser.loading;
        let response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(
                `URL Error: ${url}, status code ${response.status}`
            );
        }

        return await response.json();
    };

    // GET Fetch-request
    const getData = async (url) => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `URL Error: ${url}, status code ${response.status}`
            );
        }

        return await response.json();
    };

    // Clear all fields
    const clearFields = () => {
        input.forEach((item) => {
            item.value = '';
        });
        textarea.value = '';
    };

    // Send to server formData
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        form.appendChild(statusMessage);

        const formData = JSON.stringify(new FormData(form));

        postData('http://localhost:9090/api/registration', formData)
            .then((response) => {
                statusMessage.textContent = messageUser.success;

                alert(answer.success.msg);

                clearFields();
                setTimeout(() => {
                    statusMessage.remove();
                }, 3000);
            })
            .catch(() =>
                alert(`${input.value} ${answer.error.fields.inputName}`)
            );

        getData('http://localhost:9090/api/ping').then((data) => {
            console.log(data);
        });
    });
};

export default ajax;
