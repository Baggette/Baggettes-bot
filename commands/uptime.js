const prettyMilliseconds = require('pretty-ms')
module.exports = {
    name: 'uptime',
    description: 'see bot uptime',
    execute(client, message, args) {
        message.channel.send(`Uptime: ${prettyMilliseconds(client.uptime)}`)
    }
}