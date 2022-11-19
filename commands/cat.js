const {EmbedBuilder} = require("discord.js")
const got = require("got")
module.exports={
    name:"cat",
    description:"see a pussy",
    async execute(client, message, args){
        got("https://aws.random.cat/meow")
        .then(response =>{
            const data = JSON.parse(response.body)
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