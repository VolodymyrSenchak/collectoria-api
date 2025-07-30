import dotenv from "dotenv";
import fs from "fs";
import {IBrickLinkSettings} from "../settings";

// Load .env.local if it exists, otherwise fallback to .env
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

export const ENV_VARIABLES = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8080,
  brickLink: {
    apiUrl: 'https://api.bricklink.com/api/store/v1',
    consumerKey: process.env.BRICKLINK_CONSUMER_KEY || "",
    consumerSecret: process.env.BRICKLINK_CONSUMER_SECRET || "",
    token: process.env.BRICKLINK_TOKEN || "",
    tokenSecret: process.env.BRICKLINK_TOKEN_SECRET || "",
  } as IBrickLinkSettings
};
