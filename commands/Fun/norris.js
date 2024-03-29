const {EmbedBuilder} = require("discord.js")
const fetch = require("node-fetch")
module.exports={
    name:"norris",
    desciption:"chuck norris",
    execute(client, message, args){
        fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.text())
        .then(body =>{
            const norris = JSON.parse(body)
            const embed = new EmbedBuilder()
            .setTitle(`Chuck Norris`)
            .setURL(`${norris.url}`)
            .setColor('#f5e942')
            .setDescription(`${norris.value}`)
            .setTimestamp()
            message.reply({embeds:[embed]})
        })
        .catch((err) =>{
            message.channel.send(`An error occorred: ${err}`)
        })
    }
}