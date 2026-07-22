# OpenDesign

[![CI](https://github.com/gingatimo/opendesign/actions/workflows/ci.yml/badge.svg)](https://github.com/gingatimo/opendesign/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/ngx-opendesign.svg)](https://www.npmjs.com/package/ngx-opendesign)

OpenDesign is a modern Angular design system with pill-shaped controls, compact rounded surfaces,
light and dark themes, standalone components, `OnPush`, and signal-friendly APIs.

The npm package is [`ngx-opendesign`](https://www.npmjs.com/package/ngx-opendesign). Version 2.0.0
ships 78 components, 10 dependency-free SVG chart types, 2 Angular editors, 116 tree-shakable icons,
runtime i18n for English and Vietnamese, and no non-Angular runtime dependencies. The only peer
dependencies are Angular packages: `@angular/core`, `@angular/common`, `@angular/cdk`, and
`@angular/forms`.

**Live documentation:** https://gingatimo.github.io/opendesign/

A few screens composed entirely with OpenDesign:

**Dashboard**: `GTopbar`, `GSidebar`, metrics, progress, and activity widgets.

![Dashboard built with OpenDesign](.github/screenshots/dashboard.png)

**List page**: search, status filters, role chips, frozen table columns, and pagination.

![List page built with OpenDesign](.github/screenshots/list.png)

**Create form**: form controls with reactive validation and invalid states.

![Create form built with OpenDesign](.github/screenshots/create.png)

This repository contains both the Angular library and the documentation app. If you only want to use
OpenDesign in an Angular app, read the [package README](projects/ngx-opendesign/README.md).

## Workspace

This Angular CLI workspace contains two projects:

- `projects/ngx-opendesign`: the component library published as `ngx-opendesign`.
- `projects/docs`: the documentation site with live demos, source examples, API tables, and playbook
  screens.

## Development

Use Node.js 22 or newer.

```bash
git clone https://github.com/gingatimo/opendesign.git
cd opendesign
npm ci
npm start
```

`npm start` runs the docs app at `http://localhost:4200`. Inside the workspace, the docs app imports
the library directly from source through Angular path mapping, so you do not need to build the
library before starting the docs server.

## Consumer Setup

Install the package and its Angular peer dependencies:

```bash
npm install ngx-opendesign @angular/cdk @angular/forms
```

Add the OpenDesign stylesheet to your application styles:

```json
{
  "styles": ["node_modules/ngx-opendesign/styles/opendesign.css", "src/styles.scss"]
}
```

`opendesign.css` defines the public `--g-*` design tokens, the light and dark palettes, component
styles, chart colors, and the CDK accessibility utility used by Toast.

## Theme

Light theme is the default. Enable dark theme by setting one attribute on the root document element:

```typescript
document.documentElement.setAttribute('data-g-theme', 'dark');
```

Remove the attribute to return to light theme. The stylesheet also sets `color-scheme` for the active
theme so browser-rendered UI such as scrollbars, date/time inputs, autofill backgrounds, and
spellcheck underlines match the selected surface.

## Internationalization

The library defaults to English (`en-US`). To use Vietnamese labels, accessibility text, date
formatting, number formatting, and Monday-first calendars, provide the Vietnamese locale once in
`app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { gLocaleVi, provideGLocale } from 'ngx-opendesign';

export const appConfig: ApplicationConfig = {
  providers: [provideGLocale(gLocaleVi)],
};
```

Use `GLocaleService.use(locale)` to switch locales at runtime. Explicit inputs supplied by your app,
such as `aria-label`, placeholders, and labels, take precedence over locale defaults.

## Component Inventory

- **Buttons (4):** Button, Fab, Icon Button, Action Expand
- **Forms (19):** Input, Textarea, Checkbox, Toggle, Radio, Select, File Input, Datepicker, Date
  Range Picker, Time Picker, Color Picker, Slider, Step Slider, Rating, Cascade Select, Tree Select,
  Chips, Input OTP, Search Field
- **Display (18):** Alert, Badge, Spinner, Progress, Chip, Avatar, Card, Icon, Divider, Image
  Preview, Image Slider, Carousel, Coverflow, Gallery, Media Player, Terminal, Skeleton, Timeline
- **Overlay (5):** Dialog, Drawer, Tooltip, Toast, Context Menu
- **Navigation (11):** Action Menu, Tabs, Topbar, Sidebar, Stepper, Link, Pagination, Breadcrumb,
  Menu, Accordion, Dock Menu
- **Layout (6):** Layout, Container, Stack, Grid, Splitter, Scroll Panel
- **Data (3):** Table, Organization Chart, Reorder List
- **Charts (10):** Line, Bar, Pie, Donut, Polar, Radar, Stacked Bar, Honeycomb, Heatmap, Calendar
  Heatmap
- **Editors (2):** Code Editor, Rich Text Editor

## Commands

```bash
npm test             # test ngx-opendesign, then docs, with Vitest and --watch=false
npm run lint         # ESLint for both projects
npm run format       # Prettier write for project sources
npm run format:check # Prettier check used by CI
npm run build:lib    # build ngx-opendesign and compile styles/opendesign.css
npm run build:docs   # production build for the docs app
```

CI runs lint, format check, tests, library build, and docs build on every push and pull request.

## Release

Package releases are published from `dist/ngx-opendesign`.

Before publishing a new version:

1. Update `projects/ngx-opendesign/package.json`.
2. Update `OPENDESIGN_VERSION` in `projects/ngx-opendesign/src/public-api.ts`.
3. Update the home page version badge in `projects/docs/src/app/pages/home.page.ts`.
4. Update `CHANGELOG.md`.
5. Update both README files when install steps, component counts, package contents, or breaking
   changes affect users.
6. Run `npm run lint`, `npm test`, `npm run build:lib`, and `npm run build:docs`.
7. Publish with `npm publish ./dist/ngx-opendesign --access public`.

The repository also includes `.github/workflows/release.yml`, which publishes on pushed `v*` tags
when the `NPM_TOKEN` repository secret is configured.

## License

Apache-2.0
