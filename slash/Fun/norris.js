const {EmbedBuilder, SlashCommandBuilder} = require("discord.js")
const fetch = require("node-fetch")

module.exports={
    data: new SlashCommandBuilder()
    .setName("norris")
    .setDescription("Chuck Norris babyyyy"),
    async execute(interaction){
        fetch("https://api.chucknorris.io/jokes/random")
        .then(res => res.text())
        .then(async body =>{
            const norris = JSON.parse(body)
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