const {EmbedBuilder} = require('discord.js')

module.exports ={
    name: 'ban',
    description: 'Bans a user',
    execute(message, args, client){
      const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const target = message.mentions.members.first()
        
        const reason = args.slice(1).join(" ")
        
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`You don't have enough powers to ban someone`)
        
        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`I don't have powers to ban someone`)
        
        if(!args[0]) return message.reply(`Please mention someone to ban`)
        
        if(!target) return message.reply(`I can't find that member`)
        
        if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.ownerId) {
          return message.reply(`They have more power than you`)
        }
        
        if(target.id === message.author.id) return message.reply(`I can't ban you as you are the Boss`)
        
        if(target.bannable) {
          let embed = new EmbedBuilder()
                    .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
                    .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
                    .setColor(`RANDOM`)
                    .setDescription(`
        **Member Banned**
        **Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
        **Reason:** ${reason || "None"}
                    `)
          message.channel.send({embeds:[embed]})
          
          target.ban()
          
          message.delete()
          
        } else {
          return message.reply(`I can't ban them, make sure that my role is above of theirs`)
        }
        return undefined
    }}