const container = document.querySelector('.container');
const headingSpan2 = document.querySelector('.heading-span-2');
const form = document.querySelector('.form');

// CLEAR FORM
const clearForm = () => {
    document.querySelectorAll('.form-input-wrapper').forEach((item) => {
        item.className = 'form-input-wrapper';
    });
    form.reset()
};


// SIGNUP BTN
document.querySelector('.signup-btn').addEventListener('click', () => {
    container.classList.add('change');
    setTimeout(() => {
        headingSpan2.textContent = 'Up';
    }, 200);
    form.className = 'form sign-up';
    clearForm();
});

// SIGNIN BTN
document.querySelector('.signin-btn').addEventListener('click', ()=> {
    container.classList.remove('change');
    setTimeout(() => {
        headingSpan2.textContent = 'In';
    }, 200);
    form.className = 'form sign-in';
    clearForm();
});

// VALIDATION
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// ERROR
const error = (input, message) => {
    const inputWrapper = input.parentElement;
    inputWrapper.className = 'form-input-wrapper error';
    inputWrapper.querySelector('.message').textContent = message;
};

// SUCCESS
const success = () => {
    const inputWrapper = input.parentElement;
    inputWrapper.className = 'form-input-wrapper success';
}

// CHECK EMAIL
const checkEmail = (input) => {
    const regEx =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(regEx.test(input.value.trim())) {
        success(input);
    } else {
        error(input, 'Email is not valid');
    };
};

// REQUIRED FIELDS
const checkRequiredFields = (inputArr) => {
    inputArr.forEach((input) => {
        if(input.value.trim() === '') {
            if(input.id === 'password2') {
                error(input, 'Password confirmation is required');
            } else {
                error(input, `${input.id} is required`);
            }
        } else {
            success(input);
        }
    });
};

// CHECK LENGTH
const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        error(input, `${input.id} must be at least ${min} characters`);
    } else if (input.vale.length > max) {
        error(input, `${input.id} must be less than ${max} characters`);
    } else {
        success(input);
    };
}

// MATCHING PASSWORDS
const passwordMatch = (input1, input2) => {
    if(input.vale !== input2.value) {
        error(input2, 'Passwords do not match');
    };
};

// EVENT LISTENER
form.addEventListener('submit',(e)=> {
    e.preventDefault();

    if(form.classList[1] === 'signup') {
        checkRequiredFields([username, email, password, password2])
        checkLength(username, 2, 15);
        checkLength(password, 5, 25);
        passwordMatch(password, password2);
    } else {
        checkRequiredFields([email, password]);
    }
    checkEmail(email);
});