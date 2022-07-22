const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"pause",
    description:"Pause currently playing music",
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
        .setDescription('Music resumed :)')
        .setTimestamp()
      return message.channel.send({embeds:[music_resumed_embed]})
    }
    queue.pause()
    const music_paused_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription('Music paused :)')
        .setTimestamp()
    message.channel.send({embeds:[music_paused_embed]})
    }
}
