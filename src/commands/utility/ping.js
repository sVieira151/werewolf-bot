import { SlashCommandBuilder } from "discord.js";
import { getInteractionUserGuildName } from "../../utility/interactionHelpers.js";

export const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Will reply if all is well.'),
	async execute(interaction) {
		await interaction.reply(`Yes? Oh... it's you, ${getInteractionUserGuildName(interaction)}. That's a shame.`);
	},
};