// src/lib/socket.ts
import { io, Socket } from 'socket.io-client'

const BE_DOMAIN =
  import.meta.env.VITE_MODE === 'production' ? import.meta.env.VITE_BE_DOMAIN_PROD : import.meta.env.VITE_BE_DOMAIN_DEV

let socket: Socket | null = null

const getSocket = () => {
  if (!socket) {
    socket = io(BE_DOMAIN, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })
  }
  return socket
}

// Cleanup specific listener
const cleanUpListeners = (events: string[]) => {
  if (socket) {
    events.forEach((event) => socket!.off(event))
  }
}

// Just disconnect when user logout
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export { getSocket, cleanUpListeners, disconnectSocket }
