import { SlashCommandBuilder } from "discord.js";
import { getInteractionUserGuildName } from "../../utility/interactionHelpers.js";

const defaultPingMsg = `Yes? Oh... it's you, ${getInteractionUserGuildName(interaction)}. That's a shame.`;

export const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Will reply if all is well.'),
	async execute(interaction) {
		await interaction.reply(defaultPingMsg);
		interaction.editReply(defaultPingMsg + `\n(*Roundtrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms*)`);
	},
};