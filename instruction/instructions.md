# ROLE:
You are an expert front-end developer specializing in modern UI/UX and implementing design systems in Next.js applications using Tailwind CSS.

# TASK:
Your task is to generate the complete Tailwind CSS configuration and a set of reusable React components based on the design specifications in the provided `design_system.json` file. The goal is to transform a basic Next.js chat application into a visually stunning and professional interface, matching the aesthetic of the provided inspiration images.

# CONTEXT:
The user has a functional Next.js application called "Teletraan-1". We are now focusing exclusively on the front-end styling to create a polished, dark-themed user experience. The `design_system.json` file contains all the necessary design tokens (colors, fonts, spacing, etc.) extracted from modern AI application designs.

# REQUIREMENTS:

## 1. Tailwind CSS Configuration (`tailwind.config.js`):
- Read the `design_system.json` file.
- Use the `theme.colorPalette` to extend Tailwind's default color set. The keys (e.g., `background`, `panel`, `accent`) should become usable class names (e.g., `bg-background`, `text-accent`, `border-panel-border`).
- Extend the `fontFamily` to include the specified `sans` and `mono` fonts.
- Extend the `spacing` and `borderRadius` values to match the design system.
- Configure the `plugins` array to include `@tailwindcss/typography` for beautiful default styling of markdown-rendered text from the AI.

## 2. Global Styles (`styles/globals.css`):
- Set up the base Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`).
- In the `@layer base`, define the default styles for the `body`:
    - Set the `background-color` to `theme.colorPalette.background`.
    - Set the default `color` to `theme.colorPalette.text.primary`.
    - Set the default `font-family` to `theme.typography.fonts.sans`.
- Implement a custom, styled scrollbar that fits the dark theme, using the palette colors.

## 3. React Component Generation (e.g., in a `/components` directory):

Your main task is to create a library of stateless, reusable React components based on the `components` section of the JSON file.

### a. `Button.jsx`:
- Create a single Button component that accepts a `variant` prop (`'primary'`, `'secondary'`, `'ghost'`).
- Use the `clsx` or a similar utility to conditionally apply classes based on the variant and other props (e.g., `disabled`).
- The styles for each variant (default, hover, disabled) must exactly match the specifications in `design_system.json`.
- The component should accept an optional `icon` prop to render an SVG alongside the text.

### b. `ChatBubble.jsx`:
- Create a component that accepts `sender` (`'user'` or `'ai'`) and `message` props.
- It should dynamically apply styles based on the `sender` as defined in `components.chatMessage`.
- User messages should be aligned to the right, and AI messages to the left.
- It should include a placeholder for an `Avatar` component next to the message bubble.

### c. `CodeBlock.jsx`:
- Create a component for displaying formatted code.
- It should have a distinct background color as specified in the JSON.
- It must include a "Copy" button in the top-right corner.
- Use a monospace font. (Note: For full syntax highlighting, suggest integrating a library like `highlight.js` or `prism-react-renderer` and provide a basic structure for it).

### d. Layout Components:
- Create a `Sidebar.jsx` and a `MainContent.jsx` component.
- These components should use the specified panel background colors and padding to create the desired multi-column layout seen in the inspiration images. The sidebar should have a fixed width, and the main content area should be flexible.

# FINAL OUTPUT:
Provide the content for the following files, ready to be integrated into a Next.js project:
1. `tailwind.config.js`
2. `styles/globals.css`
3. The JSX/TSX code for the React components listed above.