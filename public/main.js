const sendButton = document.getElementById('sendButton')
const messageInput = document.getElementById('messageInput')
const chatbox = document.getElementById('chat-box-id')
let chatname = document.getElementById('chat-name')
const dropdownItems = document.querySelectorAll('.dropdown-item')
let currentRoom = 'All'
const jwtToken = localStorage.getItem('jwtToken')

function displayMessage(message) {
  const messageList = document.getElementById('messageList')
  const li = document.createElement('li')
  li.textContent = message
  messageList.appendChild(li)
  chatbox.scrollTop = chatbox.scrollHeight
}

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const message = {
      message: messageInput.value,
      userId: socket.id,
    }
    console.log(message)
    messageInput.value = ''
    socket.emit('message', message)
  }
})

sendButton.addEventListener('click', () => {
  const message = {
    message: messageInput.value,
    userId: socket.id,
  }
  console.log(message)
  messageInput.value = ''
  socket.emit('message', message)
})

dropdownItems.forEach((item) => {
  item.addEventListener('click', () => {
    const roomName = item.innerText
    while (messageList.firstChild) {
      messageList.removeChild(messageList.firstChild)
    }
    socket.emit('joinroom', roomName, (message) => {
      displayMessage(message)
    })
    chatname.innerText = roomName
  })
})

if (jwtToken) {
  const socket = io()
  socket.on('connect', () => {
    displayMessage(`you connected with id :${socket.id}`)
    socket.emit('join-room', currentRoom, (message) => {
      displayMessage(message)
    })
  })
  socket.on('message', (message) => {
    displayMessage(message)
  })
}
