import "dotenv/config";
import { Telegraf } from "telegraf";
import { Connection, PublicKey } from "@solana/web3.js";
import { handleBalance } from "./commands/balance";
import { handleAirdrop, handleHelp, handleTxnsHistory } from "./commands";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

const connection = new Connection(process.env.RPC_URL as string);

bot.start((ctx) => {
    ctx.replyWithMarkdown(
        `👋 *Welcome to SolanaGuideBot!* 

This bot helps you interact with the Solana Devnet blockchain. 🚀

Use /help to see the list of available commands and get started!`
    );
});

bot.command("help", handleHelp);
bot.command("balance", handleBalance);
bot.command("airdrop", handleAirdrop);
bot.command("history", handleTxnsHistory);

bot.launch();
console.log("Bot is running...");
