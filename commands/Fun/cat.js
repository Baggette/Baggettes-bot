const {EmbedBuilder} = require("discord.js");
const fetch = require("node-fetch");
module.exports={
    name:"cat",
    description:"see a pussy",
    async execute(client, message, args){
        ("https://cataas.com/cat")
        .then(res => res.text())
        .then(body =>{
            const data = JSON.parse(body)
            const embed = new EmbedBuilder()
            .setTitle("Kitties")
            .setColor('#f5e942')
            .setURL(`${data.file}`)
            .setImage(`${data.file}`)
            .setTimestamp()
            message.channel.send({embeds:[embed]})
        })
        .catch((err) =>{
            message.channel.send(`An error occorred whilst running the command \n ${err}`)
        })
    }
}