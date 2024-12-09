import "dotenv/config";
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN || "");

bot.start((ctx) => {
    ctx.reply(
        "Welcome to the SolanaGuideBot! Use /help to see available commands."
    );
});

bot.help((ctx) => {
    ctx.reply(
        "Commands:\n/balance <address> - Check SOL balance\n/history <address> - View recent transactions\n/airdrop <address> - Get free SOL (Devnet only)"
    );
});

bot.launch();
console.log("Bot is running...");
