import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { setTimeout as wait } from 'node:timers/promises';
import Command from "../command.js";

function buildInfoEmbed(interaction){
  const { client, guild } = interaction;
  return new EmbedBuilder()
    .setColor(0x00FF99)
    .setTitle(`About`)
    .setAuthor({ name: client.user.username, iconURL: client.user.defaultAvatarURL })
    .setDescription(`Please find below some important information regarding the ${client.user.username} bot.`)
    .addFields(
      { name: `Status`, value: `${client.presence.status}`.toUpperCase(), inline: true },
      { name: `Ready`, value: `${client.isReady()}`.toUpperCase(), inline: true},
      { name: `${(client.isReady() ? `Ready Since` : `Last Ready At`)}`, value: `${client.isReady() ? new Date(Date.now() - client.uptime) : client.readyAt}`},
      { name: `Created`, value: `${client.application.createdAt}` },
      { name: `Current Server`, value: `${guild ? guild.name : `N/A`}`},
      { name: `Joined`, value: `${guild ? guild.joinedAt : `N/A`}`},
    );
}

class AboutCommand implements Command{
  data: SlashCommandBuilder;
  constructor(){
    this.data = new SlashCommandBuilder()
		  .setName('about')
		  .setDescription('Provides information about the bot.');
  }	
  async execute(interaction) {
    await interaction.deferReply();
    await wait(2_000);
		await interaction.editReply(`You think I'll give *you* that kind of information?!`);
    await wait(4_000);
    await interaction.followUp({content: `Ugh, fine...`, embeds: [buildInfoEmbed(interaction)]})
  }
}

export const command = new AboutCommand();