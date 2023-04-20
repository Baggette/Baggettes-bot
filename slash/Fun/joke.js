const {EmbedBuilder, SlashCommandBuilder} = require("discord.js")
const got = require("got")
module.exports={
    data: new SlashCommandBuilder()
    .setName("joke")
    .setDescription("hahahahahahaha"),
    async execute(interaction){
        await interaction.deferReply()
        got("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit")
        .then(async responce =>{
            const joke = JSON.parse(responce.body)
            const embed = new EmbedBuilder()
            .setTitle(`A joke`)
            .setColor('#f5e942')
            .setDescription(`Catagory: ${joke.category}\n ${joke.setup} \n ${joke.delivery}`)
            .setTimestamp()
            await interaction.editReply({embeds:[embed]})
        })
        .catch(async (err) =>{
            await interaction.editReply(`An error occorred: ${err}`)
        })
    }
}