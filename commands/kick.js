const { MessageEmbed } = require('discord.js')

module.exports ={
    name: 'kick',
    description: 'kicks a user',
    execute(message, args, client){  
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const reason = args.slice(1).join(" ")
                  if (!args[0]) return message.channel.send(":x: | **Specify someone to kick.**")
                if (!mentionedMember) return message.channel.send(":x: | **I can't find that member.**")
                if (mentionedMember.id === message.author.id) return message.channel.send(":x: | You can't kick yourself.")
                if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerId) {
                    return message.channel.send(":x: | **You can\'t kick this member due to your role being lower than that member role.**")
                }
                if (mentionedMember.kickable) {
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
                    .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
                    .setColor(`RANDOM`)
                    .setDescription(`
        **Member Kicked**
        **Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
        **Reason:** ${reason || "None"}
                    `)
                message.channel.send({embeds:[embed]})
                mentionedMember.kick()
                } else {
                    return message.channel.send(":x: | **I can\'t kick this user make sure that the users role is lower than my role.**")
                }}
            }