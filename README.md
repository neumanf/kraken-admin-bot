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

    -   **Add custom command**

        Use `/addcom <name> <content>` to add a custom command. You can also create a command with a counter by using `$COUNTER` on the message.

    -   **Delete custom command**

        Use `/delcom <name>` to delete a custom command.

-   User

    -   **Translate**

        Reply to a message with `/translate [language-code]`. Defaults to `en`.

    -   **Custom commands**

        Use `/commands` to show all custom commands available.

## Setup

```bash
git clone https://github.com/neumanf/kraken-admin-bot
cd kraken-admin-bot
npm install
mv .env.example .env # Fill in the fields
npm run dev
```
