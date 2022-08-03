module.exports={
  name:"kick",
  description:"Kicks a mentioned user",
  execute: async(client, message, args) =>{
      const guild = await client.guilds.fetch(message.guildId)
       if(!args[0]){
           message.channel.send("Please mention someone to bkick or provide their id")
      }else if(args[0]){
           if(!guild.members.me.permissions.has('KickMembers')){
              message.channel.send('I cannot ban this person')
          return 
      }else if(!message.member.permissions.has("KickMembers")){
          message.channel.send(`You do not have perms to ban \```${args[0]}\````)
      } 
               const rawid1 =  args[0].replace("@", "")
               const rawdid2 = rawid1.replace("<", "")
               const id = rawdid2.replace(">", "")
              console.log(id)
              
              guild.members.kick(id)
              .then(user => message.channel.send(`<@${id}> was successfully kicked`))
              .catch((err) =>{
                message.channel.send(`An error occorred: ${err}`)
              })
       }
  }
}