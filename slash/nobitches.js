const {EmbedBuilder, SlashCommandBuilder} = require("discord.js")
module.exports={
    data: new SlashCommandBuilder()
    .setName("nobitches")
    .setDescription("generate a no bitches meme")
    .addStringOption(option =>
        option
            .setName("text")
            .setDescription("text for the no bitches meme")    
        ),
    async execute(interaction, client){
        await interaction.deferReply()
        const text = interaction.options.getString("text")
        const embed = new EmbedBuilder()
        .setTitle("No bitches")
        .setColor("#f5e942")
        .setImage(`https://some-random-api.ml/canvas/nobitches?no=${encodeURIComponent(text)}`)
        .setTimestamp()
        await interaction.editReply({embeds:[embed]})
    }
}