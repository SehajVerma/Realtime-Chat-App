//node server which will handle socket.io connections

const io  = require('socket.io')(8000,{
    cors: {
      origin: '*',
    }
  });

const users = {};

//connection and disconnect built in events
io.on('connection',(socket) => {
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('receive',{
            name: users[socket.id],
            message:message
        });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})
