const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = 'YOUR_DISCORD_BOT_TOKEN';
const DASHBOARD_API_URL = 'https://your.dashboard.api/endpoint';

// Middleware for logging
const logAction = (action) => {
    const logMessage = `${new Date().toISOString()}: ${action}\n`;
    fs.appendFileSync('bot-log.txt', logMessage);
};

// Auto-moderation
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Example auto-moderation rule: delete messages with certain keywords
    const forbiddenWords = ['spam', 'offensive'];
    if (forbiddenWords.some(word => message.content.includes(word))) {
        await message.delete();
        logAction(`Deleted message from ${message.author.username} for inappropriate content.`);
    }

    // Example moderation command: !kick
    if (message.content.startsWith('!kick')) {
        const member = message.mentions.members.first();
        if (member) {
            await member.kick();
            logAction(`Kicked ${member.user.username} from the server.`);
            await message.channel.send(`${member.user.username} has been kicked.`);
        }
    }

    // Connect to dashboard API
    try {
        await axios.post(DASHBOARD_API_URL, {
            event: 'new_message',
            content: message.content,
            author: message.author.username,
        });
    } catch (error) {
        console.error('Error connecting to the dashboard:', error);
    }
});

client.login(TOKEN);