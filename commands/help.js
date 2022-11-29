 const {EmbedBuilder} = require('discord.js')

module.exports ={
    name: 'help',
    description: 'get a list of bot commands',
    execute(client, message, args){
        if(!args[0] || args[0] === "1"){
            const help = new EmbedBuilder()
        .setColor('#f5e942')
        .setTitle('Baggettes Bot')
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setDescription("Use `ghelp 2` to view page two")
        .setAuthor({ name: 'Baggettes Bot Help Menu', iconURL: 'https://cdn.discordapp.com/avatars/928069129892663347/2078edb679f7cc7aa97da9a6ffe84316.webp?size=80', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
        .addFields(
            { name: '`gcar`', value: 'See a cool car'},
            { name: '`gcat`', value: 'See a cute kitty'},
            { name: '`gdog`', value: 'See a cute dog (dogs are better than cats imo)'},
            { name: '`gfaster`', value: 'Make your Mac or Linux based os faster'},
            { name: '`gfood`', value: 'This command will make you hungry'},
            { name: '`ghack`', value: 'use this command to preform a totaly real hack on someone'},
            { name: '`ghelp`', value: 'To see this menu'},
            { name: '`glegacy`', value: 'Use this command to view a post from the legacy jailbreak subreddit'},
            { name: '`glinuslore`', value: 'Use this command to see some linus lore'},
            { name: '`glinusface`', value: 'use this command to see a hot pic from the ltt universe'},
            { name: '`gmeme`', value: "You probably know what this is for, but if you don't it posts a meme"},
            { name: '`gping`', value: 'Use this command to view bot latency'},
            { name: '`gprefix`', value: 'View the bots prefix'},
        )
        .setTimestamp()
        .setFooter({ text: 'This bot was lovingly made by Baggette#4777', iconURL: 'https://cdn.discordapp.com/avatars/887756464020672523/5261d8f56ece38a54d1e88d3316310b6.jpg?size=1024'})
        message.channel.send({ embeds: [help]})
        }else if(args[0] === "2"){
            const help = new EmbedBuilder()
        .setColor('#f5e942')
        .setTitle('Baggettes Bot')
        .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        .setAuthor({ name: 'Baggettes Bot Help Menu', iconURL: 'https://cdn.discordapp.com/avatars/928069129892663347/2078edb679f7cc7aa97da9a6ffe84316.webp?size=80', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'})
        .setDescription("Use `ghelp 1` to view page one")
        .addFields(
            { name: '`gsource`', value: 'View the bots source code'},
            { name: '`gtwitter`', value: 'View a post from some idiots on twitter'},
            { name: '`guptime`', value: 'View bot uptime'},
            { name: '`gban`', value: 'Bans a mentioned user'},
            { name: '`gkick`', value: 'Kicks a mentioned user'},
            { name: '`gmcping <server ip> <server port> [mcpe (bedrock pinging)]`', value:"Pings a desired minecraft server."},
            { name:"`gmusic`", value:"See the music cmds for this bot"},
            { name:"`gguess`", value:"Play a guessing game where the bot will guess a character"},
            { name:"`gfact`", value:"See a random fact"},
            { name:"`gspace`", value:"See some cool space news"},
            { name:"`gjoke`", value:"Super funni joke"},
            { name:"`gnorris`", value:"See a norris joke/fact"},
            { name:"`gpackage <package name>`", value:"Search for tweaks (wip)"},
            { name:"`gnobitches <text>`", value:"Generate a no bitches meme"}
        )
        .setTimestamp()
        .setFooter({ text: 'This bot was lovingly made by Baggette#4777', iconURL: 'https://cdn.discordapp.com/avatars/887756464020672523/5261d8f56ece38a54d1e88d3316310b6.jpg?size=1024'})
        message.channel.send({ embeds: [help]})
        }
        
    }   
}
