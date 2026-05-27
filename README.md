![banner](./document/preview-new.png)

# Discord Bot Dashboard (Maintained Fork)

Using Typescript, Next.js 13, React 18 and Chakra UI 2.0.

- Support Light/Dark theme
- Multi languages support (i18n)
- Typescript support
- Nice UI & UX + Fast performance
- Flexible and Customizable
- Detailed Documentation

## Attribution

This project is a maintained fork of the original work by **fuma-nama**:
https://github.com/fuma-nama/discord-bot-dashboard-next

Thanks to the original author for creating and open-sourcing the base dashboard template.

**Video:** https://youtu.be/IdMPjT5PzVk <br/>
**Live Demo:** https://demo-bot.vercel.app

- Only 'Welcome message' Feature is Supported

## Review (not the latest version)

|                  Light                   |                  Dark                  |
| :--------------------------------------: | :------------------------------------: |
| ![light-mode](./document/home-light.png) | ![dark-mode](./document/home-dark.png) |

## Getting Started

This fork is maintained with an **npm-first** workflow.

### Requirements

- Node.js 20+
- npm

### Quick Start

1. Clone your fork.
   `git clone https://github.com/<your-account>/discord-bot-dashboard.git`
2. Install dependencies.
   `npm install`
3. Create `.env` from `.env.example` and fill the values.
4. Start development server.
   `npm run dev`
5. Open `http://localhost:3000`.

### Environment Variables

These are required:

| Variable | Description |
| --- | --- |
| `BOT_CLIENT_ID` | Discord OAuth2 application client ID |
| `BOT_CLIENT_SECRET` | Discord OAuth2 application client secret |
| `APP_URL` | Public URL of the dashboard (use `http://localhost:3000` in local development) |
| `NEXT_PUBLIC_API_ENDPOINT` | Base URL of your bot backend API |

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Run production server
- `npm run lint` - Run Next.js ESLint checks
- `npm run typecheck` - Run TypeScript type checks

### Project Structure

| Path | Description |
| --- | --- |
| [src/pages/\*](./src/pages) | App pages and API routes |
| [src/components/\*](./src/components) | UI components |
| [src/api/\*](./src/api) | API utilities |
| [src/config/\*](./src/config) | Common configurations and feature definitions |

### Customize Features

The dashboard supports configurable features.

1. Update typings in [src/config/types/custom-types.ts](./src/config/types/custom-types.ts).
2. Define feature metadata/renderers in [src/config/features.tsx](./src/config/features.tsx).
3. Use [src/config/example/WelcomeMessageFeature.tsx](./src/config/example/WelcomeMessageFeature.tsx) as reference.

[Localization](./document/localization.md) | [Forms](./document/form.md)

## Authorization

We are using the [API Routes](https://nextjs.org/docs/api-routes/introduction) of Next.js to handle Authorization

### Configure the Application

1. Open Discord Developer Portal
2. Create your OAuth2 application in https://discord.com/developers/applications
3. In `<Your Application>` -> OAuth2 -> Redirects

   Add `<APP_URL>/api/auth/callback` url to the redirects

   For Example: `http://localhost:3000/api/auth/callback` <br>
   **This is required for Authorization**

### Authorization Flow

**`Login -> Discord OAuth -> API Routes -> Client`**

- Login (`/api/auth/login`)
  <br>
  - Redirects user to discord oauth url
- Open Discord OAuth url
  - User authorizes the application
  - Redirect back to `/api/auth/callback`
- API Routes
  - Store the access token in http-only cookies
  - Redirect back to home page

### Token Expiration

The Discord access token can be expired or unauthorized by the user <br>
We will require the user to login again after getting `401` error from the Discord API

The refresh token won't be used, but you are able to customize the Authorization Flow

## Backend Development

Check [src/api/bot.ts](./src/api/bot.ts), it defined a built-in API for fetching data

You can use `express.js` (Node.js), `Rocket` (Rust) or any libraries/languages to develop your own server
<br>
Usually the server runs along with your discord bot (in the same program)
<br>
Moreover, you can use redis instead of connecting to the bot server directly

### Official Example

[Node.js (Typescript)](https://github.com/fuma-nama/discord-dashboard-backend-next)

### Authorization

The client will pass their access token via the `Authorization` header

```
Bearer MY_TOKEN_1212112
```

### Required Routes

You may extend it for more functions

GET `/guilds/{guild}`

- Get guild info (`custom-types.ts > CustomGuildInfo`)
- **Respond 404 or `null` if bot hasn't joined the guild**

GET `/guilds/{guild}/features/{feature}`

- Get Feature options (`custom-types.ts > CustomFeatures[K]`)
- **Respond 404 if not enabled**

PATCH `/guilds/{guild}/features/{feature}`

- Update feature options
- With custom body (defined in `config/features`)
- Respond updated feature options

POST `/guilds/{guild}/features/{feature}`

- Enable a feature

DELETE `/guilds/{guild}/features/{feature}`

- Disable a feature

GET `/guilds/{guild}/roles`

- Get Roles of the guild
- Responds a list of [Role Object](https://discord.com/developers/docs/topics/permissions#role-object) _(Same as discord documentation)_

GET `/guilds/{guild}/channels`

- Get Channels of the guild
- Responds a list of [Guild Channel](https://discord.com/developers/docs/resources/channel#channel-object) _(Same as discord documentation)_

## Any issues?

Feel free to ask a question by opening an issue.

**Love this project?** Give this repo a star!
