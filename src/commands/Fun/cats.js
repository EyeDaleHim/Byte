const Command = require( "../../../lib/structs/Command" );
const { MessageEmbed } = require('discord.js');
const path = require("path");

class CatsCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "cats",
            description : "Responds with a random cat picture.",
            usage       : "cats",
            args        : false,
			directory   : __dirname,
            aliases     : ["cat"],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : false,
        });
    }

    async run(message) {
		let link = await (this.client.flipnote).image.cats();
		const cat = new MessageEmbed()
			.setTitle('**Here is your cat picture:**')
			.setImage(link.file)
			.setFooter(`Requested by ${message.author.tag}`)
        return message.channel.send({embeds: [ cat ]});
    }
}

module.exports = CatsCommand;