import { io } from "socket.io-client";


// 서버의 포트를 통해 io를 받아온다
// const socket = io("http://127.0.0.1:3000");
const socket = io("http://localhost:3000");


export default socket;
