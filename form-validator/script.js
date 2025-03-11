const form = document.getElementById('form');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function showSuccess(inputElement) {
  const formControlItem = inputElement.parentElement;
  formControlItem.className = 'form-control-item success';
}

function showError(inputElement, errorMessage) {
  const formControlItem = inputElement.parentElement;
  formControlItem.className = 'form-control-item error';

  const errorTextElement = formControlItem.querySelector('small');
  errorTextElement.innerText = errorMessage;
}

function checkRquired(inputElements) {
  inputElements.forEach((inputElement) => {
    if (inputElement.value.trim() === '') {
      showError(inputElement, 'is reuqired');
    } else {
      showSuccess(inputElement);
    }
  });
}

function checkLength(inputElement, minLength, maxLength) {
  if (inputElement.value.length < minLength) {
    showError(inputElement, `Must be at least ${minLength} characters`);
  } else if (inputElement.value.length > maxLength) {
    showError(inputElement, `Must less than ${maxLength} characters`);
  } else {
    showSuccess(inputElement);
  }
}

function checkPasswordsMatch(passwordElement, confirmPasswordElement) {
  if (
    passwordElement.value === '' ||
    passwordElement.value !== confirmPasswordElement.value
  ) {
    showError(confirmPasswordElement, 'Passwords do not match');
  } else {
    showSuccess(confirmPasswordElement);
  }
}

function checkEmail(inputElement) {
  const isValid = String(inputElement.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (isValid) {
    showSuccess(inputElement);
  } else {
    showError(inputElement, 'Email is not valid');
  }
}

function clearInputElements(elements) {
  elements.forEach((element) => {
    element.value = '';
  });
}

function clearInputStyles() {
  const errorElements = form.querySelectorAll('.form-control-item.error');
  errorElements.forEach((element) => {
    element.classList.remove('error');
  });

  const successElements = form.querySelectorAll(
    '.form-control-item.success'
  );
  successElements.forEach((element) => {
    element.classList.remove('success');
  });
}

username.addEventListener('input', () => {
  checkLength(username, 3, 15);
});

email.addEventListener('input', () => {
  checkEmail(email);
});

password.addEventListener('input', () => {
  checkLength(password, 6, 25);
});

confirmPassword.addEventListener('input', () => {
  checkPasswordsMatch(password, confirmPassword);
  checkLength(confirmPassword, 6, 25);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);

  const errorElements = document.querySelectorAll('.form-control-item.error');

  if (errorElements.length === 0) {
    alert('Your form was submitted successfully');

    clearInputElements([username, password, email, confirmPassword]);
    clearInputStyles();
  } else {
    alert('Please fill the information correctly');
  }
});
