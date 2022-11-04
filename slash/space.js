const dotenv = require('dotenv');
dotenv.config();
const {EmbedBuilder, SlashCommandBuilder} =  require("discord.js")
const got = require("got")
const fs = require('fs');
const wait = require('node:timers/promises').setTimeout;
module.exports={
    data: new SlashCommandBuilder()
    .setName("space")
    .setDescription("Retrieves a space related thing from the nasa api"),
    async execute(interaction){
        await interaction.deferReply()
        got(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`)
        .then(async response =>{
            const space = JSON.parse(response.body)
            const string_space = JSON.stringify(space)
            const embed = new EmbedBuilder()
            .setTitle(`${space.title}`)
            .setColor('#f5e942')
            .setDescription(`${space.explanation}`)
            .setImage(`${space.hdurl}`)
            .setFooter({text: `${space.copyright} ${space.date}`})
            .setTimestamp()    
            fs.writeFileSync("space.json", string_space)
            await interaction.editReply({embeds:[embed]})
            
        })
    }}