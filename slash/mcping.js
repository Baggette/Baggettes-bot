const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
const util = require('minecraft-server-util');
const wait = require('node:timers/promises').setTimeout;
const options = {
    //timeout: 1000 * 5, // timeout in milliseconds
    enableSRV: true // SRV record lookup
};
module.exports={
    data: new SlashCommandBuilder()
    .setName("mcping")
    .setDescription("ping a minecraft server")
    .addStringOption( option =>
        option
        .setName("ip")
        .setDescription("The server's ip to ping")
        .setRequired(true)
        )
    .addStringOption( option =>
        option
        .setName("port")
        .setDescription("The server port")
        .setRequired(true)
        )
    .addStringOption( option =>
        option
        .setName("version")
        .setDescription("What version of mc is the server")
        .setRequired(true)
        .addChoices(
            {name:"java", value:"java"},
            {name:"bedrock", value:"bedrock"}
        )),
    async execute(interaction) {
        const ip = interaction.options.getString("ip")
        const port = interaction.options.getString("port")
        const version = interaction.options.getString("version")
        if (isNaN(port)) {
            return await interaction.reply({content:`The port \`${port}\` is not a number`, ephemeral:true});
        } else {
        if(version == "java"){
            util.status(ip, parseInt(port), options)
        .then(async (result) => {
            const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("Java server status")
            .setDescription(`This will show the status and info about the minecraft server \n **Server ip:** ${ip} \n **Server port:** ${port}`)
            .addFields(
                {name:"Server Version", value: `${result.version.name}`},
                {name:"Server Protocol Version", value:`${result.version.protocol}`},
                {name:"Players Online", value:`${result.players.online}`},
                {name:"Max Players", value:`${result.players.max}`},
                {name:"Message Of The Day (MOTD)", value:`${result.motd.clean}`},
                {name:"Latency", value:`${result.roundTripLatency}`},
            )
            .setTimestamp()
            await interaction.deferReply()
            await wait(3000)
            await interaction.editReply({embeds: [embed]})// send the embed
            })
        .catch(async (err) => {
            /*const embed = new EmbedBuilder()
            .setColor("#808080")
            .setTitle("There was an error preforming your command")
            .setDescription(`The server was unable to be pinged or you provied the wrong information \n ${err}`)
            .setTimestamp()
            await interaction.deferReply()
            await wait(3000)
            await interaction.editReply({embeds: [embed]})// send the embed*/
            console.log(err)
        })
        }else if(version == "bedrock"){
            util.statusBedrock(ip, parseInt(port), options)
            .then(async (result) => {
                const embed = new EmbedBuilder()
            .setColor("#00FF00")
            .setTitle("Bedrock server status")
            .setDescription(`This will show the status and info about the minecraft server \n **Server ip:** ${ip} \n **Server port:** ${port}`)
            .addFields(
                {name:"Server Version", value: `${result.version.name}`},
                {name:"Server Protocol Version", value:`${result.version.protocol}`},
                {name:"Players Online", value:`${result.players.online}`},
                {name:"Max Players", value:`${result.players.max}`},
                {name:"Message Of The Day (MOTD)", value:`${result.motd.clean}`},
                {name:"Gamemode", value:`${result.gameMode}`}
            )
            .setTimestamp()
            await interaction.deferReply()
            await wait(3000)
            await interaction.editReply({embeds: [embed]})// send the embed
            })
            
            .catch(async (error) => {
            console.log(error);// if the server was unable to be pinged or something else happened
            /*const embed = new EmbedBuilder()
            .setColor("#808080")
            .setTitle("There was an error preforming your command")
            .setDescription(`The server was unable to be pinged or you provied the wrong information \n ${error}`)
            .setTimestamp()
            await interaction.deferReply()
            await wait(3000)
            await interaction.editReply({embeds: [embed]})// send the embed*/
            
            })
        }
        }
    }
}