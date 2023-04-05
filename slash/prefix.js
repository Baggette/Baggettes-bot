const { SlashCommandBuiler, EmbedBuilder } = require('discord.js')
const { Quickdb } = require('quick.db')
module.exports = {
    data: new SlashCommandBuiler()
    .setName('prefix')
    .setDescription('Shows the bots prefix or sets a new one!')
    .addStringOption(option => 
        option
        .setName('prefix')
        .setDescription('The new prefix for the bot!')
        ),
    async execute(interaction, client){
        await interaction.deferReply()
        const prefix = await db.get(`prefix_${message.guild.id}`) || "g";
        const new_prefix = interaction.options.getString('prefix')
        if(!interaction.options.getString('prefix')){
            const prefix_embed = new EmbedBuilder()
            .setColor('#f5e942')
            .setDescription(`The bots prefix is: \`${prefix}\``)
            .setTimestamp()
            await interaction.editReply({embeds:[prefix_embed]})
        }
        if(!interaction.member.permission.has(PermissionsBitFields.Flags.ADMINISTRATOR)){
        await interaction.editReply({content: `You do not have permission to use this command!`, ephemeral: true})
        }
        await db.set(`prefix_${message.guild.id}`, new_prefix)
        const prefix_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`The bots prefix has been set to: \`${new_prefix}\``)
        .setTimestamp()
        await interaction.editReply({embeds:[prefix_embed]})

}}