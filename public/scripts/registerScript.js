document.addEventListener('DOMContentLoaded', function () {
  const loginInput = document.querySelector('input[type="text"]')
  const passwordInput = document.getElementById('first-psw')
  const passwordInputSec = document.getElementById('second-psw')
  const loginLabel = document.getElementById('login-label')
  const passwordLabel = document.getElementById('password-label')
  const passwordLabelSec = document.getElementById('password-label-sec')

  loginInput.addEventListener('input', function () {
    if (loginInput.value.trim() !== '') {
      loginLabel.classList.add('disable-label')
    } else {
      loginLabel.classList.remove('disable-label')
    }
  })

  passwordInput.addEventListener('input', function () {
    if (passwordInput.value.trim() !== '') {
      passwordLabel.classList.add('disable-label')
    } else {
      passwordLabel.classList.remove('disable-label')
    }
  })
  passwordInputSec.addEventListener('input', function () {
    if (passwordInputSec.value.trim() !== '') {
      passwordLabelSec.classList.add('disable-label')
    } else {
      passwordLabelSec.classList.remove('disable-label')
    }
  })
})
document.addEventListener('DOMContentLoaded', function () {
  const firstPassword = document.getElementById('first-psw')
  const secondPassword = document.getElementById('second-psw')
  const sendButton = document.getElementById('sendButton')
  const errorMessage = document.getElementById('password-error-message')

  sendButton.addEventListener('click', function () {
    const password1 = firstPassword.value
    const password2 = secondPassword.value
    const loginInput = document.querySelector('input[type="text"]')
    if (password1 !== password2) {
      errorMessage.textContent =
        'Пароли не совпадают. Пожалуйста, введите одинаковые пароли.'
      // Остановить отправку формы
      event.preventDefault()
    } else {
      errorMessage.textContent = ''
      axios
        .post('http://localhost:3000/api/register', {
          username: loginInput.value,
          password: password1,
        })
        .then(function (response) {
          if (response.data.message === 'correct password') {
            errorMessage.textContent = 'correct password'
          }
        })
        .catch(function (error) {
          if (error.response.data.message === 'yet') {
            errorMessage.textContent =
              'Пользователь с таким именем уже существует'
          }
          console.error('Ошибка:', error) // Обработка ошибки
        })
      // Очистить сообщение об ошибке, если пароли совпадают
    }
  })
})
