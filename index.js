// Require Packages
const {Client, EmbedBuilder, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const { DisTube } = require('distube')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { YtDlpPlugin } = require('@distube/yt-dlp')

// Instantiate Client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
		    GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

// Instantiate Music Client
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new YtDlpPlugin()
  ]
})

// Slash Commands Manager
client.commands = new Collection();
client.slashcommands = new Collection();

const scFoldersPath = path.join(__dirname, 'slash');
const scFolders = fs.readdirSync(scFoldersPath);

for (const folder of scFolders) {
	const scPath = path.join(scFoldersPath, folder);
	const scFiles = fs.readdirSync(scPath).filter(file => file.endsWith('.js'));

	for (const file of scFiles) {
		const scfilePath = path.join(scPath, file);
		const slashcommand = require(scfilePath);

		if ('data' in slashcommand && 'execute' in slashcommand) {
			client.slashcommands.set(slashcommand.data.name, slashcommand);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// Commands Manager
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

		client.commands.set(command.name, command);
	}
}

// Once Ready
client.on('ready', () => {
  console.log('Bot is online!')
  client.user.setPresence({ activities: [{ name: 'Listening to ghelp' }], status: 'active' });
  setInterval( () => {
    fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.text())
    .then(body =>{
      const norris = JSON.parse(body)
      const embed = new EmbedBuilder()
        .setTitle(`Chuck Norris`)
        .setURL(`${norris.url}`)
        .setColor('#f5e942')
        .setDescription(`${norris.value}`)
        .setTimestamp()
      client.channels.cache.get("1004197872104902726").send({embeds:[embed]})
    })
    .catch((err) =>{
      channel.send(`An error occurred: ${err}`)
    })}, 86400000)
    console.log(client.guilds.cache.map(guild => guild.name).reduce((previous,current) => {
                return previous + "\n" + current
            }, "").substring(2))
});

// On Slash Command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const slash = interaction.client.slashcommands.get(interaction.commandName);

	if (!slash) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await slash.execute(interaction, client);
	} catch (error) {
		console.error(`Error executing ${interaction.commandName}`);
		console.error(error);
	}
});

client.login(process.env.TOKEN);

// On Message Command
client.on('messageCreate', async (message) => { 
  let Prefix = await db.get(`prefix_${message.guild.id}`) || "g";
  if (!message.content.startsWith(Prefix) || message.author.bot) return;
  const args = message.content.slice(Prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.get(command)) {
    return
  }
  client.commands.get(command).execute(client, message, args)
});

// Music Bot Settings
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``

client.distube

  .on('playSong', (queue, song) =>{
    const playsong_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`)
      .setTimestamp()
    queue.textChannel.send({embeds:[playsong_embed]})
  })
  .on('addSong', (queue, song) =>{
    const addsong_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`)
      .setTimestamp()
    queue.textChannel.send({embeds:[addsong_embed]})
  })
  .on('addList', (queue, playlist) =>{
    const addlist_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
      .setTimestamp()
    queue.textChannel.send({embeds:[addlist_embed]})
  })
  .on('error', (channel, e) => {
    const error_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription(`An error encountered: ${e.toString().slice(0, 1974)}`)
      .setTimestamp()
    if (channel) channel.send({embeds:[error_embed]})
    else console.error(e)
  })
  .on('empty', channel =>{
    const empty_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription('Voice channel is empty! Leaving the channel...')
      .setTimestamp() 
    channel.send({embeds:[empty_embed]})
  })
  .on('searchNoResult', (message, query) =>{
    const no_result_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription(`No result found for \`${query}\`!`)
      .setTimestamp()
    message.channel.send({embeds:[no_result_embed]})
  })
  .on('finish', queue => {
    const finished_embed = new EmbedBuilder()
      .setColor('#f5e942')
      .setDescription("Finished!")
      .setTimestamp()
    queue.textChannel.send({embeds:[finished_embed]})
  })

// Login with the token  
