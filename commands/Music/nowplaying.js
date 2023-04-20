const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"nowplaying",
    description:"See what song is currently playing",
    execute(client, message, args){
        const queue = client.distube.getQueue(message)
        const no_music_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`There is nothing in the queue right now!`)
        .setTimestamp()
        if (!queue) return message.channel.send({embeds:[no_music_embed]})
        const song = queue.songs[0]
        const song_playing_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`I'm playing **\`${song.name}\`**, by ${song.user}`)
        .setTimestamp()
        message.channel.send({embeds:[song_playing_embed]})
    }
}