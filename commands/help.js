module.exports ={
    name: 'help',
    description: 'get a list of bot commands',
    execute(message, args){
        message.reply({content: '> `gping` to get bot latency \n> `ghelp` to see this menu \n > `gg` to get the link to the best website \n > `gmake my mac faster` to mac your mac faster \n > `gprefix` to see the prefix \n > `gutptime` to view the bots uptime \n > `gmeme` to see a shitpost \n > `glegacy` to see a post from the r/legacy jailbreak subreddit \n > `gtwitter` to see some tweets \n > `gdog` to see a cute doggo \n > `gfood` see some good food'})
    }   
}
