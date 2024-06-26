const fetch = require('node-fetch');
const {EmbedBuilder} = require('discord.js');
module.exports ={
    name: 'meme',
    description: 'get a shitpost',
    execute(client, message, args){   
        fetch('https://www.reddit.com/r/dankmemes/random/.json')
            .then(res => res.text())
            .then(body => {
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
                
                message.channel.send({ embeds: [embed] })
            })
            .catch(console.error);
    }   
}
