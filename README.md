# Chef Nervous Robot

Chef Nervous Robot is a responsive React application that creates recipe ideas from ingredients you already have. Users can add available ingredients, exclude unwanted ingredients, select dietary restrictions, and request a recipe tailored to those choices.

**Live demo:** [loridunford.com/chef-nervous-robot](https://loridunford.com/chef-nervous-robot/)

## Features

- Add and remove available ingredients
- Exclude ingredients that must not appear in the recipe
- Choose vegetarian, vegan, and gluten-free preferences
- Generate a formatted recipe from the completed list
- Clear stale recipe results whenever the user's choices change
- Friendly loading, success, and error messages
- Responsive layout for mobile, tablet, and desktop screens
- Mock recipe provider for development without making an AI request

## AI and privacy

The live demo uses [Puter.js](https://docs.puter.com/) to generate recipes. Puter's user-pays model allows visitors to use supported AI services through their own Puter account instead of exposing or charging a developer API key.

When a visitor requests a recipe, the ingredients, exclusions, and dietary preferences they entered are sent to Puter and its AI provider. The interface discloses this before the request is made. Visitors may be asked to sign in to Puter.

No Anthropic, Hugging Face, or other developer API credentials are included in the browser bundle.

AI-generated recipes can contain mistakes. Users should independently verify dietary, allergy, food-safety, and cooking information.

## Accessibility

The application was reviewed one component at a time with accessibility treated as part of the implementation rather than a final visual check. The current version includes:

- Semantic page regions and a logical heading structure
- A skip link to the main content
- Native form controls with programmatic labels
- Fieldset and legend markup for dietary restrictions
- Descriptive names for ingredient-removal buttons
- Keyboard-accessible interactions and visible focus styles
- Permanently mounted live regions for status and error announcements
- Responsive reflow without horizontal scrolling at 320 CSS pixels
- Reduced-motion support
- Decorative image handling that avoids redundant announcements

## Security considerations

- No developer API keys are shipped to the browser
- User input is trimmed, length-limited, and checked for duplicates
- Ingredient values are separated and labeled as data in the AI prompt
- Generated Markdown is rendered without raw HTML
- Recipe Markdown is restricted to an allowlist of supported elements
- Technical errors are logged only during development; visitors receive friendly messages
- Puter is loaded only when recipe generation is requested

Client-side validation improves the interface but is not treated as a server-side security boundary.

## Built with

- React 19
- Vite
- Sass
- React Markdown
- Puter.js

## Local development

Requirements:

- Node.js
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

No `.env` file or developer API key is required for the Puter provider.

The active provider is selected in `src/AI.js`:

```js
const AI_PROVIDER = "puter";
// Options: "mock", "puter"
```

Use the mock provider while working on the interface without contacting an AI service:

```js
const AI_PROVIDER = "mock";
```

## Quality checks

```bash
npm run lint
npm run build
```

The production build is written to `dist`.

## Deployment

This portfolio edition is configured for deployment at:

```text
/chef-nervous-robot/
```

The path is set with Vite's `base` option in `vite.config.js`. If the app is moved to a domain root or another directory, update that value before rebuilding.

Upload the **contents** of `dist` to the matching public directory on the web server. Do not upload the source files or `node_modules` as part of the static deployment.

## Known third-party notices

Puter.js may produce browser-console messages about a protected `Origin` header or a WebSocket closing before connection. Recipe generation currently succeeds through Puter's available transport despite those messages.

The production build may also report CommonJS-variable warnings originating inside Puter.js. These warnings are not produced by application code.

## Project status

This repository is the branded portfolio version of Chef Nervous Robot. A separate, provider-configurable open-source edition is planned so the reusable version can evolve without weakening or complicating the deployed portfolio demo.
