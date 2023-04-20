const {EmbedBuilder} = require("discord.js")
const got = require("got")
module.exports={
    name:"norris",
    desciption:"chuck norris",
    execute(client, message, args){
        got("https://api.chucknorris.io/jokes/random")
        .then(responce =>{
            const norris = JSON.parse(responce.body)
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