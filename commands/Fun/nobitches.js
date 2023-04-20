const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"nobitches",
    description:"generate a no bitches meme",
    execute(client, message, args){
    if(!args[0]){ 
        message.channel.send("No text provided")
    }else if(args[0]){
        const embed = new EmbedBuilder()
        .setTitle("No bitches")
        .setColor("#f5e942")
        .setImage(`https://some-random-api.ml/canvas/nobitches?no=${encodeURIComponent(args.slice(0).join(" "))}`)
        .setTimestamp()
        message.channel.send({embeds:[embed]})
    }}
}