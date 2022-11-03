const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const prettyMilliseconds = require('pretty-ms')
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		wait(4000)
		const embed = new EmbedBuilder()
        .setColor("#f5e942")
        .setTitle("The Baggettes bot latency and uptime ")
        .addFields(
            {name:"Bot latency", value:`${client.ws.ping}` + 'ms'},
            {name:"Bot uptime", value:`${prettyMilliseconds(client.uptime)}`},
			{name:"Round trip latency", value: `${sent.createdTimestamp - interaction.createdTimestamp}ms`}
            )
        .setTimestamp()
		await interaction.editReply({embeds:[embed]});
	},
};