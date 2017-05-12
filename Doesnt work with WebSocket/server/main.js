// entry point of program

const WebSocketServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

// ar express = require('express')

// var app = express()

// var server = app.listen(3000)

// app.use(express.static('public'))
// //use express to save time

// console.log("socket server is running!")
// //test out

// var socket = require('socket.io')
// //link socket.io

// var io = socket(server)
// //create variable

// io.sockets.on('connection', newConnection)



const server = new WebSocketServer({port: 3000});
// const Session = require('./session');



//store sessions in a map
const sessions = new Map;

// class Session 
// {
// 	constructor(id)
// 	{
// 		this.id = id;
// 		this.clients = new Set;
// 	}
// 	join(client)
// 	{
// 		//make sure client isnt already in the session
// 		if(client.session){
// 			throw new Error('client already in session');
// 		}
// 		this.clients.add(client);
// 		client.session = this;
// 	}
// 	leave(client)
// 	{
// 		if(client.session !== this){
// 			throw new Error('client not in session');
// 		}
// 		this.clients.delete(client);

// 		client.session = null;
// 	}
// }


// class client{
// 	constructor(conn){
// 		this.conn = conn;
// 		this.session = null;
// 	}
// }


//keep track of clients connected
function createId(len = 6, chars = 'abcdefghjkmoqrstwxyz0123456789'){
	let id = '';
	while (len --){
		id += chars[Math.random() * chars.length | 0];
	}
	return id;
}

server.on('connection', conn => {
    console.log('Connection established');

    const client = new Client(conn);

    conn.on('message', msg => {
    	console.log('Message received', msg);
        const data = JSON.parse(msg);

    	if (data.type ==='create-session'){

    		const id = createId();
    		const session = new Session(id);
            session.join(client);
    		sessions.set(session.id, session);
    		    // sessions.set(id, session);

    		// console.log(sessions);
    		client.send(
                type:'session-created',
                id: session.id,
    	});
        }
    });

    conn.on('close',() => {
    	console.log('Connection closed');
    	const session = client.session;
    	if (session) {
    		session.leave(client);
    		if (session.clients.size === 0) {
    			sessions.delete(session.id);
    		}
    	}
    });
});