import DiscordClient from "./src/discordClient.js";
import GameManager from "./src/gameManager.js";
import config from "./config.json" with { type: "json" };
import DiscordClientOptions from "./src/discordClientOptions.js";

// set game manager data path
GameManager.setDataPath(process.cwd() + "\\data");

// start client
const options = new DiscordClientOptions(config.token, []);
const client = new DiscordClient(options);
await client.init();
//await client.login();