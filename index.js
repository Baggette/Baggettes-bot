const { Client, Intents, } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const got = require('got');
const Prefix = "g"
const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const ms = require('parse-ms')
const prettyMilliseconds = require('pretty-ms')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}
client.on('ready', () => {
    console.log('g is online')
    client.user.setPresence({ activities: [{ name: 'Listening to ghelp' }], status: 'active' });
});
// command
client.on('messageCreate', (message) => { // You can use one block for an entire event
    if (!message.content.startsWith(Prefix) || message.author.bot) return;
    const args = message.content.slice(Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'g') {
        client.commands.get('g').execute(message, args);
    } else if (command ==='prefix') {
        client.commands.get('prefix').execute(message, args);
    } else if (command === 'faster') {
        client.commands.get('faster').execute(message, args);
    } else if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command ==='help') {
        client.commands.get('help').execute(message, args);
    } else if (command === 'uptime') {
        client.commands.get('uptime').execute(message, args);
    } else if (command ==='meme') {
        client.commands.get('meme').execute(message, args);
    } else if (command ==='legacy') {
        client.commands.get('legacy').execute(message, args);
    } else if (command ==='twitter') {
        client.commands.get('twitter').execute(message, args); 
    } else if (command ==='dog') {
        client.commands.get('dog').execute(message, args);
    } else if (command ==='food'){
        client.commands.get('food').execute(message, args);
    } else if (command ==='cat') {
        client.commands.get('cat').execute(message, args);
    } else if (command === 'car') {
        client.commands.get('car').execute(message, args);
    } else if (command === 'hack'){
        client.commands.get('hack').execute(message, args);
    } else if (command === 'linusface'){
        client.commands.get('linusface').execute(message, args);
    } else if (command === 'linuslore'){
        client.commands.get('linuslore').execute(message, args);
    } else if (command === 'source'){
        client.commands.get('source').execute(message, args);
    }
});
client.login(process.env.TOKEN)
