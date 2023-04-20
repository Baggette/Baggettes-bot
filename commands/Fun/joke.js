const {EmbedBuilder} = require("discord.js")
const got = require("got")
module.exports={
    name:"joke",
    desciption:"hahahahahahaha",
    execute(client, message, args){
        got("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit")
        .then(responce =>{
            const joke = JSON.parse(responce.body)
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