/* eslint-disable @typescript-eslint/no-explicit-any */
import { Interaction, SlashCommandBuilder } from "discord.js";

export default interface Command {
  data: SlashCommandBuilder;
  execute(interaction: Interaction): Promise<any>;
}