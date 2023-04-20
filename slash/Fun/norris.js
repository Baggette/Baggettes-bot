const {EmbedBuilder, SlashCommandBuilder} = require("discord.js")
const got = require("got")

module.exports={
    data: new SlashCommandBuilder()
    .setName("norris")
    .setDescription("Chuck Norris babyyyy"),
    async execute(interaction){
        got("https://api.chucknorris.io/jokes/random")
        .then(async responce =>{
            const norris = JSON.parse(responce.body)
            const embed = new EmbedBuilder()
            .setTitle(`Chuck Norris`)
            .setURL(`${norris.url}`)
            .setColor('#f5e942')
            .setDescription(`${norris.value}`)
            .setTimestamp()
            await interaction.reply({embeds:[embed]})
        })
        .catch(async (err) =>{
            await interaction.reply(`An error occorred: ${err}`)
        })
    }
}