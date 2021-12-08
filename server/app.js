var sever = require('http').createServer()
const io = require('socket.io')(sever,
  {
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

var messages = [
  { name: 'Majer', message: 'Welcome!' }
]
let timer = ''
io.on('connection', function (socket) {
  console.log('user connected')
  // 發送之前的全部訊息
  io.emit('allMessage', messages)

  socket.on('sendMessage', function (message) { // 接收連接中的 sendMessage 事件
    console.log('你輸入的訊息', message)
    messages.push(message)
    io.emit('newMessage', message) // 發送回去給所有人知道 事件名爲 newMessage
  })
  socket.on('onTyping', (isTyping) => {
    isTyping = true
    console.log(isTyping)
    io.emit('someoneIsTyping', isTyping)
    clearTimeout(timer)
    timer = setTimeout(() => {
      isTyping = false
      io.emit('someoneIsTyping', isTyping)
    }, 3000)
  })
})
console.log('socket端口：3000')
sever.listen(3000)
