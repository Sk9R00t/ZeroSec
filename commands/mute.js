const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mutes a user in the server')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The user to mute')
                .setRequired(true)),
    async execute(interaction) {
        const targetUser = interaction.options.getUser('target');

        // Check if the bot has permission to mute members
        if (!interaction.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) {
            return interaction.reply({ content: 'You do not have permission to mute members.', ephemeral: true });
        }

        // Fetch the member to mute
        const member = await interaction.guild.members.fetch(targetUser.id);
        
        // Mute the member
        await member.voice.setMute(true);
        return interaction.reply({ content: `${targetUser.username} has been muted.`, ephemeral: true });
    },
};
