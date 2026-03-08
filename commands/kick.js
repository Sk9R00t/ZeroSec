const { Command } = require('discord.js-commando');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            group: 'admin',
            memberName: 'kick',
            description: 'Kicks a user from the server.',
            args: [
                {
                    key: 'user',
                    prompt: 'Which user would you like to kick?',
                    type: 'user',
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to kick this user?',
                    type: 'string',
                    default: 'No reason provided',
                },
            ],
        });
    }

    async run(message, { user, reason }) {
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply('That user isn’t in this guild!');
        }
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.reply('I cannot kick members!');
        }
        try {
            await member.kick(reason);
            return message.reply(`${user.tag} has been kicked for: ${reason}`);
        } catch (error) {
            return message.reply('I was unable to kick the member');
        }
    }
};