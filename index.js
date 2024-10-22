// Require Packages
const {Client, EmbedBuilder, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('node:path');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const schedule = require('node-schedule');
const { secureHeapUsed } = require('crypto');
const { GoogleGenerativeAI } = require("@google/generative-ai");

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
client.on('ready', async () => {
  console.log('Bot is online!')
  console.log(`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`);
  client.user.setPresence({ activities: [{ name: 'Listening to ghelp' }], status: 'active' });

  /*const genAI = new GoogleGenerativeAI(process.env.PALM_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function checkNorris(norris){
    console.log(norris.value)
    const prompt = `I am going to provide you some input, it is your job to make sure it does not contain any racist or sexist refrerences. \n\n${norris.value}, reply only with yes if it is appropriate or no if it is not. Do NOT REPLY WITH ANYTHING ELSE.`
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  }

  function getNorris(){
    fetch("https://api.chucknorris.io/jokes/random")
    .then(res => res.text())
    .then(body =>{
      const norris = JSON.parse(body)
      checkNorris(norris);
    })
    .catch((err) =>{
    })
  }
  getNorris();*/
  const job = schedule.scheduleJob('45 9 * * *', function(){
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
    })
  });

    /*console.log(client.guilds.cache.map(guild => guild.name).reduce((previous,current) => {
                return previous + "\n" + current
            }, "").substring(2))*/
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