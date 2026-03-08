const { Permissions } = require('discord.js');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server.',
    async execute(message, args) {
        // Check if the user has permission to ban members
        if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            return message.reply("You don't have permissions to use this command!");
        }

        // Check if a user was mentioned
        const user = message.mentions.users.first();
        if (!user) {
            return message.reply("Please mention a user to ban.");
        }

        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.reply("That user isn't in this server!");
        }

        try {
            await member.ban();
            message.channel.send(`${user.tag} has been banned from the server.`);
        } catch (error) {
            console.error(error);
            message.channel.send("I was unable to ban the member");
        }
    },
};
