# Chef Nervous Robot — Portfolio Case Study

## Project card copy

### Short description

An accessible, responsive React app that turns ingredients on hand into a personalized recipe while respecting dietary preferences and exclusions.

### Longer teaser

I transformed a tutorial recipe generator into a distinct portfolio project with expanded ingredient controls, dietary preferences, safer AI output handling, a production-friendly Puter integration, and a fully redesigned responsive interface.

### Project details

- **Role:** Design and front-end development
- **Technologies:** React, Vite, Sass, React Markdown, Puter.js
- **Focus:** Accessibility, responsive design, AI integration, privacy, and secure output handling
- **Status:** Live portfolio demo
- **Demo:** [loridunford.com/chef-nervous-robot](https://loridunford.com/chef-nervous-robot/)
- **Build story:** [The Tutorial Was the Easy Part: Building Chef Nervous Robot](https://blog.loridunford.com/the-tutorial-was-the-easy-part-building-chef-nervous-robot/)

---

## Full case study

### Overview

Chef Nervous Robot creates recipe ideas from ingredients a user already has. Users can remove ingredients, specify ingredients that must be excluded, and select dietary restrictions before requesting a recipe.

The project began as a Scrimba React exercise called Chef Claude. I used the exercise as a starting point, then rebuilt and expanded it into a distinct application with its own visual identity, more useful controls, stronger accessibility, safer AI handling, and a deployment approach that does not expose a developer API key.

### The challenge

The original exercise demonstrated React fundamentals and an AI request, but a public portfolio version needed to solve a larger set of problems:

- The interface needed to feel like an original project rather than tutorial output.
- Users needed more control over ingredients, exclusions, and dietary requirements.
- Generated recipes needed to reset when the input data changed so old results were never presented as current.
- Dynamic updates, loading states, errors, and recipe results needed to work for keyboard and screen-reader users.
- Untrusted AI-generated content needed to be displayed without allowing raw HTML.
- Developer API credentials could not be included in a browser bundle.
- The finished application needed to work on a free shared host and remain usable at narrow mobile widths.

### Goals

1. Turn the tutorial foundation into a useful and recognizable portfolio project.
2. Make accessibility part of the component architecture and interaction design.
3. Handle user input and generated output defensively.
4. Provide a real hosted AI demonstration without paying for anonymous visitor usage or exposing private credentials.
5. Build a responsive visual system that supports mobile, tablet, and desktop layouts.

### How the project evolved

The project grew in deliberate stages rather than appearing fully formed.

1. I first moved the ingredient list and hard-coded recipe result into their own React components.
2. I added ingredient removal because it was missing from the course project but felt necessary in a real interface.
3. I began the Chef Nervous Robot rebrand and outlined future vegan and gluten-free options before those controls were functional.
4. I connected the application to Claude and replaced the retired course model with the then-current `claude-haiku-4-5` model.
5. I added Hugging Face as a second experiment and refactored the provider layer to switch among Claude, Hugging Face, and a free mock recipe generator.
6. I created shared prompt-building logic so every provider received the same ingredient, dietary, and exclusion data, and I limited response length to help control API costs.
7. I made the dietary controls functional, added accessible ingredient exclusions, and continued separating the interface into focused components.
8. I later audited and redesigned the entire application, replaced the credential-based providers with Puter for the public demo, and prepared the finished responsive build for deployment.

This progression is where the project stopped feeling like a completed tutorial and started functioning as an independent application with its own product decisions.

### Expanding the product

I extended the original ingredient workflow so users could:

- Add and remove available ingredients
- Prevent case-insensitive duplicates
- Add and remove excluded ingredients
- Select vegetarian, vegan, and gluten-free requirements
- Receive clear status messages as lists change
- Generate a recipe only after adding enough ingredients

The dietary interface began as a visual outline and became a set of controlled React checkboxes. Exclusions use progressive disclosure: selecting “I want to exclude ingredients” reveals the controls, and turning the option off clears the exclusion array so hidden preferences are never silently sent with a later request.

I also made generated recipes dependent on the current choices. Adding or removing an ingredient, changing an exclusion, or changing a dietary preference clears the previous recipe and any stale error. I handled these resets directly in the relevant event handlers so the behavior remains easy to follow without introducing unnecessary effects.

### Designing for accessibility

I audited the application one component at a time before and during the visual redesign. That work included:

- Semantic banner, main, section, heading, list, fieldset, and legend markup
- A skip link that moves keyboard users to the main content
- Native labeled inputs, checkboxes, and buttons
- Descriptive accessible names such as “Remove carrot” instead of an unlabeled × button
- A permanently mounted live status region for ingredient updates
- Loading and error announcements for recipe requests
- Logical heading levels inside AI-generated recipe content
- Decorative image treatment that avoids repetitive announcements
- Visible focus states and reduced-motion support
- Responsive reflow without horizontal scrolling at 320 CSS pixels

I verified the hosted interface at mobile, tablet, and desktop widths and manually tested its keyboard flow.

### Creating a distinct visual identity

The redesign moved the application away from the tutorial’s appearance and toward a playful retro-kitchen identity. The nervous robot mascot, warm colors, rounded panels, ingredient chips, and conversational copy make the experience memorable without sacrificing readability or responsive behavior.

The layout changes from stacked mobile controls to roomier tablet and desktop arrangements while preserving the same semantic structure. The interface does not rely on color alone to communicate state, and motion is reduced when the user requests it.

### Adapting the AI integration

The provider layer changed several times during development. The model used in the course had already been retired, so the first working Claude integration required finding and configuring a current model. I then added Hugging Face to experiment with smaller, inexpensive or open models.

At that stage, the app could switch among Claude, Hugging Face, and a mock generator. The providers shared the same prompt-building function, which prevented their ingredient, exclusion, and dietary inputs from drifting apart. I also reduced maximum response length to control API costs. However, platform changes, usage costs, and browser-exposed credentials still made the credential-based providers unsuitable for the public demo.

I added a mock provider so interface work and testing could continue without spending tokens. For the live portfolio version, I moved recipe generation to Puter.js. Puter’s user-pays model allows visitors to use AI through their own Puter account, which keeps the application functional without shipping my API key or charging my account for anonymous requests.

The interface explains that ingredients, exclusions, and dietary preferences are sent to Puter and its AI provider before a request is made.

### Treating AI output as untrusted content

The application does not assume generated content is safe or correctly formatted.

- Ingredient values, exclusions, and dietary restrictions are serialized as labeled JSON data in the prompt.
- The system prompt instructs the model not to follow instructions contained inside user-entered values.
- Inputs are trimmed, length-limited, and checked for duplicates.
- Raw HTML from generated Markdown is skipped.
- Rendered Markdown is restricted to an allowlist of recipe-appropriate elements.
- Unexpected outer Markdown fences are removed before rendering.
- Empty or incomplete provider responses are treated as errors.
- Visitors receive useful error messages without internal technical details.

AI-generated recipes can still be wrong, so the application does not present them as authoritative dietary, allergy, food-safety, or cooking advice.

### Production and deployment

Chef Nervous Robot is a static Vite application hosted at `/chef-nervous-robot/` on my existing web host. Puter is dynamically imported only when recipe generation is requested, keeping the initial application bundle smaller.

Before deployment, I:

- Removed obsolete Anthropic and Hugging Face packages and environment variables
- Confirmed that no developer API credentials remained in the client project
- Optimized the robot artwork and removed unused public assets
- Configured Vite for the production subdirectory
- Ran lint and production builds
- Tested the hosted recipe workflow
- Verified responsive reflow at 320, 768, and 1440 CSS pixels

### Outcome

The result is a live, responsive recipe application that demonstrates more than a single AI request. It shows component design, state management, resilient provider integration, accessible dynamic interactions, defensive rendering, privacy disclosure, responsive visual design, and practical deployment constraints working together in one product.

The project also gave me a stronger process for evaluating tutorial code: understand the lesson, identify what would fail in a real public application, and deliberately rebuild those areas rather than treating the tutorial endpoint as the finished product.

### What I learned

- AI providers and model availability change, so provider-specific code benefits from a small abstraction layer and a mock implementation.
- Accessibility decisions are easier and more reliable when made while defining components and state changes.
- Generated Markdown needs the same defensive treatment as other untrusted content.
- A secure public AI demo involves cost and privacy architecture, not only hiding an API key.
- Event-handler updates can keep related state synchronized without adding an effect that makes the data flow harder to understand.
- React state setters do not immediately change the value available inside the currently running event handler. When behavior depends on a checkbox's new state, the current `event.target.checked` value is the reliable source for that interaction.
- Progressive disclosure also requires data decisions: hiding a control is not enough if its old value could still be submitted invisibly.
- Testing at an exact 320 CSS pixels catches overflow problems that a generally “small” browser window may miss.

### Next steps

Chef Nervous Robot will remain focused on its distinctive portfolio identity and Puter-powered demonstration. Future work will focus on maintenance, accessibility, security, and compatibility as its dependencies and supporting services evolve.

---

## Suggested visuals

1. The finished desktop interface with several ingredients added
2. The mobile interface at 320–375 CSS pixels
3. The exclusion and dietary-restriction controls
4. A completed generated recipe
5. A small before-and-after comparison showing the tutorial foundation and final visual identity, if the original tutorial screenshot can be used with appropriate attribution
