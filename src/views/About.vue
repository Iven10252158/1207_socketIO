<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul v-for = "msg in messages" :key="msg.name">
      <li><h4>{{ msg.name }} : <span>{{ msg.message }}</span></h4></li>
    </ul>
    <h5>{{ typing? '有人輸入中...': '' }}</h5>
    <input type="text" v-model="temp.name" placeholder="輸入用戶名稱">
    <input type="text" v-model="temp.message" placeholder="輸入訊息" @input="sendTyping">
    <button @click='send'>傳送</button>
    <br>
  </div>
</template>

<script>
// import io from 'socket.io-client'
export default {
  data () {
    return {
      messages: [],
      temp: {},
      typing: false
    }
  },
  mounted () {
    // 進入聊天室時，會收到之前的全部訊息，並更新到 messages
    this.$socket.on('allMessage', (obj) => {
      console.log('received all messages')
      this.messages = obj
    })

    // 設定接收到新訊息的監聽器
    this.$socket.on('newMessage', obj => {
      console.log('received new message', obj)
      this.messages.push(obj)
    })

    this.$socket.on('someoneIsTyping', value => {
      console.log('someoneIsTyping', value)
      this.typing = value
    })
  },
  methods: {
    send () {
      console.log('sending new message')
      console.log(this.messages)
      this.$socket.emit('sendMessage', this.temp)
      this.temp.message = ''
    },
    sendTyping () {
      this.$socket.emit('onTyping', this.typing)
    }
  }
}
</script>
