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
        
        got(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`)
        .then(async response =>{
            await interaction.deferReply()
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
            await wait(3000)
            awaitinteraction.editReply({embeds:[embed]})
            
        })
        .catch((error) =>{
                interaction.deferReply()
            fs.readFileSync('space.json', (err, data) =>{
                if(err) throw err
                 const space = JSON.parse(data)
                 const embed = new EmbedBuilder()
                .setTitle(`${space.title} \n the api was unable to be reached, using cached data`)
                .setDescription(`${space.explanation}`)
                .setImage(`${space.hdurl}`)
                .setFooter({text: `${space.copyright} ${space.date}`})
                .setTimestamp()
                wait(3000)
                interaction.editReply({embeds:[embed]})
            })
        })
    }}