const {EmbedBuilder} = require('discord.js')
const db = require('quick.db')
const ms = require('parse-ms') 
const { randomPassword, randomNumber, ipAddress } = require('tech-tip-cyber')
const randomMail = require('tech-tip-cyber') 
module.exports ={
    name: 'hack',
    description: 'totaly real hack',
    execute: async (client, message, args) => {
        const user = message.member
        const mention = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!mention) return message.reply(`Whom You Want To Hack?`) 

        const timeout = 120000 
        const hacktime = db.fetch(`hacktime_${user.id}`)

        if (hacktime !== null && timeout - (Date.now() - hacktime) > 0) { 
            const timeleft = ms(timeout - (Date.now() - hacktime))

            const embed = new EmbedBuilder()
                .setAuthor(`${user.user.username} Hacked`, user.user.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor('RANDOM')
                .setDescription(`
Already Hacked, Hack Again In **${timeleft.minutes} Minutes ${timeleft.seconds} Seconds**
Default CoolDown Is **2 Minutes**
            `)
            message.channel.send({embeds:[embed]})
        } else {
            const disemail = randomMail({ 
                domain: 'gmail.com' 
            })

            const email = randomMail({ 
                domain: 'gmail.com' 
            })

            const dispassword = randomPassword(12) 

            const password = randomPassword(12) 
 
            const ip = ipAddress() 

            const age = await randomNumber({ 
                Minimum: 8, 
                Maximum: 62, 
            }) 

            message.channel.send(`Starting To Hack ${mention.user.username}`).then(message => { 
                setTimeout(function () {
                    message.edit(`Logging In To Discord Account...`)
                }, 2000)
                setTimeout(function () {
                    message.edit(`Logging In To Discord Account. 2FA Passed`)
                }, 5000)
                setTimeout(function () {
                    message.edit(`Logged In To Discord Of ${mention.user.username}\nEmail: ${disemail}\nPassword: ${dispassword}`)
                }, 8000)
                setTimeout(function () {
                    message.edit(`Injecting Virus In #${mention.user.discriminator}`)
                }, 11000)
                setTimeout(function () {
                    message.edit(`Successfully Injected Virus In #${mention.user.discriminator}`)
                }, 15000)
                setTimeout(function () {
                    message.edit(`Hacking Gmail Account...`)
                }, 18000)
                setTimeout(function () {
                    message.edit(`Hacking Gmail Account... Getting Password`)
                }, 22000)
                setTimeout(function () {
                    message.edit(`Hacked Gmail Account Of ${mention.user.username}\nEmail: ${email}\nPassword: ${password}`)
                }, 26000)
                setTimeout(function () {
                    message.edit(`Getting IP Address For You To Hack PC...`)
                }, 30000)
                setTimeout(function () {
                    message.edit(`Found IP Address Of ${mention.user.username}\nIP: ${ip}`)
                }, 35000)
                setTimeout(function () {
                    message.edit(`Getting Age For Personal Details...`)
                }, 37000)
                setTimeout(function () {
                    message.edit(`Found Age Of ${mention.user.username}\nAge: ${age}`)
                }, 40000)
                setTimeout(function () {
                    message.edit(`<a:tada:810231460975869963> Successfully Hacked ${mention.user.username}`)
                }, 45000)
            })
            db.set(`hacktime_${user.id}`, Date.now()) 
        }
    }
}   
