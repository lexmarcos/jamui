# Design Aesthetic

  This project uses the JamUI / 8disc visual language: a sharp, mono, high-contrast utility interface with a digital tool feel.

  ## Visual Direction

  - The UI should feel like a focused local tool, not a SaaS landing page.
  - Prefer dense, functional layouts over decorative marketing sections.
  - Use a strong blue canvas, crisp white text, square edges, thin borders, and hard hover shadows.
  - The aesthetic is mono, technical, direct, slightly brutalist, and highly legible.

  ## Core Tokens

  - Background: `#1713c8`
  - Surface: `#1410bd`
  - Input surface: `#0f0ca4`
  - Primary text / inverted surface: `#fbfbff`
  - Muted text: `#d8d7ff`
  - Soft accent text: `#bdbcff`
  - Danger: `#e81123`
  - Font: `JetBrains Mono` or system monospace fallback

  When using Tailwind/JamUI, prefer tokens like:

  - `bg-jam-bg`
  - `bg-jam-surface`
  - `bg-jam-input`
  - `text-jam-text`
  - `text-jam-muted`
  - `font-jam-mono`
  - `shadow-jam-hard-sm`
  - `shadow-jam-hard-md`

  ## Component Rules

  - Buttons are square, uppercase, heavy-weight, and mono.
  - Primary buttons use white background with blue text.
  - Secondary buttons use blue surfaces with white text.
  - Hover states should usually invert color or add a hard shadow.
  - Inputs are square, dark blue, bordered, and high contrast.
  - Labels are small, uppercase, bold, and widely tracked.
  - Avoid rounded cards, soft shadows, glassmorphism, gradient blobs, beige palettes, and decorative filler.

  ## Layout Rules

  - Keep screens centered, constrained, and purposeful.
  - Use full blue page backgrounds with optional subtle grid texture.
  - Prefer simple sections, clear hierarchy, and stable component sizing.
  - Do not use oversized marketing heroes unless explicitly building a marketing page.
  - The first screen should expose the actual tool or product workflow.