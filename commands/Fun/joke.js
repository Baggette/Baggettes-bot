const {EmbedBuilder} = require("discord.js")
const fetch = require("node-fetch")
module.exports={
    name:"joke",
    desciption:"hahahahahahaha",
    execute(client, message, args){
        fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit")
        .then(res => res.text())
        .then(body =>{
            const joke = JSON.parse(body)
            const embed = new EmbedBuilder()
            .setTitle(`A joke`)
            .setColor('#f5e942')
            .setDescription(`Catagory: ${joke.category}\n ${joke.setup} \n ${joke.delivery}`)
            .setTimestamp()
            message.reply({embeds:[embed]})
        })
        .catch((err) =>{
            message.channel.send(`An error occorred: ${err}`)
        })
    }
}