import { SlashCommandBuilder } from "discord.js";

export const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Will reply if all is well.'),
	async execute(interaction) {
		const name = interaction.member.nickname ?? interaction.user.globalName;
		await interaction.reply(`Yes? Oh... it's you, ${name}. That's a shame.`);
	},
};