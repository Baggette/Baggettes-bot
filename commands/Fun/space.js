const dotenv = require('dotenv');
dotenv.config();
const {EmbedBuilder} =  require("discord.js")
const fetch = require("node-fetch")
const fs = require('fs')
module.exports={
    name:"space",
    description:"See some space",
    execute(client, message, args){
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`)
        .then(res => res.text())
        .then(body =>{
            const space = JSON.parse(body)
            const string_space = JSON.stringify(space)
            const embed = new EmbedBuilder()
            .setTitle(`${space.title}`)
            .setColor('#f5e942')
            .setDescription(`${space.explanation}`)
            .setImage(`${space.hdurl}`)
            .setFooter({text: `${space.copyright} ${space.date}`})
            .setTimestamp()    
            fs.writeFileSync("space.json", string_space)
            message.channel.send({embeds:[embed]})
            
        })
        .catch((error) =>{
            fs.readFileSync('space.json', (err, data) =>{
                if(err) throw err
                 const space = JSON.parse(data)
                 const embed = new EmbedBuilder()
                .setTitle(`${space.title} \n the api was unable to be reached, using cached data`)
                .setDescription(`${space.explanation}`)
                .setImage(`${space.hdurl}`)
                .setFooter({text: `${space.copyright} ${space.date}`})
                .setTimestamp()
                message.channel.send({embeds:[embed]})
            })
        })
    }
}