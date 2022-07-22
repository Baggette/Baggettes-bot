const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"queue",
    description:"Shows the current queue for songs",
    execute(client, message, agrs){
        const queue = client.distube.getQueue(message)
        const nothing_playing_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`There is nothing playing!`)
        .setTimestamp()
    if (!queue) return message.channel.send({embeds:[nothing_playing_embed]})
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
      const music_queue_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`**Server Queue**\n${q}`)
        .setTimestamp()
    message.channel.send({embeds:[music_queue_embed]})
    }
}