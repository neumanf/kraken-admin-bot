# Kraken Admin Bot

Group Admin &amp; Multipurpose Telegram bot

## Features

-   Admin

    -   **Kick**

        Reply to the user message with `/kick [reason]`.

    -   **Warn**

        Reply to the user message with `/warn [reason]`, or `/warn reset` to reset their warns.

    -   **Ban**

        Reply to the user message with `/ban [reason]`.

-   User

    -   **Translate**

        Reply to a message with `/translate [language-code]`. Defaults to `en`.

## Setup

```bash
git clone https://github.com/neumanf/kraken-admin-bot
cd kraken-admin-bot
npm install
mv .env.example .env # Fill in the fields
npm run dev
```
