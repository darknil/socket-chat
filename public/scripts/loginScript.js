document.addEventListener('DOMContentLoaded', function () {
  const loginInput = document.querySelector('input[type="text"]')
  const passwordInput = document.querySelector('input[type="password"]')
  const loginLabel = document.getElementById('login-label')
  const passwordLabel = document.getElementById('password-label')
  const sendButton = document.getElementById('sendButton')
  const errorMessage = document.getElementById('password-error-message')

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
  sendButton.addEventListener('click', function () {
    const login = loginInput.value
    const password = passwordInput.value

    axios
      .post('http://localhost:3000/api/login', {
        username: login,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.message)
        if (response.data.message === 'correct password') {
          errorMessage.textContent = 'Успешный вход'
          //забрать jwt
        }
      })
      .catch(function (error) {
        console.error('Ошибка:', error) // Обработка ошибки
      })
  })
})
