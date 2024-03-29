import express from "express"
import cors from "cors"
import http from "http"
import {Server }from "socket.io"
import axios from "axios";
import connectDB from "./config/dbConnection.js";
import router from './route/userRoute.js';
import {notfound,errHandler} from './middleware/errMiddleware.js';
import chatRoute from './route/chatRoute.js';
import messageRoute from "./route/messageRoute.js";
import userRoute from './route/authRoute.js';
import path from 'path';
import 'dotenv/config';
import passport from "passport";
import session from 'express-session';

const app=express();
const PORT=process.env.PORT||8080;

app.use(express.json());//to accept json data
app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use('/api/user',router);
app.use('/api/chat',chatRoute);
app.use('/api/message',messageRoute);
app.use('/user',userRoute);


//deployment
const __dirname=path.resolve();

if(process.env.NODE_ENV==='production'){
 app.use(express.static(path.join(__dirname,"/client/.next/server/pages")));

 app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,"client",".next","server","pages","index.html" ))
 })
}else{
  app.get("/",(req,res)=>{
    res.send('API is running successfully')  
  })
}

//to handle error
app.use(notfound);
app.use(errHandler);

const server=http.createServer(app);

const io=new Server(server,{
  pingTimeout:50000,
    cors:{
    // origin:"http://localhost:3000",
    origin:"https://dekhinxa.vercel.app",
    methods:["GET","POST","PUT","DELETE"]
    }
})

let users = []; 
 let loginUsers=[];

io.on('connection',(socket)=>{
    //listen event
     socket.on('setup',(userData)=>{
      //  console.log(userData);
       if(userData!==null){
        users.push(userData);
       }    
      loginUsers = [...new Set(users)];
       socket.join(userData);
       socket.emit("connected")
      //  console.log('users:'+users)
      // console.log('logged users:'+loginUsers)
        // send the updated list of logged-in users to all connected sockets
    //broadcast to the all connection
    io.emit('user list',loginUsers)
    })

    socket.on('join chat',(room)=>{
        //id of the room 
        socket.join(room)
        console.log('user joined room:'+room);
    })

    socket.on('typing',(room)=>{
      // console.log('typing ');
      socket.to(room).emit('typing');
    })

    socket.on('stop typing',(room)=>
    {
      // console.log('stopped');
      socket.to(room).emit('stop typing')
    })


    socket.on('new message',(newMessageReceived)=>{
      // console.log('message received:')
      // console.log(newMessageReceived)
      // console.log('user:');
      // console.log(newMessageReceived.chat.user)
      var chat=newMessageReceived.chat;
      // console.log(chat._id)
      if(!chat || !chat.user) return console.log('chat.user not defined');
    
      chat.user.forEach((usr)=>{
        if(usr._id == newMessageReceived.sender._id) return ;
        // console.log(usr.name);
        socket.to(chat._id).emit('message received',newMessageReceived)
      })
    })
    
    socket.on('callRoom', ({ signalData, from, name, roomId }) => {
      console.log('call room')
      console.log(from, name, roomId);
      // Broadcast the call to all users in the room
      io.to(roomId).emit('callUser', { signal: signalData, from, name, roomId });
    });
  
      socket.on("answerCall", (data) => {
        console.log('answered:');
        console.log(data.to);
        io.to(data.to).emit("callAccepted", data.signal)
      })
   
  
    socket.on('callEnd',(data)=>{
      console.log('call ended',data);
       io.to(data.roomId).emit('endCall',{data});
    })


     socket.on('userRoom',(data)=>{
      socket.join(data.userId);
      console.log('user room joined:',data.userId);
      
     })

     socket.on('sendCall',(data)=>{
      console.log('incomming call');
      console.log(data);
      io.to(data.userId).emit("incomingCall",{userId:data.userId,frnInfo:data.frnInfo});
     })

    socket.on('remove',(usrid)=>{

      users = users.filter(item => item !== usrid);

      const index = loginUsers.indexOf(usrid);
    // console.log(index)
    // console.log('userid:'+usrid)
    if (index !== -1) {
      loginUsers.splice(index, 1);
    }

  // console.log('users:'+users);
  // loginUsers = [...new Set(loginUsers.map(user => user.id))];
    // console.log('loged usr:'+loginUsers)

    io.emit('user list',loginUsers)

    });


    socket.on('disconnect', (userData) => {
      // console.log('user disconnected');
      // console.log(userData)
      socket.leave(userData);
      
        // remove the user from the array
    // const index = loginUsers.indexOf(userData);
    // console.log(index)
    // console.log(userData)
    // if (index !== -1) {
    //   loginUsers.splice(index, 1);
    // }
    
    });

})

 server.listen(PORT,()=>{
  console.log("server is running");
})

