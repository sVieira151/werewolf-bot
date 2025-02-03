import DiscordClient from "./src/discordClient.js";
//import GameManager from "./src/gameManager.js";

import config from "./config.json" with { type: "json" };
import DiscordClientOptions from "./src/discordClientOptions.js";

const options = new DiscordClientOptions(config.token, []);
//const dataPath = process.cwd();

// load engine
//GameManager

const client = new DiscordClient(options);
await client.init();
await client.login();