const { EmbedBuilder } = require("discord.js")
module.exports={
    name:"skip",
    description:"Skip a currently playing song",
    execute(client, message, args){
        const queue = client.distube.getQueue(message)
        const nothing_playing_embed =  new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`There is nothing in the queue right now!`)
        .setTimestamp()
    if (!queue) return message.channel.send({embeds:[nothing_playing_embed]})
    try {
      const song = queue.skip()
      const skipped_embed =  new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription(`Skipped!`)
      .setTimestamp()
      message.channel.send({embeds:[skipped_embed]})
    } catch (e) {
        const error_embed =  new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`an error occurred \n  ${e}`)
        .setTimestamp() 
      message.channel.send({embeds:[error_embed]})
    }
    }
}