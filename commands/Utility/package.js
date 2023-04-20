const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const got = require("got")
module.exports={
    name:"package",
    description:"Search for packages",
    execute: async(client, message, args) =>{
        if(!args[0]){
        message.channel.send("You have to specify a package name!")   
        return; 
        }
        got(`https://spartacusdev.herokuapp.com/api/search/${encodeURIComponent(args.slice(0).join(" "))}`)
        .then(response =>{
            const json_stuff = JSON.parse(response.body)
            //console.log(json_stuff.data.slice(5))
            const json_length = json_stuff.length
            if(!json_stuff.data[1]){
                message.channel.send("The data recived from the api was null (perhaps the package does not exist?)")
                return    
            }
            const g = json_stuff.data[1]
            console.log(g)
            const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle(ButtonStyle.Primary),
			);
            const embed =  new EmbedBuilder()
            .setTitle(`This command is still wip, it will only show the first result from the api at this moment`)
            .setColor('#f5e942')
            .addFields(
                {name:`Package name`, value:`${g.name}`},
                {name:`Package description`, value:`${g.description}`},
                {name:"Maintainer", value:`${g.maintainer}`},
                {name:"Author", value:`${g.author}`},
                {name:"Package", value:`${g.package}`},
                {name:"Dependencies", value:`${g.dependencies}`},
                {name:"Architecture", value:`${g.architecture}`},
                {name:"Repo", value:`${g.repo}`},
            )
            .setTimestamp()
            message.channel.send({embeds:[embed], components:[row]})
        })
        .catch((err) =>{
            message.channel.send(`An error occorred: ${err}`)
            console.log(args.slice(0).join("%").slice(" "))
        })
    }
}