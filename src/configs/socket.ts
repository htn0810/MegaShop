// src/lib/socket.ts
import { io } from 'socket.io-client'

const BE_DOMAIN =
  import.meta.env.VITE_MODE === 'production' ? import.meta.env.VITE_BE_DOMAIN_PROD : import.meta.env.VITE_BE_DOMAIN_DEV

const socket = io(BE_DOMAIN, {
  autoConnect: false,
  reconnection: false,
})

const cleanUpSocket = () => {
  socket.removeAllListeners()
  socket.disconnect()
}

export { socket, cleanUpSocket }
