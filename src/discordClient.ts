import { Client, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { loadCommandsFromFile } from "./commands/loader.js";
import DiscordClientOptions from "./discordClientOptions.js";

const commands = await loadCommandsFromFile(); 

export default class DiscordClient {
  authToken: string;
  intents: GatewayIntentBits[];
  client: Client;
  constructor(options: DiscordClientOptions){
    this.authToken = options.authToken ?? "";
    this.intents = [GatewayIntentBits.Guilds];
  }

  // initialises the client and sets up event listeners
  async init(){
    this.client = new Client({ intents: this.intents });

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

    const command = commands.get(interaction.commandName);

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