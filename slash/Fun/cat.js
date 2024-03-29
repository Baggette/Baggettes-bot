const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const fetch = require("node-fetch")
module.exports={
    data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("see a kitty"),
    async execute(interaction){
        await interaction.deferReply()
        fetch("https://cataas.com/cat")
        .then(res => res.text())
        .then(async body =>{
            const data = JSON.parse(body)
            const embed = new EmbedBuilder()
            .setTitle("Kitties")
            .setColor('#f5e942')
            .setURL(`${data.file}`)
            .setImage(`${data.file}`)
            .setTimestamp()
            await interaction.editReply({embeds:[embed]})
        })
        .catch(async (err) =>{
            await interaction.editReply(`An error occorred whilst running the command \n ${err}`)
        })
    }
}