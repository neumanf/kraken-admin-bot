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

    -   **Set Welcome Message**

        Use `/setwelcome <message>` to set a welcome message to new users. You can use `$NAME`, `$USERNAME` and `$ID` to refer to the user's name, username and id, respectively. Furthermore, if you need to add buttons that leads to URLs, use `$BUTTON{button title; https://your-url.com}`.

    -   **Set banned stickerpacks**

        Use `/setbannedstickerpacks <sticker_pack_name>` to ban stickerpacks. Ban multiple packs at once by separating them by a comma, e.g: `/setbannedstickerpacks pack_name_1, pack_name_2, pack_name_3`.

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
# Install the dependencies
$ npm install
# Copy the .env example to a new file
# Make sure to define your variables in the new file before running
$ cp .env.example .env
# Run the bot via polling
$ npm run dev
```
