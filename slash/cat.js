const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const got = require("got")
module.exports={
    data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("see a kitty"),
    async execute(interaction){
        await interaction.deferReply()
        got("https://aws.random.cat/meow")
        .then(async response =>{
            const data = JSON.parse(response.body)
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