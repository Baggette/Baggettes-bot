const fetch = require("node-fetch")
const {EmbedBuilder, SlashCommandBuilder} = require('discord.js')
module.exports={
    data: new SlashCommandBuilder()
    .setName("fact")
    .setDescription("Get a random fact"),
    async execute(interaction){
        interaction.deferReply()
        fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.text())
        .then(async body =>{
            const fact = JSON.parse(body)
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