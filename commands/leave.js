module.exports={
    name:"leave",
    description:"Make the bot leave the VC",
    execute(client, message, args){
        if (!message.member.voice.channel) {
            const must_be_in_vc_embed = new EmbedBuilder()
          .setColor('#f5e942')
          .setDescription(`You must be in a voice channel!`)
          .setTimestamp()
            return message.channel.send({embeds:[must_be_in_vc_embed]})
          }
        client.distube.voices.leave(message)
    }
}
