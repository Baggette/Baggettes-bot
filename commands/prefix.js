const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports={
    name: 'prefix',
    description: 'see the bots prefix or set a new one',
    async execute(client, message, args){
        if(!args[0]){
            const prefix = await db.get(`prefix_${message.guild.id}`) || "g";
            const prefix_embed = new EmbedBuilder()
            .setColor('#f5e942')
            .setDescription(`The bots prefix is: \`${prefix}\``)
            .setTimestamp()
            message.channel.send({embeds:[prefix_embed]})
        }else{
            if(!message.member.permissions.has("Administrator")){
                const no_permission_embed = new EmbedBuilder()
                .setColor('#f5e942')
                .setDescription(`You do not have permission to use this command!`)
                .setTimestamp()
                message.channel.send({embeds:[no_permission_embed]})
            }else{
                if(args[1]){
                    const prefix_embed = new EmbedBuilder()
                    .setColor('#f5e942')
                    .setDescription(`The bots prefix can not be more than one word!`)
                    .setTimestamp()
                    message.channel.send({embeds:[prefix_embed]})
                }else{
                    await db.set(`prefix_${message.guild.id}`, args[0])
                    const prefix_embed = new EmbedBuilder()
                    .setColor('#f5e942')
                    .setDescription(`The bots prefix has been set to: \`${args[0]}\``)
                    .setTimestamp()
                    message.channel.send({embeds:[prefix_embed]})
                }
            }
    }   
}}