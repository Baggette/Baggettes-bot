const {EmbedBuilder } = require('discord.js');
const prettyMilliseconds = require('pretty-ms')
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	name:'ping',
	description:'Shows bot latency',
	async execute(client, message, args) {
		const sent = await message.channel.send({ content: 'Pinging...', fetchReply: true });
		wait(4000)
		const embed = new EmbedBuilder()
        .setColor("#f5e942")
        .setTitle("Baggettes bot latency and uptime or something like that")
        .addFields(
            {name:"Bot latency", value:`${client.ws.ping}` + 'ms'},
            {name:"Bot uptime", value:`${prettyMilliseconds(client.uptime)}`},
			{name:"Round trip latency", value: `${sent.createdTimestamp - message.createdTimestamp}ms`}
            )
        .setTimestamp()
		await sent.edit({embeds:[embed]});
	},
};