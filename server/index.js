const { db } = require('./db');
const PORT = process.env.PORT || 8080;
const app = require('./app');
const io = require('socket.io');

const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    const server = app.listen(PORT, () =>
      console.log(`Mixing it up on port ${PORT}`)
    );
    const socketServer = new io.Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    let sockets = [];
    let usersTracking = {};
    socketServer.on('connection', (socket) => {
      sockets.push(socket.id);

      socket.on('login', (data) => {
        const socketId = socket.id + '';
        if (socketId in usersTracking) {
        } else {
          usersTracking[socketId] = data.userId;
        }
        socket.broadcast.emit('other login', {
          msg: 'user ' + data.userId + ' is now online',
        });
        socket.broadcast.emit('send all logged in users', {
          ...usersTracking,
        });
      });

      socket.on('get all loggedin users', () => {
        socketServer.to(socket.id).emit('send all logged in users', {
          ...usersTracking,
        });
      });

      socket.on('logout', (data) => {
        delete usersTracking[socket.id];
        for (let key in usersTracking) {
          if (usersTracking[key] === data.userId) {
            delete usersTracking[key];
          }
        }
        socket.broadcast.emit('send all logged in users', {
          ...usersTracking,
        });
      });
    });
  } catch (ex) {
    console.log(ex);
  }
};

init();
