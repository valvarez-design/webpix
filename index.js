let express = require('express');
let app = express();
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');



//setup lowdb
let adapter = new JSONFile('db.json');
// provide default data 
let db = new Low(adapter, { messages: [] });

//database initialization function
async function initializeDB() {
    await db.read();
    //set default structure if db is empty
    db.data = db.data || { messages: [], reactions: [] }; //messages and reactions arrays
    await db.write();
}
initializeDB();

//serve static files from public folder

app.use ('/', express.static('public'));

//initialize http server
let http = require('http');
let server = http.createServer(app);

//define route for root path
app.get('/', (request, response) => {
    response.send('Hello World!');
});

//initialize socket.io server
let {Server} = require('socket.io');
const { time } = require('console');
let io = new Server (server);

//message handling
io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    //send old messages to newly connected
    socket.emit ('initial-messages', db.data.messages);

    //listen for messages from client
    socket.on('message', async (msg) => {

        //create message object
        let message = {
            id: Date.now(),
            text: msg,
            username: 'Anonymous', //placeholder username idk if we want to add this
            timestamp: new Date().toISOString()
        };
        
        //save message to database
        db.data.messages.push(message);
        await db.write();

        //broadcast message to all connected clients
        io.emit('message', message);

    });

    //handle socket disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});

//emoitcon reaction handling



//start server on port 3000
server.listen(3000, () => {
    console.log('tuned in and listening to local host 3000');
});