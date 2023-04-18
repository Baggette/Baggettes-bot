# Baggettes-bot
My first attempt at a discord bot. Things may break

To add the bot yourself, click [here](https://discord.com/api/oauth2/authorize?client_id=928069129892663347&permissions=137509588038&scope=bot). To host your own fork of the bot, please check below for instructions.


## Self Hosting
### Requirements
- Your own bot (You can make this on the [Discord Developer Portal](https://discord.com/developers/applications))
- A [NASA API Key](https://api.nasa.gov/). It must be placed in the `.env` file, with proper syntax.
- Node.js, as well as an editor of some sort. [repl.it](https://replit.com) works great as an online editor.


### Steps
1. Make a new application on the portal
2. Name it whatever you want
3. go to the bot tab
4. click add bot
5. Click yes do it
6. Click reset token and copy the token for later
7. Download a zip of this project or git clone it
8. **(only if you downloaded a zip)** unzip the file you just downloaded
9. `cd` into the directory
10. Run `npm i`. Wait for it to finish
11. edit the `example.env` file and replace YOUR BOTTOKEN HERE with your bot token, save it as `.env` and run `node .` and you should be set!

## Licensing
This project is licensed under the GNU General Public License v3. You can see exactly what this entails [here](LICENSE).

## Contributing
No contributing file yet, will make one soon. In the meantime, feel free to make pull requests and then submit those.
