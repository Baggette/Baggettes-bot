const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js")
const wait = require('node:timers/promises').setTimeout;

module.exports={
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member")
    .addUserOption(option =>
        option
            .setName("target")
            .setDescription("User to timeout")
            .setRequired(true)
    )
    .addIntegerOption(option => 
        option
            .setName("time")
            .setDescription("The amount of time in minutes to timeout someone")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
    async execute(interaction){
        await interaction.deferReply()
        const target = interaction.options.getMember("target")
        const time = interaction.options.getInteger("time")
        target.timeout(time * 60_000)
        await wait(3000)
        await interaction.editReply(`Successfully timed out ${target} for ${time} minutes`)
    }

}