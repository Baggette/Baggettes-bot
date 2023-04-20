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
            {name:"`gplay <song name>`", value:"Play any song you want (make sure to join a vc first)"},
            {name:"`gstop`", value:"Stop whatever is currently playing"},
            {name:"`gpause`", value:"Pause whatever is currently playing"},
            {name:"`gresume`", value:"Resume paused music"},
            {name:"`gqueue`", value:"See the current music queue"},
            {name:"`gshuffle`", value:"Shuffle the music queue"},
            {name:"`gseek`", value:"Fast forward the song that's currently playing"},
            {name:"`gloop`", value:"Loop the current song"},
            {name:"`gleave`", value:"Force the bot to leave the VC"},
            {name:"`gnowplaying`", value:"See the name and progress of the current song"},
            {name:"`gskip`", value:"Skip the currently playing song"},
            {name:"`gvolume <0-100>`", value:"adjust the volume of the music"}
        )
        .setTimestamp()
        message.channel.send({embeds:[embed]})
    }}