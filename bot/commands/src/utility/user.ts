import { SlashCommandBuilder } from "discord.js";
import { getInteractionUserGuildName } from "../interactionHelpers.js";
import Command from "../command.js";

class UserCommand implements Command{
	data: SlashCommandBuilder;
	constructor(){
		this.data = new SlashCommandBuilder()
			.setName('user')
			.setDescription('Provides information about the user.');
	}
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply(`This command was run by ${getInteractionUserGuildName(interaction)}, who joined on ${interaction.member.joinedAt}.`);
	}
}

export const command = new UserCommand();