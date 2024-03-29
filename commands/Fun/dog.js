const {EmbedBuilder} = require("discord.js")
const fetch = require("node-fetch")
module.exports={
    name:"dog",
    description:"see a doggo",
    async execute(client, message, args){
        fetch("https://dog.ceo/api/breeds/image/random")
        .then(res => res.text())
        .then(body =>{
            const data = JSON.parse(body)
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