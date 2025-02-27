import { GatewayIntentBits } from "discord.js";

export default class DiscordClientOptions {
  authToken: string;
  intents: GatewayIntentBits[];
  constructor(_authToken: string, _intents: GatewayIntentBits[]){
    this.authToken = _authToken;
    this.intents = _intents;
  }
}