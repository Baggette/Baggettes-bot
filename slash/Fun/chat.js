const {SlashCommandBuilder} = require("discord.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const Cooldown = require('cooldown.js');
const cooldown = new Cooldown();
module.exports={
    data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Chat with the bot")
    .addStringOption(option =>
        option
            .setName("prompt")
            .setDescription("prompt for the bot to chat with you")
            .setRequired(true)
        ),
    cooldown: 5,
    async execute(interaction){
        await interaction.deferReply();
        const pingCooldown = new cooldown.Command(
            interaction.guild.id /* the guild id of the guild */,
            'ping' /* the command name */,
         ); // create a new cooldown for the command
         const userCooldown = pingCooldown.has(interaction.user.id);
         if (userCooldown) {
            // if the user has a cooldown
            await interaction.editReply(
               "You're on cooldown! Try again in " +
                  userCooldown.secondsleft +
                  ' seconds.',
            );
            return;
         }
    try{ 
      const prompt = interaction.options.getString("prompt");
      fetch(`${process.env.PALM_API_PROXY_URL}/?api_key=${process.env.PALM_API}&prompt=${"When responding to the following prompt, try to condense your response. Make sure it is under 2000 characters. Prompt: " + encodeURIComponent(prompt)}`)
    .then(res => res.text())
      .then(async body => {
       const response = JSON.parse(body);
       const str = new String(response.response)
       if(str.length > 2000) return await interaction.editReply("An error occured");
        await interaction.editReply(response.response);
        pingCooldown.add(
            interaction.user.id /* the user id */,
            1000 * 5,
         ); 
    })}catch(err){
        console.log(err);
        await interaction.editReply(`An error occured: ${err}`);
    }
}}