import { Collection } from "discord.js";
import fs from "fs";
import url from "url";
import path from "path";

export async function loadCommandsFromFile() {
  // we could use __dirname but doing it long hand in case we 
  // need to run as ES Module
  const filename = url.fileURLToPath(import.meta.url);
  const foldersPath = path.dirname(filename);
  const commandFolders = fs.readdirSync(foldersPath);

  let commands = new Collection();
  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    if (!fs.existsSync(commandsPath) || !fs.lstatSync(commandsPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
      const filePath = path.join("file:///", commandsPath, file);
      const { command } = await import(filePath);
      // Set a new item in the Collection with the key as the command name and the value as the exported module
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command); 
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
      }
    }
  }
  return commands;
}