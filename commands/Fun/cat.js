const {EmbedBuilder} = require("discord.js");
const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();
module.exports={
    name:"cat",
    description:"see a cat",
    async execute(client, message, args){
        api_key = process.env.CAT_API;
        fetch(`https://api.thecatapi.com/v1/images/search?api_key${api_key}`)
        .then(res => res.text())
        .then(body =>{
            const data = JSON.parse(body)
            console.log(data);
            const embed = new EmbedBuilder()
            .setTitle("Kitties")
            .setColor('#f5e942')
            .setURL(`${data[0].url}`)
            .setImage(`${data[0].url}`)
            .setTimestamp()
            message.channel.send({embeds:[embed]})
        })
        .catch((err) =>{
            message.channel.send(`An error occorred whilst running the command \n ${err}`)
        })
    }
}