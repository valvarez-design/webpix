console.log('hiiii are we working?');

//initialize and connect socket.io
let socket = io ();

//listen for socket connection
socket.on('connect', () => {
    console.log('Connected');
});

//references for HTML elements
let messageContainer = document.getElementById('chat-messages');
//let messageForm = document.getElementById('send-container'); //not using
let messageInput = document.getElementById('chat-input');
let sendButton = document.getElementById('send-btn');

//send message when Enter key is pressed
messageInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

//send message to server when button is clicked
sendButton.addEventListener('click', function () {
    sendMessage();
});

//function to send message to server
function sendMessage() {
    let message = messageInput.value.trim();
    //return empty messages
    if (message === '') return;

    //send message to server
    socket.emit('message', message);

    //clear input field after sending
    messageInput.value = '';
}

//listen for a single new message from server
socket.on('message', (data) => {
    //log the object
    console.log('Message received: ', data);
    displayMessage(data);
});
//listener for previously saved messages
socket.on('initial-messages', (messages) => {
    if (!Array.isArray(messages)) return;
    messages.forEach(displayMessage);
});


//function to display message in message container
function displayMessage(message) {
    //create new div element for message
    let messageElement = document.createElement('div');
    messageElement.className = 'message';
    //set message text
    messageElement.innerText = message.text;
    //append message element to message container
    messageContainer.appendChild(messageElement);
}
// Theme selector functionality
const themeButtons = document.querySelectorAll('.theme-btn');
const profilePic = document.querySelector('.profile-pic');

console.log('Theme buttons found:', themeButtons);
console.log('Profile pic element:', profilePic);

// Profile pictures for each theme
const themeProfiles = {
    '1': 'media/Background-Images/pink-pp.png',
    '2': 'media/Background-Images/cartoon-pp.png',
    '3': 'media/Background-Images/skull-pp.png',
    '4': 'media/Background-Images/goth-pp.png',
    '5': 'media/Background-Images/rainbow-pp.png'
};

console.log('Theme profiles object:', themeProfiles);

themeButtons.forEach(button => {
    console.log('Adding event listener to button:', button);
    
    button.addEventListener('click', () => {
        console.log('Button clicked!');
        
        const themeNumber = button.dataset.theme;
        console.log('Theme number selected:', themeNumber);
        
        // Change theme
        document.body.setAttribute('data-theme', themeNumber);
        console.log('Theme attribute set on body');
        
        // Change profile picture
        if (themeProfiles[themeNumber]) {
            console.log('Changing profile pic to:', themeProfiles[themeNumber]);
            profilePic.src = themeProfiles[themeNumber];
            console.log('Profile pic src updated');
        } else {
            console.log('No profile picture found for theme:', themeNumber);
        }
    });
});

console.log('All event listeners added!');

// USER BIO EDITING

//find the username element
const usernameElement = document.querySelector('.username');

//editable when clicked
usernameElement.addEventListener('click', function() {
    this.contentEditable = true;  
    this.focus();                
});

//find the location element
const locationElement = document.querySelector('.location');

//editable when clicked
locationElement.addEventListener('click', function() {
    this.contentEditable = true;  
    this.focus();                
});

//find the user quote element
const userQuoteElement = document.querySelector('.user-quote p');

//editable when clicked
userQuoteElement.addEventListener('click', function() {
    this.contentEditable = true;  
    this.focus();                
});


