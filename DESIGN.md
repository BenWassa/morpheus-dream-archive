---
name: Morpheus Dream Archive
description: A private, ethereal harness for subconscious narratives.
colors:
  primary: '#a855f7' # Purple (Brand Accent)
  secondary: '#22d3ee' # Cyan (Ethereal Accent)
  tertiary: '#4f46e5' # Indigo (Deep Accent)
  neutral-bg: '#0a0f1c' # Space Navy (Core Background)
  neutral-text: '#e2e8f0' # Light Slate (Primary Text)
  surface: '#0f172a' # Deep Slate (Card Background)
typography:
  display:
    fontFamily: 'Cinzel, serif'
    fontSize: '1.125rem' # lg
    fontWeight: 400
    lineHeight: 1
    letterSpacing: '0.2em'
  body:
    fontFamily: 'Inter, sans-serif'
    fontSize: '1rem' # base
    fontWeight: 400
    lineHeight: 1.625 # relaxed
  mono:
    fontFamily: 'JetBrains Mono, monospace'
    fontSize: '0.875rem' # sm
    fontWeight: 400
rounded:
  sm: '4px'
  md: '8px'
  xl: '12px'
  full: '9999px'
spacing:
  xs: '0.25rem'
  sm: '0.5rem'
  md: '1rem'
  lg: '2rem'
  xl: '3rem'
components:
  glass-card:
    backgroundColor: 'rgba(255, 255, 255, 0)'
    rounded: '{rounded.xl}'
    padding: '{spacing.md}'
    backdropFilter: 'blur(12px) saturate(1.4)'
  nav-pill:
    backgroundColor: '{colors.neutral-bg}'
    textColor: '{colors.neutral-text}'
    rounded: '{rounded.full}'
    padding: '0.7em 1.25em'
---

# Design

## Overview

Morpheus is an archive of the subconscious. The visual language is **Cinematic Ethereal**, characterized by deep spatial layering, modular glass surfaces, and fluid "gooey" interactions. It avoids flat UI patterns in favor of translucent depth, mirroring the translucent nature of dream recall.

## Colors

The palette is built for a dark-mode-only experience that suggests high-altitude night.

- **Background**: `neutral-bg` (#0a0f1c) provides infinite depth.
- **Accents**: `primary` (#a855f7) and `secondary` (#22d3ee) are used for "glow" effects and interactive states.
- **Gradients**: Backgrounds are never solid; they use low-opacity radial gradients (12–22%) in Cyan, Purple, and Periwinkle to create atmospheric "dream clouds."

## Typography

A contrast between the ancient and the modern.

- **Display**: [Cinzel](https://fonts.google.com/specimen/Cinzel) serves as a ritualistic, timeless font for headings and archive titles. It must always use wide letter-spacing (`tracking-widest`).
- **Body**: [Inter](https://fonts.google.com/specimen/Inter) handles administrative and narrative tasks with high readability.
- **Mono**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains%20Mono) labels technical metadata (dates, fragment IDs).

## Elevation

Elevation is achieved through **Glassmorphism**, not shadows or borders.

- **Primary Surface**: `GlassSurface` component using SVG filters for displacement and refraction.
- **Polish**: High-fidelity surfaces use a "polished" layer adding noise, chromatic aberration (`mix-blend-mode: screen`), and multi-stage sheens.
- **Blur**: Standard backdrop blur is `12px` with a `1.4` saturation boost.

## Components

### GlassSurface

The core structural unit. It uses an SVG `feDisplacementMap` to distort content behind it, creating a "thick glass" or "water" effect. Prop defaults: `blur: 11`, `opacity: 0.93`, `saturation: 1`.

### GooeyNav

A specialized bottom navigation bar. It uses a contrast/blur SVG filter technique to create fluid connections between navigation particles and the active state pill. Transition timing: `600ms`.

### Entry Cards

Large, vertical containers (`h-[500px]`) with `3xl` rounded corners. They feature a gradient overlay from `neutral-bg/70` at the bottom to transparent at the top, housing the Cinzel display titles.

## Do's and Don'ts

### Do

- Use wide letter spacing for all Cinzel text.
- Layer `GlassSurface` components to create visual depth.
- Use low-opacity radial glows rather than solid background colors.
- Use exponential easing (`ease-out`) for all entry animations.

### Don't

- Use side-stripe borders or solid `1px` borders unless they are `white/5` opacity.
- Ever use a pure white (#fff) background or text.
- Animate with bounces or elastic effects; the mood is calm and fluid.
- Use modals for content—prefer inline expansion or separate routes.
