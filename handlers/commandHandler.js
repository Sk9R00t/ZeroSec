// commandHandler.js

const fs = require('fs');
const path = require('path');

class CommandHandler {
    constructor(client) {
        this.client = client;
        this.commands = new Map();
    }

    loadCommands(commandsDir) {
        const files = fs.readdirSync(commandsDir);
        for (const file of files) {
            const filePath = path.join(commandsDir, file);
            const command = require(filePath);
            this.commands.set(command.name, command);
            console.log(`Command ${command.name} loaded.`);
        }
    }

    executeCommand(commandName, ...args) {
        const command = this.commands.get(commandName);
        if (command) {
            return command.execute(...args);
        }
        console.error(`Command ${commandName} not found.`);
    }
}

module.exports = CommandHandler;
