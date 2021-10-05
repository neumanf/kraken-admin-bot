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

    -   **Settings**

        Use `/settings` to configure all the settings. Available settings: welcome message and ban stickerpacks.

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
