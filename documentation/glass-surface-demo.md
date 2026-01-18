GlassSurface demo and verification

This page shows the in-app GlassSurface demo (also available from the header `DEMO` link).

What to look for

- The glass should show a subtle blur of the content behind it (gradient or image).
- The component defaults match ReactBits: `blur: 11`, `backgroundOpacity: 0` (transparent), `saturation: 1`.
- Browsers that don't support `backdrop-filter` receive a tiny, non-invasive visible fallback so the component never looks like a flat grey box.

How to verify (quick)

1. Run the app locally: `npm run dev` and open the app.
2. Click the `DEMO` link in the header.
3. Confirm each demo card shows translucency and blur over its backdrop.
4. In DevTools, inspect a `.gd-glass` element and confirm:
   - `backdrop-filter` or `-webkit-backdrop-filter` is present (when supported)
   - `class="gd-glass ..."` is on the root node

Why this was necessary

- The app had opaque ancestors (modal dimmer, solid card fallbacks) and Tailwind utilities that prevented the glass from sampling the page background — the result looked flat/grey.
- The fix: scoped `.gd-glass` helper + protective `gd-force-reset`, lowered conflicting ancestor opacities, and a demo for visual QA.

Next steps

- (Optional) Add the ReactBits visual polish (chromatic aberration, grain, sheen).
- Add a Storybook story / visual regression test to lock this in.

Examples

Basic usage

```jsx
<GlassSurface width={300} height={200} borderRadius={24}>
  <h2>Glass Surface Content</h2>
</GlassSurface>
```

Advanced

```jsx
<GlassSurface
  displace={15}
  distortionScale={-150}
  redOffset={5}
  greenOffset={15}
  blueOffset={25}
  brightness={60}
  opacity={0.8}
  mixBlendMode="screen"
>
  <span>Advanced Glass Distortion</span>
</GlassSurface>
```

Polish (ReactBits-like)

Use the `polish` prop to enable sheen, micro-noise and a chromatic-fringe fallback for browsers that don't run the SVG filter:

```jsx
<GlassSurface polish backgroundOpacity={0.08} blur={12} displace={2} distortionScale={-120}>
  <strong>Polished glass</strong>
</GlassSurface>
```

## ReactBits verbatim example

For direct comparison the demo includes the **verbatim** ReactBits implementation (JS + CSS) under the "ReactBits original — verbatim example" section. The component is available at:

- `src/component/GlassSurfaceReactBits.jsx`
- `src/component/GlassSurfaceReactBits.css`

Use this to compare the original visual against the repo's polished and protected implementations.
