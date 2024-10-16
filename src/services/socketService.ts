// src/services/socketService.ts
import { io, Socket } from "socket.io-client";
import store from "@store/store"; // Import the Redux store
import { setUserStatus } from "@store/reducers/userSlice";
import { setServerUserStatus } from "@store/reducers/serverSlice";

class SocketService {
  private socket: Socket | null = null;

  // Initialize socket connection
  init(token: string) {
    if (this.socket) {
      return;
    }

    this.socket = io(import.meta.env.VITE_APP_SOCKET_URL, {
      auth: { token },
      transports: ["websocket"], // Use websockets only
    });

    // Set up listeners
    this.socketListeners();
  }

  // Close the socket connection
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Handle socket listeners
  private socketListeners() {
    if (!this.socket) return;

    // Listener for new messages
    this.socket.on("message", (message) => {
      //   store.dispatch(addNewMessage(message)); // Dispatch Redux action to add new message
      console.log("New message received: ", message);
    });

    // Listener for typing status
    this.socket.on("typing", (data) => {
      //   store.dispatch(setTypingStatus(data)); // Dispatch Redux action for typing status
    });

    // Listener for online users
    this.socket.on("onlineUsers", (users) => {
      //   store.dispatch(setOnlineUsers(users)); // Dispatch Redux action for online users
    });

    this.socket.on("statusChange", (status) => {
      // Dispatch the action to update the user status
      store.dispatch(setServerUserStatus({
        userId: status.userId, // This should match the user ID in members.user.id
        status: status.status, // The new status to set
      }));

      if(status.userId === store.getState().user.user.id) {
        store.dispatch(setUserStatus(status.status));
      }
    });
    

    // Add more listeners as needed
  }

  // Emit a socket event
  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event: string, cb: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, cb);
    }
  }

  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  // Add more socket methods (emitters, listeners) as necessary
}

export const socketService = new SocketService();
