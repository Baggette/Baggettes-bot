const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports={
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks a user")
    .addUserOption( option =>
        option
            .setName("target")
            .setDescription("User to kick")
            .setRequired(true))
    .addStringOption( option =>
        option
            .setName("reason")
            .setDescription('The reason for the kick'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply()
        try{
            const target = interaction.options.getUser("target");
            const reason = interaction.options.getString("reason") ?? "No reason provided";
            await interaction.editReply(`Kicked ${target.username} for \`${reason}\``)
            await interaction.guild.members.kick(target)
        }
        catch(err){
            const target = interaction.options.getUser("target")
            await interaction.editReply(`I was unable to kick ${target} \n ${err}`)   
        }
    },
};