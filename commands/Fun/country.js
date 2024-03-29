const fetch = require('node-fetch');
const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"country",
    description:"See information about a country",
    execute(client, message, args){0
        if(!args[0]) return message.channel.send("No country provided")
        fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(args.slice(0).join(" "))}?fullText=true`)
        .then(res => res.text())
        .then(body => {
            const json = JSON.parse(body)
            if(json.status == "404"){
                message.channel.reply(`I was unable to find the country ${args.slice(0).join(" ")}`)
            }else{              
                const embed = new EmbedBuilder()
                .setTitle(json[0].name.official)
                .setURL(`${json[0].maps.googleMaps}`)
                .setThumbnail(`${json[0].coatOfArms.png}`)
                .addFields(
                    {name:`Top level domain name`, value:`${json[0].tld[0]}`, inline: true},
                    {name:"Independant", value:`${json[0].independent}`,},
                    {name:"Currency", value:`${json[0].currencies.name}, Symbol ${json[0].currencies.symbol}`},
                    {name:"Capital", value:`${json[0].capital[0]}`}, 
                    {name:"Continent",value:`${json[0].subregion}`},
                    {name:"Language(s)", value:`${json[0].language}`}
                )
                message.channel.send({embeds:[embed]})
            }
        })
    }
}