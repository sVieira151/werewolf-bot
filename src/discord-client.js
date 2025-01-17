import { Client, Events, SlashCommandBuilder, GatewayIntentBits, Collection } from "discord.js";
import { loadCommandsFromFile } from "./commands/loader.js";

export class DiscordClient {
  constructor(options = {}){
    this.authToken = options.authToken ?? "";
    this.intents = [GatewayIntentBits.Guilds];
  }

  // initialises the client and sets up event listeners
  async init(){
    this.client = new Client({ intents: this.intents });
    this.client.commands = await loadCommandsFromFile();

    // events
    this.client.once(Events.ClientReady, this.onLogin);    
    this.client.on(Events.InteractionCreate, this.onInteraction);
  }

  login(){
    if (!this.client){
      console.log("Please call init() before attempting to login");
      return;
    } else if (this.client instanceof Client && this.client.isReady()){
      console.log("Discord Client is already logged in!");
      return;
    }

    return this.client.login(this.authToken);
  }

  logout(){
    if (!this.client){
      console.log("Please call init() and login() before attempting to logout!");
      return;
    } else if (this.client instanceof Client && !this.client.isReady()){
      console.log("Discord Client is not logged in!");
      return;
    } 

    return this.client.destroy();
  }

  async onLogin(client){    
    console.log(`Logged in as ${client.user.username}`);
  }

  async onInteraction(interaction){
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      } else {
        await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
      }
    }
  }
}