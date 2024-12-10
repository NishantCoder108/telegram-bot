import { Context } from "telegraf";
import { PublicKey, Connection } from "@solana/web3.js";
import { getTransactionHistory } from "./lib/getTransactionHistory";

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
export const handleHelp = async (ctx: Context): Promise<void> => {
    try {
        await ctx.replyWithMarkdown(
            `📜 *Available Commands:*

1. 💰 */balance <wallet_address>*  
   _Check the SOL balance of a given wallet address._

2. 🧾 */history <wallet_address>*  
   _View recent transactions for a given wallet address._

3. 🎁 */airdrop <wallet_address>*  
   _Request free SOL (Devnet only)._

For any issues or questions, feel free to contact us. Happy exploring! 🌟`
        );
    } catch (error) {
        console.error("Error in help command:", error);
        ctx.reply(
            "❌ An error occurred while displaying the help message. Please try again later."
        );
    }
};
export const handleAirdrop = async (ctx: Context): Promise<void> => {
    if (ctx.message && "text" in ctx.message) {
        const messageText = ctx.message.text;
        const args = messageText.split(" ");

        if (args.length !== 2) {
            ctx.reply("Usage: `/airdrop <wallet_address>`", {
                parse_mode: "Markdown",
            });
            return;
        }

        const address = args[1];
        try {
            const publicKey = new PublicKey(address);

            await ctx.reply(
                "🔄 *Processing your airdrop request...*\nPlease wait.",
                { parse_mode: "Markdown" }
            );

            const signature = await connection.requestAirdrop(publicKey, 1e9); // 1 SOL
            await connection.confirmTransaction(signature);

            const explorerLink = `https://explorer.solana.com/tx/${signature}?cluster=devnet`;

            ctx.reply(
                `🎉 *Airdrop Successful!*\n\n💰 1 SOL has been sent to your wallet.\n\n🆔 [View Transaction on Explorer](${explorerLink})`,
                { parse_mode: "Markdown" }
            );
        } catch (error) {
            console.error(error);
            ctx.reply(
                "❌ *Error during airdrop.* Ensure the wallet address is valid.",
                { parse_mode: "Markdown" }
            );
        }
    } else {
        ctx.reply("❌ This command requires a text message.");
    }
};

export const handleTxnsHistory = async (ctx: Context): Promise<void> => {
    if (ctx.message && "text" in ctx.message) {
        const messageText = ctx.message.text;
        const args = messageText.split(" ");

        if (args.length !== 2) {
            ctx.reply("Usage: `/history <wallet_address>`", {
                parse_mode: "Markdown",
            });
            return;
        }

        const address = args[1];
        try {
            const transactionHistory = await getTransactionHistory(address);

            if (transactionHistory.length === 0) {
                ctx.reply("No recent transactions found for this address.", {
                    parse_mode: "Markdown",
                });
                return;
            }

            const response = transactionHistory
                .map((tx, i) => {
                    const date = tx.blockTime
                        ? new Date(tx.blockTime * 1000).toLocaleString()
                        : "Unknown Date";
                    return `🔹 *#${i + 1}*\n  - 🆔 [${
                        tx.transaction.signatures[0]
                    }](https://explorer.solana.com/tx/${
                        tx.transaction.signatures[0]
                    }?cluster=devnet)\n  - 🕒 *${date}*`;
                })
                .join("\n\n");

            ctx.reply(
                `📜 *Recent Transactions for ${address}:*\n\n${response}`,
                { parse_mode: "Markdown" }
            );
        } catch (error) {
            console.error(error);
            ctx.reply("❌ Error fetching transaction history.", {
                parse_mode: "Markdown",
            });
        }
    } else {
        ctx.reply("❌ This command requires a text message.");
    }
};
