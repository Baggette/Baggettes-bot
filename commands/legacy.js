const got = require('got')
module.exports ={
    name: 'legacy',
    description: 'see a post from the legacy jailbreak subreddit',
    execute(client, message, args){
        const {EmbedBuilder} = require('discord.js');
            const embed = new EmbedBuilder()
        got('https://www.reddit.com/r/LegacyJailbreak/random/.json')
            .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;
    
                const permalink = post.data.permalink;
                const memeUrl = `https://reddit.com${permalink}`;
                const memeImage = post.data.url;
                const memeTitle = post.data.title;
                const memeUpvotes = post.data.ups;
                const memeNumComments = post.data.num_comments;
    
                embed.setTitle(`${memeTitle}`);
                embed.setURL(`${memeUrl}`);
                embed.setColor('RANDOM');
                embed.setImage(memeImage);
                embed.setFooter({text:`👍 ${memeUpvotes} 💬 ${memeNumComments}`});
    
                message.channel.send({ embeds: [embed] })
            })
            .catch(console.error);
    }   
}