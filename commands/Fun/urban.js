const fetch = require("node-fetch")
const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"urban",
    description:"Search for a word on urban dictionary",
    execute(client, message, args){
        if(!args[0]) return message.channel.send("You did not provide a query")
        fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(args.slice(0).join(" "))}`)
        .then(res => res.text())
        .then( body => {
            const json = JSON.parse(body)
            let clean_def = json.list[0].definition.replace(/[\[\]]/g, "")
            let clean_eg = json.list[0].example.replace(/[\[\]]/g, "")
            const embed = new EmbedBuilder()
            .setTitle(json.list[0].word)
            .setURL(json.list[0].permalink)
            .setColor('#f5e942')
            .setDescription(`**Definition**: \n${clean_def.replace(/[/]/g, "")} \n **Example**: \n${clean_eg.replace(/[/]/g, "")}`)
            .setFooter({text: `${json.list[0].thumbs_up} 👍 | ${json.list[0].thumbs_down} 👎 | Author: ${json.list[0].author}`})
            .setTimestamp()
            message.channel.send({embeds:[embed]})
            //console.log(json.list[0])
    })
        .catch( err => {
            console.log(err)
            message.channel.send(`An error occured \nMaybe the word doesn't exist? Contact Baggette#4777 if this persists `)
        })
    }
}