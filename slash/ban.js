const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports={
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans a user")
    .addUserOption( option =>
        option
            .setName("target")
            .setDescription("User to ban")
            .setRequired(true))
    .addStringOption( option =>
        option
            .setName("reason")
            .setDescription('The reason for the ban'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false),
    async execute(interaction) {
        interaction.deferReply()
        try{
            const target = interaction.options.getUser("target");
            const reason = interaction.options.getString("reason") ?? "No reason provided";
            await interaction.editReply(`Banning ${target.username} for \`${reason}\``)
            await interaction.guild.members.ban(target)
        }
        catch(err){
            const target = interaction.options.getUser("target");
            await interaction.editReply(`I was unable to ban ${target} \n ${err}`)   
        }
    },
};