const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const { githubRepoInfo } = require('./routines/github')

const client = new Client();

var commands = {

};
function registerCommand(command, callback) {
    commands[command] = callback;
}

function echoCommand(msg, arrMsg) {
    msg.reply(arrMsg.join(" "))
}




registerCommand("echo", echoCommand)
registerCommand("github", githubRepoInfo)


client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED', qr);
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    var body = msg.body;
    console.log("Message: " + body)
    if(body.startsWith("!")) {
        command = body.substr(1).split(' ')
        console.log("Received a Command: " + command[0])
        if(commands[command[0]] !== undefined ) {
            func = commands[command[0]](msg, command.splice(1), client)
        }
    }
});



client.initialize();