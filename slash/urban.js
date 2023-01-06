const got = require("got")
const {EmbedBuilder, SlashCommandBuilder} = require("discord.js")
module.exports={
    data: new SlashCommandBuilder()
    .setName("urban")
    .setDescription("Search for a word on urban dictionary")
    .addStringOption(option =>
        option 
            .setName("word")
            .setDescription('Word or phrase to define on urban dictonary')
            .setRequired(true)    
        ),
    async execute(interaction, client){
        const phrase = interaction.options.getString("word")
        await interaction.deferReply()
        got(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(phrase)}`)
        .then( async response => {
            const json = JSON.parse(response.body)
            let clean_def = json.list[0].definition.replace(/[\[\]]/g, "")
            let clean_eg = json.list[0].example.replace(/[\[\]]/g, "")
            const embed = new EmbedBuilder()
            .setTitle(json.list[0].word)
            .setURL(json.list[0].permalink)
            .setColor('#f5e942')
            .setDescription(`**Definition**: \n${clean_def.replace(/[/]/g, "")} \n **Example**: \n${clean_eg.replace(/[/]/g, "")}`)
            .setFooter({text: `${json.list[0].thumbs_up} 👍 | ${json.list[0].thumbs_down} 👎 | Author: ${json.list[0].author}`})
            .setTimestamp()
            await interaction.editReply({embeds:[embed]})
            //console.log(json.list[0])
    })
        .catch( async err => {
            console.log(err)
            await interaction.editReply(`An error occured \nMaybe the word doesn't exist? Contact Baggette#4777 if this persists `)
        })
    }
}