// socketEvents.js
import socket from "./socket";

export const setSid = (userObj) => {
  socket.emit("setSid", userObj);
};
export const emitMessage = (message) => {
  socket.emit("message", { title: message, content: message });
};
export const emitHeaderMessage = (userObj, newMessage) => {
  console.log("new Message:", newMessage);
  socket.emit("setHeaderMessage", { userObj, newMessage });
};

export const onHeaderMessageBack = () => {
  return new Promise((resolve) => {
    socket.on("setHeaderMessageBack", (newMessage) => {
      resolve(newMessage);
    });
  });
};
