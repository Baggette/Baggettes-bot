const { Client, Intents, } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const got = require('got');
const Prefix = "g"
const Discord = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent"
    ]
});
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
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

    // If command does not exist, return
    if (!client.commands.get(command)) {
        return
    }

    client.commands.get(command).execute(message, args, client)

});
client.login(process.env.TOKEN)