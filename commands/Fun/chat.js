const {EmbedBuilder} = require("discord.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
const Cooldown = require('cooldown.js');
const cooldown = new Cooldown();
module.exports={
    name:"chat",
    description:"Chat with the bot",
    cooldown: 5,
    async execute(client, message, args){
        if(!args[0]) return message.reply("Please provide a prompt to chat with the bot!");
        const pingCooldown = new cooldown.Command(
            message.guild.id /* the guild id of the guild */,
            'ping' /* the command name */,
         ); // create a new cooldown for the command
         const userCooldown = pingCooldown.has(message.author.id);
         if (userCooldown) {
            // if the user has a cooldown
            message.reply(
               "You're on cooldown! Try again in " +
                  userCooldown.secondsleft +
                  ' seconds.',
            );
            return;
         }
    try{ 
      const prompt = args.slice(0).join(" ");
      fetch(`${process.env.PALM_API_PROXY_URL}/?api_key=${process.env.PALM_API}&prompt=${encodeURIComponent(prompt)}`)
    .then(res => res.text())
      .then(body => {
       const response = JSON.parse(body);
       const str = new String(response.response)
       if(str.length > 2000) return message.reply("sorry an error occured, please try again!");
        message.reply(response.response);
        pingCooldown.add(
            message.author.id /* the user id */,
            1000 * 5,
         ); 
    })}catch(err){
        console.log(err);
        message.reply(`An error occured: ${err}`);
    }
}}