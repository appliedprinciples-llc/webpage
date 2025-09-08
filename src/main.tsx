// src/main.tsx
const form: HTMLFormElement = document.getElementById('contact-form') as HTMLFormElement;
const result = document.getElementById('result');

if (form) {
    const name = document.getElementById('name') as HTMLInputElement;

    if (name) {
        name.addEventListener('invalid', function () {
            if (name.validity.valueMissing) {
                name.setCustomValidity('The Name field is mandatory. Please provide a value.');
            } else {
                name.setCustomValidity(''); // Clear custom validity if other issues are present
            }
        });

        name.addEventListener('input', function () {
            // Clear custom validity when the user starts typing to allow default validation
            name.setCustomValidity('');
        });
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        if (result) {
            result.innerHTML = "Please wait..."

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            }).then(async (response) => {
                let json = await response.json();
                if (response.status === 200) {
                    result.innerHTML = "Form submitted successfully";
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            }).catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            }).then(function () {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
        }
    });
}
