import { SlashCommandBuilder } from "discord.js";
import { getInteractionUserGuildName } from "../../utility/interactionHelpers.js";

const defaultPingMsg = (interaction) => `Yes? Oh... it's you, ${getInteractionUserGuildName(interaction)}. That's a shame.`;

export const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Will reply if all is well.'),
	async execute(interaction) {
		const sent = await interaction.reply(defaultPingMsg(interaction));
		interaction.editReply(defaultPingMsg(interaction) + `\n\n(Roundtrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms)`);
	},
};