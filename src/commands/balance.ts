import { Context } from "telegraf";
import { PublicKey, Connection } from "@solana/web3.js";

const connection = new Connection(process.env.RPC_URL as string);

export const handleBalance = async (ctx: Context): Promise<void> => {
    if (ctx.message && "text" in ctx.message) {
        const messageText = ctx.message.text;
        const args = messageText.split(" ");

        if (args.length !== 2) {
            ctx.reply("Usage: `/balance <wallet_address>`", {
                parse_mode: "Markdown",
            });
            return;
        }

        const address = args[1];
        try {
            const publicKey = new PublicKey(address);
            const balance = await connection.getBalance(publicKey);
            ctx.reply(`💰 *Balance*: \`${balance / 1e9} SOL\``, {
                parse_mode: "Markdown",
            });
        } catch (error) {
            console.error(error);
            ctx.reply("❌ Invalid address or error fetching balance.", {
                parse_mode: "Markdown",
            });
        }
    } else {
        ctx.reply("❌ This command requires a text message.");
    }
};
