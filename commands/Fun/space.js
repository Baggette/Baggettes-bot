const dotenv = require('dotenv');
dotenv.config();
const {EmbedBuilder} =  require("discord.js")
const got = require("got")
const fs = require('fs')
module.exports={
    name:"space",
    description:"See some space",
    execute(client, message, args){
        got(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`)
        .then(response =>{
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