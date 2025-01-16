import { Client, Events, SlashCommandBuilder } from "discord.js";
import { token } from "./config.json";

const client = new Client({intents: []});

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.username}`);

  const ping = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!");
  
  c.application.commands.create(ping);
});

client.on(Events.InteractionCreate, interaction => {
  console.log(interaction);
  interaction.reply("Pong!");
});

client.login(token);
