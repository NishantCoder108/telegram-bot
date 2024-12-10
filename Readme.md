# SolanaGuideBot

Welcome to **SolanaGuideBot**! A Telegram bot that interacts with the Solana Devnet blockchain. This bot allows users to check their Solana balance, view recent transactions, and receive free SOL on the Devnet.

## Features
- **/balance <address>** - Check the SOL balance of any wallet address.
- **/history <address>** - View the recent transactions of a wallet address.
- **/airdrop <address>** - Receive free SOL on the Devnet for testing (1 SOL).

## Demo:
Watch the demo of how the bot works : [SolanaGuideBot Demo](https://youtu.be/TMMseOdhJGw)


## Technologies Used
- **Node.js** - JavaScript runtime environment.
- **Telegraf** - Telegram bot framework.
- **Solana Web3.js** - Solana blockchain JavaScript SDK.

## Getting Started

### Prerequisites
To run this bot, you’ll need:
- **Node.js** installed on your machine (Download from [nodejs.org](https://nodejs.org/)).
- A Telegram bot token. To create one, visit [BotFather](https://core.telegram.org/bots#botfather) on Telegram.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/nishantcoder108/solanaguidebot.git
    cd solanaguidebot
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Telegram bot token and Solana RPC URL:

    ```bash
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    SOLANA_RPC_URL=your-rpc-url
    ```

4. Run the bot:

    ```bash
    npm run dev
    ```

The bot should now be running, and you can interact with it on Telegram!

## Commands
Here are the available commands you can use with the bot:

1. **/balance `<address>`**  
   Check the balance of a Solana wallet.

   Example:  
   `/balance 4z9r5XXwrVKN5KJ111yFAd2gHChdcYpmtGpmVbeUjpZj`

2. **/history `<address>`**  
   View recent transactions for a Solana wallet.

   Example:  
   `/history 4z9r5XXwrVKN5KJ4125FAd2gHChdcYpmtGpmVbeUjpZj`

3. **/airdrop `<address>`**  
   Get 1 SOL for free (Devnet only) to test the bot’s features.

   Example:  
   `/airdrop 4z9r5XXwrVKN5KJ896yFAd2gHChdcYpmtGpmVbeUjpZj`

