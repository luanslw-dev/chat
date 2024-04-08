//login elementos
const login = document.querySelector(".login")
const loginForm = login.querySelector(".login__form")
const loginInput = login.querySelector(".login__input")

//chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat__form")
const chatInput = chat.querySelector(".chat__input")
const chatMessages = chat.querySelector(".chat__menssages")

const colors = [
  "cadetblue",
  "darkgolderod",
  "cornfflaweblue",
  "darkkhaki",
  "hotpink",
  "gold",
]
const user = { id: "", name: "", color: "" }
let websocket
const createMessageSelfElement = (content) => {
  const div = document.createElement("div")
  div.classList.add("message--self")
  div.innerHTML = content
  return div
}
const createMessageOtherfElement = (content, sender, senderColor) => {
  const div = document.createElement("div")
  const span = document.createElement("span")
  div.classList.add("message--other")
  div.classList.add("message--self")
  span.classList.add("menssage--sender")
  span.style.color = senderColor
  div.appendChild(span)
  span.innerHTML = sender
  div.innerHTML += content
  return div
}


const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length)
  return colors[randomIndex]
}
const scrollScreen = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  })
}

const processMessage = ({ data }) => {
  const { userId, userName, userColor, content } = JSON.parse(data)
  const message = userId == user.id
    ? createMessageSelfElement(content)
    : createMessageOtherfElement(content, userName, userColor)

  chatMessages.appendChild(message)
  scrollScreen()
}
const sendMessage = (event) => {
  event.preventDefault()
  const message = {
    userId: user.id,
    userName: user.name,
    userColor: user.color,
    content: chatInput.value


  }
  websocket.send(JSON.stringify(message))
  chatInput.value = ""
}

const handleLogin = (event) => {
  event.preventDefault()


  user.id = crypto.randomUUID()
  user.name = loginInput.value;
  user.color = getRandomColor()

  login.style.display = "none"
  chat.style.display = "flex"


  websocket = new WebSocket("wss://chat-backend-ouaf.onrender.com")
  websocket.onmessage = processMessage





}
loginForm.addEventListener('submit', handleLogin)
chatForm.addEventListener('submit', sendMessage)
