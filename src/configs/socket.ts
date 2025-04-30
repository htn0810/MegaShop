// src/lib/socket.ts
import { io } from 'socket.io-client'

const socket = io('http://localhost:8080', {
  autoConnect: false,
  reconnection: false,
})

const cleanUpSocket = () => {
  socket.removeAllListeners()
  socket.disconnect()
}

export { socket, cleanUpSocket }
