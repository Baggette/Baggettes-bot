const akinator = require("discord.js-akinator");
module.exports={
    name:"guess",
    description:"Lets play a game",
    execute: async(client, message, args) =>{
        akinator(message, {
            language: "en", // Defaults to "en"
            childMode: false, // Defaults to "false"
            gameType: "character", // Defaults to "character"
            useButtons: true, // Defaults to "false"
            embedColor: '#f5e942' // Defaults to "Random"
        });
    }
}