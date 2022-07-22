module.exports={
    name:"leave",
    description:"Make the bot leave the VC",
    execute(client, message, args){
        client.distube.voices.leave(message)
    }
}
