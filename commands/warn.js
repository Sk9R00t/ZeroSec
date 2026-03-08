const { Command } = require('commando');
const { MessageEmbed } = require('discord.js');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, { 
            name: 'warn', 
            group: 'moderation', 
            memberName: 'warn', 
            description: 'Warns a user.',
            args: [
                { 
                    key: 'user', 
                    prompt: 'Who do you want to warn?', 
                    type: 'user' 
                },
                { 
                    key: 'reason', 
                    prompt: 'What is the reason for the warning?', 
                    type: 'string' 
                }
            ]
        });
    }

    async run(message, { user, reason }) {
        const warnEmbed = new MessageEmbed()
            .setColor('#ffcc00')
            .setTitle('User Warned')
            .addField('User:', user.tag)
            .addField('Reason:', reason)
            .setTimestamp();

        await message.channel.send(warnEmbed);
        // Here, you would add logic to log the warning to a database if needed
    }
};
