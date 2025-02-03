import { SlashCommandBuilder } from "discord.js";
import { getInteractionUserGuildName } from "../interactionHelpers.js";
import Command from "../command.js";

const defaultPingMsg = (interaction) => `Yes? Oh... it's you, ${getInteractionUserGuildName(interaction)}. That's a shame.`;

class PingCommand implements Command{
	data: SlashCommandBuilder;
	constructor(){
		this.data = new SlashCommandBuilder()
			.setName('ping')
			.setDescription('Will reply if all is well.');
	}	
	async execute(interaction) {
		const sent = await interaction.reply(defaultPingMsg(interaction));
		interaction.editReply(defaultPingMsg(interaction) + `\n\n(Roundtrip Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms)`);
	}
}

export const command = new PingCommand();