import { DiscordClient } from "./src/discord-client.js";

import config from "./config.json" with {type: "json"};

const options = {
  authToken: config.token,
}

const client = new DiscordClient(options);
await client.init();
await client.login();