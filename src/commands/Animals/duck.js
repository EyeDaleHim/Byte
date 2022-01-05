const Command = require("../../structs/Command");
const { MessageEmbed } = require('discord.js');
const axios = require("axios"),
	path = require('path');

class DuckCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "duck",
            description : "Sends a random duck picture.",
            usage       : "duck",
            args        : false,
			directory   : __dirname,
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		const response = axios.get("https://random-d.uk/api/v2/random");
		
		const DuckEmbed = new MessageEmbed()
			.setTitle('**😍 | Awwwww | 😍**')
			.setImage(response.url)
			.setFooter(`${response.message} • ${this.client.config.embed.footer}`, this.client.user.displayAvatarURL())
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		await message.reply({
			embeds: [DuckEmbed]
		});		
		
    }
}

module.exports = DuckCommand;