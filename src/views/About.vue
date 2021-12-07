<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ begin }}</h2>
    <input type="text" v-model="msg">
    <button @click='send'>向3000端口發送數據</button>
    向3000端口發送數據 : {{ sendData }}
    <br>
    <input type="text" v-model="back">
    <button @click="receive">回傳給3000端口的數據</button>
    回傳給3000端口的數據 : {{ backData }}
  </div>
</template>

<script>
// import io from 'socket.io-client'
export default {
  data () {
    return {
      msg: 'aaaa',
      sendData: '',
      back: '1234',
      backData: '',
      begin: ''
    }
  },
  created () {
    // 進入聊天室時，會收到之前的全部訊息，並更新到 begin
    this.$socket.on('allMessage', (onData) => {
      console.log('received all messages')
      this.begin = onData
      console.log(this.begin)
    })
  },
  methods: {
    send () {
      this.$socket.emit('login', this.msg)
      this.sendData = this.msg
      this.msg = ''

      this.$socket.on('loginMsg', function (data) {
        console.log(data)
      })
    },
    receive () {
      this.$socket.emit('return', this.back)
      this.backData = this.back
      this.back = ''

      this.$socket.on('returnMsg', function (data) {
        console.log(data)
      })
    }
  }

}

</script>
