import "dotenv/config";
import { Telegraf } from "telegraf";
import {
    handleAirdrop,
    handleBalance,
    handleHelp,
    handleStart,
    handleTxnsHistory,
} from "./commands";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.command("start", handleStart);
bot.command("help", handleHelp);
bot.command("balance", handleBalance);
bot.command("airdrop", handleAirdrop);
bot.command("history", handleTxnsHistory);

bot.launch();
console.log("Bot is running...");
