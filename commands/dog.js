const {EmbedBuilder} = require("discord.js")
const got = require('got')
module.exports={
    name:"dog",
    description:"see a doggo",
    async execute(client, message, args){
        got("https://dog.ceo/api/breeds/image/random")
        .then(response =>{
            const data = JSON.parse(response.body)
            const embed = new EmbedBuilder()
            .setTitle("Doggos")
            .setColor('#f5e942')
            .setURL(`${data.message}`)
            .setImage(`${data.message}`)
            .setTimestamp()
            message.channel.send({embeds:[embed]})
        })
        .catch((err) =>{
            message.channel.send(`An error occured \n ${err}`)
        })
    }
}