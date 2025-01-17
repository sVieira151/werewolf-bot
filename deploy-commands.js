import { REST, Routes } from 'discord.js';
import { loadCommandsFromFile } from './src/commands/loader.js';

const commands = [];
const commandsCollection = await loadCommandsFromFile();
for (const command of commandsCollection){
	commands.push(command[1].data.toJSON());
}


import config from './config.json' with {type: "json"};

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(config.token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.clientId, config.guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();