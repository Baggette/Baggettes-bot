module.exports ={
    name: 'source',
    description: 'to view the source code of the bot',
    execute(message, args){
        message.reply({content: 'https://github.com/Baggette/Baggettes-bot'})
    }   
}