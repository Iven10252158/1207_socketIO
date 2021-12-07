var sever = require('http').createServer()
const io = require('socket.io')(sever,
  {
    cors: {
      origin: 'http://localhost:8080',
      methods: ['GET', 'POST'],
      credentials: true
    }
  })

io.on('connection', function (socket) {
  console.log('user connected')
  // 發送之前的全部訊息
  io.emit('allMessage', 'WELCOME!')

  socket.on('login', function (data) { // 接收連接中的login事件
    console.log('你輸入的訊息', data)
    io.emit('loginMsg', '你發過來的數據是：' + data) // 發送回去 事件名爲loginMsg
  })

  socket.on('return', function (data) { // 接收連接中的return事件
    console.log('你回覆的訊息', data)
    io.emit('returnMsg', '你傳回來的數據是：' + data) // 發送回去 事件名爲 returnMsg
  })
})
console.log('socket端口：3000')
sever.listen(3000)
