const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"resume",
    description:"Resume a paused song",
    execute(client, message, args){
        const queue = client.distube.getQueue(message)
        const no_music_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`There is nothing in the queue right now!`)
        .setTimestamp()
    if (!queue) return message.channel.send({embeds:[no_music_embed]})
    if (queue.paused) {
      queue.resume()
      const music_resumed_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription("Music resumed :)")
        .setTimestamp()
      message.channel.send({embeds:[music_resumed_embed]})
    } else {
      const music_not_paused_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription('The queue is not paused!')
        .setTimestamp()
      message.channel.send({embeds:[music_not_paused_embed]})
    }
    }
}
