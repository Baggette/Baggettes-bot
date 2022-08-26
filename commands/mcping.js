const util = require('minecraft-server-util');
const {EmbedBuilder} = require('discord.js');
const options = {
    //timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
module.exports ={
    name: 'mcping',
    description: 'Ping a minecraft server',
    execute(client, message, args){
        const server_ip = args[0]
        const server_port_string = args[1]
        const server_port = parseInt(server_port_string)
        if(!args[0]){
            message.channel.send("Please specify the server ip.")
        }else if(!args[1]){
            message.channel.send("Please specify the server port.")
        }else if(args[0] && args[1] && !args[2]){
            util.status(server_ip, server_port, options)
    .then((result) => {
        const embed = new EmbedBuilder()
    .setColor("#00FF00")
    .setTitle("Java server status")
    .setDescription(`This will show the status and info about the minecraft server \n **Server ip:** ${server_ip} \n **Server port:** ${server_port}`)
    .addFields(
        {name:"Server Version", value: `${result.version.name}`},
        {name:"Server Protocol Version", value:`${result.version.protocol}`},
        {name:"Players Online", value:`${result.players.online}`},
        {name:"Max Players", value:`${result.players.max}`},
        {name:"Message Of The Day (MOTD)", value:`${result.motd.clean}`},
        {name:"Latency", value:`${result.roundTripLatency}`},
    )
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    })
    
    .catch((error) => {
    console.log(error);// if the server was unable to be pinged or something else happened
    const embed = new EmbedBuilder()
    .setColor("#808080")
    .setTitle("There was an error preforming your command")
    .setDescription(`The server was unable to be pinged or you provied the wrong information`)
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    
    })
        
    }else if(args[0] && args[1] && args[2] == "bedrock" || args[2] == "mcpe"){
        util.statusBedrock(server_ip, server_port, options)
    .then((result) => {
        const embed = new EmbedBuilder()
    .setColor("#00FF00")
    .setTitle("Bedrock server status")
    .setDescription(`This will show the status and info about the minecraft server \n **Server ip:** ${server_ip} \n **Server port:** ${server_port}`)
    .addFields(
        {name:"Server Version", value: `${result.version.name}`},
        {name:"Server Protocol Version", value:`${result.version.protocol}`},
        {name:"Players Online", value:`${result.players.online}`},
        {name:"Max Players", value:`${result.players.max}`},
        {name:"Message Of The Day (MOTD)", value:`${result.motd.clean}`},
        {name:"Gamemode", value:`${result.gameMode}`}
    )
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    })
    
    .catch((error) => {
    console.log(error);// if the server was unable to be pinged or something else happened
    const embed = new EmbedBuilder()
    .setColor("#808080")
    .setTitle("There was an error preforming your command")
    .setDescription(`The server was unable to be pinged or you provied the wrong information`)
    .setTimestamp()
    message.channel.send({embeds: [embed]})// send the embed
    
    })
    }
    }
}