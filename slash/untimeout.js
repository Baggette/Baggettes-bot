const {SlashCommandBuilder, PermissionFlagsBits} = require("discord.js")
const wait = require('node:timers/promises').setTimeout;

module.exports={
    data: new SlashCommandBuilder()
    .setName("untimeout")
    .setDescription("Untimeout a member")
    .addUserOption(option =>
        option
            .setName("target")
            .setDescription("User to timeout")
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
    async execute(interaction){
        await interaction.deferReply()
        try{
        const target = interaction.options.getMember("target")
        await target.timeout(null)
        await wait(3000)
        await interaction.editReply(`Successfully removed the timeout on ${target}!`)
        }
        catch(err){
        const target = interaction.options.getUser("target")
        await interaction.editReply(`I was unable to remove the timeout on ${target} \n ${err}`)
        }
        
    }

}