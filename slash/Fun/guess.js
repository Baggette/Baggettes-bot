const { SlashCommandBuilder} = require('discord.js')
const akinator = require("discord.js-akinator");
module.exports={
    data: new SlashCommandBuilder()
    .setName("guess")
    .setDescription("Lets play a game"),
    async execute(interaction){
        akinator(interaction, {
            language: "en", // Defaults to "en"
            childMode: false, // Defaults to "false"
            gameType: "character", // Defaults to "character"
            useButtons: true, // Defaults to "false"
            embedColor: '#f5e942' // Defaults to "Random"
        });
    }
}