module.exports={
  name:"ban",
  description:"Bans a mentioned user",
  execute: async(client, message, args) =>{
      const guild = await client.guilds.fetch(message.guildId)
       if(!args[0]){
           message.channel.send("Please mention someone to ban or provide their id")
      }else if(args[0]){
           if(!guild.members.me.permissions.has('BanMembers')){
              message.channel.send('I cannot ban this person')
          return 
      }else if(!message.member.permissions.has("BanMembers")){
          message.channel.send(`You do not have perms to ban \```${args[0]}\````)
      } 
               const rawid1 =  args[0].replace("@", "")
               const rawdid2 = rawid1.replace("<", "")
               const id = rawdid2.replace(">", "")
              console.log(id)
              
              guild.members.ban(id)
              .then(user => message.channel.send(`<@${id}> was successfully banned`))
              .catch((err) =>{
                message.channel.send(`an error occorred: ${err}`)
              })
              }
  }
}