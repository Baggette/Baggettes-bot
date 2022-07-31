module.exports ={
    name: 'prefix',
    description: 'see the bots prefix',
    execute(client, message, args){
        message.reply({content: 'the prefix is `g`.'})
    }   
}