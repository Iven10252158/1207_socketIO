import { createApp } from 'vue'
import io from 'socket.io-client'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.use(VueSocketio, socketio('ws://localhost:3000')) // 與websocket服務端鏈接
app.config.globalProperties.$socket = io('ws://localhost:3000')
app.use(router)
app.mount('#app')
