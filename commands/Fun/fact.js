const fetch = require('node-fetch');
const {EmbedBuilder} = require('discord.js')
module.exports={
    name:"fact",
    description:"Get a random fact",
    execute(client, message, args){
        
        fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.text())
        .then(body =>{
            const fact = JSON.parse(body)
            const embed = new EmbedBuilder()
            .setTitle("A random fact")
            .setURL(`${fact.source_url}`)
            .setColor('#f5e942')
            .setDescription(`${fact.text}`)
            .setTimestamp()
            message.channel.send({embeds:[embed]})
        })
        .catch((err) =>{
        message.channel.send(`An error occorred: ${err}`)    
        })
    }
}