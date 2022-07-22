const {Client, Intents, EmbedBuilder} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const got = require('got');
const Prefix = "g"
const Discord = require('discord.js');
const fs = require('fs');
const { DisTube } = require('distube')
const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "MessageContent",
        "GuildVoiceStates"
    ]
});
const { YtDlpPlugin } = require('@distube/yt-dlp')
client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new YtDlpPlugin()
  ]
})
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}
client.on('ready', () => {
    console.log('g is online')
    client.user.setPresence({ activities: [{ name: 'Listening to ghelp' }], status: 'active' });
});
// command
client.on('messageCreate', (message) => { // You can use one block for an entire event
    if (!message.content.startsWith(Prefix) || message.author.bot) return;
    const args = message.content.slice(Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // If command does not exist, return
    if (!client.commands.get(command)) {
        return
    }

    client.commands.get(command).execute(client, message, args)

});
const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
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
    queue.textChannel.send({embeds:[addsong_embed]})}
  )
  .on('addList', (queue, playlist) =>{
   const addlist_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)
        .setTimestamp()
    queue.textChannel.send({embeds:[addlist_embed]})}
  )
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
        channel.send({embeds:[empty_embed]})})
  .on('searchNoResult', (message, query) =>{
  const no_result_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription(`No result found for \`${query}\`!`)
        .setTimestamp()
    message.channel.send({embeds:[no_result_embed]})}
  )
  .on('finish', queue => {
  const finished_embed = new EmbedBuilder()
        .setColor('#f5e942')
        .setDescription("Finished!")
        .setTimestamp()
        queue.textChannel.send({embeds:[finished_embed]})})
client.login(process.env.TOKEN)