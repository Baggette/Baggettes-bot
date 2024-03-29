const fetch = require('node-fetch')
const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
module.exports ={
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('get a shitpost'),
    async execute(interaction){
        await interaction.deferReply()
        fetch('https://www.reddit.com/r/dankmemes/random/.json')
            .then(res => res.text())
            .then(async body => {
                const [list] = JSON.parse(body);
                const [post] = list.data.children;
                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;
                const embed = new EmbedBuilder()
                .setTitle(`${memeTitle}`)
                .setURL(`${memeUrl}`)
                .setColor('#f5e942')
                .setImage(memeImage)
                .setFooter({text:`👍 ${memeUpvotes} 💬 ${memeNumComments}`})
                
                await interaction.editReply({ embeds: [embed] })
            })
            .catch(console.error);
    }   
}
