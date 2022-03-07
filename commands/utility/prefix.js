module.exports ={
    name: 'prefix',
    description: 'see the bots prefix',
    execute(message, args){
        message.reply({content: 'the prefix is `g`.'})
    }   
}
