import DiscordClient from "./bot/client/src/discordClient.js";
import GameManager from "./werewolfEngine/gameManager/src/gameManager.js";
import config from "./config.json" with { type: "json" };
import DiscordClientOptions from "./bot/client/src/discordClientOptions.js";

// set game manager data path
const gm = GameManager.import(process.cwd(), "localtest");
GameManager.export(gm);

// start client
const options = new DiscordClientOptions(config.token, []);
const client = new DiscordClient(options);
await client.init();
//await client.login();