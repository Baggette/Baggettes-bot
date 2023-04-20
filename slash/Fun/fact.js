const got = require("got")
const {EmbedBuilder, SlashCommandBuilder} = require('discord.js')
module.exports={
    data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Get a random fact"),
    async execute(interaction){
        interaction.deferReply()
        got("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(async responce =>{
            const fact = JSON.parse(responce.body)
            const embed = new EmbedBuilder()
            .setTitle("A random fact")
            .setURL(`${fact.source_url}`)
            .setColor('#f5e942')
            .setDescription(`${fact.text}`)
            .setTimestamp()
            await interaction.editReply({embeds:[embed]})
        })
        .catch(async (err) =>{
        await interaction.editReply(`An error occorred: ${err}`)    
        })
    }
}