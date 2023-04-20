const {SlashCommandBuilder, EmbedBuilder} = require("discord.js")
const got = require("got")
module.exports={
    data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("see a doggo"),
    async execute(interaction){
        await interaction.deferReply()
        got("https://dog.ceo/api/breeds/image/random")
        .then(async response =>{
            const data = JSON.parse(response.body)
            const embed = new EmbedBuilder()
            .setTitle("Doggos")
            .setColor('#f5e942')
            .setURL(`${data.message}`)
            .setImage(`${data.message}`)
            .setTimestamp()
            await interaction.editReply({embeds:[embed]})
        })
        .catch(async (err) =>{
            await interaction.editReply(`An error occured \n ${err}`)
        })
    }
}