const {EmbedBuilder} = require("discord.js")
module.exports={
    name:"music",
    description:"See the music commands",
    execute(client, message, args){
        const embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setTitle("Baggette's bot music")
        .setDescription("See the commands for the music features of Baggettes bot")
        .addFields(
            {name:"`p!play <song name>`", value:"Play any song you want (make sure to join a vc first)"},
            {name:"`p!stop`", value:"Stop whatever is currently playing"},
            {name:"`p!pause`", value:"Pause whatever is currently playing"},
            {name:"`p!resume`", value:"Resume paused music"},
            {name:"`p!queue`", value:"See the current music queue"},
            {name:"`p!shuffle`", value:"Shuffle the music queue"},
            {name:"`p!seek`", value:"Fast forward the song that's currently playing"},
            {name:"`p!loop`", value:"Loop the current song"},
            {name:"`p!leave`", value:"Force the bot to leave the VC"},
            {name:"`p!nowplaying`", value:"See the name and progress of the current song"},
            {name:"`p!skip`", value:"Skip the currently playing song"},
        )
        .setTimestamp()
        message.channel.send({embeds:[embed]})
    }}