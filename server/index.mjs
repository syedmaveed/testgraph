
import { MongoClient  } from 'mongodb';
import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'


const port=4000;
const app=express()
const httpServer=http.createServer(app)
const server=new socketio.Server(httpServer,{
    
    transports:["websocket",'polling'],
    cors:{
        origin:'*'
    }
})
var url="mongodb://127.0.0.1:27017/IoT"
MongoClient.connect(url,{ useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    var dbo=db.db("IoT");
    dbo.collection("measurements").find({}).toArray(function(err, result) {
                if (err) throw err;
             //console.log("RES ",result) 
              console.log("RES ",result[0].phenomenonTime,result[0].type,result[0].thing)
         // console.log("RES ",result[0].name,result[0].x,result[0].y)
    // const query={};
    // const sort={length:-1};
    // const limit=5;
    // const cursor=dbo.collection("measurements").find(query).sort(sort).limit=1;
    // cursor.forEach(console.dir);        
    
let timechange
const data=result;
// const data=[result
//    // {name:result[0].name,x:result[0].x,y:result[0].y},
//     // {name:2,x:Math.random()*10,y:Math.random()*10},
//     // {name:3,x:Math.random()*10,y:Math.random()*10},
//     // {name:4,x:Math.random()*10,y:Math.random()*10},
//     // {name:5,x:Math.random()*10,y:Math.random()*10},
// ]


server.on("connection",(socket)=>{
    console.log("Connected")
    if(timechange) clearInterval(timechange)

    if(data.length>5){
        data.reverse().pop()
        data.reverse()
        }
        data.push( {name:result[0].name ,x:result[0].x,y:result[0].y})
      //data.push({Time:result[0].phenomenonTime,type:result[0].type,value:result[0].value,thing:result[0].thing})
       //console.log("Data ", data)
       setInterval(()=>socket.emit("message",data),10000)
    //    console.log("EMIT",socket.emit("connection"))
  
   // setInterval(()=>socket.emit("message",new Date()),1000)
   db.close();
})


})
httpServer.listen(port)
})